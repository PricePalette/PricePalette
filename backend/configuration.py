import os
from urllib.parse import quote_plus
from urllib.request import urlretrieve

from dotenv import load_dotenv


BLOB_SIGNATURE = "OXlACUbCYjEg31IFEB9zIVR%2FmsJCzxLKFIRWkxYFOuc%3D"

blob_url = ("https://pricepalettefiles.blob.core.windows.net/backend/.env?sp=r&st=2024-02-12T01:20:37Z"
            "&se=2024-05-01T08:20:37Z&spr=https&sv=2022-11-02&sr=b"
            f"&sig={os.environ['BLOB_SIGNATURE']}")

urlretrieved = urlretrieve(blob_url)
with open(urlretrieved[0], "r") as fp:
    load_dotenv(stream=fp)

JWT_SECRET_KEY = os.environ["JWT_SECRET_KEY"]
JWT_ALGORITHM = os.environ["JWT_ALGORITHM"]
JWT_ACCESS_TOKEN_EXPIRE_MINUTES = 24 * 60

MONGODB_CREDS = {"host": os.environ["MONGODB_HOST"],
                 "port": int(os.environ["MONGODB_PORT"]),
                 "username": os.environ["MONGODB_USERNAME"],
                 "password": os.environ["MONGODB_PASSWORD"]}

MYSQL_CREDS = {"host": os.environ["MYSQL_HOST"],
               "port": int(os.environ["MYSQL_PORT"]),
               "username": os.environ["MYSQL_USERNAME"],
               "password": quote_plus(os.environ["MYSQL_PASSWORD"])}

MONGODB_CXN_STRING = f"mongodb+srv://{MONGODB_CREDS['username']}:{MONGODB_CREDS['password']}@{MONGODB_CREDS['host']}" \
                     f"/?retryWrites=true&w=majority"
MYSQL_CXN_STRING = f"mysql+mysqldb://{MYSQL_CREDS['username']}:{MYSQL_CREDS['password']}@{MYSQL_CREDS['host']}" \
                   f"/pricepalettedb"
