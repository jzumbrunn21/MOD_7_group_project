import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserServicesThunk } from "../../store/services";
import { Link, useHistory } from "react-router-dom";


const MyOfferedServices = () => {
  const dispatch = useDispatch();
  const userServices = useSelector((state) =>
    Object.values(state.services.services)
  );

  useEffect(() => {
    dispatch(getUserServicesThunk());
  }, [dispatch]);

  if (userServices === undefined) return null;

  const onServiceUpdate = (serviceId) => {};

  const onServiceDelete = (serviceId) => {};

  const onCreateNewService = () => {};

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

              <button onClick={() => onServiceDelete(service.provider_id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOfferedServices;
