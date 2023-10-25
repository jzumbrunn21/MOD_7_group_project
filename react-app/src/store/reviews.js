// Partial CRUD: CRD
const SET_REVIEW = "reviews/SET_REVIEWS";
const READ_REVIEWS = "reviews/READ_REVIEW";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";

// Action Creators
// We will need the service id as well to set a review to a specific service
const setReview = (review) => ({
  type: SET_REVIEW,
  review,
});

const readReviews = (reviews) => ({
  type: READ_REVIEWS,
  reviews,
});

const removeReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId,
});

// Thunks
export const createReviewThunk =
  (reviewData) => async (dispatch) => {
    const response = await fetch("/api/reviews/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });
    console.log(response)
    if (response.ok) {
      const data = await response.json();
      dispatch(setReview(data));
      return data
    } else {
      return "Error";
    }
  };

export const getReviewsThunk = () => async (dispatch) => {
  const response = await fetch("/api/reviews", {
    method: "GET",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(readReviews(data));
  } else {
    return "Error";
  }
};

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(removeReview(reviewId));
  } else {
    return "Error";
  }
};

const initialState = { reviews: {} };

// Reducer
export default function reviewsReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_REVIEW:
      newState = { ...state };
      newState.reviews[action.review.id] = action.review;
      return newState;
    case READ_REVIEWS:
      newState = { ...state };
      action.reviews.reviews.forEach((review) => {
        newState.reviews[review.id] = review;
      });
      return newState;
    case DELETE_REVIEW:
      newState = { ...state };
      delete newState[action.reviewId];
      return newState;
    default:
      return state;
  }
}
