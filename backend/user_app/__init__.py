import uuid
from datetime import datetime, timedelta
from typing import Annotated

import bcrypt

from jose import jwt
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends
from starlette.responses import JSONResponse

from backend.database import ALCHEMY_ENGINE, stripe
from backend.database_models import Users
from backend.dependency import get_user_jwt
from backend.user_app.models import Register, Login, ForgotPassword
from backend.configuration import JWT_SECRET_KEY, JWT_ALGORITHM, JWT_ACCESS_TOKEN_EXPIRE_MINUTES, STRIPE_SECRET_KEY


user_router = APIRouter(
    prefix="/user",
    tags=["users"],
)


def create_access_token(sub: str):
    expire = datetime.utcnow() + timedelta(minutes=JWT_ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode = {"exp": expire, "iat": datetime.utcnow(), "sub": sub}
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
    return encoded_jwt


def create_hash_and_salt(password: str):
    salt = bcrypt.gensalt()
    pswd = bcrypt.hashpw(password.encode(), salt)
    return pswd.decode(), salt.decode()


@user_router.post("/register")
async def register(user_info: Register):
    user_id = str(user_info.user_id)
    with Session(ALCHEMY_ENGINE) as session:
        missing_fields = []
        user_exists = session.query(Users).filter_by(user_name=user_info.username).count()
        if user_exists > 0:
            missing_fields.append({"field": "username", "message": "Username exists"})

        user_exists = session.query(Users).filter_by(email=user_info.email).count()
        if user_exists > 0:
            missing_fields.append({"field": "email", "message": "Email exists"})

        if missing_fields:
            return JSONResponse(status_code=409, content={"message": "error", "errors": missing_fields})

        pswd, salt = create_hash_and_salt(user_info.password)
        customer = stripe.Customer.create(email=user_info.email, name=user_info.org_name)
        user = Users(user_name=user_info.username, email=user_info.email, organization_name=user_info.org_name,
                     password=pswd, salt=salt, plan_id="631e263e-d9ae-40cc-ac21-91d71fe7c9fd",
                     user_id=user_id, stripe_cust_id=customer.stripe_id)
        session.add(user)
        session.commit()
    access_token = create_access_token(sub=user_id)
    return JSONResponse(content={"message": "OK", "access_token": access_token,
                                 "content": {"user_id": user_id, "user_name": user_info.username,
                                             "email": user_info.email}})


@user_router.post("/login")
async def login(user_info: Login):
    with Session(ALCHEMY_ENGINE) as session:
        user = session.query(Users).filter_by(email=user_info.email).limit(1).all()
        if not user:
            return JSONResponse(status_code=401,
                                content={"message": "error",
                                         "errors": [{"field": "email", "message": "Invalid email"}]})

        user = user[0]
        if not bcrypt.checkpw(user_info.password.encode(), user.password.encode()):
            return JSONResponse(status_code=401,
                                content={"message": "error",
                                         "errors": [{"field": "password", "message": "Invalid password"}]})
    access_token = create_access_token(sub=user.user_id)
    return JSONResponse(content={"message": "OK",
                                 "access_token": access_token,
                                 "content": {"user_id": user.user_id, "user_name": user.user_name,
                                             "email": user.email}})


@user_router.get("/info")
async def info(user_id: Annotated[str, Depends(get_user_jwt)]):
    with Session(ALCHEMY_ENGINE) as session:
        user = session.query(Users).filter_by(user_id=user_id).limit(1).all()
        if not user:
            return JSONResponse(status_code=404, content={"message": "error"})
    user = user[0]
    return JSONResponse(content={"message": "OK",
                                 "content": {"user_id": user.user_id, "user_name": user.user_name,
                                             "email": user.email}})


@user_router.post("/forgot_password")
async def forgot_password(request_data: ForgotPassword, password_reset_tokens=None):
    email = request_data.email

    if not email:
        return JSONResponse(status_code=422, content={"message": "error", "detail": "Email not provided"})

    with Session(ALCHEMY_ENGINE) as session:
        user = session.query(Users).filter_by(email=email).limit(1).first()

        if not user:
            return JSONResponse(status_code=404, content={"message": "error", "detail": "Email not found"})

        # Generate a unique password reset token
        reset_token = str(uuid.uuid4())
        # Store the reset token with the corresponding user email
        password_reset_tokens[reset_token] = email

        return JSONResponse(content={"message": "OK", "content": {"reset_token": reset_token}})
