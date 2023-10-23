from app.models import db, Billing, Booking, User, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from random import choice
import random


fake = Faker()


def seed_billings():
    num_users = db.session.query(User).count()  # get number of users in db
    print("!!!Number of users!!!", num_users)
    num_bookings = db.session.query(Booking).count()  # get number of bookings in db

    for _ in range(1, num_users + 1):
        num_billings_per_user = random.randint(1, 5)  # Random number of billings per user

        for _ in range(num_billings_per_user):
            # Generate random user_id and booking_id based on existing records
            random_user_id = random.randint(1, num_users)
            random_booking_id = random.randint(1, num_bookings)

            random_cvv = str(random.randint(1, 999)).zfill(3)

            billing = Billing(
                user_id=random_user_id,
                booking_id=random_booking_id,
                card_full_name=fake.name(),
                card_number=fake.credit_card_number(card_type="mastercard"),
                card_cvv=random_cvv,
                card_zipcode=fake.zipcode(),
                card_exp_date=fake.date_this_decade(
                    after_today=True, before_today=False
                ),
            )
            db.session.add(billing)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_billings():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.billings RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM billings"))

    db.session.commit()
