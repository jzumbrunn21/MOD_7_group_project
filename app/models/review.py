from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import DateTime
from sqlalchemy.sql import func


class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    service_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('services.id')))
    review = db.Column(db.String(2000), nullable=False)
    star_rating = db.Column(db.Float(2, 1), nullable=False)
    review_image = db.Column(db.String(255))
    created_at = db.Column(DateTime, default=func.now())

    user = db.relationship(
        "User",
        back_populates='reviews'
    )

    services = db.relationship(
        "Service",
        back_populates='reviews'
    )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'service_id': self.service_id,
            'review': self.review,
            'star_rating': self.star_rating,
            'review_image': self.review_image,
            'created_at': self.created_at,
            'user': {
                'id': self.user.id,
                'username': self.user.username,
                'profile_picture': self.user.profile_picture
            }
        }
