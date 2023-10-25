import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import PostReviewModal from '../PostReviewModal';

import { getBookingsThunk, deleteBookingThunk } from '../../store/bookings';


const MyBookedServices = () => {
  const sessionUser = useSelector((state) => state.session.user);
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

  return (
    <div className="my-booked-services-container">
      <div className="tabs">
        <button
          className={activeTab ? 'active' : ''}
          onClick={() => setActiveTab(true)}
        >
          Upcoming
        </button>
        <button
          className={!activeTab ? 'active' : ''}
          onClick={() => setActiveTab(false)}
        >
          Previous
        </button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        activeTab ? (
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

                  <button onClick={openReviewModal}>Add Your Review</button>

                  <button onClick={() => handleDelete(booking.id)}>Delete</button>


                 {showReviewModal && (
                  <PostReviewModal
                    serviceTitle="Service Title"
                    onSubmit={() => setShowReviewModal(false)}
                    serviceId={booking.service_id}
                  />
                )}
                 </div>
              ))}
          </div>
        )
      )}

    </div>
  );
};

export default MyBookedServices;
