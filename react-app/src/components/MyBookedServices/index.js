import React, { useState } from 'react';

const MyBookedServices = ({ upcomingServices, previousServices }) => {
  const [activeTab, setActiveTab] = useState('upcoming');

  return (
    <div className="my-booked-services-container">
      <div className="tabs">
        <button
          className={activeTab === 'upcoming' ? 'active' : ''}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
        </button>
        <button
          className={activeTab === 'previous' ? 'active' : ''}
          onClick={() => setActiveTab('previous')}
        >
          Previous
        </button>
      </div>
      {/* {activeTab === 'upcoming' ? (
        <div className="upcoming-services">
          {upcomingServices.map((service) => (
            <div key={service.id} className="service-container">
              <h3>Customer: {service.customerName}</h3>
              <p>Date and Time: {service.dateAndTime}</p>
              <p>Price: {service.pricePerHour}</p>
              <p>Customer Address: {service.user.address}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="previous-services">
          {previousServices.map((service) => (
            <div key={service.id} className="service-container">
              <h3>Task Name: {service.name}</h3>
              <p>Customer: {service.customerName}</p>
              <p>{service.dateAndTime}</p>
              <p>Price: {service.pricePerHour}</p>
              <div className="reviews">
                <h3>Reviews</h3>
                {service.reviews.map((review) => (
                  <div key={review.id} className="review">
                    <p>Rating: {review.rating}</p>
                    <p>{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default MyBookedServices;
