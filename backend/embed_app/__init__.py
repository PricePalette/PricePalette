from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic.types import UUID4
from sqlalchemy.orm import Session

from backend.database import MONGO_CXN, ALCHEMY_ENGINE
from backend.database_models import WidgetEmbed

widget_collection = MONGO_CXN["widgets"]
embed_router = APIRouter(
    prefix="/embed",
    tags=["embed"]
)


@embed_router.get("/widget-info")
async def widget_info(embedId: UUID4):
    with Session(ALCHEMY_ENGINE) as session:
        embed = session.query(WidgetEmbed).filter_by(embed_id=str(embedId), active=1).first()

    if not embed:
        return JSONResponse(content={"message": "error"}, status_code=404)

    widget = widget_collection.find_one({"widgetId": str(embed.widget_id)})
    if not widget:
        return JSONResponse(content={"message": "error"}, status_code=404)
    widget.pop("_id", None)
    with Session(ALCHEMY_ENGINE) as session:
        session.query(WidgetEmbed).filter_by(embed_id=str(embedId)).update({"views": embed.views + 1})
        session.commit()
    return JSONResponse(content={"message": "OK", "content": widget})
