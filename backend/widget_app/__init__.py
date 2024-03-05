import uuid
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from pydantic.types import UUID4
from sqlalchemy.sql import func
from sqlalchemy.orm import Session

from backend.database import MONGO_CXN, ALCHEMY_ENGINE
from backend.database_models import Widgets, Users, WidgetEmbed
from backend.dependency import verify_jwt, get_user_jwt
from backend.widget_app.models import UserID, WidgetMetadata, UpdateWidget, CreateWidget

widget_collection = MONGO_CXN["widgets"]
widget_router = APIRouter(
    prefix="/widget",
    tags=["widgets"],
    dependencies=[Depends(verify_jwt)]
)


def widget_exists(widget_id: str):
    """
    Check if widget exists in MongoDB and SQL

    :raises HTTPException: a 404 exception is raised
    """
    exists_nosql = widget_collection.count_documents({"widgetId": str(widget_id)}) > 0
    with Session(ALCHEMY_ENGINE) as session:
        exists_sql = session.query(Widgets).filter_by(widget_id=widget_id).count() > 0

    if not exists_nosql or not exists_sql:
        raise HTTPException(status_code=404, detail="Widget not found")


@widget_router.get("/list")
async def list_widgets(user_id: Annotated[str, Depends(get_user_jwt)]):
    with Session(ALCHEMY_ENGINE) as session:
        widget_ids = [i.widget_id for i in session.query(Widgets).filter_by(user_id=user_id)]
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
    with Session(ALCHEMY_ENGINE) as session:
        from_template = True if data.templateIdUsed else False
        widget = Widgets(widget_id=data.widgetId, user_id=user_id, from_template=from_template,
                         template_id_used=data.templateIdUsed)
        session.add(widget)
        session.commit()

        session.query(Users).filter_by(user_id=user_id).update({'widgets_created': Users.widgets_created + 1})

        widget_collection.insert_one(data.model_dump(mode="json"))

        session.commit()
    return JSONResponse(content={"message": "OK", "content": {"widget_id": str(data.widgetId)}})


@widget_router.put("/update")
async def update_widget(data: UpdateWidget):
    widget_exists(str(data.widgetId))

    result = {key: value for key, value in data.model_dump(mode="json").items()
              if key in data.updatedFields}

    with Session(ALCHEMY_ENGINE) as session:
        session.query(Widgets).filter_by(widget_id=str(data.widgetId)).update({'updated_date': func.now()})
        session.commit()
    widget_collection.update_one({"widgetId": str(data.widgetId)}, {"$set": result})
    return JSONResponse(content={"message": "OK"})


@widget_router.delete("/delete")
async def delete_widget(widgetId: UUID4, user_id: Annotated[str, Depends(get_user_jwt)]):
    widget_exists(str(widgetId))

    with Session(ALCHEMY_ENGINE) as session:
        session.query(Widgets).filter_by(widget_id=str(widgetId)).delete()
        session.query(Users).filter_by(user_id=user_id).update({'widgets_created': Users.widgets_created - 1})
        session.commit()
    delete_result = widget_collection.delete_one({"widgetId": str(widgetId)})
    if delete_result.deleted_count > 0:
        return JSONResponse(content={"message": "OK"})
    return JSONResponse(content={"message": "error"}, status_code=500)


@widget_router.get("/embed")
async def embed_widget(widgetId: UUID4):
    widget_exists(str(widgetId))

    with Session(ALCHEMY_ENGINE) as session:
        embed_id = str(uuid.uuid4())
        widget_embed = WidgetEmbed(embed_id=embed_id, widget_id=str(widgetId), active=True)
        session.add(widget_embed)
        session.commit()
    return JSONResponse(content={"message": "OK", "content": {"embed_id": embed_id}})
