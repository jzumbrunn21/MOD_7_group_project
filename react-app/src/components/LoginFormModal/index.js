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
      history.push("/");
    });
  };
  return (
<<<<<<< HEAD
    <div className="login-container">
    <h1 className="login-header">Log In</h1>
    <form onSubmit={handleSubmit}>
      <ul className="error-list">
        {errors.map((error, idx) => (
          <li key={idx} className="error-item">{error}</li>
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
      <button type="submit" className="login-button">Log In</button>
    </form>
    <Link onClick={handleDemoUser} className="demo-link">Demo User</Link>
  </div>
  )
=======
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div>
          <label>
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Log In</button>
      </form>
      <button onClick={handleDemoUser}>Demo User</button>
    </>
  );
>>>>>>> d476e8f6c66142995a4a2af5193000fdd5b6af38
}

export default LoginFormModal;
