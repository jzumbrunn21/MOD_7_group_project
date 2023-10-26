import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from "./logo.png";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="navigation">
		<div>
        <NavLink exact to="/">
          <img className=" navigation-logo" src={logo} alt="Logo" />
        </NavLink>
		</div>
      {isLoaded && (

          <ProfileButton user={sessionUser} />

      )}
    </div>
  );
}

export default Navigation;
