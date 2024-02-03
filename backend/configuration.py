import os

MONGODB_CREDS = {"host": os.environ["MONGODB_HOST"],
                 "port": int(os.environ["MONGODB_PORT"]),
                 "username": os.environ["MONGODB_USERNAME"],
                 "password": os.environ["MONGODB_PASSWORD"]}
