import os

JWT_SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
JWT_ALGORITHM = "HS256"
JWT_ACCESS_TOKEN_EXPIRE_MINUTES = 30

MONGODB_CREDS = {"host": os.environ["MONGODB_HOST"],
                 "port": int(os.environ["MONGODB_PORT"]),
                 "username": os.environ["MONGODB_USERNAME"],
                 "password": os.environ["MONGODB_PASSWORD"]}
