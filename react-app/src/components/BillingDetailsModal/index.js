import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserBillingsThunk } from "../../store/billings";
import { Modal, useModal } from "../../context/Modal";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

const BillingDetailsModal = ({ bookingId, show, onCancel }) => {
    // bookingId prop used to filter user's billings
    const dispatch = useDispatch();
    const billings = useSelector(state => Object.values(state.billings.billings));
    console.log("*** All billing",billings)


    useEffect(() => {
        dispatch(getUserBillingsThunk())
    },[dispatch])

    if (billings.length === 0){
        return null
    }
    const userBilling = billings.filter((billing) => billing.booking_id === bookingId)[0];
    console.log("*** Users billings", userBilling)

    //Check if the billing could be found and change what will be rendered
    let render;
    if(userBilling === undefined){ //if not found, billing info cannot be found
        render = (<p>Billing information could not be found</p>)
    } else {   //If found, display the receipt info
        render = (
            <>
                <p>Name on card: {userBilling.card_full_name}</p>
                <p>Card Number: {userBilling.card_number}</p>
                <p>CVV: {userBilling.card_cvv}</p>
                <p>Zip Code: {userBilling.card_zipcode}</p>
                <p>Expiration Date: {userBilling.card_exp_date}</p>
                <p>Purchase Date and Time: {userBilling.purchase_date_and_time}</p>
            </>
        )
    }

    return (
        <div className="billing-detail-modal">
            <h2>Billing Details</h2>
            {render}
        </div>
    )
}

export default BillingDetailsModal
