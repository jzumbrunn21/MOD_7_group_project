import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const UpdateService = ({ serviceData, onUpdateService }) => {
  const [title, setTitle] = useState(serviceData.title);
  const [providerName, setProviderName] = useState(serviceData.providerName);
  const [description, setDescription] = useState(serviceData.description);
  const [price, setPrice] = useState(serviceData.price);
  const [lengthEstimate, setLengthEstimate] = useState(serviceData.lengthEstimate);
  const [category, setCategory] = useState(serviceData.category);

  const [errors, setErrors] = useState({});
  const history = useHistory();

  const updateService = async (serviceData) => {
    try {

      history.push('/services');
    } catch (error) {

      console.error('Error updating service:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    const newErrors = {};
    if (!title) {
      newErrors.title = 'Title is required';
    }
    if (!providerName) {
      newErrors.providerName = 'Provider Name is required';
    }
    if (!description) {
      newErrors.description = 'Description is required';
    }
    if (!price) {
      newErrors.price = 'Price is required';
    }
    if (!lengthEstimate) {
      newErrors.lengthEstimate = 'Length Estimate is required';
    }
    if (!category) {
      newErrors.category = 'Category is required';
    }


    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }


    const updatedServiceData = {
      id: serviceData.id,
      title,
      providerName,
      description,
      price,
      lengthEstimate,
      category,
    };


    updateService(updatedServiceData);
  };

  return (
    <div className="update-service-container">
      <h1>Update Your Service</h1>
      <form onSubmit={handleSubmit}>
        <label>
          What's your service called?
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          {errors.title && <span className="error">{errors.title}</span>}
        </label>
        <label>
          Provider Name
          <input type="text" value={providerName} onChange={(e) => setProviderName(e.target.value)} />
          {errors.providerName && <span className="error">{errors.providerName}</span>}
        </label>
        <label>
          Service Description
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          {errors.description && <span className="error">{errors.description}</span>}
        </label>
        <label>
          Price (per hour)
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
          {errors.price && <span className="error">{errors.price}</span>}
        </label>
        <label>
          Service Length Estimate
          <input type="text" value={lengthEstimate} onChange={(e) => setLengthEstimate(e.target.value)} />
          {errors.lengthEstimate && <span className="error">{errors.lengthEstimate}</span>}
        </label>
        <label>
          Service Category
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
          {errors.category && <span className="error">{errors.category}</span>}
        </label>
        <button type="submit">Update Your Service</button>
      </form>
    </div>
  );
};

export default UpdateService;
