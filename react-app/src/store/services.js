// CRUD constants
const SET_SERVICE = "services/SET_SERVICE"
const READ_SERVICE = "services/READ_SERVICE"
const READ_SERVICES = "services/READ_SERVICES"
const UPDATE_SERVICE = "services/UPDATE_SERVICE"
const DELETE_SERVICE = "services/DELETE_SERVICE"

// Action creators

const setService = (serviceData) => ({  //Should send service data from the form
    type: SET_SERVICE,
    serviceData
})

const readService = (service) => ({
    type: READ_SERVICE,
    service
})

const readServices = (services) => ({
    type: READ_SERVICES,
    services
})

const updateService = (serviceData) => ({
    type: UPDATE_SERVICE,
    serviceData
})

const removeService = () => ({
    type: DELETE_SERVICE
})

// Thunks
// !!! Data handling is different with flask, review with team
// !!! Review all thunks with team, still work in progress
// !!! Review how we are handling errors
export const createServiceThunk = (serviceData) => async (dispatch) => {
    const response = await fetch("/service/new", {
        methods: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            serviceData
        })
    })

    if (response.ok) {
        const data = await response.json();
        // if (data.errors){
        //     return
        // }
        dispatch(setService(data));
        // return data;     *** return something?
    }
    else {
        return "Error"
    }
}

export const getServiceThunk = (serviceId) => async (dispatch) => {
    const response = await fetch(`/services/${serviceId}`, {
        methods: "GET"
    })

    if (response.ok) {
        // !!! What does the flask data look like?
        const data = await response.json()
        dispatch(readService(data))
    } else {
        return "Error"
    }
}

export const getServicesThunk = () => async (dispatch) => {
    const response = await fetch("/services", {
        methods: "GET"
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(readServices(data))
    } else {
        return "Error"
    }
}

export const updateServiceThunk = (serviceData, serviceId) => async (dispatch) => {
    const response = await fetch(`/services/${serviceId}`, {
        methods: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            serviceData
        })
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(updateService(data))
    } else {
        return "Error"
    }
}

export const deleteServiceThunk = (serviceId) => async (dispatch) => {
    // Send an id, should be deleted in backend
    const response = await fetch(`/service/${serviceId}`, {
        methods: "DELETE"
    })

    // Update the store with dispatch action
    if (response.ok) {
        dispatch(removeService(serviceId))
    } else {
        return "Error"
    }
}

// !!! What should our state be?
initialState = { services: [], singleService: null }

// Reducer
export default function servicesReducer(state = initialState, action) {
    let newState = {...state}
    switch(action.type){
        case SET_SERVICE:
            action.setService
            return newState
        case READ_SERVICE:
            action.service
            return newState
        case READ_SERVICES:
            action.services
            return newState
        case UPDATE_SERVICE:
            action.serviceData
            return newState
        case DELETE_SERVICE:

            return newState
        default:
            return state;
    }
}

// export const Thunk = () => async (dispatch) => {
//     const response = await fetch("", {})

//     if (response.ok) {
        //const data = await response.json()
//     } else {
        //return "Error"
//     }
// }
