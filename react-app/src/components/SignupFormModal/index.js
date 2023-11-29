import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [imageSelected, setImageSelected] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (password === confirmPassword) {
      if (!imageSelected) {
        setErrors((prevErrors) => [...prevErrors, 'Please upload an image.']);
        return;
      }
      formData.append("email", email);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("address", address);
      formData.append("profile_picture", profilePicture);
      const data = await dispatch(signUp(formData));
      if (data) {
        setErrors(data);
      } else {
        closeModal();
      }
    } else {
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };

  return (
    <div className="signup-container">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="signup-form"
      >
        <h1 className="signup-header">Sign Up</h1>
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
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <label className="input-label">
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="input-field"
          />
        </label>
        <label className="input-label">
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="input-field"
          />
        </label>
        <label className="input-label">
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="input-field"
          />
        </label>
        <label className="input-label">
          Address
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="input-field"
          />
        </label>
        <label className="file-input-label">
          <div>Upload your Profile Picture</div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setProfilePicture(e.target.files[0]);
              setImageSelected(true);
            }

            }
            // required
            style={{ display: "none" }}
          />
        </label>
        <div>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;
