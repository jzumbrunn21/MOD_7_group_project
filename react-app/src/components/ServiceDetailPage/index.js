import { getReviewsThunk } from "../../store/reviews";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom";

import PaymentInformationModal from "../PaymentInformationModal";
import { getServiceThunk } from "../../store/services";
import { createBookingThunk } from "../../store/bookings";
import { createBillingThunk } from "../../store/billings";
import { fetchUsers } from "../../store/session";

import "./ServiceDetailPage.css";
import OpenModalButton from "../OpenModalButton";
import { useModal } from "../../context/Modal";
import LoginFormModal from "../LoginFormModal";

import noImage from "./no-photo-available.jpeg";

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
  const [hasSelectedDate, setHasSelectedDate] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [overlay, setOverlay] = useState(false);


  const bannerImage =
    "https://st2.depositphotos.com/4612235/6944/i/450/depositphotos_69442233-stock-photo-man-with-lawn-mower.jpg";

  const [averageRating, setAverageRating] = useState("0.00");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isDescriptionLong, setIsDescriptionLong] = useState(false);

  const serviceDetail = useSelector(
    (state) => Object.values(state.services.singleService)[0]
  );

  // console.log("SERVICE DETAIL provider_id", serviceDetail?.provider_id);

  const reviews = useSelector((state) => Object.values(state.reviews.reviews));
  const serviceReviews = reviews.filter(
    (review) => review.service_id === parseInt(serviceId)
  );

  // console.log("service reviews", serviceReviews[3].review_image);
  const users = useSelector((state) => state.session.users || []);
  console.log("All Users:", users);



  // Function to calculate the average rating
  const calculateAverageRating = () => {
    if (serviceReviews.length === 0) {
      return "New"; //If no reviews
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
    if (serviceDetail && serviceDetail.service_description) {
      setIsDescriptionLong(serviceDetail.service_description.length > 200);
    } else {
      setIsDescriptionLong(false);
    }
  }, [serviceDetail]);

  // const calculateDescrptionLength = () => {
  //   if (serviceDetail && serviceDetail.service_description) {
  //   const descriptionLengthThreshold = 200;
  //   console.log("Description Length", serviceDetail.service_description.length);
  //   return serviceDetail.service_description.length > descriptionLengthThreshold;
  //   }
  // };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  useEffect(() => {
    dispatch(getServiceThunk(serviceId));
  }, [dispatch, serviceId]);

  useEffect(() => {
    dispatch(getReviewsThunk());
  }, [dispatch, reviews.length]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch], users.length);

  // Update the average rating whenever the serviceReviews array changes
  useEffect(() => {
    const newAverageRating = calculateAverageRating();
    setAverageRating(newAverageRating);
  }, [serviceReviews]);



  // useEffect(() => {
  //   const serviceDescriptionLength = calculateDescrptionLength();
  //    setIsDescriptionLong(serviceDescriptionLength);
  // }, [serviceDetail]);

  if (serviceDetail === undefined) {
    return null;
  }

  const handleBookNow = () => {
    setShowBookingModal(true);
  };

  const handleBookingDateChange = (event) => {
    const newErrors = {};
    setBookingDate(event.target.value);
    setHasSelectedDate(true);

    const selected_booking_date = event.target.value;
    const inputDate = new Date(selected_booking_date);
    const currentDate = new Date();

    if (inputDate < currentDate) {
      console.log("Date has already passed");
      newErrors.selected_booking_date = "Date has already passed";
    } else {
      console.log("Selected booking date:", event.target.value);
      // Clear the error if the date is valid
      newErrors.selected_booking_date = "";
    }

    setErrors(newErrors); // Update the errors state
  };

  const handleContinueToBilling = () => {
    // Check if the booking date is empty or in the past

    if (errors.selected_booking_date) {
      // Do not open the payment modal
      // console.log('bookingDate', bookingDate);
      return;
    }

    // Open the payment modal
    setShowPaymentModal(true);
  };

  const handleConfirmBooking = async (paymentInfo) => {
    // Set the payment info and close the payment modal
    setShowPaymentModal(false);
    // console.log("Payment Information:", paymentInfo);

    // Proceed with creating the booking
    const bookingData = {
      user_id: sessionUser.id,
      service_id: serviceId,
      start_date_and_time: bookingDate,
      status: true,
    };

    const newBooking = await dispatch(createBookingThunk(bookingData));
    // console.log("NEWBOOKING", newBooking);
    // const bookingId = newBooking.id;
    if (newBooking) {
      const newBilling = await dispatch(
        createBillingThunk(paymentInfo, newBooking.id)
      );
      // console.log("NEW BILLING", newBilling)
    }

    // console.log("Newly created booking data:", bookingData);
    history.push("/my-booked-services");
  };



  const openLoginModal = () => {
    openModal(<LoginFormModal />);
  };

  const handleDisable = !hasSelectedDate;


  const formatDate = (dateToFormat) => {
    const dateObject = new Date(dateToFormat);
    const formattedDate = dateObject.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      //   hour: '2-digit',
      // minute: '2-digit',
      // second: '2-digit',
      // hour12: false
    });
    return formattedDate;
  }

  const toggleFullScreenImage = (imageUrl) => {
    if (selectedImage === imageUrl) {
      // setSelectedImage(null); // Close fullscreen mode if the same image is clicked again
      return
    } else {
      setSelectedImage(imageUrl); // Open image in fullscreen mode
      setOverlay(true);
    }
  };

  const renderStars = (rating) => {
    let stars = [];
    for (let i = 0; i < Math.round(rating); i++) {
      stars.push('★');
    }
    return stars.join('');
  }


  const findReviewOwner = (userId) => {
    const user = users.find(user => user.id === userId);
    if (user) {
      return user.first_name;
    } else {
      return 'User not found';
    }
  };


  return (

    <div className="service-detail-container">
      <div className="service-detail-container__wrapper">

        {/* Navigation Info */}
        <div className="navigation-info"> <NavLink to='/' className='breadcrumbs'>Home</NavLink> &gt; {serviceDetail.service_title}
        </div>
        {/* Background Image Container */}

        <div
          className="service-detail-background-image-container"
          style={{
            backgroundImage: `url(${bannerImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundPositionY: "-100px",
            // backgroundPositionX: "-80px"
          }}
        >
          {sessionUser ? (
            <div>
              <h1 className="service-detail-header">
                {serviceDetail.service_title}
              </h1>
              {sessionUser.id !== serviceDetail.provider_id ? (
                <button onClick={handleBookNow}>Book Now</button>
              ) : null}
            </div>
          ) : (
            // <div className="background-image-container">
            <>
              <h1>{serviceDetail.service_title}</h1>
              <OpenModalButton
                buttonText="Book Now"
                onItemClick={openLoginModal}
                modalComponent={<LoginFormModal />}
              />
            </>
            // </div>
          )}

          {/* Booking Modal */}
          {showBookingModal && (
            <div className="booking-modal">
              {/* <h2>Book a Service</h2> */}
              <input
                type="datetime-local"
                placeholder="MM/DD/YYYY HH:mm AM"
                value={bookingDate}
                onChange={handleBookingDateChange}
              />

              {errors.selected_booking_date && (
                <p className="error-message">{errors.selected_booking_date}</p>
              )}
              <button onClick={handleContinueToBilling} disabled={handleDisable}>
                Continue to Billing
              </button>
            </div>
          )}
        </div>

        {/* Service Details */}
        <div className="service-details">
          <div className="service-detaild-description">
            <h2>Service Description</h2>
            <div>
              {/* <p className={showFullDescription ? 'service-description' : 'truncated-description'}> */}
              <p className={showFullDescription ? 'service-description' : 'truncated-description'}>
                {serviceDetail.service_description}
              </p>
              {/* <p>Provider Name {serviceDetail.provider_id}</p> */}
              {isDescriptionLong && (
                <button onClick={toggleDescription} className="description-toggle__btn">
                  {showFullDescription ? 'Read Less' : 'Read Full'}
                </button>
              )}
            </div>
            <p className="service-details__price">${serviceDetail.service_price}/hour</p>
          </div>
          <div className="service-details__img">
            <img src={serviceDetail.url} alt="Service" />
          </div>
        </div>

        {/* Display the Average Rating */}
        <div className="average-rating">
          <h2>Average Rating</h2>
          <p><span className="star-rating">★</span> {averageRating} / 5</p>
          <div>
            {/* <p>Dropdown menu</p> */}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="reviews-section">
          <h2>Reviews: </h2>

          {serviceReviews.length ? serviceReviews.map((review) => (
            <div key={review.id} className="review">
              {console.log("Review Image URL:", review.review_image)}
              <img
                src={review.review_image ? review.review_image : noImage}
                alt="Review Image"
                className={selectedImage === review.review_image ? "fullscreen" : ""}
                onClick={() => toggleFullScreenImage(review.review_image ? review.review_image : noImage)}

              />
              {selectedImage === review.review_image && overlay && (
                <div>
                  <div className="overlay"></div>
                  <div className="close-icon" onClick={() => setSelectedImage(null)}>×</div>
                </div>
              )}
              <div className="review-info">
                <p className="review-owner">{findReviewOwner(review.user_id)}{console.log(review.user_id)}</p>
                <p><span className="star-rating">{renderStars(parseFloat(review.star_rating))}</span> </p> {/*parseFloat(review.star_rating).toFixed(2)*/}
                <p>{review.review}</p>
                {review.created_at === review.updated_at ? (<p className="review-date">{formatDate(review.created_at)}</p>) : (<p className="review-date">{formatDate(review.updated_at)}</p>)}

              </div>
            </div>
          )) : (sessionUser.id === serviceDetail.provider_id ? (<p className="no-review-text">Wait till someone book your service!</p>):(<p className="no-review-text">Be the first to left the review!</p>))}
        </div>

        {showPaymentModal && (
          <PaymentInformationModal
            onClose={() => setShowPaymentModal(false)}
            onConfirmBooking={handleConfirmBooking}
          />
        )}
      </div>
    </div>
  );
};

export default ServiceDetailPage;
