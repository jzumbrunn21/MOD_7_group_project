from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField
from wtforms.validators import DataRequired, ValidationError
from app.models import Booking
from datetime import datetime

def time_date_check(field, form):
    today_and_now = datetime.now()

    if field.data > today_and_now:
        raise ValidationError('You must book for a date in the future')


class BookingForm(FlaskForm):
    start_date_and_time = StringField('start_date_and_time')
