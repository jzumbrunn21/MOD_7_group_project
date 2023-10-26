import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./ViewServicesList.css";
import { getServicesThunk, getImageThunk } from "../../store/services";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";

const ViewServicesList = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const services = useSelector((state) =>
    Object.values(state.services.services)
  );
  const [categoryFilter, setCategoryFilter] = useState(null);

  useEffect(() => {
    dispatch(getServicesThunk());
  }, [dispatch]);

  const handleFilter = (e) => {
    const inputCategory = e.target.value.toLowerCase();
    if (inputCategory) {
      setCategoryFilter(inputCategory);
    } else {
      setCategoryFilter(null);
    }
  };

  // Use useModal to access the openModal function
  const { openModal } = useModal();

  // Define a function to open the login modal
  const openLoginModal = () => {
    openModal(<LoginFormModal />);
  };

  // Function to clear the filter
  const clearFilter = () => {
    setCategoryFilter(null);
  };

  // Filter services based on the selected category
  const filteredServices = categoryFilter
    ? services.filter(
      (service) =>
        service.service_category.toLowerCase().startsWith(categoryFilter)
    )
    : services;

  // Define the test label based on the selected category
  const testLabel = categoryFilter
    ? `This is your result for category: ${categoryFilter}`
    : "";

  // Function to handle category clicks and update the filter
  const handleCategoryClick = (category) => {
    setCategoryFilter(category);
  };

  // Categories to display as buttons
  const categories = ["Cleaning", "Lawn Service", "Moving"];

  return (
    <div className="services-list-container">
      <div className="services-header">
        <h1>{sessionUser ? "Book Your Next Task" : "Get help, Gain happiness"}</h1>
        {!sessionUser && <p>Just tasks.</p>}
        {!sessionUser && (
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for services"
              onChange={handleFilter}
            />
            <OpenModalButton buttonText="Get Help Today" onItemClick={openLoginModal} modalComponent={<LoginFormModal />} />
          </div>
        )}
        {sessionUser && (
          <div className="search-bar-with-login">
            <input
              type="text"
              placeholder="Search for services"
              onChange={handleFilter}
            />
          </div>
        )}
        <div className="service-labels">
          {/* Map through categories and create clickable labels */}
          {categories.map((category) => (
            <span key={category} onClick={() => handleCategoryClick(category.toLowerCase())}>
              {category}
            </span>
          ))}
          <span onClick={clearFilter}>All Services</span>
        </div>
      </div>
      <div className="popular-projects">
        <h2>Popular Projects Recommended for You</h2>
      </div>
      {testLabel && <p>{testLabel}</p>}
      <div className="services-grid">
        {filteredServices.map((service) => (
          <Link to={`/services/${service.id}`} key={service.id} className="service-container">
            <img src={service.url} alt={service.title} />
            <div className="service-info">
              <h3>{service.service_title}</h3>
              <p>{service.service_description}</p>
              <div className="price-rating-wrapper">
                <p>Price ${service.service_price}/h</p>
                <p>Rating:★ {service.rating}/5</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ViewServicesList;
