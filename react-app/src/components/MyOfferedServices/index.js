import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserServicesThunk } from "../../store/services";
import OpenModalButton from "../OpenModalButton";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteServiceThunk } from "../../store/services";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import { Modal, useModal } from "../../context/Modal";
import UpdateService from "../UpdateService";

const MyOfferedServices = () => {
  const dispatch = useDispatch();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const { serviceId } = useParams();

  const userServices = useSelector((state) =>
    Object.values(state.services.services)
  );

  const history = useHistory();
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getUserServicesThunk());
  }, [dispatch]);

  if (userServices === undefined) return null;

  const onCreateNewService = () => {
    history.push("/create-service");
  };

  return (
    <div className="my-offered-services-container">
      {/* Background Image Container */}
      <div className="background-image-container">
        <h1>My Offered Services</h1>
        <button onClick={onCreateNewService}>Create Your New Service</button>
      </div>

      {/* List of Offered Services */}
      <div className="offered-services-list">
        {userServices.map((service) => (
          <div key={service.provider_id} className="service-container">
            <img src={service.url} alt={service.service_title} />
            <div className="service-info">
              <h3>{service.service_title}</h3>
              <p>{service.service_description}</p>
              <p>Reviews: {service.reviews}</p>
            </div>
            <div className="service-actions">
              <Link
                className="update-service-button"
                to={`/services/update/${service.id}`}
              >
                Update
              </Link>
              <button
                className="delete-button"
                onClick={() => setShowDeleteConfirmation(true)}
              >
                Delete
              </button>
              <DeleteConfirmationModal
                show={showDeleteConfirmation}
                onCancel={() => setShowDeleteConfirmation(false)}
                serviceId={service.id}
              />
            </div>
            {/* <OpenModalButton
              buttonText="Delete"
              modalComponent={<DeleteConfirmationModal />}
            /> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOfferedServices;
