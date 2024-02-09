import uuid
from enum import Enum
from typing import List

from pydantic import BaseModel, Field
from pydantic.types import UUID4


class UserID(BaseModel):
    user_id: UUID4


class WidgetID(BaseModel):
    widget_id: UUID4


class PriceDurationEnum(str, Enum):
    monthly = 'M'
    yearly = 'Y'


class CurrencyEnum(str, Enum):
    cnd = 'CND'
    usd = 'USD'


class CardPrice(BaseModel):
    duration: PriceDurationEnum
    currency: CurrencyEnum


class Font(BaseModel):
    size: int
    family: str
    color: str


class Card(BaseModel):
    title: str
    desc: str
    img: str
    features: List[dict] = Field(min_length=1)
    amount: int
    buttonText: str
    priceCaption: str


class WidgetMetadata(BaseModel):
    title: str
    price: CardPrice
    cards: List[Card] = Field(min_length=1)
    description: str
    themeColor: str
    font: Font


class CreateWidget(WidgetMetadata):
    widget_id: UUID4 = uuid.uuid4()


class UpdateWidget(WidgetID, WidgetMetadata):
    pass
