from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, SubmitField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, NumberRange, Length
from app.models import Service, categories
from app.api.aws_helpers import ALLOWED_EXTENSIONS


class ServiceForm(FlaskForm):

    service_title = StringField('title', validators=[DataRequired(), Length(min=6, max=50, message='Service Title must be between 6 and 50 characters')])
    service_description = StringField('description', validators=[DataRequired(), Length(min=1, max=2000, message='Service Description must be between 1 and 255 characters')])
    service_price = IntegerField('price', validators=[DataRequired(), NumberRange(min=1, message='Service Price cannot be $0')])
    service_length_est = IntegerField('length_est', validators=[DataRequired(), NumberRange(min=1, message='Service Estimate is a minimum 1 hour')])
    service_category = SelectField('category', choices=[('Lawn Service', 'Lawn Service'),('Cleaning','Cleaning'), ('Moving','Moving')]) #double check
    url = FileField('url', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField('submit')
