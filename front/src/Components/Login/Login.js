import { useState } from "react";
import axios from "axios";
import './Login.css';

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			window.location = "/";
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
		<div className='login_container'>
			<div className='login_form_container'>
				<form className='form_container' onSubmit={handleSubmit}>
					<h1>Login to Your Account</h1>
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
					<button type="submit" className='login_btn'>
						Login
					</button>
					<p className='signup_prompt'>New here? <a href="/signup" className='signup_link'>Sign Up</a></p>
				</form>
			</div>
		</div>
	);
};

export default Login;
