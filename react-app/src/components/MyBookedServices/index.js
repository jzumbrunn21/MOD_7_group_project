import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBookingsThunk } from '../../store/bookings';
import PostReviewModal from '../PostReviewModal';

const MyBookedServices = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const bookings = useSelector((state) => state.bookings.bookings);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(true);
  const [isLoading, setIsLoading] = useState(true); // loading state
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    // Fetch bookings and set isLoading to false when done
    dispatch(getBookingsThunk()).then(() => setIsLoading(false));
  }, [dispatch]);

  const userBookings = Object.values(bookings).filter(
    (booking) => booking.user_id === sessionUser.id
  );

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
                </div>
              ))}
          </div>
        )
      )}
      {showReviewModal && (
        <PostReviewModal
          serviceTitle="Service Title"
          onSubmit={() => setShowReviewModal(false)}
        />
      )}
    </div>
  );
};

export default MyBookedServices;
