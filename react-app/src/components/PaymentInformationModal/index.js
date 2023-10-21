import React, { useState } from 'react';

const PaymentInformationModal = ({ onClose, onConfirmBooking }) => {
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvc, setCVC] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [errors, setErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    if (!cardholderName) {
      errors.cardholderName = 'Cardholder Name is required';
    }

    if (!cardNumber) {
      errors.cardNumber = 'Card Number is required';
    }

    if (!cvc) {
      errors.cvc = 'CVC is required';
    }

    if (!expirationDate) {
      errors.expirationDate = 'Expiration Date is required';
    }

    if (!zipCode) {
      errors.zipCode = 'Zip Code is required';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const paymentInfo = {
      cardholderName,
      cardNumber,
      cvc,
      expirationDate,
      zipCode,
    };
    onConfirmBooking(paymentInfo);
    onClose();
  };

  return (
    <div className="payment-modal">
      <h2>Payment Information</h2>
      <label>Cardholder's Name:</label>
      <input
        type="text"
        value={cardholderName}
        onChange={(e) => setCardholderName(e.target.value)}
      />

      <label>Card Number:</label>
      <input
        type="text"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
      />

      <label>CVC:</label>
      <input
        type="text"
        value={cvc}
        onChange={(e) => setCVC(e.target.value)}
      />

      <label>Expiration Date:</label>
      <input
        type="text"
        value={expirationDate}
        onChange={(e) => setExpirationDate(e.target.value)}
      />

      <label>Zip Code:</label>
      <input
        type="text"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
      />

      <button onClick={handleSubmit}>Submit & Confirm Booking</button>
    </div>
  );
};

export default PaymentInformationModal;
