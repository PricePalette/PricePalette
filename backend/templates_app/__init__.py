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

templates_collection = MONGO_CXN["templates"]
templates_router = APIRouter(
    prefix="/template",
    tags=["template"],
    dependencies=[Depends(verify_jwt)]
)


@templates_router.get("/list")
async def list_templates():
    all_templates = list(templates_collection.find())

    for template in all_templates:
        template.pop("_id")
        template.pop("createdDate")

    return JSONResponse(content={"message": "OK", "content": all_templates})
