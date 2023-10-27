import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import DeleteReviewConfirmModal from "../DeleteReviewConfirmModal";
import BillingDetailsModal from "../BillingDetailsModal";

import PostReviewModal from "../PostReviewModal";

import { getBookingsThunk, deleteBookingThunk } from "../../store/bookings";
import { getUserReviewsThunk } from "../../store/reviews";

const MyBookedServices = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => Object.values(state.reviews.reviews));
  console.log("REVIEWS", reviews);
  const bookings = useSelector((state) => state.bookings.bookings);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState(true);

  const [isLoading, setIsLoading] = useState(true); // loading state
  const [showReviewModal, setShowReviewModal] = useState(false);

  const [userBookings, setUserBookings] = useState([]);
  const [userBookingsLength, setUserBookingsLength] = useState(0);

  useEffect(() => {
    dispatch(getBookingsThunk()).then(() => setIsLoading(false));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserReviewsThunk());
  }, [dispatch]);

  // This useEffect listens for changes in the bookings and sessionUser
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
      // Update the length of userBookings after a booking is deleted
      setUserBookingsLength(userBookingsLength - 1);
    });
  };

  const openReviewModal = () => {
    setShowReviewModal(true);
  };
  //   const test = reviews.filter((review)=>
  //     9 === review.service_id
  //     )
  // console.log(test)

  const checkUndefined = (value) => {
    if (value === undefined) return value;
    else return "";
  };

  return (
    <div className="my-booked-services-container">
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
              <div key={booking.id} className="service-container">
                <h3>Booking ID: {booking.id}</h3>
                <p>User ID: {booking.user_id}</p>
                <p>Service ID: {booking.service_id}</p>
                <p>Date and Time: {booking.start_date_and_time}</p>
                <p>Status: Upcoming</p>
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
              <div key={booking.id} className="service-container">
                <h3>Booking ID: {booking.id}</h3>
                <OpenModalButton
                  buttonText="Billing Details"
                  modalComponent={
                    <BillingDetailsModal bookingId={booking.id} />
                  }
                />
                <p>User ID: {booking.user_id}</p>
                <p>Service ID: {booking.service_id}</p>
                <p>Date and Time: {booking.start_date_and_time}</p>
                <p>Status: Previous</p>
                <p>
                  Review:
                  {checkUndefined(
                    reviews.filter(
                      (review) => booking.service_id === review.service_id
                    )[0].review
                  )}
                </p>

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

                {/* <button >Delete review</button> */}
                <OpenModalButton
                  buttonText="Delete your Review"
                  modalComponent={
                    <DeleteReviewConfirmModal
                      reviewId={() =>
                        checkUndefined(
                          reviews.filter(
                            (review) => booking.service_id === review.service_id
                          )[0].id
                        )
                      }
                    />
                  }
                />
                {/* <button onClick={openReviewModal}>Add Your Review</button> */}

                <button onClick={() => handleDelete(booking.id)}>
                  Delete this Booking
                </button>

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
