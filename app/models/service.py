from .db import db
from .categories import categories
from .user import User
from .service_image import ServiceImage


class Service(db.Model):
    __tablename__ = 'services'


    id = db.Column(db.Integer, primary_key=True)
    provider_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    service_title = db.Column(db.String(20), nullable=False)
    service_description = db.Column(db.String(2000), nullable=False)
    service_price = db.Column(db.Integer, nullable=False)
    service_length_est = db.Column(db.Integer, nullable=False)
    service_category = db.Column(db.Enum(*categories), nullable=False)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())


    provider_id = db.relationship(
        'User',
        back_populates='services'
    )

    service_images = db.relationship(
        'ServiceImage',
        back_populates='service'
    )
