import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './ViewServicesList.css';


const ViewServicesList = () => {
    const dispatch = useDispatch();

    useEffect(() => {

  }, [dispatch]);


  return (
    <div className="services-list-container">
      <div className="services-header">
        <h1>Get help, Gain happiness</h1>
        <p>Just tasks.</p>
        <div className="search-bar">
          <input type="text" placeholder="Search for services" />
          <button>Get Help Today</button>
        </div>
        <div className="service-labels">
          <span>Cleaning</span>
          <span>Helping Moving</span>
          <span>Ikea Assembly</span>
          <span>Cleaning</span>
        </div>
      </div>
      <div className="popular-projects">
        <h2>Popular Projects Recommended for You</h2>
      </div>
      <div className="services-grid">
        {/* need to be replace with actual data from state management */}
        {/* {services.map((service) => (
          <Link to={`/service/${service.id}`} key={service.id} className="service-container">
            <img src={service.imageUrl} alt={service.title} />
            <div className="service-info">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <p>${service.price}</p>
              <p>Rating: {service.rating}/5</p>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
}



export default ViewServicesList