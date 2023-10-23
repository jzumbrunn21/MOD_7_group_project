from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), Length(min=6, max=40, message='Username must be between 6 and 40 characters'), username_exists])
    email = StringField('email', validators=[DataRequired(), Length(min=6, max=255, message='Email must be between 6 and 255 characters'), user_exists])
    password = StringField('password', validators=[DataRequired(), Length(min=6, max=255, message='Password must be between 6 and 255 characters')])
    first_name = StringField('first_name', validators=[DataRequired(), Length(min=1, max=50, message='First Name must be between 1 and 50 characters')])
    last_name = StringField('last_name', validators=[DataRequired(), Length(min=1, max=50, message='Last Name must be between 1 and 50 characters')])
    address = StringField('address', validators=[DataRequired(), Length(min=6, max=255, message='Address must be between 6 and 255 characters')])
    profile_picture = StringField('profile_picture', validators=[DataRequired(), Length(min=1, max=255, message='Profile Image URL must be between 1 and 255 characters')])
