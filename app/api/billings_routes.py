from flask import Blueprint, jsonify, request, redirect
from app.models import db, Service
# Forms need importing
# from app.forms import ServiceForm
services_routes = Blueprint("services", __name__)

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

# Full CRUD: Create, Read, Read One, Update, Delete

# Returns all the services
@services_routes.route('/')
def all_services():
    # response = [service.to_dict() for service in Service.query.all()]
    # return {"services": response}
    response = Service.query.all()
    return jsonify(response)

# Returns one service by id
@services_routes.route('/<int:id>')
def one_service(id):
    response = Service.query.get(id)
    # response = Service.query.get_or_404(id)
    # return {"service": response}  Is it like this?
    return jsonify(response) # Or json.dumps()?

# Creates one service
@services_routes.route('/new', methods=["POST"])
def create_service(userId):
    # form = ServiceForm()
    # imageForm = ImageForm()
    # !!! Shoud we create the images here too? !!!
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        service = Service(
            provider_id=form.data['provider_id'],
            service_title=form.data['service_title'],
            service_price=form.data['service_description'],
            service_length_est=form.data['service_length_est'],
            service_category=form.data['service_category'],
            # !!! Do we include created_at, updated_at?
        )
        db.session.add(service)
        db.session.commit()
        # !!! Do we need to query it then return? Examples just returns the below
        return service.to_dict()
    else:
        return "Creation error!!!" #Placeholder
