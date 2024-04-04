import os
from urllib.parse import quote_plus
from urllib.request import urlretrieve

from dotenv import load_dotenv

blob_url = ("https://pricepalettefiles.blob.core.windows.net/backend/env?sp=r&st=2024-03-09T23:49:49Z"
            f"&se=2024-07-01T05:49:49Z&sv=2022-11-02&sr=b&sig={os.environ['BLOB_SIGNATURE']}")

urlretrieved = urlretrieve(blob_url)
with open(urlretrieved[0], "r") as fp:
    load_dotenv(stream=fp)

PRICEPALETTE_PLANS = {"price_1Ov0bVCjcrhrZTSatO9LbWyF": 5000,
                      "price_1Ov0bVCjcrhrZTSarKzaXfdL": 15000,
                      "price_1Ov0bVCjcrhrZTSaNA5k670V": 30000,
                      "631e263e-d9ae-40cc-ac21-91d71fe7c9fd": 50}

MG_KEY = '4978b1ef6df5b97264b6176be2aa16dc-2c441066-291227e7'
MG_SANDBOX = 'mg.pricepalette.tech'

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

STRIPE_SECRET_KEY = os.environ["STRIPE_SECRET_KEY"]
