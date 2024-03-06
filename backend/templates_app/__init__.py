from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from pydantic import UUID4
from sqlalchemy.orm import Session

from backend.database import MONGO_CXN, ALCHEMY_ENGINE
from backend.database_models import Templates
from backend.dependency import verify_jwt
from backend.templates_app.models import CreateTemplate

templates_collection = MONGO_CXN["templates"]
templates_router = APIRouter(
    prefix="/template",
    tags=["template"],
    dependencies=[Depends(verify_jwt)]
)


@templates_router.get("/fetch")
async def fetch_template(template_id: UUID4):
    all_templates = list(templates_collection.find())

    for template in all_templates:
        template.pop("_id")
        template.pop("createdDate")

    return JSONResponse(content={"message": "OK", "content": all_templates})


@templates_router.get("/list")
async def list_templates():
    with Session(ALCHEMY_ENGINE) as session:
        all_templates = []
        for tmp in session.query(Templates).filter_by(active=True).all():
            all_templates.append({"title": tmp.title, "description": tmp.description,
                                  "img": tmp.img})
    return JSONResponse(content={"message": "OK", "content": all_templates})


@templates_router.post("/create")
async def create_templates(data: CreateTemplate):
    with Session(ALCHEMY_ENGINE) as session:
        template = Templates(template_id=data.widgetId, title=data.title, description=data.description, img=data.img,
                             usages=0, active=True)
        session.add(template)

        templates_collection.insert_one(data.model_dump(mode="json"))
        session.commit()
    return JSONResponse(content={"message": "OK", "content": {"template_id": str(data.widgetId)}})
