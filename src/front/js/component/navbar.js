import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
//import "../../styles/navbar.scss";

export const Navbar = () => {
	const { actions, store } = useContext(Context);
	const [show, setShow] = useState(false);
	let history = useHistory();

	return (
		<nav className="navbar navbar-dark bg-dark d-flex flex-row px-5">
			<Link to="/" className="nav-link active text-white">
				<h4>Home</h4>
			</Link>

			<div className="nav-item dropdown me-5">
				<button
					className="btn btn-danger dropdown-toggle"
					onClick={() => {
						setShow(!show);
					}}>
					User
				</button>
				<ul className={"dropdown-menu p-0 " + (show ? "show" : "")}>
					{store.logged ? (
						<div>
							<li>
								<div
									className="btn btn-outline-secondary w-100 border-0"
									onClick={() => {
										history.push("/profile");
									}}>
									Profile
								</div>
								<li />
								<div
									className="btn btn-outline-secondary w-100 border-0"
									onClick={() => {
										actions.logout();
									}}>
									Log Out
								</div>
							</li>
						</div>
					) : (
						<div>
							<li>
								<div className="btn btn-outline-secondary w-100 border-0 ">
									<Link className="text-reset" to="/login">
										Sign In
									</Link>
								</div>
								<li />
								<div className="btn btn-outline-secondary w-100 border-0">
									<Link className="text-reset" to="/signup">
										Sign Up
									</Link>
								</div>
							</li>
						</div>
					)}
				</ul>
			</div>
		</nav>
	);
};
