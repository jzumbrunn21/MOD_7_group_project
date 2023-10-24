import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserServicesThunk } from "../../store/services";
import { Link, useHistory } from "react-router-dom";
import { deleteServiceThunk } from "../../store/services";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import {Modal, useModal} from '../../context/Modal'

const MyOfferedServices = () => {
  const dispatch = useDispatch();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const userServices = useSelector((state) =>
    Object.values(state.services.services)
  );
  const{ closeModal} = useModal()
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getUserServicesThunk());
  }, [dispatch]);

  if (userServices === undefined) return null;

  // const onServiceUpdate = (serviceId) => {};

  // const onServiceDelete = async (serviceId) => {
  //   await dispatch(deleteServiceThunk(sessionUser.id))

  //   closeModal()
  // };

  const onCreateNewService = () => {};


  // const {closeModal} = Modal


// const handleDelete= async(e) =>{
//   e.preventDefault()
//   await dispatch(deleteServiceThunk())

//     closeModal()
// }



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
              {/* <button onClick={() => onServiceDelete(service.id)}>
                Delete
              </button> */}
              <button className="delete-button" onClick={() => setShowDeleteConfirmation(true)}>
                Delete
              </button>

            </div>
              <DeleteConfirmationModal
                show={showDeleteConfirmation}
                onCancel={() => setShowDeleteConfirmation(false)}

                serviceId={service.id}
              />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOfferedServices;
