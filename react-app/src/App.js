import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import ViewServicesList from "./components/ViewServicesList";
import ServiceDetailPage from "./components/ServiceDetailPage";
import CreateNewService from "./components/CreateNewService";
import MyBookedServices from "./components/MyBookedServices";
import MyOfferedServices from "./components/MyOfferedServices";
import UpdateService from "./components/UpdateService";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" component={ViewServicesList} />
          <Route
            exact
            path="/services/:serviceId"
            component={ServiceDetailPage}
          />
          <Route
            exact
            path="/services/update/:serviceId"
            component={UpdateService}
          />
          <Route exact path="/my-services" component={MyOfferedServices} />
          <Route exact path="/my-booked-services" component={MyBookedServices} />
          <Route exact path="/create-service" component={CreateNewService} />
          <Route exact path="/login">
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
