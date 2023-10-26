// Constants
const SET_BOOKING = "bookings/SET_BOOKING";
const READ_BOOKINGS = "bookings/READ_BOOKINGS";
const UPDATE_BOOKING = "bookings/UPDATE_BOOKING";
const DELETE_BOOKING = "bookings/DELETE_BOOKING";

// Action creators
const setBooking = (booking) => ({
  type: SET_BOOKING,
  booking,
});

const readBookings = (bookings) => ({
  type: READ_BOOKINGS,
  bookings,
});

const updateBooking = (bookingData, bookingId) => ({
  type: UPDATE_BOOKING,
  bookingData,
  bookingId,
});

const removeBooking = (bookingId) => ({
  type: DELETE_BOOKING,
  bookingId,
});

// Thunks
export const createBookingThunk = (bookingData) => async (dispatch) => {
  try {
    const { user_id, service_id, start_date_and_time, status } = bookingData; // Extract the required fields
    const response = await fetch("/api/bookings/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        service_id,
        start_date_and_time,
        status,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setBooking(data));
    } else {
      throw new Error("Error creating booking");
    }
  } catch (error) {
    console.error(error);
  }
};

export const getBookingsThunk = () => async (dispatch) => {
  try {
    const response = await fetch("/api/bookings");

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data.bookings)) {
        dispatch(readBookings(data.bookings));
      } else {
        console.error("Invalid data format for bookings");
      }
    } else {
      throw new Error("Error fetching bookings");
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateBookingThunk = (bookingData, bookingId) => async (dispatch) => {
  try {
    const response = await fetch(`/bookings/${bookingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(updateBooking(data, bookingId));
    } else {
      throw new Error("Error updating booking");
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteBookingThunk = (bookingId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/bookings/${bookingId}`, {
      method: "DELETE",
    });
    console.log("bookings id", bookingId);

    if (response.ok) {
      dispatch(removeBooking(bookingId));
    } else {
      throw new Error("Error deleting booking");
    }
  } catch (error) {
    console.error(error);
  }
};

// Initial State
const initialState = { bookings: {} };

// Reducer
export default function bookingsReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_BOOKING:
      newState = { ...state };
      newState.bookings[action.booking.id] = action.booking;
      return newState;
    case READ_BOOKINGS:
      newState = { ...state };
      action.bookings.forEach((booking) => {
        newState.bookings[booking.id] = booking;
      });
      return newState;
    case UPDATE_BOOKING:
      newState = { ...state };
      newState.bookings[action.bookingId] = action.bookingData;
      return newState;
    case DELETE_BOOKING:
      newState = { ...state };
      delete newState.bookings[action.bookingId];
      return newState;
    default:
      return state;
  }
}
