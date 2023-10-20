from .db import db
from .service import Service


class ServiceImage(db.Model):
    __tablename__='service_images'

    id = db.Column(db.Integer, primary_key=True)
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())


    service = db.relationship(
        'Service',
        back_populates='service_images'
    )
