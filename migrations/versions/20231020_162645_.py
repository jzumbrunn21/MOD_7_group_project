"""empty message

Revision ID: 0ba8f7ec4d5b
Revises: ffdc0a98111c
Create Date: 2023-10-20 16:26:45.885837

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '0ba8f7ec4d5b'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('services',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('service_title', sa.String(length=50), nullable=False),
    sa.Column('service_description', sa.String(length=2000), nullable=False),
    sa.Column('service_price', sa.Integer(), nullable=False),
    sa.Column('service_length_est', sa.Integer(), nullable=False),
    sa.Column('service_category', sa.Enum('Cleaning', 'Lawn Service', name='category'), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('bookings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('service_id', sa.Integer(), nullable=False),
    sa.Column('start_date_and_time', sa.DateTime(), nullable=False),
    sa.Column('status', sa.Boolean(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['service_id'], ['services.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('service_id', sa.Integer(), nullable=False),
    sa.Column('review', sa.String(length=2000), nullable=False),
    sa.Column('star_rating', sa.Float(precision=2, asdecimal=1), nullable=False),
    sa.Column('review_image', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['service_id'], ['services.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('billings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('booking_id', sa.Integer(), nullable=False),
    sa.Column('card_full_name', sa.String(length=100), nullable=False),
    sa.Column('card_number', sa.String(), nullable=False),
    sa.Column('card_cvv', sa.String(), nullable=False),
    sa.Column('card_zipcode', sa.String(), nullable=False),
    sa.Column('card_exp_date', sa.Date(), nullable=False),
    sa.Column('purchase_date_and_time', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['booking_id'], ['bookings.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('users', sa.Column('first_name', sa.String(length=50), nullable=False))
    op.add_column('users', sa.Column('last_name', sa.String(length=50), nullable=False))
    op.add_column('users', sa.Column('address', sa.String(length=255), nullable=False))
    op.add_column('users', sa.Column('profile_picture', sa.String(length=255), nullable=False))
    op.add_column('users', sa.Column('created_at', sa.DateTime(), nullable=True))
    op.add_column('users', sa.Column('updated_at', sa.DateTime(), nullable=True))

    if environment == "production":
        op.execute(f"ALTER TABLE services SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE bookings SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE billings SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE reviews SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###qqqqqqqqq
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'updated_at')
    op.drop_column('users', 'created_at')
    op.drop_column('users', 'profile_picture')
    op.drop_column('users', 'address')
    op.drop_column('users', 'last_name')
    op.drop_column('users', 'first_name')
    op.drop_table('billings')
    op.drop_table('reviews')
    op.drop_table('bookings')
    op.drop_table('services')
    # ### end Alembic commands ###
