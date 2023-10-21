from app.models import db, Booking, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from random import choice


fake = Faker()




def seed_bookings():
    booking1 = Booking(
        user_id = 1,
        service_id = 1,
        start_date_and_time = fake.date_time_this_decade(),
        status = choice([True, False])
    )
    booking2 = Booking(
        user_id = 2,
        service_id = 2,
        start_date_and_time = fake.date_time_this_decade(),
        status = choice([True, False])
    )
    booking3 = Booking(
        user_id = 3,
        service_id = 3,
        start_date_and_time = fake.date_time_this_decade(),
        status = choice([True, False])
    )


    db.session.add(booking1)
    db.session.add(booking2)
    db.session.add(booking3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_bookings():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bookings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM bookings"))

    db.session.commit()
