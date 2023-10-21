from app.models import db, ServiceImage, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_service_images():
    service_image_1 = ServiceImage(
        service_id = 1,
        url = 'https://bookdirtbusters.com/wp-content/uploads/2019/04/cleaning-services-near-me-1.jpeg'
        )
    service_image_2 = ServiceImage(
        service_id = 2,
        url = 'https://bookdirtbusters.com/wp-content/uploads/2019/04/cleaning-services-near-me-1.jpeg'
        )
    service_image_3 = ServiceImage(
        service_id = 3,
        url = 'https://progressivecleaningcorp.com/wp-content/uploads/2023/06/Deep-Cleaners-In-Alexandria-VA-800x450.jpg'
        )

    db.session.add(service_image_1)
    db.session.add(service_image_2)
    db.session.add(service_image_3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_service_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.service_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM service_images"))

    db.session.commit()
