import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { Link, useHistory } from "react-router-dom";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  const handleDemoUser = async (e) => {
    e.preventDefault();

    return dispatch(login("demo@aa.io", "password")).then(() => {
      closeModal();
      // history.push("/");
    });
  };
  return (
    <div className="login-container">
      <h1 className="login-header">Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul className="error-list">
          {errors.map((error, idx) => (
            <li key={idx} className="error-item">
              {error}
            </li>
          ))}
        </ul>
        <label className="input-label">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
        </label>
        <label className="input-label">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
        </label>
        <button type="submit" className="login-button">
          Log In
        </button>
      </form>
      <Link onClick={handleDemoUser} className="demo-link">
        Demo User
      </Link>
    </div>
  );
}

export default LoginFormModal;
