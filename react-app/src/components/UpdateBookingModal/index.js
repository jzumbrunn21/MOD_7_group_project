import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { useModal } from "../../context/Modal";
import { updateBookingThunk } from "../../store/bookings";
const UpdateBookingModal = ({ bookingId }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const [bookingDate, setBookingDate] = useState(new Date());
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { closeModal } = useModal();

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

  //   setBookingDate(bookingDate);
  const start_date_and_time = bookingDate;
  const handleUpdateBooking = () => {
    const updatedBookingData = {
      //   user_id: sessionUser.id,
      //   service_id: serviceId,
      start_date_and_time,
      status: true,
    };
    console.log("Newly created booking data:", updatedBookingData);
    dispatch(updateBookingThunk(updatedBookingData, bookingId));
    closeModal();

    // history.push("/my-booked-services");
  };

  return (
    <>
      <div className="update-booking-modal">
        <h2>Update Your Booking</h2>
        <input
          type="datetime-local"
          placeholder="MM/DD/YYYY HH:mm AM"
          value={bookingDate}
          //   onChange={handleBookingDateChange}
          onChange={(e) => setBookingDate(e.target.value)}
        />

        {errors.selected_booking_date && (
          <p className="error-message">{errors.selected_booking_date}</p>
        )}

        <button onClick={handleUpdateBooking}>Update Booking</button>
      </div>
    </>
  );
};
export default UpdateBookingModal;
