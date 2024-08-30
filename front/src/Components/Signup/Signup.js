import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Added useNavigate here
import './Signup.css';

const Signup = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate(); // Hook to navigate programmatically

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/users";
			const { data: res } = await axios.post(url, data);
			navigate("/login");
			console.log(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className='signup_container'>
			<div className='signup_form_container'>
				<form className='form_container' onSubmit={handleSubmit}>
					<h1>Create Account</h1>
					<input
						type="text"
						placeholder="First Name"
						name="firstName"
						onChange={handleChange}
						value={data.firstName}
						className='input'
					/>
					<input
						type="text"
						placeholder="Last Name"
						name="lastName"
						onChange={handleChange}
						value={data.lastName}
						className='input'
					/>
					<input
						type="email"
						placeholder="Email"
						name="email"
						onChange={handleChange}
						value={data.email}
						className='input'
					/>
					<input
						type="password"
						placeholder="Password"
						name="password"
						onChange={handleChange}
						value={data.password}
						className='input'
					/>
					{error && <div className='error_msg'>{error}</div>}
					<button type="submit" className='signup_btn'>
						Sign Up
					</button>
					<p className='login_prompt'>Already have an account? <a href="/login" className='login_link'>Login</a></p>
				</form>
			</div>
		</div>
	);
};

export default Signup;
