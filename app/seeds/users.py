from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
import random

fake = Faker()

placeholder_images = [
    "https://picsum.photos/id/1/200/200",
    "https://picsum.photos/id/2/200/200",
    "https://picsum.photos/id/3/200/200",
    "https://picsum.photos/id/4/200/200",
    "https://picsum.photos/id/5/200/200",
    "https://picsum.photos/id/6/200/200",
    "https://picsum.photos/id/7/200/200",
    "https://picsum.photos/id/8/200/200",
    "https://picsum.photos/id/9/200/200",
    "https://picsum.photos/id/10/200/200",
    "https://picsum.photos/id/11/200/200",
    "https://picsum.photos/id/12/200/200",
    "https://picsum.photos/id/13/200/200",
    "https://picsum.photos/id/14/200/200",
    "https://picsum.photos/id/15/200/200",
    "https://picsum.photos/id/16/200/200",
    "https://picsum.photos/id/17/200/200",
    "https://picsum.photos/id/18/200/200",
    "https://picsum.photos/id/19/200/200",
    "https://picsum.photos/id/20/200/200",
]

def seed_users():
    for _ in range(20):
        user = User(
            username=fake.user_name(),
            email=fake.email(),
            password='password',  # Storing plain text passwords
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            address=fake.street_address(),
            profile_picture=random.choice(placeholder_images),
        )
        db.session.add(user)

    # Create a demo user with a known password
    demo = User(
        username="Demo",
        email="demo@aa.io",
        password='password',  # Storing plain text password
        first_name="Demo",
        last_name="User",
        address="1234 Demo Ave",
        profile_picture="https://www.shareicon.net/data/128x128/2016/11/04/850652_people_512x512.png",
    )
    db.session.add(demo)

    db.session.commit()
    # demo = User(
    #     username='Demo', email='demo@aa.io', password='password',
    #     first_name='Demo',
    #     last_name='User',
    #     address='1234 Demo Ave',
    #     profile_picture='https://i.pinimg.com/564x/a8/57/00/a85700f3c614f6313750b9d8196c08f5.jpg')
    # marnie = User(
    #     username='marnie',
    #     email='marnie@aa.io',
    #     password='password',
    #     first_name='Marnie',
    #     last_name='White',
    #     address='1234 West Ave',
    #     profile_picture='https://i.pinimg.com/564x/a8/57/00/a85700f3c614f6313750b9d8196c08f5.jpg')
    # bobbie = User(
    #     username='bobbie',
    #     email='bobbie@aa.io',
    #     password='password',
    #     first_name='Bob',
    #     last_name='Green',
    #     address='4321 North Ave',
    #     profile_picture='https://i.pinimg.com/564x/a8/57/00/a85700f3c614f6313750b9d8196c08f5.jpg')

    # db.session.add(demo)
    # db.session.add(marnie)
    # db.session.add(bobbie)



# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
