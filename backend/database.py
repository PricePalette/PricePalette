from sqlalchemy import create_engine
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

from backend.configuration import MONGODB_CXN_STRING, MYSQL_CXN_STRING

MONGO_CLIENT = MongoClient(MONGODB_CXN_STRING, server_api=ServerApi('1'))
MONGO_CXN = MONGO_CLIENT["PricePalette"]

ALCHEMY_ENGINE = create_engine(MYSQL_CXN_STRING)
