from pymongo.mongo_client import MongoClient

from backend.configuration import MONGODB_CREDS

MONGO_CLIENT = MongoClient(**MONGODB_CREDS)
MONGO_CXN = MONGO_CLIENT["PricePalette"]
