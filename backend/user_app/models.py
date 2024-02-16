import uuid

from pydantic import BaseModel, EmailStr, UUID4


class Login(BaseModel):
    email: EmailStr
    password: str


class Register(Login):
    user_id: UUID4 = uuid.uuid4()
    username: str
    org_name: str
