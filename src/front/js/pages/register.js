import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
//import "../../styles/login.scss";

export const Register = () => {
	const { store, actions } = useContext(Context);
	const [user, setUser] = useState({});

	const handleOnChange = e => {
		setUser({
			...user,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = e => {
		e.preventDefault();

		actions.signUp(user.email, user.password);

		setUser({ email: "", password: "" });
	};

	return (
		<div className=" w-75 dflex-column mx-auto" style={{ marginTop: "100px" }}>
			<h3 className="text-center mb-5 font-weight-bold">Sign Up</h3>
			<form onSubmit={handleSubmit} className="w-50 mx-auto">
				<div className="mb-3 d-flex flex-row ">
					<label htmlFor="email" className="form-label w-25 fs-5 my-auto">
						Email address:
					</label>
					<input
						className="form-control w-75 py-3"
						onChange={handleOnChange}
						value={user.email}
						type="email"
						name="email"
						id="email"
						placeholder="mail@mail.com"
						required
					/>
				</div>

				<div className="mb-3 d-flex flex-row ">
					<label htmlFor="passwordInput" className="form-label w-25 fs-5 my-auto">
						Password:
					</label>
					<input
						className="form-control w-75 py-3"
						onChange={handleOnChange}
						value={user.password}
						type="password"
						name="password"
						id="passwordInput"
					/>
				</div>

				<div className="mb-3 form-check" style={{ textAlign: "center" }}>
					<p className="text-warning">{store.message}</p>
					<button type="submit" className="btn btn-danger py-2 px-3">
						Register
					</button>
					<div className="mt-5">
						<p className="">Have an account?</p>
						<Link to="/login">Sign In</Link>
					</div>
				</div>
			</form>
		</div>
	);
};
