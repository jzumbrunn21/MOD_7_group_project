import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getServiceThunk, updateServiceThunk } from "../../store/services";
import "./UpdateService.css";
const UpdateService = (serviceData) => {
  // const service = useSelector(state => state.service.services)
  // const serviceId = serviceData.match.params.serviceId
  const paramId = useParams();
  const dispatch = useDispatch();
  console.log(typeof paramId);
  console.log(paramId);
  // console.log(serviceId)
  console.log("The service data", serviceData);
  const serviceDetail = useSelector(
    (state) => Object.values(state.services.singleService)[0]
  );
  // console.log("*** Service Detail ***", serviceDetail)
  // const [data, setData] = useState({
  //   title: "",
  //   url: "",
  //   description: "",
  //   price: "",
  //   lengthEstimate: "",
  //   category: ""
  // });
  const [title, setTitle] = useState("");
  // const [providerName, setProviderName] = useState(serviceData.providerName);
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [lengthEstimate, setLengthEstimate] = useState("");
  const [category, setCategory] = useState("");

  const [errors, setErrors] = useState({});
  const history = useHistory();
  // const dispatch = useDispatch();

  // const updateService = async (serviceData) => {
  //   try {

  //     history.push('/services');
  //   } catch (error) {

  //     console.error('Error updating service:', error);
  //   }
  // };

  useEffect(() => {
    getDetails();

    // .then(res => {
    //   console.log("THE RES", res)
    //   setTitle(res.service_title)
    //   setUrl()
    //   setDescription()
    //   setPrice()
    //   setLengthEstimate()
    //   setCategory()
    // })
    // .catch(err => {
    //   console.log(err)
    // })
  }, []);

  if (serviceData === undefined) {
    return null;
  }

  const getDetails = async () => {
    let res = await dispatch(getServiceThunk(paramId.serviceId));
    let response = res.service;
    // console.log(response)
    console.log("*** DISPATCH RETURN", res);
    setTitle(response.service_title);
    setUrl(response.url);
    setDescription(response.service_description);
    setPrice(response.service_price);
    setLengthEstimate(response.service_length_est);
    setCategory(response.service_category);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!title || title.length < 6 || title.length > 50) {
      newErrors.title =
        "Title is required and must be between 6 and 50 characters ";
    }

    if (!description || description.length < 1 || description.length > 2000) {
      newErrors.description =
        "Description is required and must be between 1 and 2000 characters ";
    }

    // const validUrlEndings = [".jpg", ".jpeg", ".png"];
    // if (
    //   !url ||
    //   !validUrlEndings.some((ending) => url.toLowerCase().endsWith(ending))
    // ) {
    //   newErrors.url =
    //     "Image url is required and must end in .jpg, .jpeg, or .png";
    // }
    if (!price || price < 1) {
      newErrors.price = "Price is required";
    }
    if (!lengthEstimate || lengthEstimate < 1) {
      newErrors.lengthEstimate = "Length Estimate is required";
    }
    if (!category) {
      newErrors.category = "Category is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // const service_title = title;
    // const service_description = description;
    // const service_price = price;
    // const service_length_est = lengthEstimate;
    // const service_category = category;
    // const id = serviceData.id

    // const updatedServiceData = {
    //   service_title,
    //   service_description,
    //   url,
    //   service_price,
    //   service_length_est,
    //   service_category,
    // };

    const formData = new FormData();
    if (url) formData.append("url", url);
    formData.append("service_title", title);
    formData.append("service_description", description);
    formData.append("service_price", price);
    formData.append("service_length_est", lengthEstimate);
    formData.append("service_category", category);

    const updatedService = await dispatch(
      updateServiceThunk(formData, paramId.serviceId)
    );
    // console.log("THUNK", updatedService);
    // console.log("***updatedService****", updatedService);
    if (updatedService) {
      history.push(`/services/${paramId.serviceId}`);
    }
    // else {
    //   return "Error"; //Placeholder
    // }
  };

  return (
    <div className="update-service-wrapper">
      <div className="update-service-container">
        <h1>Update Your Service</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="update-service-title">
            <label>
              What's your service called?
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && <span className="error">{errors.title}</span>}
            </label>
          </div>
          <div className="update-service-description">
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
          </div>
          <div className="update-service-url">
            <label>
              ImageUrl
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setUrl(e.target.files[0])}
              />
              {errors.url && <span className="error">{errors.url}</span>}
            </label>
          </div>
          <div className="update-service-price">
            <label>
              Price (per hour)
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              {errors.price && <span className="error">{errors.price}</span>}
            </label>
          </div>
          <div className="update-service-length">
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
          </div>
          <div className="update-service-category">
            <label>
              Service Category
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Lawn Service">Lawn Service</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Moving">Moving</option>
              </select>
              {/* <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          /> */}
              {errors.category && (
                <span className="error">{errors.category}</span>
              )}
            </label>
          </div>
          <button type="submit">Update Your Service</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateService;
