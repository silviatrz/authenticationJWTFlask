const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			logged: false,
			token: "",
			message: "",
			profile: {}
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},
			getPrivate: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/protected")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			stayLogged: () => {
				setStore({
					logged: true,
					token: sessionStorage.getItem("token")
				});
			},
			logout: () => {
				sessionStorage.removeItem("token");
				setStore({
					logged: false,
					token: null,
					profile: {}
				});
			},
			login: async (email, password, remember) => {
				const config = {
					method: "POST",
					headers: {
						"Content-type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				};

				const res = await fetch(process.env.BACKEND_URL + "/token", config);
				const user = await res.json();

				if (res.status === 401) {
					setStore({ message: user.msg });
					return false;
				}

				if (remember === "checked") {
					sessionStorage.setItem("token", user.token);
				}
				setStore({
					logged: true,
					token: user.token,
					message: ""
				});
				return true;
			},
			signUp: async (email, password) => {
				const actions = getActions();
				const login = "checked";
				const config = {
					method: "POST",
					headers: {
						"Content-type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				};
				const res = await fetch(process.env.BACKEND_URL + "/singup", config);
				const user = await res.json();
				if (res.status === 400) {
					setStore({ message: user.msg });
					return false;
				}
				if (res.status === 200) {
					setStore({ message: user.msg });
				}
				actions.login(email, password, login);
				return user;
			},
			getProfile: async token => {
				const config = {
					method: "GET",
					headers: {
						Authorization: "Bearer " + token
					}
				};

				fetch(process.env.BACKEND_URL + "/protected", config)
					.then(resp => resp.json())
					.then(data => {
						setStore({ profile: data });
					})
					.catch(error => console.log(error));
			}
		}
	};
};

export default getState;
