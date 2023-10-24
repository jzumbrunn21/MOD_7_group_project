import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./ViewServicesList.css";
import { getServicesThunk, getImageThunk } from "../../store/services";

const ViewServicesList = () => {
  const dispatch = useDispatch();
  const services = useSelector((state) =>
    Object.values(state.services.services)
  );

  // const image = useSelector((state) => {
  //   Object.values(state.services.services.serviceImages);
  // });
  // console.log("IMAGE", image);
  // useEffect(() => {
  //   dispatch(getImageThunk());
  // }, [dispatch]);

  useEffect(() => {
    dispatch(getServicesThunk());
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
        {services.map((service) => (
          <Link
            to={`/services/${service.id}`}
            key={service.id}
            className="service-container"
          >
            <img src={service.url} alt={service.title} />
            <div className="service-info">
              <h3>{service.service_title}</h3>
              <p>{service.service_description}</p>
              <p>${service.service_price}</p>
              <p>Rating: {service.rating}/5</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ViewServicesList;
