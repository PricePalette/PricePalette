import datetime
from typing import Annotated

from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from pydantic.types import UUID4
from sqlalchemy.sql import func
from sqlalchemy.orm import Session

from backend.database import MONGO_CXN, ALCHEMY_ENGINE
from backend.database_models import Widgets, Users
from backend.dependency import verify_jwt, get_user_jwt
from backend.widget_app.models import UserID, WidgetMetadata, UpdateWidget, CreateWidget

widget_collection = MONGO_CXN["widgets"]
widget_router = APIRouter(
    prefix="/widget",
    tags=["widgets"],
    dependencies=[Depends(verify_jwt)]
)


@widget_router.get("/list")
async def list_widgets(user_id: Annotated[str, Depends(get_user_jwt)]):
    # with Session(ALCHEMY_ENGINE) as session:
    #     session.
    #     from_template = True if data.template_id_used else False
    #     widget = Widgets(widget_id=data.widget_id, user_id=data.user_id, from_template=from_template,
    #                      template_id_used=data.template_id_used, title=data.title, description=data.description)
    #     session.add(widget)
    #     session.commit()
    widgets = widget_collection.find({"user_id": str(user_id)})
    if not widgets:
        return JSONResponse(content={"message": "error"}, status_code=404)
    widgets = list(widgets)
    for widget in widgets:
        widget.pop("_id", None)
    return JSONResponse(content={"message": "OK", "content": widgets})


@widget_router.get("/info")
async def widget_info(widgetId: UUID4):
    widget = widget_collection.find_one({"widget_id": str(widgetId)})
    if not widget:
        return JSONResponse(content={"message": "error"}, status_code=404)
    widget.pop("_id", None)
    return JSONResponse(content={"message": "OK", "content": widget})


@widget_router.post("/create")
async def create_widget(data: CreateWidget, user_id: Annotated[str, Depends(get_user_jwt)]):
    with Session(ALCHEMY_ENGINE) as session:
        from_template = True if data.template_id_used else False
        widget = Widgets(widget_id=data.widgetId, user_id=user_id, from_template=from_template,
                         template_id_used=data.template_id_used)
        session.add(widget)
        session.commit()

        session.query(Users).filter(Users.user_id == user_id).update({'widgets_created': Users.widgets_created + 1})
        session.commit()
    widget_collection.insert_one(data.model_dump(mode="json"))
    return JSONResponse(content={"message": "OK", "content": {"widget_id": str(data.widgetId)}})


@widget_router.put("/update")
async def update_widget(data: UpdateWidget):
    if widget_collection.count_documents({"widget_id": str(data.widgetId)}) == 0:
        return JSONResponse(content={"message": "error"}, status_code=404)

    result = {key: value for key, value in data.model_dump(mode="json").items()
              if key in data.updatedFields}

    with Session(ALCHEMY_ENGINE) as session:
        session.query(Widgets) \
            .filter(Widgets.widget_id == str(data.widgetId)).update({'updated_date': func.now()})
        session.commit()
    widget_collection.update_one({"widget_id": str(data.widgetId)}, {"$set": result})
    return JSONResponse(content={"message": "OK"})


@widget_router.delete("/delete")
async def delete_widget(widgetId: UUID4, user_id: Annotated[str, Depends(get_user_jwt)]):
    if widget_collection.count_documents({"widget_id": str(widgetId)}) == 0:
        return JSONResponse(content={"message": "error"}, status_code=404)

    with Session(ALCHEMY_ENGINE) as session:
        session.query(Widgets).filter(Widgets.widget_id == str(widgetId)).delete()
        session.query(Users).filter(Users.user_id == user_id).update({'widgets_created': Users.widgets_created - 1})
        session.commit()
    delete_result = widget_collection.delete_one({"widget_id": str(widgetId)})
    if delete_result.deleted_count > 0:
        return JSONResponse(content={"message": "OK"})
    return JSONResponse(content={"message": "error"}, status_code=500)


@widget_router.get("/embed")
async def embed_widget(widgetId: UUID4, user_id: Annotated[str, Depends(get_user_jwt)]):
    # embed information goes in SQL, write logic here
    return JSONResponse(content={"message": "OK", "content": {"embed_id": widgetId}})
