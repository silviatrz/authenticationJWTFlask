import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Profile } from "./pages/profile";
import injectContext, { Context } from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";
	const { store, actions } = useContext(Context);

	return (
		<BrowserRouter basename={basename}>
			<ScrollToTop>
				<Navbar />
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/login">
						{store.logged ? <Redirect to="/" /> : <Login />}
					</Route>
					<Route exact path="/signup">
						{store.logged ? <Redirect to="/" /> : <Register />}
					</Route>
					<Route exact path="/profile">
						<Profile />
					</Route>
					<Route>
						<div className="view">
							<h1>404: URL not found!</h1>
						</div>
					</Route>
				</Switch>
				<Footer />
			</ScrollToTop>
		</BrowserRouter>
	);
};

export default injectContext(Layout);
