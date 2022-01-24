import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

export const Profile = () => {
	const { store, actions } = useContext(Context);
	let history = useHistory();

	useEffect(
		() => {
			let token = sessionStorage.getItem("token") || store.token;
			if (token) actions.getProfile(token);
			else history.push("/");
		},
		[store.token]
	);

	return (
		<div className=" w-75 row mx-auto" style={{ marginTop: "100px" }}>
			<h3 className="text-center mb-5 font-weight-bold">Profile</h3>
			{store.profile.email ? (
				<div className="w-100">
					<ul className="list-group">
						<li className="w-25 mx-auto list-group-item list-group-item-primary row">
							<span className="col-4">ID:</span>
							<span className="offset-2 col-6">{store.profile.id}</span>
						</li>
						<li className="w-25 mx-auto list-group-item list-group-item-primary row">
							<span className="col-4">Email:</span>
							<span className="offset-1 col-7">{store.profile.email}</span>
						</li>
					</ul>
				</div>
			) : null}
		</div>
	);
};
