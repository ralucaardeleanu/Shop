import { saveUser } from "./../../services/user.js";

const signUpEl = document.querySelector(".signup-page");
const signUpNameEl = signUpEl.querySelector("#fullname");
const birthDateEl = signUpEl.querySelector("#birthdate");
const emailEl = signUpEl.querySelector("#email");
const signUpPasswordEl = signUpEl.querySelector("#password");
const confirmPasswordEl = signUpEl.querySelector("#confirm-password");
const signUpButtonEl = signUpEl.querySelector(".signup-button");

signUpButtonEl.addEventListener("click", (e) => {
	e.preventDefault();

	const fullName = signUpNameEl.value;
	const birthDate = birthDateEl.value;
	const email = emailEl.value;
	const password = signUpPasswordEl.value;
	const confirmPassword = confirmPasswordEl.value;

	saveUser({
		fullName,
		birthDate,
		email,
		password,
		confirmPassword,
	})
		.then((response) => {
			alert("Userul a fost inregistrat");
			window.localStorage.setItem("app-user", JSON.stringify(response));
			window.location.href = "/index.html";
		})
		.catch((error) => {
			alert(error);
		});

	console.log(fullName + " " + birthDate + " " + email + " " + password + " " + confirmPassword);
});
