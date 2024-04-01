import copy
import json
import uuid
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from pydantic.types import UUID4
from sqlalchemy.orm import Session
from sqlalchemy.sql import func

from backend.database import MONGO_CXN, ALCHEMY_ENGINE, stripe
from backend.database_models import Widgets, Users, WidgetEmbed, Templates
from backend.dependency import verify_jwt, get_user_jwt
from backend.widget_app.models import UserID, WidgetMetadata, UpdateWidget, CreateWidget

widget_collection = MONGO_CXN["widgets"]
widget_router = APIRouter(
    prefix="/widget",
    tags=["widgets"],
    dependencies=[Depends(verify_jwt)]
)

STRIPE_INTERVAL = {"m": "month", "y": "year"}


def widget_exists(widget_id: str):
    """
    Check if widget exists in MongoDB and SQL

    :raises HTTPException: a 404 exception is raised
    """
    exists_nosql = widget_collection.count_documents({"widgetId": str(widget_id)}) > 0
    with Session(ALCHEMY_ENGINE) as session:
        exists_sql = session.query(Widgets).filter_by(widget_id=widget_id, active=True).count() > 0

    if not exists_nosql or not exists_sql:
        raise HTTPException(status_code=404, detail="Widget not found")


@widget_router.get("/list")
async def list_widgets(user_id: Annotated[str, Depends(get_user_jwt)]):
    with Session(ALCHEMY_ENGINE) as session:
        widget_ids = [i.widget_id for i in session.query(Widgets).filter_by(user_id=user_id, active=True)]
    widgets = widget_collection.find({"widgetId": {"$in": widget_ids}})
    if not widgets:
        return JSONResponse(content={"message": "error"}, status_code=404)
    widgets = list(widgets)
    for widget in widgets:
        widget.pop("_id", None)
    return JSONResponse(content={"message": "OK", "content": widgets})


@widget_router.get("/info")
async def widget_info(widgetId: UUID4):
    widget = widget_collection.find_one({"widgetId": str(widgetId)})
    if not widget:
        return JSONResponse(content={"message": "error"}, status_code=404)
    widget.pop("_id", None)
    return JSONResponse(content={"message": "OK", "content": widget})


@widget_router.post("/create")
async def create_widget(data: CreateWidget, user_id: Annotated[str, Depends(get_user_jwt)]):
    with (Session(ALCHEMY_ENGINE) as session):
        widget_json = data.model_dump(mode="json")
        product = stripe.Product.create(name=f"{data.title} - {data.widgetId}", description=data.description,
                                        metadata={"for_user_id": user_id})
        widget_json["stripe_product_id"] = product.stripe_id

        for card, json_card in zip(data.cards, widget_json["cards"]):
            interval = STRIPE_INTERVAL[data.price.duration.lower()]
            price = stripe.Price.create(currency=data.price.currency.lower(), unit_amount=int(card.amount * 100),
                                        recurring={"interval": interval}, product=product.stripe_id)
            json_card["stripe_price_id"] = price.stripe_id

            link = stripe.PaymentLink.create(line_items=[{"price": price.stripe_id, "quantity": 1}])
            json_card["payment_link"] = link.url

        from_template = True if data.templateIdUsed else False
        widget = Widgets(widget_id=data.widgetId, user_id=user_id, from_template=from_template,
                         template_id_used=data.templateIdUsed, stripe_product_id=product.stripe_id)
        session.add(widget)

        session.query(Users).filter_by(user_id=user_id).update({'widgets_created': Users.widgets_created + 1})
        session.query(Templates).filter_by(template_id=data.templateIdUsed
                                           ).update({'usages': Templates.usages + 1})

        widget_collection.insert_one(widget_json)

        session.commit()
    return JSONResponse(content={"message": "OK", "content": {"widget_id": str(data.widgetId)}})


