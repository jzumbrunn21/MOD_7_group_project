import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./DeleteConfirmationModal.css";
import { deleteServiceThunk } from "../../store/services";
import { Modal, useModal } from "../../context/Modal";

const DeleteConfirmationModal = ({ serviceId, show, onCancel }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteServiceThunk(serviceId));
    closeModal();
  };
  // if (!show) return null;

  return (
    <div className="delete-confirmation-modal">
      <h3>Confirm Delete</h3>
      <p>Are you sure you want to remove this service?</p>
      <div className="button-container">
        <button className="confirm-delete-button" onClick={handleDelete}>
          Yes (Delete service)
        </button>
        <button className="cancel-delete-button" onClick={onCancel}>
          No (Keep service)
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
