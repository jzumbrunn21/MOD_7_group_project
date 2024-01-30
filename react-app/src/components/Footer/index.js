import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Footer.css"; // Import your CSS file here

function Footer({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  const technologies = ["Python", "Flask", "React", "Redux", "HTML", "CSS"];

  return (
    <div className="footer">
      <div className="column">
        <h5>Navigation</h5>
        <NavLink exact to="/">
          {/* <img className="logo" src={logo} alt="Logo" /> */}
        </NavLink>
        <NavLink to="/">Main</NavLink>
        {sessionUser && (
          <>
            <NavLink to="/my-services">My Services</NavLink>
            <NavLink to="/my-booked-services">My Booked Services</NavLink>
            <NavLink to="/create-service">Create New Service</NavLink>
          </>
        )}
      </div>

      <div className="column">
        {/* <h5>Developers Github</h5> */}
        <img
          src={"https://img.icons8.com/?size=64&id=52539&format=png"}
          alt="Github"
        />
        <a
          href="https://github.com/jzumbrunn21"
          target="_blank"
          rel="noopener noreferrer"
        >
          Josh Zumbrunn
        </a>
        <a
          href="https://github.com/Strasmon28"
          target="_blank"
          rel="noopener noreferrer"
        >
          Shawn Trasmonte
        </a>
        <a
          href="https://github.com/KryvushkoSofiia"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sofiia Kryvushko
        </a>
        <a
          href="https://github.com/feichen0826"
          target="_blank"
          rel="noopener noreferrer"
        >
          Fei Chen
        </a>
      </div>

      <div className="column">
        <h5>Technologies Used</h5>
        <img
          src={"https://img.icons8.com/?size=48&id=PXTY4q2Sq2lG&format=png"}
          alt="Javascript"
        />
        <img
          src={"https://img.icons8.com/?size=40&id=bzf0DqjXFHIW&format=png"}
          alt="React"
        />
        <img
          src={"https://img.icons8.com/?size=48&id=13441&format=png"}
          alt="Python"
        />
        <img
          src={"https://img.icons8.com/?size=64&id=ewGOClUtmFX4&format=png"}
          alt="Flask"
        />
        <img
          src={"https://img.icons8.com/?size=48&id=20909&format=png"}
          alt="HTML"
        />
        <img
          src={"https://img.icons8.com/?size=48&id=21278&format=png"}
          alt="CSS"
        />
      </div>

      {/* {isLoaded && <ProfileButton user={sessionUser} />} */}
    </div>
  );
}

export default Footer;
