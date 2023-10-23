from flask.cli import AppGroup
from .users import seed_users, undo_users
from .services import seed_services, undo_services
from .service_images import seed_service_images, undo_service_images
from .bookings import seed_bookings, undo_bookings
from .reviews import seed_reviews, undo_reviews
from .billings import seed_billings, undo_billings

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_services()
        undo_service_images()
        undo_bookings()
        undo_reviews()
        undo_billings()
    seed_users()
    seed_services()
    seed_service_images()
    seed_bookings()
    seed_reviews()
    seed_billings()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_services()
    undo_service_images()
    undo_bookings()
    undo_reviews()
    undo_billings()
    # Add other undo functions here
