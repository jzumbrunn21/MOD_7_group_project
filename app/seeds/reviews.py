from app.models import db, Review, User, Service, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker

fake = Faker()




reviewed_combinations = {}

def seed_reviews():
    num_users = db.session.query(User).count()
    num_services = db.session.query(Service).count()

    for _ in range(3):
        user_id = fake.random_int(min=1, max=num_users)
        service_id = fake.random_int(min=1, max=num_services)
        review = fake.paragraph(nb_sentences=3)
        star_rating = fake.random_int(min=1, max=5)
        review_image = fake.image_url()

        # Check if this user has already reviewed this service
        user_service_combo = (user_id, service_id)
        if user_service_combo in reviewed_combinations:
            continue  # Skip this iteration, user has already reviewed this service

        reviewed_combinations[user_service_combo] = True  # Mark this user-service combo as reviewed

        review = Review(
            user_id=user_id,
            service_id=service_id,
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
