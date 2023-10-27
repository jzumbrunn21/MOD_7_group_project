import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserServicesThunk } from "../../store/services";
import OpenModalButton from "../OpenModalButton";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteServiceThunk } from "../../store/services";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import { Modal, useModal } from "../../context/Modal";
import UpdateService from "../UpdateService";

import "./MyOfferedServices.css"

const MyOfferedServices = () => {
  const dispatch = useDispatch();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const userServices = useSelector((state) =>
    Object.values(state.services.services)
  );
  const [currentServices, setCurrentServices] = useState(userServices);

  const { serviceId } = useParams();

  const history = useHistory();
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    setCurrentServices(userServices);
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
          <div key={service.id} className="offered-service-container">
            <div className="image-wrapper">
              <img className="my-services-img" src={service.url} alt={service.service_title} />
            </div>
            <div className="my-services-info">
              <div className="service-info">
                <h3 className="service-title">{service.service_title}</h3>
                <p className="service-description">{service.service_description}</p>
              </div>
              <div className="service-actions">
                <span className="reviews">Reviews: {service.reviews}</span>
                <div className="service-btns">
                  <Link
                    className="update-service-button"
                    to={`/services/update/${service.id}`}
                  >
                    Update
                  </Link>
                  <OpenModalButton
                    className="delete-button"
                    buttonText="Delete"
                    modalComponent={
                      <DeleteConfirmationModal
                        show={showDeleteConfirmation}
                        onCancel={() => setShowDeleteConfirmation(false)}
                        serviceId={service.id}
                      />
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOfferedServices;
