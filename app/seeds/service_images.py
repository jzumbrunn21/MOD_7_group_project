# from app.models import db, ServiceImage, Service, environment, SCHEMA
# from sqlalchemy.sql import text
# from faker import Faker

# fake = Faker()

# def seed_service_images():
#     services = Service.query.all()

#     for service in services:
#         num_images = fake.random_int(min=1, max=5)

#         for _ in range(num_images):
#             service_image = ServiceImage(
#                 service_id=service.id,
#                 url=fake.image_url()
#             )
#             db.session.add(service_image)

#     db.session.commit()


# # Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# # have a built in function to do this. With postgres in production TRUNCATE
# # removes all the data from the table, and RESET IDENTITY resets the auto
# # incrementing primary key, CASCADE deletes any dependent entities.  With
# # sqlite3 in development you need to instead use DELETE to remove all data and
# # it will reset the primary keys for you as well.
# def undo_service_images():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.service_images RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM service_images"))

#     db.session.commit()
