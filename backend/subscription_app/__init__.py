from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from backend.database import ALCHEMY_ENGINE, stripe, MONGO_CXN
from backend.database_models import Subscriptions
from backend.dependency import get_user_jwt
from backend.subscription_app.models import CreateSubscribe

widget_collection = MONGO_CXN["widgets"]
sub_router = APIRouter(
    prefix="/subscribe",
    tags=["subscribe"]
)


@sub_router.post("/create")
async def create_subscription(data: CreateSubscribe, user_id: Annotated[str, Depends(get_user_jwt)]):
    try:
        subscription = stripe.Subscription.create(
            customer=data.stripe_cust_id,
            items=[{
                'price': data.price_id,
            }],
            payment_behavior='default_incomplete',
            expand=['latest_invoice.payment_intent'],
        )
    except stripe.error.StripeError:
        raise HTTPException(status_code=500, detail="Stripe payment failure")

    with Session(ALCHEMY_ENGINE) as session:
        subscribe = Subscriptions(subscription_id=subscription.id, user_id=user_id,
                                  client_secret=subscription.latest_invoice.
                                  payment_intent.client_secret)
        session.add(subscribe)
        session.commit()

    return JSONResponse(content={"message": "OK", "content": {"subscription_id": subscription.id,
                                                              "client_secret": subscription.latest_invoice.
                        payment_intent.client_secret}})
