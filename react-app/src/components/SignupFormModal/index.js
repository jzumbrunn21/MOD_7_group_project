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
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
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
			<h1 className="signup-header">Sign Up</h1>
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
				<button type="submit" className="signup-button">Sign Up</button>
			</form>
         </div>
	);
}

export default SignupFormModal;
