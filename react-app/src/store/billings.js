// Partial CRUD: Read, Create
const READ_BILLINGS = "billings/READ_BILLINGS";
const SET_BILLING = "billings/CREATE_BILLING";
const DELETE_BILLING = "billings/DELETE_BILLING";

// Action
const readBillings = (billings) => ({
  type: READ_BILLINGS,
  billings,
});

const setBilling = (billingData, booking_id) => ({
  type: SET_BILLING,
  billingData,
  booking_id,
});

const deleteBilling = (billingId) => ({
  type: DELETE_BILLING,
  billingId,
});

// Thunks
export const getUserBillingsThunk = () => async (dispatch) => {
  const response = await fetch("/api/billings");

  if (response.ok) {
    const data = await response.json();
    dispatch(readBillings(data));
    return data;
  } else {
    return "Error";
  }
};

export const createBillingThunk =
  (billingData, booking_id) => async (dispatch) => {
    const {
      card_full_name,
      card_number,
      card_cvv,
      card_exp_date,
      card_zipcode,
    } = billingData;
    const response = await fetch("/api/billings/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //   body: JSON.stringify(billingData, {bookingId}),
      body: JSON.stringify({
        card_full_name,
        card_number,
        card_cvv,
        card_exp_date,
        card_zipcode,
        booking_id,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setBilling(data, booking_id));
      return data;
    } else {
      return "Error";
    }
  };

export const deleteBillingThunk = (billingId) => async (dispatch) => {
  // console.log("RESPOSE", billingId);
  const response = await fetch(`/api/billings/${billingId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteBilling(data));
    return data;
  }
};

const initialState = { billings: {} };

// Reducer
export default function billingsReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_BILLING:
      newState = { ...state };
      newState.billings[action.billingData.id] = action.billingData;
      return newState;
    case READ_BILLINGS:
      newState = { ...state, billings: {} };
      action.billings.billings.forEach((billing) => {
        newState.billings[billing.id] = billing;
      });
      return newState;
    case DELETE_BILLING:
      newState = { ...state };
      delete newState.billings[action.billingId];
      return newState;
    default:
      return state;
  }
}
