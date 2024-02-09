from fastapi import FastAPI, HTTPException, Depends
from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordBearer
from backend.auth_app.models import User

#import very.jwt from dependency.py

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

#aadd Outh2 in dependency

app = FastAPI() #use this only in main.py


# In-memory database (replace with a real database in a production environment)
db_users = []

SECRET_KEY = "1A2B3C"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire, "iat": datetime.utcnow(), "sub": User.username})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


@app.post("/register")
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
    expires_delta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": username}, expires_delta=expires_delta)

    return {"message": "User registered successfully", "access_token": access_token}


@app.post("/login")
async def login(user_info: dict):
    email = user_info.get("email")
    password = user_info.get("password")

    if not email or not password:
        raise HTTPException(status_code=400, detail="email and password are required")

    for user in db_users:
        if user.email == email and user.password == password:
            expires_delta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
            access_token = create_access_token(data={"sub": email}, expires_delta=expires_delta)
            return {"message": "Login successful", "access_token": access_token, "token_type": "bearer"}

    raise HTTPException(status_code=401, detail="Invalid credentials")
