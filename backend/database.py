import stripe
from sqlalchemy import create_engine
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

from backend.configuration import MONGODB_CXN_STRING, MYSQL_CXN_STRING, STRIPE_SECRET_KEY

MONGO_CLIENT = MongoClient(MONGODB_CXN_STRING, server_api=ServerApi('1'))
MONGO_CXN = MONGO_CLIENT["PricePalette"]

ALCHEMY_ENGINE = create_engine(MYSQL_CXN_STRING, pool_size=1)

stripe.api_version = '2022-08-01'
stripe.api_key = STRIPE_SECRET_KEY
