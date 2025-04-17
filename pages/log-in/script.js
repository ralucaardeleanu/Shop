//LOG IN

const logInEl = document.querySelector(".login-page");
const logInEmailEl = logInEl.querySelector("#email-user");
const logInPassword = logInEl.querySelector("#password");
const logInButtonEl = logInEl.querySelector(".login-button");

export const fetchUser = (user) => {
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

fetchUser({ username: "ana_popa99@gmail.com", password: "popa99" })
    .then((result) => console.log(result))
    .catch((error) => console.log(error));

logInButtonEl.addEventListener("click", (event) => {
    event.preventDefault();

    const toSearch = logInEmailEl.value;
    const passwordtoSearch = logInPassword.value;

    fetchUser({ username: toSearch, password: passwordtoSearch })
        .then((user) => {
            console.log("Login reușit pentru:", user.nume);
            window.location.href = "/index.html";
        })
        .catch((error) => {
            console.log(error);
        });
});
