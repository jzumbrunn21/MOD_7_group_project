// Partial CRUD: CRD
const SET_REVIEW = "reviews/SET_REVIEWS";
const READ_REVIEWS = "reviews/READ_REVIEW";
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW';
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

const updateReview = (reviewId, reviewData) => ({
  type: UPDATE_REVIEW,
  reviewId,
  reviewData,
});

const removeReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId,
});

// Thunks
export const createReviewThunk = (reviewData) => async (dispatch) => {
  try {
    console.log("review Data from thunk", reviewData.get('review_image'));
    const response = await fetch("/api/reviews/new", {
      method: "POST",
      // body: JSON.stringify(reviewData),
      body: reviewData,
    });

    console.log("Response", response);

    if (response.ok) {
      const data = await response.json();
      dispatch(setReview(data));
      return data;
    } else {
      // Handle non-JSON response
      const errorMessage = await response.text();
      console.error(errorMessage);
      return "Error";
    }
  } catch (error) {
    console.error("Error in createReviewThunk:", error);
    return "Error";
  }
};

export const updateReviewThunk = (reviewId, reviewData) => async (dispatch) => {
  
  try {
    const response = await fetch(`/api/reviews/update/${reviewId}`, {
      method: "PUT",
      body: reviewData,
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(updateReview(data, reviewId));
      return data;
    } else {
      // Handle non-JSON response
      const errorMessage = await response.text();
      console.error(errorMessage);
      return "Error";
    }
  } catch (error) {
    console.error("Error in updateReviewThunk:", error);
    return "Error";
  }
};

  export const getUserReviewsThunk = () => async (dispatch) => {
    const response = await fetch("/api/reviews/user", {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(readReviews(data));
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
  const response = await fetch(`/api/reviews/delete/${reviewId}`, {
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
      newState = { ...state ,reviews:{}};
      action.reviews.reviews.forEach((review) => {
        newState.reviews[review.id] = review;
      });
      return newState;
    case UPDATE_REVIEW:
      newState = {...state};
      newState.reviews[action.reviewId] = action.reviewData
      return newState;
    case DELETE_REVIEW:
      newState = { ...state };
      delete newState.reviews[action.reviewId];
      return newState;
    default:
      return state;
  }
}
