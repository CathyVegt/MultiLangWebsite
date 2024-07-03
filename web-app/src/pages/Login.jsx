


/*
 * Copyright (c) 2024, MSDT group6
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * 3. Neither the name of Radboud nor the names of its contributors
 *    may be used to endorse or promote products derived from this software
 *    without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */


import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	const handleLoginSubmit = async (e) => {
		e.preventDefault();
		let username = e.target.username.value; 
		let password = e.target.password.value;

		if (!username || !password) {
			toast.error("Please fill in all fields");
			return;
		} else {
			// Create login data
			const formData = {
				username: username,
				password: password,
			};
			try {
				// Send login data to server
				const response = await axios.post(
					"http://localhost:3000/api/v1/login",
					formData
				);
				localStorage.setItem('auth', JSON.stringify(response.data.token));
				toast.success("Login successful", { autoClose: 1000, hideProgressBar: false, closeOnClick: true});
				navigate("/home");
			} catch (err) {
				// Handle login errors
				toast.error(err.response.data.msg, { autoClose: 500, hideProgressBar: true, closeOnClick: true});
			}
		}
	};

	return (
		<div className="login-main">
			<div className="login-right">
				<div className="login-right-container">
					<div className="login-center">
						{/* Title and form */}
						<h2>Welcome back!</h2>
						<p>Please enter your details here</p>
						<form onSubmit={handleLoginSubmit} >
							<input type="text" placeholder="Username" name="username" /> 
							{/* Password input */}
							<div className="pass-input-div">
								<input
									type={showPassword ? "text" : "password"}
									placeholder="Password"
									name="password"
								/>
								{showPassword ? (
									<FaEyeSlash
										onClick={() => {setShowPassword(!showPassword);}}
									/>
									) : (
									<FaEye
										onClick={() => {
											setShowPassword(!showPassword);
										}}
									/>
								)}
							</div>
							<div className="login-center-buttons">
								<button type="submit">Log In</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
