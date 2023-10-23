import React from 'react';

const MyOfferedServices = () => {


  const onServiceUpdate = (serviceId) => {

  };

  const onServiceDelete = (serviceId) => {

  };

  const onCreateNewService = () => {

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
        {/* {services.map((service) => (
          <div key={service.id} className="service-container">
            <img src={service.imageUrl} alt={service.title} />
            <div className="service-info">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <p>Reviews: {service.reviews}</p>
            </div>
            <div className="service-actions">
              <button onClick={() => onServiceUpdate(service.id)}>Update</button>
              <button onClick={() => onServiceDelete(service.id)}>Delete</button>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default MyOfferedServices;
