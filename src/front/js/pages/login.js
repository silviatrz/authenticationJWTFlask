import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [check, setCheck] = useState("checked");
	const [user, setUser] = useState({});

	const handleOnChange = e => {
		console.log(e);
		setUser({
			...user,
			[e.target.name]: e.target.value
		});
	};

	const handleCheck = () => {
		if (check === "") setCheck("checked");
		else if (check === "checked") setCheck("");
	};

	const handleSubmit = e => {
		e.preventDefault();

		actions.login(user.email, user.password, check);
	};

	return (
		<div className=" w-75 dflex-column mx-auto" style={{ marginTop: "100px" }}>
			<h3 className="text-center mb-5 font-weight-bold">Sign In</h3>
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
					<input
						className="form-check-label"
						type="checkbox"
						onChange={handleCheck}
						checked={check}
						value=""
						id="rememberCheck"
					/>
					<label className="form-check-label" forhtml="rememberCheck">
						Remember me
					</label>
					<p className="text-warning">{store.message}</p>
					<button type="submit" className="btn btn-danger py-2 px-3">
						Login
					</button>
					<div className="mt-5">
						<p className="">No account?</p>
						<Link to="/signup">Sign Up</Link>
					</div>
				</div>
			</form>
		</div>
	);
};
