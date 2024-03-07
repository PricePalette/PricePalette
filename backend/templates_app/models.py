from enum import Enum
from datetime import datetime
from uuid import uuid4, UUID

from pydantic import BaseModel, Field

from backend.widget_app.models import WidgetMetadata


class CreateTemplate(WidgetMetadata):
    pswd: str
    widgetId: UUID = Field(default_factory=uuid4)
    createdDate: datetime = datetime.utcnow()
    img: str = "https://th.bing.com/th/id/OIP.80t3mcAlGk3Lr2Ld2zZSOgHaEm?rs=1&pid=ImgDetMain"
