from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired, Length, NumberRange
from app.models import Review


class ReviewForm(FlaskForm):
    service_id = IntegerField('service_id',validators=[DataRequired()]),
    review = StringField('review', validators=[DataRequired(), Length(min=25, max=2000, message='Review must be between 25 and 2000 characters')])
    star_rating = IntegerField('review_rating', validators=[DataRequired(), NumberRange(min=1, max=5, message='Services can only be rated 1-5 stars')])
    review_image = StringField('review_image', validators=[DataRequired(), Length(min=1, max=255, message='Review Image URL must be between 1 and 255 characters' )])
