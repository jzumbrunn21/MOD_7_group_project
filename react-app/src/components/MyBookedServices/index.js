import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBookingsThunk } from '../../store/bookings';

const MyBookedServices = () => {
  const bookings = useSelector((state) => Object.values(state.bookings.bookings));
  console.log("***Bookings***",typeof bookings)
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(true);

  useEffect(() => {
    dispatch(getBookingsThunk());
  }, [dispatch]);

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
      {activeTab ? (
        <div className="upcoming-services">
          {bookings
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
          {bookings
            .filter((booking) => booking.status === false)
            .map((booking) => (
              <div key={booking.id} className="service-container">
                <h3>Booking ID: {booking.id}</h3>
                <p>User ID: {booking.user_id}</p>
                <p>Service ID: {booking.service_id}</p>
                <p>Date and Time: {booking.start_date_and_time}</p>
                <p>Status: Previous</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default MyBookedServices;
