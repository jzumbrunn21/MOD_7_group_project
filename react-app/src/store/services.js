// CRUD constants
const SET_SERVICE = "services/SET_SERVICE";
const READ_SERVICE = "services/READ_SERVICE";
const READ_SERVICES = "services/READ_SERVICES";
const UPDATE_SERVICE = "services/UPDATE_SERVICE";
const DELETE_SERVICE = "services/DELETE_SERVICE";
const READ_FILTERED_SERVICES = "services/READ_FILTERED_SERVICES";

// Action creators

const setService = (serviceData) => ({
  //Should send service data from the form
  type: SET_SERVICE,
  serviceData,
});

const readService = (service) => ({
  type: READ_SERVICE,
  service,
});

const readServices = (services) => ({
  type: READ_SERVICES,
  services,
});

const updateService = (serviceData, serviceId) => ({
  type: UPDATE_SERVICE,
  serviceData,
  serviceId,
});

const removeService = (serviceId) => ({
  type: DELETE_SERVICE,
  serviceId,
});

//BONUS SEARCH
const readFilteredServices = (services) => ({
  type: READ_FILTERED_SERVICES,
  services,
});

// const getImage = (images) => ({
//   type: GET_IMAGE,
//   images,
// });

// Thunks
// !!! Data handling is different with flask, review with team
// !!! Review all thunks with team, still work in progress
// !!! Review how we are handling errors
export const createServiceThunk = (serviceData) => async (dispatch) => {
  // console.log("service Data from thunk", serviceData);
  const response = await fetch("/api/services/new", {
    method: "POST",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    body:
      // JSON.stringify(
      serviceData,
    // )
  });

  if (response.ok) {
    const data = await response.json();
    // if (data.errors){
    //     return
    // }
    dispatch(setService(data));
    return data; //*** return something?
  } else {
    return "Error";
  }
};

export const getServiceThunk = (serviceId) => async (dispatch) => {
  const response = await fetch(`/api/services/${serviceId}`, {
    method: "GET",
  });

  if (response.ok) {
    // !!! What does the flask data look like?
    const data = await response.json();
    dispatch(readService(data));
    return data;
  } else {
    return "Error";
  }
};

// export const getServicesThunk = () => async (dispatch) => {
//   const response = await fetch("/api/services", {
//     method: "GET",
//   });

//   if (response.ok) {
//     const data = await response.json();
//     dispatch(readServices(data));
//     // return data;
//   } else {
//     return "Error";
//   }
// };

export const getServicesThunk =
  (category = null) =>
  async (dispatch) => {
    let url = "/api/services";
    if (category) {
      url += `?category=${category}`;
    }

    const response = await fetch(url, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(readServices(data));
    }
  };

export const updateServiceThunk =
  (serviceData, serviceId) => async (dispatch) => {
    const response = await fetch(`/api/services/update/${serviceId}`, {
      method: "PUT",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body:
        // JSON.stringify(
        serviceData,
      // ),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(updateService(data, serviceId));
      return data;
    } else {
      return "Error";
    }
  };

export const deleteServiceThunk = (serviceId) => async (dispatch) => {
  // Send an id, should be deleted in backend

  // console.log(serviceId);
  const response = await fetch(`/api/services/${serviceId}`, {
    method: "DELETE",
  });

  // Update the store with dispatch action
  if (response.ok) {
    dispatch(removeService(serviceId));
  } else {
    return "Error";
  }
};

export const getUserServicesThunk = () => async (dispatch) => {
  const response = await fetch("/api/services/my-services");

  if (response.ok) {
    const data = await response.json();
    dispatch(readServices(data));
    return data;
  }
};

// !!! What should our state be?
const initialState = { services: {}, singleService: {}, filteredServices: {} };

// Reducer
export default function servicesReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_SERVICE:
      newState = { ...state };
      newState.singleService = action.serviceData;
      return newState;
    case READ_SERVICE:
      newState = { ...state };
      newState.singleService = action.service;
      return newState;
    case READ_SERVICES:
      newState = { ...state, services: {} };
      action.services.services.forEach((service) => {
        newState.services[service.id] = service;
      });
      return newState;
    case READ_FILTERED_SERVICES:
      newState = { ...state, filteredServices: {} };
      action.services.services.forEach((service) => {
        newState.filteredServices[service.id] = service;
      });
      return newState;
    case UPDATE_SERVICE:
      newState = { ...state };
      newState.services[action.serviceId] = action.serviceData;
      return newState;
    case DELETE_SERVICE:
      newState = { ...state };
      // console.log("NEWSTATE", newState);
      // console.log("serviceId", action.serviceId);
      delete newState.services[action.serviceId];
      return newState;
    // case GET_IMAGE:
    //   newState = { ...state };
    //   console.log("IMAGE ACTION", action);
    //   action.images.images.forEach((image) => {
    //     newState.services.serviceImages[image.id] = image;
    //   });
    default:
      return state;
  }
}
