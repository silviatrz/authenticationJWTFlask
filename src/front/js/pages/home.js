import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center">
			<h1 style={{ fontSize: "150px", marginTop: "10%" }}>Welcome!</h1>
		</div>
	);
};
