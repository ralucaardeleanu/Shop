import { fetchUser } from "./../../services/user.js";

//LOG IN
const logInEl = document.querySelector(".login-page");
const logInEmailEl = logInEl.querySelector("#email-user");
const logInPassword = logInEl.querySelector("#password");
const logInButtonEl = logInEl.querySelector(".login-button");

logInButtonEl.addEventListener("click", (event) => {
	event.preventDefault();

	const toSearch = logInEmailEl.value;
	const passwordtoSearch = logInPassword.value;

	fetchUser({ username: toSearch, password: passwordtoSearch })
		.then((user) => {
			console.log("Login reușit pentru:", user.nume);
			window.localStorage.setItem("app-user", JSON.stringify(user));
			window.location.href = "/index.html";
		})
		.catch((error) => {
			console.log(error);
		});
});
