from app.models import db, Review, User, Service, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from random import randint

fake = Faker()

def seed_reviews():
    num_users = db.session.query(User).count()
    services = Service.query.all()

    for service in services:
        num_reviews = randint(2, 5) 

        for _ in range(num_reviews):
            user_id = randint(1, num_users)
            review = fake.paragraph(nb_sentences=3)
            star_rating = randint(1, 5)
            review_image = fake.image_url()

            # Check if this user has already reviewed this service
            existing_review = Review.query.filter_by(user_id=user_id, service_id=service.id).first()

            if not existing_review:
                review = Review(
                    user_id=user_id,
                    service_id=service.id,
                    review=review,
                    star_rating=star_rating,
                    review_image=review_image
                )

                db.session.add(review)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