@widget_router.put("/update")
async def update_widget(data: UpdateWidget):
    widget_exists(str(data.widgetId))

    from_db = widget_collection.find_one({"widgetId": str(data.widgetId)})
    from_api = data.model_dump(mode="json")

    to_update = {}
    cards_to_update = []
    for key, value in from_api.items():
        to_update[key] = None
        if (isinstance(value, str) or isinstance(value, dict)) and value != from_db[key]:
            to_update[key] = value
        elif key == "cards":
            for api_card, db_card in zip(value, from_db["cards"]):
                if json.dumps(api_card) != json.dumps(db_card):
                    cards_to_update.append(api_card)

    to_update = {k: v for k, v in to_update.items() if v}
    if not to_update:
        return JSONResponse(content={"message": "OK", "detail": "Nothing to update", "content": {}})

    if to_update.get("title"):
        stripe.Product.modify(data.stripe_product_id, name=f"{to_update['title']} - {data.widgetId}")

    if to_update.get("description"):
        stripe.Product.modify(data.stripe_product_id, description=to_update['description'])

    common_price_kwargs = {}
    # delete and recreate prices
    if to_update.get("price"):
        if to_update["price"]["currency"].lower() != from_db["price"]["currency"].lower():
            common_price_kwargs["currency"] = to_update["price"]["currency"].lower()
        else:
            common_price_kwargs["currency"] = from_db["price"]["currency"].lower()

        if to_update["price"]["duration"].lower() != from_db["price"]["duration"].lower():
            common_price_kwargs["recurring"] = {"interval": STRIPE_INTERVAL[to_update["price"]["duration"].lower()]}
        else:
            common_price_kwargs["recurring"] = {"interval": STRIPE_INTERVAL[from_db["price"]["duration"].lower()]}

    if common_price_kwargs:
        cards_copy = copy.deepcopy(from_db["cards"])
        for idx, card in enumerate(from_db["cards"]):
            price = stripe.Price.create(**common_price_kwargs, unit_amount=int(card["amount"] * 100),
                                        product=from_db["stripe_product_id"])
            cards_copy[idx]["stripe_price_id"] = price.stripe_id

            link = stripe.PaymentLink.create(line_items=[{"price": price.stripe_id, "quantity": 1}])
            cards_copy[idx]["payment_link"] = link.url
        widget_collection.update_one({"widgetId": str(data.widgetId)}, {"$set": {"cards": cards_copy}})

    with Session(ALCHEMY_ENGINE) as session:
        session.query(Widgets).filter_by(widget_id=str(data.widgetId), active=True).update({'updated_date': func.now()})
        session.commit()
    widget_collection.update_one({"widgetId": str(data.widgetId)}, {"$set": to_update})

    widget = widget_collection.find_one({"widgetId": str(data.widgetId)})
    widget.pop("_id")
    return JSONResponse(content={"message": "OK", "content": widget})


@widget_router.delete("/delete")
async def delete_widget(widgetId: UUID4, user_id: Annotated[str, Depends(get_user_jwt)]):
    widget_exists(str(widgetId))

    with Session(ALCHEMY_ENGINE) as session:
        widget = session.query(Widgets).filter_by(widget_id=str(widgetId), active=True).one()
        user = session.query(Users).filter_by(user_id=user_id).one()
        embeds = session.query(WidgetEmbed).filter_by(widget_id=str(widgetId), active=True)

        for card in widget_collection.find_one({"widgetId": str(widgetId)})["cards"]:
            stripe.Price.modify(card["stripe_price_id"], active=False)

        stripe.Product.modify(widget.stripe_product_id, active=False)

        for embed in embeds:
            embed.active = False

        user.widgets_created -= 1
        widget.active = False
        session.commit()
    delete_result = widget_collection.delete_one({"widgetId": str(widgetId)})
    if delete_result.deleted_count > 0:
        return JSONResponse(content={"message": "OK"})
    return JSONResponse(content={"message": "error"}, status_code=500)


@widget_router.get("/embed")
async def embed_widget(widgetId: UUID4):
    widget_exists(str(widgetId))

    with Session(ALCHEMY_ENGINE) as session:
        existing_embed = session.query(WidgetEmbed).filter_by(widget_id=str(widgetId)).count()
        if existing_embed > 0:
            return JSONResponse(content={"message": "error", "detail": "Widget is already embedded"}, status_code=409)
        embed_id = str(uuid.uuid4())
        widget_embed = WidgetEmbed(embed_id=embed_id, widget_id=str(widgetId), active=True)
        session.add(widget_embed)
        session.commit()
    return JSONResponse(content={"message": "OK", "content": {"embed_id": embed_id}})
