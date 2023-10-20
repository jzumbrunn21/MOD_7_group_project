from .db import db
from .billing import Billing
from .service import Service

class Booking(db.Model):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'), nullable=False)
    start_date_and_time = db.Column(DateTime, nullable=False)
    status = db.Column(db.Boolean)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())


    billing = db.relationship(
        'Billing',
        uselist=False,
        back_populates='booking'
    )

    service = db.relationship(
        'Service',
        back_populates='bookings'
    )
