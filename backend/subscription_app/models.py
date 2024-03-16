from pydantic import BaseModel


class CreateSubscribe(BaseModel):
    stripe_cust_id: str
    price_id: str
