import uuid
from datetime import datetime, timedelta

from fastapi import HTTPException, APIRouter
from jose import jwt
from starlette.responses import JSONResponse

from backend.auth_app.models import Register, Login
from backend.configuration import JWT_SECRET_KEY, JWT_ALGORITHM, JWT_ACCESS_TOKEN_EXPIRE_MINUTES

auth_router = APIRouter(
    prefix="/auth",
    tags=["login/register"],
)
# In-memory database (replace with a real database in a production environment)
db_users = []


def create_access_token(sub: str):
    expire = datetime.utcnow() + timedelta(minutes=JWT_ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode = {"exp": expire, "iat": datetime.utcnow(), "sub": sub}
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
    return encoded_jwt


@auth_router.post("/register")
async def register(user_info: Register):
    user_id = str(uuid.uuid4())
    username = user_info.username
    password = user_info.password
    orgname = user_info.org_name
    email = user_info.email

    if not username or not password or not orgname or not email:
        return JSONResponse(content={"message": "error", "detail": "Insufficient information"},
                            status_code=400)

    for user in db_users:
        if user.username == username:
            raise HTTPException(status_code=400, detail="Username already registered")
        elif user.email == email:
            raise HTTPException(status_code=400, detail="Email already registered")

    new_user = Register(username=username, password=password, org_name=orgname, email=email)
    db_users.append(new_user)

    access_token = create_access_token(sub=user_id)

    return JSONResponse(content={"message": "OK", "content": {"token": access_token}})


@auth_router.post("/login")
async def login(user_info: Login):
    user_id = str(uuid.uuid4())
    email = user_info.email
    password = user_info.password

    if not email or not password:
        return JSONResponse(status_code=422, content={"message": "error"})

    for user in db_users:
        if user.email == email and user.password == password:
            access_token = create_access_token(sub=user_id)
            return JSONResponse(content={"message": "OK", "content": {"token": access_token}})

    return JSONResponse(status_code=401, content={"message": "error"})


