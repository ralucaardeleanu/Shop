//LOG IN

const logInEl = document.querySelector(".login-page");
const logInEmailEl = logInEl.querySelector("#email-user");
const logInPassword = logInEl.querySelector("#password");
const logInButtonEl = logInEl.querySelector(".login-button");

const fetchUserRequest = (user) => {
    return new Promise((resolve, reject) => {
        // const { username, password } = user; destructurare a obiectului user
        const username = user.username;
        const password = user.password;
        setTimeout(() => {
            let userFound;
            const users = JSON.parse(localStorage.getItem("users"));

            userFound = users.find(
                (user) =>
                    user.username === username && user.password === password
            );

            if (userFound) {
                resolve(userFound);
            } else {
                reject("User not found");
            }
        }, 3000);
    });
};

fetchUserRequest({ username: "ana_popa99@gmail.com", password: "popa9999" })
    .then((result) => console.log(result))
    .catch((error) => console.log(error));

logInButtonEl.addEventListener("click", (event) => {
    event.preventDefault();
    let toSearch = logInEmailEl.value;
    let passwordtoSearch = logInPassword.value;
    function findUserFunction(user) {
        return user.username === toSearch;
    }

    let findUser = users.find(findUserFunction);

    if (findUser) {
        if (findUser.password === passwordtoSearch) {
            console.log("Login reușit pentru:", findUser.nume);
            window.location.href = "/pages/index.html";
        } else {
            console.log("Parolă greșită!");
        }
    } else {
        console.log("Emailul nu există!");
    }
});
