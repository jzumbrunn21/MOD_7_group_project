import React, { useState } from 'react';
import PaymentInformationModal from '../PaymentInformationModal';

const ServiceDetailPage = () => {

  const [showBookingModal, setShowBookingModal] = useState(false);  // To control the visibility of the booking modal
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [bookingDate, setBookingDate] = useState(new Date());

  const handleBookNow = () => {
    setShowBookingModal(true);
  };

  const handleBookingDateChange = (event) => {
    setBookingDate(event.target.value);
  };

  const handleContinueToBilling = () => {
    setShowPaymentModal(true);
  };

  const handleConfirmBooking = () => {
    setShowPaymentModal(true);
  };

  return (
    <div className="service-detail-container">
      {/* Background Image Container */}
      <div className="background-image-container">
        <h1>Service Name</h1>
        <button onClick={handleBookNow}>Book Now</button>
      </div>

      {/* Navigation Info */}
      <div className="navigation-info">Home &gt; Service Name</div>

      {/* Service Details */}
      <div className="service-details">
        <h2>Service Description</h2>
        <p>Service description goes here...</p>
        <p>Provider Name</p>
        <p>Price</p>
        <img src="service-image-url" alt="Service" />
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h2>Reviews</h2>
        {/* {reviews.map((review) => (
          <div key={review.id} className="review">
            <p>- {review.username}</p>
            <p>Rating: {review.rating}</p>
            <img src={review.profilePhoto} alt="Profile" />
            <p>{review.text}</p>
          </div>
        )} */}
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="booking-modal">
          <h2>Book a Service</h2>
          <input
            type="datetime-local"
            placeholder="MM/DD/YYYY HH:mm AM"
            value={bookingDate}
            onChange={handleBookingDateChange}
          />

          <button onClick={handleContinueToBilling}>Continue to Billing</button>
        </div>
      )}

      {showPaymentModal && (
        <PaymentInformationModal
          onClose={() => setShowPaymentModal(false)}
          onConfirmBooking={handleConfirmBooking}
        />
      )}
    </div>
  );
};

export default ServiceDetailPage;
