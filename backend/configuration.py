import os
from dotenv import load_dotenv
load_dotenv("./.env")

JWT_SECRET_KEY = os.environ["JWT_SECRET_KEY"]
JWT_ALGORITHM = os.environ["JWT_ALGORITHM"]
JWT_ACCESS_TOKEN_EXPIRE_MINUTES = 30

MONGODB_CREDS = {"host": os.environ["MONGODB_HOST"],
                 "port": int(os.environ["MONGODB_PORT"]),
                 "username": os.environ["MONGODB_USERNAME"],
                 "password": os.environ["MONGODB_PASSWORD"]}
