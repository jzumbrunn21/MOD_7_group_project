import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PaymentInformationModal from "../PaymentInformationModal";
import servicesReducer, { getServiceThunk } from "../../store/services";
import { getReviewsThunk } from "../../store/reviews";

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const dispatch = useDispatch();
  const [showBookingModal, setShowBookingModal] = useState(false); // To control the visibility of the booking modal
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [bookingDate, setBookingDate] = useState(new Date());

  const serviceDetail = useSelector(
    (state) => Object.values(state.services.singleService)[0]
  );
  const reviews = useSelector((state) => Object.values(state.reviews.reviews));
  const serviceReviews = reviews.filter(
    (review) => review.service_id === parseInt(serviceId)
  );
  console.log("service reviews", serviceReviews);

  useEffect(() => {
    dispatch(getServiceThunk(serviceId));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getReviewsThunk());
  }, [dispatch]);

  if (serviceDetail === undefined) {
    return null;
  }

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
  console.log("The service: ", serviceDetail);
  // console.log("category", serviceDetail.service_category)
  return (
    <div className="service-detail-container">
      {/* Background Image Container */}
      <div className="background-image-container">
        <h1>{serviceDetail.service_title}</h1>
        <button onClick={handleBookNow}>Book Now</button>
      </div>

      {/* Navigation Info */}
      <div className="navigation-info">
        Home &gt; {serviceDetail.service_title}
      </div>

      {/* Service Details */}
      <div className="service-details">
        <h2>Service Description</h2>
        <p>{serviceDetail.service_description}</p>
        <p>Provider Name</p>
        <p>${serviceDetail.service_price}</p>
        <img src={serviceDetail.url} alt="Service" />
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h2>Reviews</h2>
        {serviceReviews.map((review) => (
          <div key={review.id} className="review">
            <p> {review.username}</p>
            <p>Rating: {review.star_rating}</p>

            <img src={review.profilePhoto} alt="Profile" />
            <p>{review.review}</p>
          </div>
        ))}
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
