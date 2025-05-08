const fetchUser = (user) => {
	return new Promise((resolve, reject) => {
		// const { username, password } = user; destructurare a obiectului user
		const username = user.username;
		const password = user.password;
		setTimeout(() => {
			const users = JSON.parse(localStorage.getItem("users"));

			const userFound = users.find((user) => user.username === username);

			if (userFound) {
				if (user.password === password) {
					resolve(userFound);
				} else {
					reject("Wrong Password.");
				}
			} else {
				reject("User not found");
			}
		}, 3000);
	});
};

const saveUser = (user) => {
	return new Promise((resolve, reject) => {
		const { fullName, birthDate, email, password, confirmPassword } = user;

		setTimeout(() => {
			let users = JSON.parse(localStorage.getItem("users"));
			const userExist = users.find((user) => user.email === email && user.password === password);

			if (userExist) {
				reject("The user already exists");
			} else if (password.length < 6) {
				reject("Password must be at least 6 characters.");
			} else if (password !== confirmPassword) {
				reject("Password must be at least 6 characters.");
			} else {
				const newUser = {
					nume: fullName,
					birthDate: birthDate,
					email: email,
					password: password,
					confirmPassword: confirmPassword,
				};

				users.push(newUser);

				localStorage.setItem("users", JSON.stringify(users));
				resolve(newUser);
			}
		}, 1000);
	});
};

export { saveUser, fetchUser };
