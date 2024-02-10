import uuid
from enum import Enum
from typing import List, Optional

from pydantic import BaseModel, Field
from pydantic.types import UUID4


class UserID(BaseModel):
    user_id: UUID4


class WidgetID(BaseModel):
    widgetId: UUID4


class PriceDurationEnum(str, Enum):
    monthly = 'M'
    yearly = 'Y'


class CurrencyEnum(str, Enum):
    cnd = 'CND'
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
    hint: str = None


class Card(BaseModel):
    title: str
    description: str
    img: str
    features: List[CardFeature] = Field(min_length=1)
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
    widgetId: UUID4 = uuid.uuid4()
    template_id_used: str = None


class UpdateWidget(WidgetID, WidgetMetadata):
    updatedFields: List[str]
