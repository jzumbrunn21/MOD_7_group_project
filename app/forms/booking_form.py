from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField
from wtforms.validators import DataRequired
from app.models import Booking

class BookingForm(FlaskForm):
    start_date_and_time = DateTimeField('start_date_and_time', validators=[DataRequired()])
