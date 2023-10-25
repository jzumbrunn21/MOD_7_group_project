import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createServiceThunk } from "../../store/services";

const CreateNewService = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  // const [providerName, setProviderName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [price, setPrice] = useState(0);
  const [lengthEstimate, setLengthEstimate] = useState("");
  const [category, setCategory] = useState("");

  const [errors, setErrors] = useState({});
  const history = useHistory();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!title) {
      newErrors.title = "Title is required";
    }
    
    if (!description) {
      newErrors.description = "Description is required";
    }
    if (!url) {
      newErrors.url = "Image url is required";
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

    const serviceData = {
      service_title,
      service_description,
      url,
      service_price,
      service_length_est,
      service_category,
    };

    const createdService = await dispatch(createServiceThunk(serviceData));
    if (createdService) {
      history.push(`/services/${createdService.id}`);
    } else {
      return "Error"; //Placeholder
    }
  };

  return (
    <div className="create-service-container">
      <h1>Create Your New Service</h1>
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
          ImageUrl
          <textarea value={url} onChange={(e) => setUrl(e.target.value)} />
          {errors.url && <span className="error">{errors.url}</span>}
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
            type="number"
            value={lengthEstimate}
            onChange={(e) => setLengthEstimate(e.target.value)}
          />
          {errors.lengthEstimate && (
            <span className="error">{errors.lengthEstimate}</span>
          )}
        </label>
        <label>
          Service Category
          {/* <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="lawnservice">Lawn Service</option>
            <option value="cleaning">Cleaning</option>
          </select> */}
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          {errors.category && <span className="error">{errors.category}</span>}
        </label>
        <button type="submit">Post Your Service</button>
      </form>
    </div>
  );
};

export default CreateNewService;
