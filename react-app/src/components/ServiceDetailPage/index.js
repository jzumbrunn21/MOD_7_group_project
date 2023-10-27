
import { getReviewsThunk } from "../../store/reviews";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import PaymentInformationModal from "../PaymentInformationModal";
import { getServiceThunk } from "../../store/services";
import { createBookingThunk } from "../../store/bookings";
import { createBillingThunk } from "../../store/billings";

import "./ServiceDetailPage.css";
import OpenModalButton from "../OpenModalButton";
import { useModal } from "../../context/Modal";
import LoginFormModal from "../LoginFormModal";

const ServiceDetailPage = () => {
  const { openModal } = useModal();
  const { serviceId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [bookingDate, setBookingDate] = useState(new Date());
  const [errors, setErrors] = useState({});

  const [averageRating, setAverageRating] = useState('0.00'); // Average rating state as a string

  const serviceDetail = useSelector(
    (state) => Object.values(state.services.singleService)[0]
  );
  const reviews = useSelector((state) => Object.values(state.reviews.reviews));
  const serviceReviews = reviews.filter(
    (review) => review.service_id === parseInt(serviceId)
  );
  console.log('service reviews', serviceReviews);

  // Function to calculate the average rating
  const calculateAverageRating = () => {
    if (serviceReviews.length === 0) {
      return 'New'; //If no reviews
    }

    //get sum of all reviews
    const sum = serviceReviews.reduce((total, review) => {
      const rating = parseFloat(review.star_rating);
      return isNaN(rating) ? total : total + rating;
    }, 0);

    //Calculate average
    const average = (sum / serviceReviews.length).toFixed(2);
    return average;
  };

  useEffect(() => {
    dispatch(getServiceThunk(serviceId));
  }, [dispatch, serviceId]);

  useEffect(() => {
    dispatch(getReviewsThunk());
  }, [dispatch]);


  // Update the average rating whenever the serviceReviews array changes
  useEffect(() => {
    const newAverageRating = calculateAverageRating();
    setAverageRating(newAverageRating);
  }, [serviceReviews]);


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
      console.log('Date has already passed');
      newErrors.selected_booking_date = 'Date has already passed';
    } else {
      console.log('Selected booking date:', event.target.value);
      // Clear the error if the date is valid
      newErrors.selected_booking_date = '';
    }

    setErrors(newErrors); // Update the errors state
  };

  const handleContinueToBilling = () => {
    // Check if the booking date is empty or in the past
    if (errors.selected_booking_date) {
      // Do not open the payment modal
      console.log('bookingDate', bookingDate);
      return;
    }

    // Open the payment modal
    setShowPaymentModal(true);
  };

  const handleConfirmBooking = async (paymentInfo) => {
    // Set the payment info and close the payment modal
    setShowPaymentModal(false);
    console.log('Payment Information:', paymentInfo);

    // Proceed with creating the booking
    const bookingData = {
      user_id: sessionUser.id,
      service_id: serviceId,
      start_date_and_time: bookingDate,
      status: true,
    };

    const newBooking = await dispatch(createBookingThunk(bookingData));
    console.log("NEWBOOKING", newBooking);
    // const bookingId = newBooking.id;
    if(newBooking) {
      const newBilling = await dispatch(createBillingThunk(paymentInfo, newBooking.id));
      console.log("NEW BILLING", newBilling)
    }


    console.log("Newly created booking data:", bookingData);
    history.push("/my-booked-services");
  };

  // Use useModal to access the openModal function

  console.log("The service: ", serviceDetail);


  const openLoginModal = () => {
    openModal(<LoginFormModal />);
  };

  return (
    <div className="service-detail-container">
      {/* Background Image Container */}

      <div className="background-image-container">
        {sessionUser ? (
          <div>
            <h1>{serviceDetail.service_title}</h1>
            <button onClick={handleBookNow}>Book Now</button>
          </div>
        ) : (
          <div className="background-image-container">
            <h1>{serviceDetail.service_title}</h1>
            <OpenModalButton
              buttonText="Book Now"
              onItemClick={openLoginModal}
              modalComponent={<LoginFormModal />}
            />
          </div>
        )}
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

            <button onClick={handleContinueToBilling}>
              Continue to Billing
            </button>

            {errors.selected_booking_date && (
              <p className="error-message">{errors.selected_booking_date}</p>
            )}
            <button onClick={handleContinueToBilling}>Continue to Billing</button>

          </div>
        )}
      </div>

      {/* Navigation Info */}
      <div className="navigation-info">
        Home &gt; {serviceDetail.service_title}
      </div>

      {/* Service Details */}
      <div className="service-details">
        <div>
          <h2>Service Description</h2>
          <p className="review-description">
            {serviceDetail.service_description}
          </p>
          <p>Provider Name</p>
          <p>${serviceDetail.service_price}</p>
        </div>
        <div>
          <img src={serviceDetail.url} alt="Service" />
        </div>
      </div>

      {/* Display the Average Rating */}
      <div className="average-rating">
        <h2>Average Rating</h2>
        <p>★ {averageRating} / 5</p>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h2>Reviews</h2>
        {serviceReviews.map((review) => (
          <div key={review.id} className="review">
            <img src={review.review_image} alt="Profile" />
            <div className="review-info">
              <p>{review.username}</p>
              <p>{review.review}</p>
              {/* Convert star_rating to a number and display with 2 decimal places */}
              <p>★ {parseFloat(review.star_rating).toFixed(2)}</p>

            </div>
          </div>
        ))}
      </div>

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
