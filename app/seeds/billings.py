from app.models import db, Billing, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from random import choice


fake = Faker()




def seed_billings():
    billing1 = Billing(
        user_id = 1,
        booking_id = 1,
        card_full_name = fake.name(),
        card_number = fake.credit_card_number(card_type="mastercard"),
        card_cvv = 111,
        card_zipcode = fake.zipcode(),
        card_exp_date=fake.date_this_decade(after_today=True, before_today=False)
    )
    billing2 = Billing(
        user_id = 2,
        booking_id = 2,
        card_full_name = fake.name(),
        card_number = fake.credit_card_number(card_type="mastercard"),
        card_cvv = 222,
        card_zipcode = fake.zipcode(),
        card_exp_date=fake.date_this_decade(after_today=True, before_today=False)

    )
    billing3 = Billing(
        user_id = 3,
        booking_id = 3,
        card_full_name = fake.name(),
        card_number = fake.credit_card_number(card_type="mastercard"),
        card_cvv = 333,
        card_zipcode = fake.zipcode(),
        card_exp_date=fake.date_this_decade(after_today=True, before_today=False)

    )


    db.session.add(billing1)
    db.session.add(billing2)
    db.session.add(billing3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_billings():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.billings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM billings"))

    db.session.commit()
