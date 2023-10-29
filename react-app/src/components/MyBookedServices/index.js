import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import DeleteReviewConfirmModal from "../DeleteReviewConfirmModal";
import UpdateBookingModal from "../UpdateBookingModal";
import PostReviewModal from "../PostReviewModal";
import { getBookingsThunk, deleteBookingThunk, updateBookingThunk } from "../../store/bookings";
import "./MyBookedServices.css"

import BillingDetailsModal from "../BillingDetailsModal";

import { getUserReviewsThunk } from "../../store/reviews";
import { getServicesThunk } from "../../store/services";

const MyBookedServices = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => Object.values(state.reviews.reviews));
  const bookings = useSelector((state) => state.bookings.bookings);
  const services = useSelector((state) => Object.values(state.services.services))
  // console.log("here are the services ***", services)
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
    // console.log("***HIT GET USER REVIEWS")
    dispatch(getUserReviewsThunk());
  }, [dispatch]);

  useEffect(() =>{
    dispatch(getServicesThunk())
  }, [dispatch])

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

    dispatch(updateBookingThunk(updatedBookingData, bookingId)).then(() => {
    });
  };

  const closeUpdateModal = () => {
    setModalActive(!modalActive);
  }


  const checkIfReview = (value) => {
    if (value === undefined) return true;
    else return false
  };

  //The add review modal
  const addReviewModal = (booking) => {
    return (<OpenModalButton
      buttonText="Add your Review"
      modalComponent={
        <PostReviewModal
          serviceTitle="Service Title"
          onSubmit={() => setShowReviewModal(false)}
          serviceId={booking.service_id}
        />
      }
    />)
  }

  // The delete review modal
  const deleteReview = (booking) => {
    return (<OpenModalButton
      buttonText="Delete your Review"
      modalComponent={
        <DeleteReviewConfirmModal
          reviewId={
            reviews.filter(
              (review) => booking.service_id === review.service_id
            )[0]?.id
          }
        />
      }
    />)
  }

    const checkUndefined = (value) => {
      if (value === undefined) return value;
      else return "";
    };

    if (services === undefined){
      return null
    }

    console.log("****MODAL ACTIVE CHECK", modalActive)
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
                  <h3>Booking ID #{booking.id}</h3>
                  {/* <p>User ID: {booking.user_id}</p> */}
                  {/* <p>Service ID: {booking.service_id}</p> */}
                  <div className="upcoming-service-details">
                  <p>Service Category: {services.filter(service => service.id === booking.service_id)[0]?.service_category}</p>
                  <p>Service: {services.filter(service => service.id === booking.service_id)[0]?.service_title}</p>
                  </div>
                  <p>Date and Time: {booking.start_date_and_time}</p>
                  <p>Status: Upcoming</p>

                  <div>
                    <OpenModalButton
                      buttonText="Update"
                      onButtonClick={() => setModalActive(!modalActive)}
                      onModalClose={() => setModalActive(!modalActive)}
                      modalComponent={
                        <UpdateBookingModal
                          bookingId={booking.id}
                          onUpdateBooking={handleUpdateBooking}
                        />
                      }
                    />
                  </div>


                  <OpenModalButton
                    buttonText="Billing Details"
                    modalComponent={
                      <BillingDetailsModal bookingId={booking.id} />
                    }
                  />
                  <button onClick={() => handleDelete(booking.id)}>
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
                    modalComponent={
                      <BillingDetailsModal bookingId={booking.id} />
                    }
                  />
                  </div>
                  <div className="booking-information">
                  {/* <p>User ID: {booking.user_id}</p>
                  <p>Service ID: {booking.service_id}</p> */}
                  <p>Service Category: {services.filter(service => service.id === booking.service_id)[0]?.service_category}</p>
                  <p>Service: {services.filter(service => service.id === booking.service_id)[0]?.service_title}</p>
                  {/* <p>Service: {services.filter(service => service.id === booking.service_id)}</p> */}
                  <p>Date and Time: {booking.start_date_and_time}</p>
                  </div>
                  <div className="booking-status-review">
                  <p>Status: Completed</p>
                  <p>

                    Review: {reviews.filter((review) => booking.service_id === review.service_id)[0]?.review}
                    {/* {() => checkUndefined(
                    reviews.filter(
                      (review) => booking.service_id === review.service_id
                    )[0].review)} */}
                  </p>
                  </div>
                  <p className="booking-action-buttons">
                  {checkIfReview(reviews.filter((review) => booking.service_id === review.service_id)[0]?.review) ? addReviewModal(booking) : deleteReview(booking)}
                  {/* // <OpenModalButton */}
                  {/* //   buttonText="Add your Review"
                //   modalComponent={
                //     <PostReviewModal
                //       serviceTitle="Service Title"
                //       onSubmit={() => setShowReviewModal(false)}
                //       serviceId={booking.service_id}
                //     />
                //   }
                // /> */}


                  {/* <OpenModalButton
                  buttonText="Delete your Review"
                  modalComponent={
                    <DeleteReviewConfirmModal
                      reviewId={
                          reviews.filter(
                            (review) => booking.service_id === review.service_id
                          )[0]?.id
                      }
                    />
                  }
                /> */}



                  {/* <button >Delete review</button> */}

                  {/* <button onClick={openReviewModal}>Add Your Review</button> */}

                  <button onClick={() => handleDelete(booking.id)}>
                    Delete this Booking
                  </button>
                  </p>
                  {/* {showReviewModal && ( */}

                  {/* )} */}
                </div>
              ))}
          </div>
        )}
      </div>
    );
  };
export default MyBookedServices;
