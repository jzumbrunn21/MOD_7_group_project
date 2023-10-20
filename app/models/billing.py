from .db import db
from sqlalchemy import DateTime, CheckConstraint
from .booking import Booking
from .service import Service


class Billing(db.Model):
    __tablename__ = 'billings'


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    booking_id = db.Column(db.Integer, db.ForeignKey('bookings.id'), nullable=False)
    card_full_name = db.Column(db.String(100), nullable=False)
    card_number = db.Column(db.Integer, CheckConstraint('cardNumber >= 1000000000000000 AND cardNumber <= 9999999999999999'), nullable=false)
    card_cvv = db.Column(db.Integer, nullable=False)
    card_zipcode = db.Column(db.Integer, nullable=False)
    card_exp_date = db.Column(db.Date, nullable=False)
    purchase_date_and_time = db.Column(DateTime, default=func.now())


    user = db.relationship(
        "User",
        back_populates='billings'
    )

    booking = db.relationship(
        "Booking",
        back_populates='bookings'
    )
