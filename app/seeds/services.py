from app.models import db, Service,User, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
import random
from app.models.categories import categories
from datetime import datetime, timedelta

fake = Faker()


def seed_services():
    services_num = db.session.query(Service).count()
    users_num = db.session.query(User).count()

    for _ in range(users_num):
        provider_id = random.randint(1, users_num)

        service = Service(
            provider_id=provider_id,
            service_title=fake.sentence(nb_words=3),
            service_description=fake.paragraph(nb_sentences=3),
            service_price=random.randint(10, 200),
            service_length_est=random.randint(1, 10),
            service_category=random.choice(categories)
        )

        db.session.add(service)

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
