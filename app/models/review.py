from .db import db


class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'), nullable=False)
    review = db.Column(db.String(2000), nullable=False)
    star_rating = db.Column(db.Decimal(2, 1), nullable=False)
    review_image = db.Column(db.String(255), nullable=False)
    created_at = Column(DateTime, default=func.now())

    user = db.relationship(
        "User",
        back_populates='reviews'
    )

    service = db.relationship(
        "Service",
        back_populates='reviews'
    )
