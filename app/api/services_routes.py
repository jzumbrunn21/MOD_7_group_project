from flask import Blueprint, jsonify, request, redirect, render_template
from app.models import db, Service
# Forms need importing
from app.forms import ServiceForm
services_routes = Blueprint("services", __name__)


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
    response = [service.to_dict() for service in Service.query.all()]
    # return {"services": response}
    # response = Service.query.all()
    return {"services": response}


# Creates one service
@services_routes.route('/new', methods=["GET","POST"])
def create_service():
    form = ServiceForm()
    # imageForm = ImageForm()
    # !!! Shoud we create the images here too? !!!
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit() and request.method == "POST":
        service = Service(
            provider_id=form.provider_id.data,
            service_title=form.service_title.data,
            service_description=form.service_description.data,
            service_price=form.service_price.data,
            service_length_est=form.service_length_est.data,
            service_category=form.service_category.data
            # !!! Do we include created_at, updated_at?
        )
        db.session.add(service)
        db.session.commit()
        print(service)
        # !!! Do we need to query it then return? Examples just returns the below
        # return redirect('/')
    print('Hello world')
    return render_template('services.html', form=form)
    # else:
        # return "Creation error!!!" #Placeholder

# Returns one service by id
@services_routes.route('/<int:id>')
def one_service(id):
    response = Service.query.get(id).to_dict()

    # response = Service.query.get_or_404(id)
    # return {"service": response}  Is it like this?
    print(response)
    return {"service": response} # Or json.dumps()?

# Updates one service
@services_routes.route('/update/<int:id>', methods=["PUT"])
def update_service(id):
    form = ServiceForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        service_to_update = Service.query.get(id)

        service_to_update.provider_id=form.data['provider_id'],
        # Or is it
        # provider_id = User.query.get(id) could be useful?
        service_to_update.service_title=form.data['service_title'],
        service_to_update.service_price=form.data['service_description'],
        service_to_update.service_length_est=form.data['service_length_est'],
        service_to_update.service_category=form.data['service_category'],
        # !!! Do we include created_at, updated_at?
        # db.session.add(service)
        db.session.commit()
    # !!! Should this go to all services or the updated one?
    return redirect(f'/services/{id}')

# Delete one service
@services_routes.route('/delete/<int:id>', methods=["DELETE"])
def delete_service(id):
    deleted_service = Service.query.get(id)
    # !!! Do we need to delete anything else?
    db.session.delete(deleted_service)
    db.session.commit()
    return redirect('/services')


# service = Service.query.filter(Service.id == form.data["id"]).first()
