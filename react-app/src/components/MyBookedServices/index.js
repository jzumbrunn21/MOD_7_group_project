import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import DeleteReviewConfirmModal from "../DeleteReviewConfirmModal";
import UpdateBookingModal from "../UpdateBookingModal";
import PostReviewModal from "../PostReviewModal";
import { getBookingsThunk, deleteBookingThunk, updateBookingThunk } from "../../store/bookings";
import { getUserReviewsThunk } from "../../store/reviews";

const MyBookedServices = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => Object.values(state.reviews.reviews));
  const bookings = useSelector((state) => state.bookings.bookings);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [userBookings, setUserBookings] = useState([]);
  const [userBookingsLength, setUserBookingsLength] = useState(0);

  useEffect(() => {
<<<<<<< HEAD
=======
    // setCurrentBookings(bookings);
    console.log("***HIT GET BOOKINGS")
>>>>>>> a9ed8be441d747db900fee3835d0556e07625114
    dispatch(getBookingsThunk()).then(() => setIsLoading(false));
  }, [dispatch, modalActive]);

  useEffect(() => {
    console.log("***HIT GET USER REVIEWS")
    dispatch(getUserReviewsThunk());
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

    dispatch(updateBookingThunk(updatedBookingData, bookingId)).then(() => {
    });
  };

  const closeUpdateModal = () => {
    setModalActive(!modalActive);
  }

  const checkUndefined = (value) => {
    if (value === undefined) return value;
    else return "";
  };
  console.log("****MODAL ACTIVE CHECK", modalActive)
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
                <div>
                  <OpenModalButton
                    buttonText="Update"
<<<<<<< HEAD
                    onButtonClick={() => setModalActive(!modalActive)}
                    onModalClose={() => setModalActive(!modalActive)}
                    modalComponent={
                      <UpdateBookingModal
                        bookingId={booking.id}
                        onUpdateBooking={handleUpdateBooking}
=======
                    onButtonClick={(e) => setModalActive(!modalActive)}
                    // onModalClose={(e) => setModalActive(!modalActive)}
                    modalComponent={
                      <UpdateBookingModal bookingId={booking.id}
                        onClose={closeUpdateModal}
>>>>>>> a9ed8be441d747db900fee3835d0556e07625114
                      />
                    }
                  />
                </div>
                <button onClick={() => handleDelete(booking.id)}>Delete</button>
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
                <p>User ID: {booking.user_id}</p>
                <p>Service ID: {booking.service_id}</p>
                <p>Date and Time: {booking.start_date_and_time}</p>
                <p>Status: Previous</p>
                <p>
                  Review:{" "}
                  {checkUndefined(
                    reviews.find(
                      (review) => booking.service_id === review.service_id
                    )?.review
                  )}
                </p>
                <OpenModalButton
                  buttonText="Delete your Review"
                  modalComponent={
                    <DeleteReviewConfirmModal
                      reviewId={reviews.find(
                        (review) => booking.service_id === review.service_id
                      )?.id}
                    />
                  }
                />
                <button onClick={openReviewModal}>Add Your Review</button>
                <button onClick={() => handleDelete(booking.id)}>Delete</button>
                {showReviewModal && (
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
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default MyBookedServices;
