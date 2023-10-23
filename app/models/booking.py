from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import DateTime
from sqlalchemy.sql import func
# from .billing import Billing
# from .service import Service

class Booking(db.Model):
    __tablename__ = 'bookings'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('services.id')), nullable=False)
    start_date_and_time = db.Column(DateTime, nullable=False)
    status = db.Column(db.Boolean)
    created_at = db.Column(DateTime, default=func.now())
    updated_at = db.Column(DateTime, default=func.now(), onupdate=func.now())


    billing = db.relationship(
        'Billing',
        uselist=False,
        back_populates='booking',
        # cascade="all, delete-orphan"
    )

    services = db.relationship(
        'Service',
        back_populates='bookings'
    )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'service_id': self.service_id,
            'start_date_and_time': self.start_date_and_time,
            'status': self.status,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
