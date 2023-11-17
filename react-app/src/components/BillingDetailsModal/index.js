import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserBillingsThunk, deleteBillingThunk } from "../../store/billings";
import { Modal, useModal } from "../../context/Modal";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import "./BillingDetailsModal.css";

const BillingDetailsModal = ({ bookingId, show, onCancel }) => {
  const { closeModal } = useModal();
  //   const [billingsList, setBillingsList] = useState({});
  // bookingId prop used to filter user's billings
  const dispatch = useDispatch();
  const billings = useSelector((state) =>
    Object.values(state.billings.billings)
  );
  // console.log("*** All billing",billings)

  useEffect(() => {
    // setBillingsList(billings);
    dispatch(getUserBillingsThunk());
  }, [dispatch]);

  if (billings.length === 0) {
    return null;
  }
  const userBilling = billings.filter(
    (billing) => billing.booking_id === bookingId
  )[0];
  // console.log("*** Users billings", userBilling)
  const onDelete = async () => {
    await dispatch(deleteBillingThunk(userBilling.id));
    closeModal();
    dispatch(getUserBillingsThunk());
  };

  //Check if the billing could be found and change what will be rendered
  let render;
  if (userBilling === undefined) {
    //if not found, billing info cannot be found
    render = (
      <p className="billing-not-found">
        Billing information could not be found
      </p>
    );
  } else {
    //If found, display the receipt info
    render = (
      <>
        <div className="billing-information">
          <p>Name on card: {userBilling.card_full_name}</p>
          <p>Card Number: {userBilling.card_number}</p>
          <p>CVV: {userBilling.card_cvv}</p>
          <p>Zip Code: {userBilling.card_zipcode}</p>
          <p>Expiration Date: {userBilling.card_exp_date}</p>
          <p>Purchase Date and Time: {userBilling.purchase_date_and_time}</p>
        </div>
        <div>
          <button className="billing-delete-btn" onClick={onDelete}>
            Delete billing details
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="billing-detail-modal">
      <h2 className="billing-title">Billing Details</h2>
      {render}
    </div>
  );
};

export default BillingDetailsModal;
