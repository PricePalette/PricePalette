import os
from urllib.parse import quote_plus

from dotenv import load_dotenv
from azure.storage.blob import BlobServiceClient

blob_service_client = BlobServiceClient.from_connection_string(os.environ['AZURE_STORAGE_CONNECTION_STRING'])
container_client = blob_service_client.get_container_client(container="backend")

with open("./tmp.txt", "w") as fp:
    fp.write(container_client.download_blob("env").readall().decode())

with open("./tmp.txt", "r") as fp:
    load_dotenv(stream=fp)

container_client.close()
blob_service_client.close()
os.remove("./tmp.txt")

PRICEPALETTE_PLANS = {"price_1Ov0bVCjcrhrZTSatO9LbWyF": 5000,
                      "price_1Ov0bVCjcrhrZTSarKzaXfdL": 15000,
                      "price_1Ov0bVCjcrhrZTSaNA5k670V": 30000,
                      "631e263e-d9ae-40cc-ac21-91d71fe7c9fd": 50}

MG_KEY = os.environ["MG_KEY"]
MG_SANDBOX = os.environ["MG_SANDBOX"]

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
