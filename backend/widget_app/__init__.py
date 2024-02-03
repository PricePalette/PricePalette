from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic.types import UUID4

from backend.database import MONGO_CXN
from backend.widget_app.models import UserID, WidgetID, WidgetMetadata

widget_collection = MONGO_CXN["widgets"]
widget_router = APIRouter(
    prefix="/widget",
    tags=["widget"],
    responses={404: {"description": "Not found"}},
)


@widget_router.get("/list")
async def list_widgets(user_id: UUID4):
    widgets = widget_collection.find({"user_id": str(user_id)})
    if not widgets:
        return JSONResponse(content={"message": "error"}, status_code=404)
    widgets = list(widgets)
    for widget in widgets:
        widget.pop("_id", None)
    return JSONResponse(content={"message": "OK", "content": widgets})


@widget_router.get("/info")
async def list_widgets(widget_id: UUID4):
    widget = widget_collection.find_one({"widget_id": str(widget_id)})
    if not widget:
        return JSONResponse(content={"message": "error"}, status_code=404)
    widget.pop("_id", None)
    return JSONResponse(content={"message": "OK", "content": widget})


@widget_router.put("/update")
async def list_widgets(data: WidgetMetadata):
    if widget_collection.count_documents({"widget_id": str(data.widget_id)}) == 0:
        return JSONResponse(content={"message": "error"}, status_code=404)
    widget_collection.update_one({"widget_id": str(data.widget_id)})
    return JSONResponse(content={"message": "OK"})


@widget_router.delete("/delete")
async def list_widgets(widget_id: UUID4):
    delete_result = widget_collection.delete_one({"widget_id": str(widget_id)})
    if delete_result.deleted_count > 0:
        return JSONResponse(content={"message": "OK"})
    return JSONResponse(content={"message": "error"}, status_code=500)


@widget_router.get("/embed")
async def list_widgets(widget_id: UUID4):
    # embed information goes in SQL, write logic here
    return JSONResponse(content={"message": "OK", "content": {"embed_id": widget_id}})
