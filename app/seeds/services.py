from app.models import db, Service, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_services():
    service1 = Service(
        provider_id = 1,
        service_title = "Best Cleaning",
        service_description = "Nice and cool cleaning",
        service_price = 60,
        service_length_est = 3,
        service_category = 'Cleaning',)
    service2 = Service(
        provider_id = 2,
        service_title = "Best Lawn Service",
        service_description = "Nice and cool Lawn Service",
        service_price = 70,
        service_length_est = 3,
        service_category = 'Lawn Service',)
    service3 = Service(
        provider_id = 3,
        service_title = "Worst Cleaning",
        service_description = "Really bad cleaning",
        service_price = 30,
        service_length_est = 3,
        service_category = 'Cleaning',)

    db.session.add(service1)
    db.session.add(service2)
    db.session.add(service3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_services():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.services RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM services"))
        
    db.session.commit()
