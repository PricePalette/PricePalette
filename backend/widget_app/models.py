from pydantic import BaseModel, UUID4


class UserID(BaseModel):
    user_id: UUID4


class WidgetID(BaseModel):
    widget_id: UUID4


class WidgetMetadata(WidgetID):
    title: str
    description: str
    cards: str
