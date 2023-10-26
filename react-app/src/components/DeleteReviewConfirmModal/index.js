import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { deleteReviewThunk } from "../../store/reviews";
import { Modal, useModal } from "../../context/Modal";

const DeleteConfirmationModal = ({ reviewId, show, onCancel }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteReviewThunk(reviewId));
    closeModal();
  };
  // if (!show) return null;
  const handleCancel = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <div className="delete-confirmation-modal">
      <h3>Confirm Delete</h3>
      <p>Are you sure you want to remove this review?</p>
      <div className="button-container">
        <button className="confirm-delete-button" onClick={handleDelete}>
          Yes (Delete review)
        </button>
        {/* <button className="cancel-delete-button" onClick={onCancel}> */}
        <button className="cancel-delete-button" onClick={handleCancel}>
          No (Keep review)
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
