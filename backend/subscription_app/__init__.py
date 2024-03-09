from typing import Annotated

from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from backend.database import ALCHEMY_ENGINE, stripe
from backend.database_models import Templates, Users
from backend.dependency import verify_jwt, get_user_jwt

sub_router = APIRouter(
    prefix="/subscription",
    tags=["subscription"],
    dependencies=[Depends(verify_jwt)]
)


# @sub_router.post("/create")
# async def create_subscription(user_id: Annotated[str, Depends(get_user_jwt)]):
#     with Session(ALCHEMY_ENGINE) as session:
#         user = session.query(Users).filter_by(user_id=user_id).limit(1).all()
#         if not user:
#             return JSONResponse(status_code=404, content={"message": "error", "detail": "User not found"})
#         user = user[0]
#     customer = stripe.Customer.search(query=f"email:'{user.email}'")
#     if not customer:
#         customer = stripe.Customer.create(email=user.email, name=user.organization_name)
#         # save customer.id
#
#     with Session(ALCHEMY_ENGINE) as session:
#         all_templates = [tmp.template_id for tmp in session.query(Templates).filter_by(active=True).all()]
#     templates = list(templates_collection.find({"widgetId": {"$in": all_templates}}))
#     if not templates:
#         return JSONResponse(content={"message": "error"}, status_code=404)
#     for tmp in templates:
#         tmp.pop("_id", None)
#     return JSONResponse(content={"message": "OK", "content": templates})

