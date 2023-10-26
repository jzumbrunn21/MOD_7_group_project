from .db import db, environment, SCHEMA, add_prefix_for_prod
# from .categories import CategoryEnum
from sqlalchemy import DateTime
from sqlalchemy.sql import func
# from .user import User
# from .service_image import ServiceImage



class Service(db.Model):
    __tablename__ = 'services'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    provider_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    service_title = db.Column(db.String(50), nullable=False)
    service_description = db.Column(db.String(2000), nullable=False)
    service_price = db.Column(db.Integer, nullable=False)
    service_length_est = db.Column(db.Integer, nullable=False)
    url = db.Column(db.String(255), nullable=False)
    service_category = db.Column(db.String(25), nullable=False)
    created_at = db.Column(DateTime, default=func.now())
    updated_at = db.Column(DateTime, default=func.now(), onupdate=func.now())


    user = db.relationship(
        'User',
        back_populates='services'
    )



    reviews = db.relationship(
        'Review',
        back_populates='services',
        cascade="all, delete, delete-orphan"
    )

    bookings = db.relationship(
        'Booking',
        back_populates='services',
        cascade="all, delete, delete-orphan"
    )


    def to_dict(self):
        return {
            'id': self.id,
            'provider_id': self.provider_id,
            'service_title': self.service_title,
            'service_description': self.service_description,
            'service_price': self.service_price,
            'service_length_est': self.service_length_est,
            'service_category': self.service_category,
            "url": self.url,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
