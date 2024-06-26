from datetime import datetime
from enum import Enum
from typing import List, Union
from uuid import UUID, uuid4

from pydantic import BaseModel, Field


class UserID(BaseModel):
    user_id: UUID


class WidgetID(BaseModel):
    widgetId: UUID


class PriceDurationEnum(str, Enum):
    monthly = 'M'
    yearly = 'Y'


class CurrencyEnum(str, Enum):
    cnd = 'CAD'
    usd = 'USD'


class FontSizeEnum(str, Enum):
    s = 'S'
    m = 'M'
    l = 'L'


class CardPrice(BaseModel):
    duration: PriceDurationEnum
    currency: CurrencyEnum


class Font(BaseModel):
    size: FontSizeEnum
    family: str
    color: str


class CardFeature(BaseModel):
    text: str
    hint: Union[str, None] = None


class Card(BaseModel):
    id: str
    title: str
    description: str
    img: Union[str, None] = None
    features: List[CardFeature] = Field(min_length=1)
    amount: Union[int, float]
    buttonText: str
    priceCaption: str
    stripe_price_id: Union[str, None] = None


class WidgetMetadata(BaseModel):
    title: str
    price: CardPrice
    cards: List[Card] = Field(min_length=1)
    description: str
    themeColor: str
    font: Font


class CreateWidget(WidgetMetadata):
    widgetId: UUID = Field(default_factory=uuid4)
    templateIdUsed: str
    createdDate: datetime = datetime.utcnow()


class UpdateWidget(WidgetID, WidgetMetadata):
    stripe_product_id: str
