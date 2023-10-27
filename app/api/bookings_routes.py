from flask import Blueprint, jsonify, request, redirect
from app.models import db, Booking
# Forms need importing
from app.forms import BookingForm
from datetime import datetime

bookings_routes = Blueprint("bookings", __name__)

# Could the below be used for error messages?

# def validation_errors_to_error_messages(validation_errors):
#     """
#     Simple function that turns the WTForms validation errors into a simple list
#     """
#     errorMessages = []
#     for field in validation_errors:
#         for error in validation_errors[field]:
#             errorMessages.append(f'{field} : {error}')
#     return errorMessages

# Full CRUD: Create, Read, Read One, Update, Delete

# Returns all the bookings
@bookings_routes.route('/')
def all_bookings():
    response = [booking.to_dict() for booking in Booking.query.all()]
    # return {"services": response}
    # response = Service.query.all()
    return {"bookings": response}

# Creates one booking
@bookings_routes.route('/new', methods=["POST"])
def create_booking():
    data = request.get_json()
    user_id = data.get('user_id')
    service_id = data.get('service_id')
    start_date_and_time = data.get('start_date_and_time')
    status = data.get('status')

    # Make sure start_date_and_time is in datetime format
    start_date_and_time = datetime.strptime(start_date_and_time, '%Y-%m-%dT%H:%M')

    # Check if the booking date is in the future
    if start_date_and_time <= datetime.now():
        return "Booking date must be in the future"

    booking = Booking(
        user_id=user_id,
        service_id=service_id,
        start_date_and_time=start_date_and_time,
        status=status
    )

    db.session.add(booking)
    db.session.commit()

    print("Newly created booking:", booking.to_dict())

    return booking.to_dict()


# Updates one booking
@bookings_routes.route('/update/<int:id>', methods=["PUT"])
def update_booking(id):
    form = BookingForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        booking_to_update = Booking.query.get(id)
        validDateFormat = datetime.strptime(form.data['start_date_and_time'], '%Y-%m-%dT%H:%M')

        booking_to_update.start_date_and_time = validDateFormat
        db.session.commit()

        return booking_to_update.to_dict(), 201
    else:
        return {"Errors": form.errors}
    
    

# Delete one booking
@bookings_routes.route('/<int:id>', methods=["DELETE"])
def delete_booking(id):
    deleted_booking = Booking.query.get(id)
    if deleted_booking:
        db.session.delete(deleted_booking)
        db.session.commit()
        return "Booking deleted successfully"
    else:
        return {"message": "Booking not found"}, 404
