from sqlalchemy import create_engine
from pymongo.mongo_client import MongoClient

from backend.configuration import MONGODB_CREDS, MYSQL_CREDS, MYSQL_CXN_STRING

MONGO_CLIENT = MongoClient(**MONGODB_CREDS)
MONGO_CXN = MONGO_CLIENT["PricePalette"]

ALCHEMY_ENGINE = create_engine(MYSQL_CXN_STRING)
