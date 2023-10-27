from flask import Blueprint, jsonify, request, redirect
from app.models import db, Booking, Billing
# Forms need importing
from app.forms import BookingForm, BillingForm
from datetime import datetime
from flask_login import current_user

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
    # form = BillingForm()
    # print("FORMDATA***********", form.data)
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

    # if form.validate_on_submit():
    #     print('CREATING BILLING')

    #     billing = Billing(
    #             user_id=current_user.id,
    #             booking_id=booking.id,
    #             card_full_name=form.data['card_full_name'],
    #             card_number=form.data['card_number'],
    #             card_cvv=form.data['card_cvv'],
    #             card_zipcode=form.data['card_zipcode'],
    #             card_exp_data=form.data['card_exp_data']
    #     )
    #     db.session.add(billing)
    #     db.session.commit()


    print("Newly created booking:", booking.to_dict())

    return booking.to_dict()
    # return {'Booking': booking.to_dict()}


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
@bookings_routes.route('/<int:id>', methods=["DELETE"])
def delete_booking(id):
    deleted_booking = Booking.query.get(id)
    if deleted_booking:
        db.session.delete(deleted_booking)
        db.session.commit()
        return "Booking deleted successfully"
    else:
        return {"message": "Booking not found"}, 404
