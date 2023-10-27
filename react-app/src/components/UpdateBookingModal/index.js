import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateBookingThunk } from "../../store/bookings";

<<<<<<< HEAD
const UpdateBookingModal = ({ bookingId }) => {
=======
const UpdateBookingModal = ({ bookingId, onClose }) => {
>>>>>>> a9ed8be441d747db900fee3835d0556e07625114
  const sessionUser = useSelector((state) => state.session.user);
  const [bookingDate, setBookingDate] = useState(""); // Use an empty string
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleBookingDateChange = (event) => {
    const newErrors = {};
    const selected_booking_date = event.target.value;
    const inputDate = new Date(selected_booking_date);
    const currentDate = new Date();

    if (inputDate < currentDate) {
      newErrors.selected_booking_date = "Date has already passed";
    } else {
      newErrors.selected_booking_date = "";
    }
<<<<<<< HEAD

    setErrors(newErrors);
    setBookingDate(selected_booking_date);
=======
    setErrors(newErrors); // Update the errors state

>>>>>>> a9ed8be441d747db900fee3835d0556e07625114
  };

  const handleUpdateBooking = () => {
    const updatedBookingData = {
      user_id: sessionUser.id,
      start_date_and_time: bookingDate,
      status: true,
    };

    dispatch(updateBookingThunk(updatedBookingData, bookingId));

    onClose();
    closeModal();
  };

  return (
    <>
      <div className="update-booking-modal">
        <h2>Update Your Booking</h2>
        <input
          type="datetime-local"
          value={bookingDate}
          onChange={handleBookingDateChange}
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
