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
                <p>Developers Github</p>
                <a href="https://github.com/jzumbrunn21" target="_blank" rel="noopener noreferrer">
                    Josh  Zumbrunn
                </a>
                <a href="https://github.com/Strasmon28" target="_blank" rel="noopener noreferrer">
                    Shawn Trasmonte
                </a>
                <a href="https://github.com/KryvushkoSofiia" target="_blank" rel="noopener noreferrer">
                    Sofiia Kryvushko
                </a>
                <a href="https://github.com/feichen0826" target="_blank" rel="noopener noreferrer">
                    Fei Chen
                </a>
            </div>

            <div className="column">
                <p>Technologies Used</p>
                <ul>
                    {technologies.map((tech, index) => (
                        <li key={index}>{tech}</li>
                    ))}
                </ul>
            </div>

            {/* {isLoaded && <ProfileButton user={sessionUser} />} */}
        </div>
    );
}

export default Footer;
