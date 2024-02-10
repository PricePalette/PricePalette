from fastapi import FastAPI, HTTPException, Depends, APIRouter
from jose import JWTError, jwt
from datetime import datetime, timedelta
from backend.auth_app.models import User
from backend.configuration import JWT_SECRET_KEY, JWT_ALGORITHM, JWT_ACCESS_TOKEN_EXPIRE_MINUTES

auth_router = APIRouter(
    prefix="/auth",
    tags=["authorization for login/register"],
    # dependencies=[Depends(verify_jwt)]
)
# In-memory database (replace with a real database in a production environment)
db_users = []


def create_access_token(sub: str, expires_delta: timedelta):
    expire = datetime.utcnow() + expires_delta
    to_encode = {"exp": expire, "iat": datetime.utcnow(), "sub": sub}
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
    return encoded_jwt


@auth_router.post("/register")
async def register(user_info: User):
    username = user_info.username
    password = user_info.password
    orgname = user_info.orgname
    email = user_info.email

    if not username or not password:
        raise HTTPException(status_code=400, detail="Username and password are required")
    elif not orgname:
        raise HTTPException(status_code=400, detail="orgname is required")
    elif not email:
        raise HTTPException(status_code=400, detail="email is required")

    for user in db_users:
        if user.username == username:
            raise HTTPException(status_code=400, detail="Username already registered")
        elif user.email == email:
            raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(username=username, password=password, orgname=orgname, email=email)
    db_users.append(new_user)

    # Simulate successful login for the registered user
    expires_delta = timedelta(minutes=JWT_ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(sub = username, expires_delta=expires_delta)

    return {"message": "User registered successfully", "access_token": access_token}


@auth_router.post("/login")
async def login(user_info: dict):
    email = user_info.get("email")
    password = user_info.get("password")

    if not email or not password:
        raise HTTPException(status_code=400, detail="email and password are required")

    for user in db_users:
        if user.email == email and user.password == password:
            expires_delta = timedelta(minutes=JWT_ACCESS_TOKEN_EXPIRE_MINUTES)
            access_token = create_access_token(sub = email, expires_delta=expires_delta)
            return {"message": "Login successful", "access_token": access_token, "token_type": "bearer"}

    raise HTTPException(status_code=401, detail="Invalid credentials")
