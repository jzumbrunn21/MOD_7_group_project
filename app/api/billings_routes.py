from flask import Blueprint, jsonify, request, redirect
from app.models import db, Billing
# Forms need importing
from app.forms import BillingForm
from datetime import datetime
from flask_login import current_user

billings_routes = Blueprint("billings", __name__)

# !!!NOT COMPLETE

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

# Partial CRUD: Create, Read, Read One(?)

# Returns all the billings of a user
# Billings that match the
@billings_routes.route('')
def all_billings():
    response = [billing.to_dict() for billing in Billing.query.filter(current_user.id == Billing.user_id)]
    # return {"services": response}
    # response = Service.query.all()
    return {"billings": response}

# # Returns one billing by id
# @billings_routes.route('/<int:id>')
# def one_billing(id):
#     response = Service.query.get(id)
#     # response = Service.query.get_or_404(id)
#     # return {"service": response}  Is it like this?
#     return jsonify(response) # Or json.dumps()?

# Creates one billing
@billings_routes.route('/new', methods=["POST"])
def create_billing():
    form = BillingForm()
    print("*****ROUTEDATA", form.data)
    data = request.get_json()
    booking_id = data.get('booking_id')
    card_exp_date = data.get('card_exp_date')
    # Convert card exp date data into datetime format for validation
    expiration_time = datetime.strptime(card_exp_date + '-01', '%Y-%m-%d')
    # !!! card_exp_date is in the format of Month/Year, this .strptime needs to be adjusted
    formatted_date = expiration_time.strftime('%m/%y')
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        billing = Billing(
            user_id=current_user.id,
            booking_id=booking_id, # Different key because of how it is sent in thunk
            card_full_name=form.data['card_full_name'],
            card_number=form.data['card_number'],
            card_cvv=form.data['card_cvv'],
            card_zipcode=form.data['card_zipcode'],
            card_exp_date=formatted_date   # DateTime validated, use expiration_time variable
        )
        db.session.add(billing)
        db.session.commit()
        # !!! Do we need to query it then return? Examples just returns the below
        return billing.to_dict(), 201
    else:
        return {"Errors": form.errors} #Placeholder


@billings_routes.route('/<int:id>', methods=["DELETE"])
def delete_billing(id):
    deleted_billing = Billing.query.get(id)

    if deleted_billing:
        db.session.delete(deleted_billing)
        db.session.commit()
        return {"message": "Billing deleted."}
    else:
        return 'Error'
