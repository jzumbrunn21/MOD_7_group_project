// Full CRUD
const SET_BOOKING = "bookings/SET_BOOKING"
const READ_BOOKINGS = "bookings/READ_BOOKINGS"
const UPDATE_BOOKING = "bookings/UPDATE_BOOKING"
const DELETE_BOOKING = "bookings/DELETE_BOOKING"

// Action creator
const setBooking = (booking, userId, serviceId) => ({
    type: SET_BOOKING,
    booking,
    userId,
    serviceId
})

const readBookings = (bookings) => ({
    type: READ_BOOKINGS,
    bookings
})

const updateBooking = (bookingData, bookingId) => ({
    type: UPDATE_BOOKING,
    bookingData,
    bookingId
})

const removeBooking = (bookingId) => ({
    type: DELETE_BOOKING,
    bookingId
})

// Thunks

export const createBookingThunk = (bookingData, userId, serviceId) => async (dispatch) => {
    const response = await fetch("/bookings/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            bookingData
        }),
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(setBooking(data, userId, serviceId))
    } else {
        return "Error"
    }
}

export const getBookingsThunk = () => async (dispatch) => {
    const response = await fetch("/bookings")

    if (response.ok) {
        const data = await response.json()
        dispatch(readBookings(data))
    } else {
        return "Error"
    }
}

export const updateBookingThunk = (bookingData, bookingId) => async (dispatch) => {
    const response = await fetch(`/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            bookingData
        })
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(updateBooking(data, data.id))
    } else {
        return "Error"
    }
}

export const deleteBookingThunk = (bookingId) => async (dispatch) => {
    const response = await fetch(`/bookings/${bookingId}`, {})

    if (response.ok) {
        dispatch(removeBooking(bookingId))
    } else {
        return "Error"
    }
}

const initialState = { bookings: [] }

// Reducer

export default function bookingsReducer(state = initialState, action) {
    let newState = {...state}
    switch(action.type) {
        case SET_BOOKING:
            return newState
        case READ_BOOKINGS:
            return newState
        case UPDATE_BOOKING:
            return newState
        case DELETE_BOOKING:
            return newState
        default:
            return state;
    }
}

// export const Thunk = () => async (dispatch) => {
//     const response = await fetch("", {})

//     if (response.ok) {
        //const data = await response.json()
//     } else {
        //return "Error"
//     }
// }
