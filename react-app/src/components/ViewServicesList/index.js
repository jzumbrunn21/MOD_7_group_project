import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./ViewServicesList.css";
import { getServicesThunk } from "../../store/services";
import { getReviewsThunk } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import noImage from "./no-photo-available.jpeg";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";

const ViewServicesList = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const services = useSelector((state) =>
    Object.values(state.services.services)
  );
  const [categoryFilter, setCategoryFilter] = useState(null);
  const reviews = useSelector((state) => Object.values(state.reviews.reviews));

  // Calculate average ratings using useMemo
  const averageRatings = useMemo(() => {
    const averageRatingsData = {};

    services.forEach((service) => {
      const serviceId = service.id;
      const serviceReviews = reviews.filter(
        (review) => review.service_id === serviceId
      );

      if (serviceReviews.length === 0) {
        averageRatingsData[serviceId] = "New";
      } else {
        const sum = serviceReviews.reduce((total, review) => {
          const rating = parseFloat(review.star_rating);
          return isNaN(rating) ? total : total + rating;
        }, 0);

        const average = (sum / serviceReviews.length).toFixed(2);
        averageRatingsData[serviceId] = average;
      }
    });

    return averageRatingsData;
  }, [services, reviews]);

  useEffect(() => {
    dispatch(getServicesThunk());
    dispatch(getReviewsThunk());
  }, [dispatch]);

  const handleFilter = (e) => {
    const inputCategory = e.target.value.toLowerCase();
    if (inputCategory) {
      setCategoryFilter(inputCategory);
    } else {
      setCategoryFilter(null);
    }
  };

  const { openModal } = useModal();

  const openLoginModal = () => {
    openModal(<LoginFormModal />);
  };

  const clearFilter = () => {
    setCategoryFilter(null);
  };

  const filteredServices = categoryFilter
    ? services.filter((service) =>
      service.service_category.toLowerCase().startsWith(categoryFilter)
    )
    : services;

  const testLabel = categoryFilter
    ? `This is your result for category: ${categoryFilter}`
    : "";

  const categories = ["Cleaning", "Lawn Service", "Moving"];
  const bannerImage =
    "https://as1.ftcdn.net/v2/jpg/04/27/47/64/1000_F_427476485_oTb1JxGzFAc5MnVb6KoCoZYTgCNm6fSk.jpg";

    const invalidImage = (e) => {
      e.currentTarget.src = noImage;
    };

  return (
    <div className="services-list-container">
      <div
        className="services-header"
        style={{
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
          opacity: 1.1
        }}
      >
        <h1 className="main-header">
          {sessionUser ? "Book Your Next Task" : "Get help, Gain happiness"}
        </h1>
        {!sessionUser && <p className="main-header">Just tasks.</p>}
        {!sessionUser && (
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for services"
              onChange={handleFilter}
            />
            <OpenModalButton
              buttonText="Get Help Today"
              onItemClick={openLoginModal}
              modalComponent={<LoginFormModal />}
            />
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
          {categories.map((category) => (
            <span
              key={category}
              onClick={() => setCategoryFilter(category.toLowerCase())}
            >
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
          <Link
            to={`/services/${service.id}`}
            key={service.id}
            className="service-container"
          >
            <img className="home-service-image" src={service.url} alt={service.title} onError={invalidImage}/>
            <div className="home-service-info">
              <h3>{service.service_title}</h3>
              <p>{service.service_description}</p>
              <div className="price-rating-wrapper">
                <p>Price ${service.service_price}/h</p>
                <p>
                  <span className="star">★</span> {averageRatings[service.id]}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ViewServicesList;
