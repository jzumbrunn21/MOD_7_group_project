from flask import Blueprint, jsonify, request, redirect
from app.models import db, Booking
# Forms need importing
from app.forms import BookingForm

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
    form = BookingForm()
    # imageForm = ImageForm()
    # !!! Shoud we create the images here too? !!!
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        booking = Booking(
            user_id=form.data['user_id'],
            service_id=form.data['service_id'],
            start_date_and_time=form.data['start_data_and_time'],
            status=form.data['status']
        )
        db.session.add(booking)
        db.session.commit()
        return booking.to_dict()
    else:
        return "Creation error!!!" #Placeholder


# Updates one booking
@bookings_routes.route('/update/<int:id>', methods=["PUT"])
def update_booking(id):
    form = BookingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        booking_to_update = Booking.query.get(id)
        booking_to_update.user_id=form.data['user_id'],
        booking_to_update.service_id=form.data['service_id'],
        booking_to_update.start_date_and_time=form.data['start_date_and_time'],
        booking_to_update.status=form.data['status'],
        # !!! Do we include created_at, updated_at?
        # db.session.add(service)
        # db.session.update() ???
        db.session.commit()
        return booking_to_update.to_dict()
    # !!! Should this go to all bookings?
    # Should redirection only happen in frontend?
    # return redirect('/bookings')

# Delete one booking
@bookings_routes.route('/delete/<int:id>', methods=["DELETE"])
def delete_booking(id):
    deleted_booking = Booking.query.get(id)
    # !!! Do we need to delete anything else?
    db.session.delete(deleted_booking)
    db.session.commit()
    return {"message": "Booking deleted"}
