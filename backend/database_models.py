import datetime

from sqlalchemy import Column, ForeignKey
from sqlalchemy import String, Text, Boolean, Integer, BigInteger, DateTime
from sqlalchemy.orm import declarative_base

from backend.database import ALCHEMY_ENGINE

Base = declarative_base()


class Templates(Base):
    __tablename__ = 'Templates'

    template_id = Column(String(50), primary_key=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    img = Column(Text, nullable=False)
    usages = Column(BigInteger, nullable=False)
    active = Column(Boolean, default=True)
    created_date = Column(DateTime, default=datetime.datetime.utcnow())
    updated_date = Column(DateTime, nullable=True)


class Users(Base):
    __tablename__ = 'Users'

    user_id = Column(String(50), primary_key=True)
    email = Column(String(50), unique=True, nullable=False)
    user_name = Column(String(50), unique=True, nullable=False)
    organization_name = Column(String(50), nullable=False)
    password = Column(String(200), nullable=False)
    salt = Column(String(50), nullable=False)
    plan_id = Column(String(50), nullable=False)
    active = Column(Boolean, default=True)
    joined_date = Column(DateTime, default=datetime.datetime.utcnow())
    widgets_created = Column(Integer, default=0)
    forgot_password = Column(String(200), nullable=True)
    stripe_cust_id = Column(String(100), unique=True, nullable=True)


class Widgets(Base):
    __tablename__ = "Widgets"

    widget_id = Column(String(50), primary_key=True)
    user_id = Column(String(50), ForeignKey("Users.user_id"), nullable=False)
    from_template = Column(Boolean)
    template_id_used = Column(String(50), ForeignKey("Templates.template_id"), nullable=True)
    active = Column(Boolean, default=True)
    created_date = Column(DateTime, default=datetime.datetime.utcnow())
    updated_date = Column(DateTime, nullable=True)
    stripe_product_id = Column(String(100), unique=True, nullable=False)


class WidgetEmbed(Base):
    __tablename__ = "WidgetEmbed"

    embed_id = Column(String(50), primary_key=True)
    widget_id = Column(String(50), ForeignKey("Widgets.widget_id"), nullable=False)
    created_date = Column(DateTime, default=datetime.datetime.utcnow())
    views = Column(BigInteger, default=0)
    active = Column(Boolean, nullable=True)

    def __repr__(self):
        return f"WidgetEmbed(embed_id={self.embed_id!r}, widget_id={self.widget_id!r})"


class Subscriptions(Base):
    __tablename__ = "Subscriptions"

    subscription_id = Column(String(255), primary_key=True)
    user_id = Column(String(255), ForeignKey("Users.user_id"), nullable=False)
    created_date = Column(DateTime, default=datetime.datetime.utcnow())
    active = Column(Boolean, default=True)
    client_secret = Column(String(200), nullable=False)

    def __repr__(self):
        return f"Subscriptions(subscription_id={self.subscription_id!r}, user_id={self.user_id!r})"


def create_tables():
    Base.metadata.create_all(ALCHEMY_ENGINE)
