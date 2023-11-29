import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { Link, useHistory } from "react-router-dom";
import "./ProfileButton.css";
import ProfileImage from "./ProfileImage.png";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/");
    closeMenu();
  };

  const ulClassName = "profile-dropdown btn" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <div className="navigation-container">
        <div className="profile-button-container">
          <button className="profile-button" onClick={openMenu}>
            <img className="profile-image" src={ProfileImage} alt="Logo" />
          </button>
        </div>
        <ul className={ulClassName} ref={ulRef}>
          {user ? (
            <>
              <div className="profile-button_user-info">
                {user.username}
                {user.email}
              </div>
              <Link to="/my-services" onClick={closeMenu}>My services</Link>

              <Link to="/my-booked-services" onClick={closeMenu}>My booked services</Link>

              <Link to="/create-service" onClick={closeMenu}>Create your service</Link>

              <button onClick={handleLogout} className="profile-button_logout">Log Out</button>
            </>
          ) : (
            <div className='profile-button_no-user'>
              <OpenModalButton
                buttonText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />

              <OpenModalButton
                buttonText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
          )}
        </ul>
      </div>
    </>
  );
}

export default ProfileButton;
