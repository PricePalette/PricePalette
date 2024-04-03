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

        widget_embed_info = []
        for id in widget_ids:
            embed = session.query(WidgetEmbed).filter_by(widget_id=id, active=True).one_or_none()
            if embed:
                widget_embed_info.append([embed.embed_id, embed.views])
            else:
                widget_embed_info.append([None, None])
    widgets = widget_collection.aggregate(
        [{"$match": {"widgetId": {"$in": widget_ids}}},
         {"$addFields": {"tmpDate": {"$dateFromString": {"dateString": "$createdDate"}}}},
         {"$sort": {"tmpDate": -1}}])
    if not widgets:
        return JSONResponse(content={"message": "error"}, status_code=404)
    widgets = list(widgets)
    for widget, embed_info in zip(widgets, widget_embed_info):
        widget.pop("_id", None)
        widget.pop("tmpDate", None)
        widget["embed_id"] = embed_info[0]
        widget["views"] = embed_info[1]
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
        user = session.query(Users).filter_by(user_id=user_id).one()
        if not user.plan_id:
            return JSONResponse(content={"message": "error", "detail": "User not subscribed to a plan"})
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
            json_card["payment_link_id"] = link.id

        from_template = True if data.templateIdUsed else False
        widget = Widgets(widget_id=data.widgetId, user_id=user_id, from_template=from_template,
                         template_id_used=data.templateIdUsed, stripe_product_id=product.stripe_id)
        session.add(widget)

        user.widgets_created += 1
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

    # get the diff
    to_update = {}
    cards_to_update = []
    is_unordered = False
    for key, api_value in from_api.items():
        db_value = from_db[key]
        to_update[key] = None
        if (isinstance(api_value, str) or isinstance(api_value, dict)) and api_value != db_value:
            to_update[key] = api_value
        elif key == "cards":
            for api_card in api_value:
                api_card_copy = copy.deepcopy(api_card)
                api_card_copy.pop("stripe_price_id", None)
                api_card_copy.pop("payment_link", None)
                for db_card in db_value:
                    db_card_copy = copy.deepcopy(db_card)
                    db_card_copy.pop("stripe_price_id", None)
                    db_card_copy.pop("payment_link", None)
                    if api_card["id"] == db_card["id"] and json.dumps(api_card_copy) != json.dumps(db_card_copy):
                        cards_to_update.append(api_card)
            is_unordered = any([api_card["id"] != db_card["id"] for api_card, db_card in zip(api_value, db_value)])
    to_update = {k: v for k, v in to_update.items() if v}
    if not to_update and not cards_to_update and not is_unordered:
        return JSONResponse(content={"message": "OK", "detail": "Nothing to update", "content": {}})

    # modify widget title and description in stripe
    if to_update.get("title"):
        stripe.Product.modify(data.stripe_product_id, name=f"{to_update['title']} - {data.widgetId}")
    if to_update.get("description"):
        stripe.Product.modify(data.stripe_product_id, description=to_update['description'])

    # update card currency and interval in stripe and mongodb, unordered
    common_price_kwargs = {}
    if to_update.get("price"):
        if to_update["price"]["currency"].lower() != from_db["price"]["currency"].lower():
            common_price_kwargs["currency"] = to_update["price"]["currency"].lower()
        else:
            common_price_kwargs["currency"] = from_db["price"]["currency"].lower()

        if to_update["price"]["duration"].lower() != from_db["price"]["duration"].lower():
            common_price_kwargs["recurring"] = {"interval": STRIPE_INTERVAL[to_update["price"]["duration"].lower()]}
        else:
            common_price_kwargs["recurring"] = {"interval": STRIPE_INTERVAL[from_db["price"]["duration"].lower()]}
    else:
        common_price_kwargs["currency"] = from_db["price"]["currency"].lower()
        common_price_kwargs["recurring"] = {"interval": STRIPE_INTERVAL[from_db["price"]["duration"].lower()]}

    if common_price_kwargs and to_update.get("price"):
        cards_copy = copy.deepcopy(from_db["cards"])
        for idx, card in enumerate(from_db["cards"]):
            stripe.Price.modify(card["stripe_price_id"], active=False)
            stripe.PaymentLink.modify(card["payment_link_id"], active=False)
            price = stripe.Price.create(**common_price_kwargs, unit_amount=int(card["amount"] * 100),
                                        product=from_db["stripe_product_id"])
            link = stripe.PaymentLink.create(line_items=[{"price": price.stripe_id, "quantity": 1}])
            cards_copy[idx] = {**card, "payment_link": link.url, "stripe_price_id": price.stripe_id}
        widget_collection.update_one({"widgetId": str(data.widgetId)}, {"$set": {"cards": cards_copy}})

    # update cards metadata in mongodb, unordered
    if cards_to_update:
        from_db = widget_collection.find_one({"widgetId": str(data.widgetId)})
        new_cards = []
        for card in from_db["cards"]:
            tmp = None
            for update_card in cards_to_update:
                if card["id"] == update_card["id"]:
                    tmp = update_card
            if tmp is None:
                new_cards.append(card)
            else:
                stripe.Price.modify(card["stripe_price_id"], active=False)
                stripe.PaymentLink.modify(card["payment_link_id"], active=False)
                price = stripe.Price.create(**common_price_kwargs, unit_amount=int(tmp["amount"] * 100),
                                            product=from_db["stripe_product_id"])
                link = stripe.PaymentLink.create(line_items=[{"price": price.stripe_id, "quantity": 1}])
                tmp = {**tmp, "payment_link": link.url, "stripe_price_id": price.stripe_id}
                new_cards.append(tmp)
        widget_collection.update_one({"widgetId": str(data.widgetId)}, {"$set": {"cards": new_cards}})

    with Session(ALCHEMY_ENGINE) as session:
        session.query(Widgets).filter_by(widget_id=str(data.widgetId), active=True).update({'updated_date': func.now()})
        session.commit()

    if to_update:
        widget_collection.update_one({"widgetId": str(data.widgetId)}, {"$set": to_update})

    widget = widget_collection.find_one({"widgetId": str(data.widgetId)})
    widget.pop("_id")

    if is_unordered:
        sorter = {card["id"]: idx for idx, card in enumerate(from_api["cards"])}
        widget["cards"] = sorted(widget["cards"], key=lambda x: sorter[x["id"]])
        widget_collection.update_one({"widgetId": str(data.widgetId)}, {"$set": {"cards": widget["cards"]}})
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
        existing_embed = session.query(WidgetEmbed).filter_by(widget_id=str(widgetId), active=True).one_or_none()
        if existing_embed:
            return JSONResponse(content={"message": "OK", "content": {"embed_id": existing_embed.embed_id}})
        embed_id = str(uuid.uuid4())
        widget_embed = WidgetEmbed(embed_id=embed_id, widget_id=str(widgetId), active=True)
        session.add(widget_embed)
        session.commit()
    return JSONResponse(content={"message": "OK", "content": {"embed_id": embed_id}})
