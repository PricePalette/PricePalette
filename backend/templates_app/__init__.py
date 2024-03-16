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
    templates = list(templates_collection.find({"widgetId": {"$in": all_templates}}))
    if not templates:
        return JSONResponse(content={"message": "error"}, status_code=404)
    for tmp in templates:
        tmp.pop("_id", None)
    return JSONResponse(content={"message": "OK", "content": templates})


# @templates_router.post("/create")
# async def create_templates(data: CreateTemplate):
#     with Session(ALCHEMY_ENGINE) as session:
#         template = Templates(template_id=data.widgetId, title=data.title, description=data.description, img=data.img,
#                              usages=0, active=True)
#         session.add(template)
#
#         templates_collection.insert_one(data.model_dump(mode="json"))
#         session.commit()
#     return JSONResponse(content={"message": "OK", "content": {"template_id": str(data.widgetId)}})
