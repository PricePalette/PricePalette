from uuid import UUID, uuid4

from pydantic import BaseModel, EmailStr, Field


class Login(BaseModel):
    email: EmailStr
    password: str


class Register(Login):
    user_id: UUID = Field(default_factory=uuid4)
    username: str
    org_name: str

class ForgotPassword(BaseModel):
    email: EmailStr


class ResetPassword(ForgotPassword):
    token: str
    newPassword: str
