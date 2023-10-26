// Partial CRUD: Read, Create
const READ_BILLINGS = "billings/READ_BILLINGS"
const SET_BILLING = "billings/CREATE_BILLING"

// Action
const readBillings = (billings) => ({
    type: READ_BILLINGS,
    billings
})

const setBilling = (billingData, bookingId) => ({
    type: SET_BILLING,
    billingData
})

// Thunks
export const getUserBillingsThunk = () => async (dispatch) => {
    const response = await fetch("/api/billings")

    if (response.ok) {
        const data = await response.json()
        dispatch(readBillings(data))
        return data
    } else {
        return "Error"
    }
}

export const createBillingThunk = (billingData, bookingId) => async (dispatch) => {
    const response = await fetch("/api/billings/new", {
        method: "POST",
        headers: {
			"Content-Type": "application/json",
		},
        body: JSON.stringify({
            billingData
        })
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(setBilling(data, bookingId))
    } else {
        return "Error"
    }
}

const initialState = { billings: {} }

// Reducer
export default function billingsReducer(state = initialState, action) {
    let newState;
    switch(action.type) {
        case SET_BILLING:
            newState = { ...state }
            newState.billings[action.billingData.id] = action.billingData
            return newState
        case READ_BILLINGS:
            newState = { ...state, billings: {} }
            action.billings.billings.forEach((billing) => {
                newState.billings[billing.id] = billing;
            });
            return newState
        default:
            return state;
    }
}
