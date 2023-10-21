from .db import db, environment, SCHEMA, add_prefix_for_prod
from .categories import categories
from sqlalchemy import DateTime
from sqlalchemy.sql import func
# from .user import User
# from .service_image import ServiceImage


class Service(db.Model):
    __tablename__ = 'services'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    provider_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    service_title = db.Column(db.String(20), nullable=False)
    service_description = db.Column(db.String(2000), nullable=False)
    service_price = db.Column(db.Integer, nullable=False)
    service_length_est = db.Column(db.Integer, nullable=False)
    service_category = db.Column(db.Enum(*categories), nullable=False)
    created_at = db.Column(DateTime, default=func.now())
    updated_at = db.Column(DateTime, default=func.now(), onupdate=func.now())


    user = db.relationship(
        'User',
        back_populates='services'
    )

    service_images = db.relationship(
        'ServiceImage',
        back_populates='services'
    )

    reviews = db.relationship(
        'Review',
        back_populates='services'
    )

    bookings = db.relationship(
        'Booking',
        back_populates='services'
    )
