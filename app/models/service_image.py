from .db import db, environment, SCHEMA, add_prefix_for_prod
# from .service import Service
from sqlalchemy import DateTime
from sqlalchemy.sql import func


class ServiceImage(db.Model):
    __tablename__='service_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    service_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('services.id')), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    created_at = db.Column(DateTime, default=func.now())
    updated_at = db.Column(DateTime, default=func.now(), onupdate=func.now())


    services = db.relationship(
        'Service',
        back_populates='service_images'
    )


    def to_dict(self):
        return {
            'id': self.id,
            'service_id': self.service_id,
            'url': self.url,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
