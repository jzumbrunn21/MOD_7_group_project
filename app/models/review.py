from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import DateTime
from sqlalchemy.sql import func


class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('services.id')), nullable=False)
    review = db.Column(db.String(2000), nullable=False)
    star_rating = db.Column(db.Float(2, 1), nullable=False)
    review_image = db.Column(db.String(255), nullable=False)
    created_at = db.Column(DateTime, default=func.now())

    user = db.relationship(
        "User",
        back_populates='reviews'
    )

    services = db.relationship(
        "Service",
        back_populates='reviews'
    )
