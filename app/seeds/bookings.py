from app.models import db, Booking, Service, User, Service, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
import random
from datetime import datetime, timedelta
from random import choice


fake = Faker()


def seed_bookings():
    #Create date and time for booking 
    def date_time_past_or_future():
        now = datetime.now()
        random_seconds = random.randint(-315360000, 315360000)
        new_datetime = now + timedelta(seconds=random_seconds)
        return new_datetime

    services_num = db.session.query(Service).count()
    users_num = db.session.query(User).count()

    for _ in range(services_num):
        bookings_num = random.randint(1, 3)

        for _ in range(bookings_num):
            random_user_id = random.randint(1, users_num)
            random_service_id = random.randint(1, services_num)

            start_date_and_time = date_time_past_or_future()
            status = start_date_and_time > datetime.now()

            booking = Booking(
                user_id=random_user_id,
                service_id=random_service_id,
                start_date_and_time=start_date_and_time,
                status=status,
            )
            db.session.add(booking)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_bookings():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.bookings RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM bookings"))

    db.session.commit()
