import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateServiceThunk } from "../../store/services";

const UpdateService = (serviceData) => {
  const [title, setTitle] = useState(serviceData.title);
  // const [providerName, setProviderName] = useState(serviceData.providerName);
  const [url, setUrl] = useState(serviceData.url);
  const [description, setDescription] = useState(serviceData.description);
  const [price, setPrice] = useState(serviceData.price);
  const [lengthEstimate, setLengthEstimate] = useState(
    serviceData.lengthEstimate
  );
  const [category, setCategory] = useState(serviceData.category);

  const [errors, setErrors] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();

  // const updateService = async (serviceData) => {
  //   try {

  //     history.push('/services');
  //   } catch (error) {

  //     console.error('Error updating service:', error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!title) {
      newErrors.title = "Title is required";
    }
    if (!url) {
      newErrors.url = "Image URL is required";
    }
    if (!description) {
      newErrors.description = "Description is required";
    }
    if (!price) {
      newErrors.price = "Price is required";
    }
    if (!lengthEstimate) {
      newErrors.lengthEstimate = "Length Estimate is required";
    }
    if (!category) {
      newErrors.category = "Category is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const service_title = title;
    const service_description = description;
    const service_price = price;
    const service_length_est = lengthEstimate;
    const service_category = category;
    // const id = serviceData.id

    const updatedServiceData = {
      service_title,
      service_description,
      url,
      service_price,
      service_length_est,
      service_category,
    };

    const updatedService = await dispatch(
      updateServiceThunk(updatedServiceData, serviceData.id)
    );
    console.log("THUNK", updatedService);
    console.log("***updatedService****", updatedService);
    console.log("SERVICE DATA", serviceData);
    if (updatedService) {
      history.push(`/services/${updatedService.id}`);
    }
    // else {
    //   return "Error"; //Placeholder
    // }
  };

  return (
    <div className="update-service-container">
      <h1>Update Your Service</h1>
      <form onSubmit={handleSubmit}>
        <label>
          What's your service called?
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </label>
        <label>
          ImageUrl
          <textarea value={url} onChange={(e) => setUrl(e.target.value)} />
          {errors.url && <span className="error">{errors.url}</span>}
        </label>
        <label>
          Service Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && (
            <span className="error">{errors.description}</span>
          )}
        </label>
        <label>
          Price (per hour)
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {errors.price && <span className="error">{errors.price}</span>}
        </label>
        <label>
          Service Length Estimate
          <input
            type="text"
            value={lengthEstimate}
            onChange={(e) => setLengthEstimate(e.target.value)}
          />
          {errors.lengthEstimate && (
            <span className="error">{errors.lengthEstimate}</span>
          )}
        </label>
        <label>
          Service Category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="lawnservice">Lawn Service</option>
            <option value="cleaning">Cleaning</option>
          </select>
          {errors.category && <span className="error">{errors.category}</span>}
        </label>
        <button type="submit">Update Your Service</button>
      </form>
    </div>
  );
};

export default UpdateService;
