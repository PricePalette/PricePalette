from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from backend.database import MONGO_CXN, ALCHEMY_ENGINE
from backend.database_models import Templates
from backend.templates_app.models import CreateTemplate

templates_collection = MONGO_CXN["templates"]
templates_router = APIRouter(
    prefix="/template",
    tags=["template"]
)


@templates_router.get("/list")
async def list_templates():
    with Session(ALCHEMY_ENGINE) as session:
        all_templates = [tmp.template_id for tmp in session.query(Templates).filter_by(active=True).all()]
    templates = list(templates_collection.find({"templateId": {"$in": all_templates}}))
    if not templates:
        return JSONResponse(content={"message": "error"}, status_code=404)
    for tmp in templates:
        tmp.pop("_id", None)
    return JSONResponse(content={"message": "OK", "content": templates})
