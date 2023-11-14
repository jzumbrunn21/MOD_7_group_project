from flask import Blueprint, jsonify, request, redirect, render_template
from app.models import db, Service
from .aws_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3
# Forms need importing
from app.forms import ServiceForm
services_routes = Blueprint("services", __name__)
from flask_login import current_user


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

# Returns all the services + BONUS SEARCH
@services_routes.route('/')
def all_services():
    category = request.args.get('category')
    if category:
        services = Service.query.filter_by(service_category=category).all()
    else:
        services = Service.query.all()

    response = [service.to_dict() for service in services]
    return {"services": response}


@services_routes.route('/my-services')
def users_services():
    print('currentUser', current_user.id)
    response = [service.to_dict() for service in Service.query.filter(Service.provider_id == current_user.id)]
    print("response", response)
    return {"services": response}


# Creates one service
@services_routes.route('/new', methods=["POST"])
def create_service():
    form = ServiceForm()
    # imageForm = ImageForm()
    # print('*****FORM DATA"', form.data)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        image = form.data['url']

        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return "URL NOT IN UPLOAD"

        url = upload["url"]

        print('**************************', url)


        service = Service(
            # provider_id=form.provider_id.data,
            # service_title=form.service_title.data,
            # service_description=form.service_description.data,
            # service_price=form.service_price.data,
            # service_length_est=form.service_length_est.data,
            # service_category=form.service_category.data,
            # url=form.url.data
            # !!! Do we include created_at, updated_at?
            provider_id=current_user.id,
            service_title=form.data['service_title'],
            service_description=form.data['service_description'],
            service_price=form.data['service_price'],
            service_length_est=form.data['service_length_est'],
            service_category=form.data['service_category'],
            url=url
        )
        # image = ServiceImage(
        #     service_id=form.service_id.data,
        #     url=form.url.data
        # )
        db.session.add(service)
        db.session.commit()
        print(service)
        # !!! Do we need to query it then return? Examples just returns the below
        # return redirect('/')
        return service.to_dict(), 201
    # print('Hello world')
    # return render_template('services.html', form=form)
    else:
        return {"Errors": form.errors} #Placeholder

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

        image = form.data['url']

        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return "URL NOT IN UPLOAD"

        url = upload["url"]



        service_to_update = Service.query.get(id)

        # service_to_update.provider_id=current_user.id,
        # Or is it
        # provider_id = User.query.get(id) could be useful?
        service_to_update.service_title=form.data['service_title']
        service_to_update.service_description=form.data['service_description']
        service_to_update.service_price=form.data['service_price']
        service_to_update.url=url
        service_to_update.service_length_est=form.data['service_length_est']
        service_to_update.service_category=form.data['service_category']
        # !!! Do we include created_at, updated_at?
        # db.session.add(service)
        db.session.commit()
    # !!! Should this go to all services or the updated one?
        # return redirect(f'/services/{id}')
        return service_to_update.to_dict(), 201
    else:
        return {"Errors": form.errors}

# Delete one service
@services_routes.route('/<int:id>', methods=["DELETE"])
def delete_service(id):
    deleted_service = Service.query.get(id)
    # !!! Do we need to delete anything else?
    if delete_service :
        db.session.delete(deleted_service)
        db.session.commit()
        return "successful delete"
    else:
        return "error"

# service = Service.query.filter(Service.id == form.data["id"]).first()
