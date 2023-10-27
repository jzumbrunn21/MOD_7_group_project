import React, { useState } from "react";
import "./PaymentInformation.css";
import { useModal } from "../../context/Modal";

const PaymentInformationModal = ({ onClose, onConfirmBooking }) => {
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCVV] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal;
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!/^[A-Za-z\s]+$/.test(cardholderName)) {
      newErrors.cardholderName =
        "Valid cardholder name is required (letters and spaces only)";
    }

    if (!/^\d{16}$/.test(cardNumber)) {
      newErrors.cardNumber = "Valid 16-digit card number is required";
    }

    if (!/^\d{3}$/.test(cvv)) {
      newErrors.cvv = "Valid 3-digit CVV is required";
    }

    const [inputMonth, inputYear] = expirationDate.split("/");
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear() % 100;

    const inputMonthNumber = parseInt(inputMonth, 10);
    const inputYearNumber = parseInt(inputYear, 10);

    if (
      inputYearNumber < currentYear ||
      (inputYearNumber === currentYear && inputMonthNumber < currentMonth)
    ) {
      newErrors.expirationDate = "Card expired";
    }

    if (!expirationDate) {
      newErrors.expirationDate = "Valid expiration date (MM/YY) is required";
    }

    if (!/^\d{5}$/.test(zipCode)) {
      newErrors.zipCode = "Valid 5-digit zip code is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const card_full_name = cardholderName;
      const card_number = cardNumber;
      const card_cvv = cvv;
      const card_zipcode = zipCode;
      const card_exp_date = expirationDate;
      const paymentInfo = {
        card_full_name,
        card_number,
        card_cvv,
        card_exp_date,
        card_zipcode,
      };
      onConfirmBooking(paymentInfo);
      //closeModal();
      onClose();
    }
  };

  return (
    // Modal Overlay (click to close the modal)
    <div className="payment-modal-overlay" onClick={onClose}>
      {/* Modal Container (prevent overlay click from closing) */}
      <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal Title */}
        <h2 className="modal-title">Payment Information</h2>

        {/* Cardholder's Name Input */}
        <div className="input-field">
          <label>Cardholder's Name:</label>
          <input
            type="text"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
          />
          {errors.cardholderName && (
            <p className="error-message">{errors.cardholderName}</p>
          )}
        </div>

        {/* Card Number Input */}
        <div className="input-field">
          <label>Card Number:</label>
          <input
            type="number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          {errors.cardNumber && (
            <p className="error-message">{errors.cardNumber}</p>
          )}
        </div>

        {/* CVC Input */}
        <div className="input-field">
          <label>CVC:</label>
          <input
            type="number"
            value={cvv}
            onChange={(e) => setCVV(e.target.value)}
          />
          {errors.cvc && <p className="error-message">{errors.cvc}</p>}
        </div>

        {/* Expiration Date Input */}
        <div className="input-field">
          <label>Expiration Date (MM/YY):</label>
          <input
            type="month"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
          />
          {errors.expirationDate && (
            <p className="error-message">{errors.expirationDate}</p>
          )}
        </div>

        {/* Zip Code Input */}
        <div className="input-field">
          <label>Zip Code:</label>
          <input
            type="number"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
          {errors.zipCode && <p className="error-message">{errors.zipCode}</p>}
        </div>

        {/* Submit Button */}
        <button className="submit-button" onClick={handleSubmit}>
          Submit & Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default PaymentInformationModal;
