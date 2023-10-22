// Partial CRUD: Read, Create
const READ_BILLINGS = "billings/READ_BILLINGS"
const SET_BILLING = "billings/CREATE_BILLING"

// Action
const readBillings = (billings) => ({
    type: READ_BILLINGS,
    billings
})

const setBilling = (billingData, userId, bookingId) => ({
    type: SET_BILLING,
    billingData
})

// Thunks
export const getBillingsThunk = () => async (dispatch) => {
    const response = await fetch("/billings", {
        method: "GET"
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(readBillings(data))
    } else {
        return "Error"
    }
}

export const createBillingThunk = (billingData, userId, bookingId) => async (dispatch) => {
    const response = await fetch("/billings/new", {
        methods: "POST",
        headers: {
			"Content-Type": "application/json",
		},
        body: JSON.stringify({
            billingData
        })
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(setBilling(data, userId, bookingId))
    } else {
        return "Error"
    }
}

initialState = { billings: [] }

// Reducer
export default function billingsReducer(state = initalState, action) {
    let newState = {...state}
    switch(action.type) {
        case SET_REVIEW:
            return newState
        case READ_REVIEW:
            return newState
        default:
            return state;
    }
}
