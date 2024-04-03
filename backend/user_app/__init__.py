import uuid
from json import loads
from datetime import datetime, timedelta
from typing import Annotated

import bcrypt
import requests
from fastapi import APIRouter, Depends
from fastapi import HTTPException
from jose import jwt
from sqlalchemy import func
from sqlalchemy.orm import Session
from starlette.responses import JSONResponse

from backend.configuration import JWT_SECRET_KEY, JWT_ALGORITHM, JWT_ACCESS_TOKEN_EXPIRE_MINUTES, PRICEPALETTE_PLANS
from backend.database import ALCHEMY_ENGINE, stripe
from backend.database_models import Users, WidgetEmbed, Widgets
from backend.dependency import get_user_jwt
from backend.user_app.models import Register, Login, ForgotPassword, ResetPassword, UpdateSecret

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
                     password=pswd, salt=salt, plan_id=None,
                     user_id=user_id, stripe_cust_id=customer.stripe_id, stripe_cust_secret=None)
        session.add(user)
        session.commit()
    access_token = create_access_token(sub=user_id)
    return JSONResponse(content={"message": "OK", "access_token": access_token,
                                 "content": {"user_id": user_id, "user_name": user_info.username,
                                             "email": user_info.email, "stripe_cust_id": customer.stripe_id}})


@user_router.post("/login")
async def login(user_info: Login):
    with Session(ALCHEMY_ENGINE) as session:
        user = session.query(Users).filter_by(email=user_info.email).one_or_none()
        if not user:
            return JSONResponse(status_code=401,
                                content={"message": "error",
                                         "errors": [{"field": "email", "message": "Invalid email"}]})

        if not bcrypt.checkpw(user_info.password.encode(), user.password.encode()):
            return JSONResponse(status_code=401,
                                content={"message": "error",
                                         "errors": [{"field": "password", "message": "Invalid password"}]})
    u_info = await info(user.user_id)
    u_info = loads(u_info.body.decode())["content"]
    access_token = create_access_token(sub=user.user_id)
    return JSONResponse(content={"message": "OK",
                                 "access_token": access_token,
                                 "content": u_info})


@user_router.get("/info")
async def info(user_id: Annotated[str, Depends(get_user_jwt)]):
    with (Session(ALCHEMY_ENGINE) as session):
        user = session.query(Users).filter_by(user_id=user_id).one_or_none()

        views_cap = PRICEPALETTE_PLANS[user.plan_id] if user.plan_id else None
        current_views = session.query(func.sum(WidgetEmbed.views)).join(Widgets). \
            filter(Widgets.user_id == user_id).one()[0]
        current_views = int(current_views) if current_views else 0

    if not user:
        return JSONResponse(status_code=404, content={"message": "error"})

    redacted_key = f"xxxx-xxxx-xx{user.stripe_cust_secret[-2:]}" if user.stripe_cust_secret else None

    return JSONResponse(content={"message": "OK",
                                 "content": {"user_id": user.user_id, "user_name": user.user_name,
                                             "email": user.email, "stripe_cust_id": user.stripe_cust_id,
                                             "redacted_key": redacted_key, "views_cap": views_cap,
                                             "current_views": current_views, "plan_id": user.plan_id}})


@user_router.post("/update-secret")
async def update_secret(data: UpdateSecret, user_id: Annotated[str, Depends(get_user_jwt)]):
    with Session(ALCHEMY_ENGINE) as session:
        user = session.query(Users).filter_by(user_id=user_id).one()
        user.stripe_cust_secret = data.client_secret
        session.commit()
    return JSONResponse(content={"message": "OK",
                                 "content": {"redacted_key": f"xxxx-xxxx-xx{data.client_secret[-2:]}"}})


@user_router.post("/forgot-password")
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

        # Update the password reset token in the database
        session.query(Users).filter_by(email=email).update({'forgot_password': reset_token})
        session.commit()

        # Mailgun configuration
        key = '4978b1ef6df5b97264b6176be2aa16dc-2c441066-291227e7'
        sandbox = 'mg.pricepalette.tech'
        recipient = email  # Use the provided email for the recipient

        request_url = f'https://api.mailgun.net/v2/{sandbox}/messages'

        request = requests.post(request_url, auth=('api', key), data={
            'from': 'no-reply@pricepalette.tech',  # Replace with your sender email
            'to': recipient,
            'subject': 'Password Reset',
            'text': f'Hello,\n\nPlease click on the following link to reset your password: '
                    f'https://pricepalette.tech/reset-password?token={reset_token}',
        })

        # Check if the email was sent successfully
        if request.status_code != 200:
            return JSONResponse(status_code=500, content={"message": "error", "detail": "Failed to send email"})

    return JSONResponse(content={"message": "OK"})


@user_router.post("/reset-password")
async def reset_password(request_data: ResetPassword):
    email = request_data.email
    token = request_data.token
    newPassword = request_data.newPassword

    # Check if the email and token are valid
    with Session(ALCHEMY_ENGINE) as session:
        user = session.query(Users).filter_by(email=email, forgot_password=token).first()

    if not user:
        raise HTTPException

    # Hash the new password
    hashed_password, salt = create_hash_and_salt(newPassword)

    # Update the password reset token in the database
    session.query(Users).filter_by(email=email).update({'password': hashed_password, 'salt': salt})
    session.commit()

    return {"message": "Password reset successfully"}
