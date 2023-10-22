// Partial CRUD: CRD
const SET_REVIEW = "reviews/SET_REVIEWS"
const READ_REVIEWS = "reviews/READ_REVIEW"
const DELETE_REVIEW = "reviews/DELETE_REVIEW"

// Action Creators
// We will need the service id as well to set a review to a specific service
const setReview = (review, serviceId) => ({
    type: SET_REVIEW,
    review,
    serviceId
})

const readReviews = (reviews) => ({
    type: READ_REVIEWS,
    reviews
})

const removeReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
})

// Thunks
export const createReviewThunk = (reviewData, serviceId) => async (dispatch) => {
    const response = await fetch("/reviews/new", {
        method: "POST",
        headers: {
			"Content-Type": "application/json",
		},
        body: JSON.stringify({
            reviewData
        })
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(setReview(data, serviceId))
    } else {
        return "Error"
    }
}

export const readReviewsThunk = () => async (dispatch) => {
    const response = await fetch("/reviews", {})

    if (response.ok) {
        const data = await response.json()
        dispatch(readReviews(data))
    } else {
        return "Error"
    }
}

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    const response = await fetch(`reviews/${reviewId}`, {})

    if (response.ok) {

        dispatch(removeReview(reviewId))
    } else {
        return "Error"
    }
}

const initalState = { bookings: [] }

// Reducer
export default function reviewsReducer(state = initalState, action) {
    let newState = {...state}
    switch(action.type) {
        case SET_REVIEW:
            return newState
        case READ_REVIEWS:
            return newState
        case DELETE_REVIEW:
            return newState
        default:
            return state;
    }
}
