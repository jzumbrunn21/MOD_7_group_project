from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired, NumberRange
from app.models import Service, categories


class ServiceForm(FlaskForm):

    service_title = StringField('title', validators=[DataRequired(), Length(min=6, max=50, message='Service Title must be between 1 and 50 characters')])
    service_description = StringField('description', validators=[DataRequired(), Length(min=1, max=255, message='Service Description must be between 1 and 255 characters')])
    service_price = IntegerField('price', validators=[DataRequired(), NumberRange(min=1, message='Service Price cannot be $0')])
    service_length_est = IntegerField('length_est', validators=[DataRequired(), NumberRange(min=1, message='Service Estimate is a minimum 1 hour')])
    service_category = SelectField('category', choices=categories) #double check
