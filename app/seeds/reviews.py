from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker

fake = Faker()




# Adds a demo user, you can add other users here if you want
def seed_reviews():
    review1 = Review(
        user_id = 1,
        service_id = 1,
        review = fake.paragraph(nb_sentences=3),
        star_rating=fake.random_int(min=1, max=5),
        review_image=fake.image_url()
        )
    review2 = Review(
        user_id = 2,
        service_id = 2,
        review = fake.paragraph(nb_sentences=3),
        star_rating=fake.random_int(min=1, max=5),
        review_image=fake.image_url()
        )
    review3 = Review(
        user_id = 3,
        service_id = 3,
        review = fake.paragraph(nb_sentences=3),
        star_rating=fake.random_int(min=1, max=5),
        review_image=fake.image_url()
        )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
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
