
import { getReviewsThunk } from "../../store/reviews";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import PaymentInformationModal from '../PaymentInformationModal';
import { getServiceThunk } from '../../store/services';
import { createBookingThunk } from '../../store/bookings';
import './ServiceDetailPage.css';


const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);

  const dispatch = useDispatch();
  const history = useHistory();

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [bookingDate, setBookingDate] = useState(new Date());
  const [errors, setErrors] = useState({});

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
    const newErrors = {};
    setBookingDate(event.target.value);
  
    const selected_booking_date = event.target.value;
    const inputDate = new Date(selected_booking_date);
    const currentDate = new Date();
  
    if (inputDate < currentDate) {
      console.log("Date has already passed");
      newErrors.selected_booking_date = "Date has already passed";
    } else {
      console.log("Selected booking date:", event.target.value);
      // Clear the error if the date is valid
      newErrors.selected_booking_date = ""; // Clear the error
    }
  
    setErrors(newErrors); // Update the errors state
  };

  const handleContinueToBilling = () => {
    // Check if the booking date is empty or in the past
    if (errors.selected_booking_date) {
      // Do not open the payment modal
      console.log("bookingDate", bookingDate);
      return;
    }

    // Open the payment modal
    //if (bookingDate)
    setShowPaymentModal(true);
  };

  const handleConfirmBooking = (paymentInfo) => {
    // Set the payment info and close the payment modal
    setShowPaymentModal(false);
    console.log("Payment Information:", paymentInfo);

    // Proceed with creating the booking
    const bookingData = {
      user_id: sessionUser.id,
      service_id: serviceId,
      start_date_and_time: bookingDate,
      status: true,
      paymentInfo,
    };

    dispatch(createBookingThunk(bookingData));

    console.log("Newly created booking data:", bookingData);
    history.push('/my-booked-services')
  };


  console.log("The service: ", serviceDetail)

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

            <img src={review.review_image} alt="Profile" />
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

      {errors.selected_booking_date && (
      <p className="error-message">{errors.selected_booking_date}</p>
       )}

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
