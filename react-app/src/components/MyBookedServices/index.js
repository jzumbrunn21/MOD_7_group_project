import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import DeleteReviewConfirmModal from "../DeleteReviewConfirmModal";
import UpdateBookingModal from "../UpdateBookingModal";
import PostReviewModal from "../PostReviewModal";
import { getBookingsThunk, deleteBookingThunk, updateBookingThunk } from "../../store/bookings";
import "./MyBookedServices.css";

import BillingDetailsModal from "../BillingDetailsModal";

import { getUserReviewsThunk } from "../../store/reviews";
import { getServicesThunk } from "../../store/services";

const MyBookedServices = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => Object.values(state.reviews.reviews));
  const bookings = useSelector((state) => state.bookings.bookings);
  const services = useSelector((state) => Object.values(state.services.services));
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [userBookings, setUserBookings] = useState([]);
  const [userBookingsLength, setUserBookingsLength] = useState(0);

  useEffect(() => {
    dispatch(getBookingsThunk()).then(() => setIsLoading(false));
  }, [dispatch, modalActive]);

  useEffect(() => {
    dispatch(getUserReviewsThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getServicesThunk());
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading) {
      const filteredUserBookings = Object.values(bookings).filter(
        (booking) => booking.user_id === sessionUser.id
      );
      setUserBookings(filteredUserBookings);
      const newLength = filteredUserBookings.length;

      if (newLength !== userBookingsLength) {
        setUserBookingsLength(newLength);
      }
    }
  }, [bookings, sessionUser, isLoading, userBookingsLength]);

  const handleDelete = (bookingId) => {
    dispatch(deleteBookingThunk(bookingId)).then(() => {
      setUserBookingsLength(userBookingsLength - 1);
    });
  };

  const openReviewModal = () => {
    setShowReviewModal(true);
  };

  const handleUpdateBooking = (bookingId, newDate) => {
    const updatedBookingData = {
      start_date_and_time: newDate,
    };

    dispatch(updateBookingThunk(updatedBookingData, bookingId)).then(() => { });
  };

  const handleUpdateStatus = (bookingId, sameDate) => {
    const bookingData = {
      status: false,
    };

    dispatch(updateBookingThunk(bookingData, bookingId));
  };

  const closeUpdateModal = () => {
    setModalActive(!modalActive);
  };

  const checkIfReview = (value) => {
    return value === undefined;
  };

  const addReviewModal = (booking) => (
    <OpenModalButton
      buttonText="Update your Review"
      className="update-review-btn"
      modalComponent={
        <PostReviewModal
          serviceTitle="Service Title"
          onSubmit={() => setShowReviewModal(false)}
          serviceId={booking.service_id}
        />
      }
    />
  );

  const updateReviewModal = (booking) => (
    <OpenModalButton
      buttonText="Add your Review"
      modalComponent={
        <PostReviewModal
          serviceTitle="Service Title"
          onSubmit={() => setShowReviewModal(false)}
          serviceId={booking.service_id}
        />
      }
    />
  );

  const deleteReview = (booking) => (
    <OpenModalButton
      buttonText="Delete your Review"
      className="delete-review-btn"
      modalComponent={
        <DeleteReviewConfirmModal
          reviewId={
            reviews.filter(
              (review) => booking.service_id === review.service_id
            )[0]?.id
          }
        />
      }
    />
  );

  const updateReview = (booking) => (
    <OpenModalButton
      buttonText="Add your Review"
      modalComponent={
        <PostReviewModal
          serviceTitle="Service Title"
          onSubmit={() => setShowReviewModal(false)}
          serviceId={booking.service_id}
        />
      }
    />
  );

  const checkUndefined = (value) => {
    return value === undefined ? value : "";
  };

  if (services === undefined) {
    return null;
  }

  return (
    <div className="my-booked-services-container">
      <h1 className="my-bookings-title">My Booked Services</h1>
      <div className="tabs">
        <button
          className={activeTab ? "active" : ""}
          onClick={() => setActiveTab(true)}
        >
          Upcoming
        </button>
        <button
          className={!activeTab ? "active" : ""}
          onClick={() => setActiveTab(false)}
        >
          Previous
        </button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : activeTab ? (
        <div className="upcoming-services">
          {userBookings
            .filter((booking) => booking.status === true)
            .map((booking) => (
              <div key={booking.id} className="upcoming-my-bookings-service-container">
                <div className="booking-billing-wrapper">
                  <h3>Booking ID #{booking.id}</h3>
                  <OpenModalButton
                  className="billing-details-btn"
                    buttonText="Billing Details"
                    modalComponent={<BillingDetailsModal bookingId={booking.id} />}
                  />
                </div>
                <div className="upcoming-service-details">
                  <p>Service Category: {services.filter((service) => service.id === booking.service_id)[0]?.service_category}</p>
                  <p>Service: {services.filter((service) => service.id === booking.service_id)[0]?.service_title}</p>
                </div>
                <div className="date-time-wrapper">
                  <p>Date and Time: {booking.start_date_and_time}</p>
                  <OpenModalButton
                    buttonText="Update"
                    onButtonClick={() => setModalActive(!modalActive)}
                    onModalClose={() => setModalActive(!modalActive)}
                    modalComponent={
                      <UpdateBookingModal
                        bookingId={booking.id}
                        onUpdateBooking={() => handleUpdateBooking}
                      />
                    }
                  />
                </div>
                <div className="status-wrapper">
                  <p>Status: Upcoming</p>
                  <button className="update-buttton" onClick={() => handleUpdateStatus(booking.id, booking.start_date_and_time)}>Update Status</button>
                </div>
                <button className="delete-button" onClick={() => handleDelete(booking.id)}>
                  Delete this Booking
                </button>
              </div>
            ))}
        </div>
      ) : (
        <div className="previous-services">
          {userBookings
            .filter((booking) => booking.status === false)
            .map((booking) => (
              <div key={booking.id} className="previous-my-bookings-service-container">
                <div className="booking-name-and-billing">
                  <h3>Booking ID #{booking.id}</h3>
                  <OpenModalButton
                    buttonText="Billing Details"
                    modalComponent={<BillingDetailsModal bookingId={booking.id} />}
                  />
                </div>
                <div className="booking-information">
                  <p>Service Category: {services.filter((service) => service.id === booking.service_id)[0]?.service_category}</p>
                  <p>Service: {services.filter((service) => service.id === booking.service_id)[0]?.service_title}</p>
                  <p>Date and Time: {booking.start_date_and_time}</p>
                </div>
                <div className="booking-status-review">
                  <p>Status: Completed</p>
                  <p>Review: {reviews.filter((review) => booking.service_id === review.service_id)[0]?.review}</p>
                </div>
                <div className="booking-action-buttons">
                  {checkIfReview(reviews.filter((review) => booking.service_id === review.service_id)[0]?.review) ? (
                    updateReviewModal(booking)
                  ) : (
                    <div className="update-buttons">
                      {addReviewModal(booking)}
                      {deleteReview(booking)}
                    </div>
                  )}
                  <button className="delete-button" onClick={() => handleDelete(booking.id)}>
                    Delete this Booking
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default MyBookedServices;
