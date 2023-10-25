from flask import Blueprint, jsonify, request, redirect
from app.models import db, Review, Service
# Forms need importing
from app.forms import ReviewForm
reviews_routes = Blueprint("reviews", __name__)
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

# Partial CRUD: Create, Read, Delete

# Returns all the reviews
@reviews_routes.route('/')
def all_reviews():
    response = [review.to_dict() for review in Review.query.all()]
    # return {"services": response}
    # response = Service.query.all()
    return {"reviews": response}

# # Returns one review by id
# @reviews_routes.route('/<int:id>')
# def one_review(id):
#     response = Service.query.get(id)
#     # response = Service.query.get_or_404(id)
#     # return {"service": response}  Is it like this?
#     return jsonify(response) # Or json.dumps()?

# Creates one review
@reviews_routes.route('/new', methods=["POST"])
def create_review():
    form = ReviewForm()
    print('***form***',form)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        review = Review(
            user_id=current_user.id,
            service_id=form.data['service_id'],
            review=form.data['review'],
            star_rating=form.data['star_rating']
            # review_image=form.data['review_image']
        )
        db.session.add(review)
        db.session.commit()
        # !!! Do we need to query it then return? Examples just returns the below
        return review.to_dict()
    else:
        return {"Errors": form.errors} #Placeholder

# Delete one review
@reviews_routes.route('/delete/<int:id>', methods=["DELETE"])
def delete_review(id):
    deleted_review = Review.query.get(id)
    # !!! Do we need to delete anything else?
    db.session.delete(deleted_review)
    db.session.commit()
    # return redirect('/services')
    # Redirection is done on frontend, this route just deletes from database
