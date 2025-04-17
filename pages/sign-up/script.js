//SIGN UP

const signUpEl = document.querySelector(".signup-page");
const signUpNameEl = signUpEl.querySelector("#fullname");
const birthDateEl = signUpEl.querySelector("#birthdate");
const emailEl = signUpEl.querySelector("#email");
const signUpPasswordEl = signUpEl.querySelector("#password");
const confirmPasswordEl = signUpEl.querySelector("#confirm-password");
const signUpButtonEl = signUpEl.querySelector(".signup-button");

const usersData = [
    ["Ana Popescu", "2000-05-12", "ana@email.com", "parola123", "parola123"],
    [
        "George Ionescu",
        "1995-10-28",
        "george.ion@gmail.com",
        "george95",
        "george95",
    ],
    [
        "Maria Dobre",
        "1988-07-03",
        "maria.dobre@yahoo.com",
        "maria88!",
        "maria88!",
    ],
    [
        "Andrei Pavel",
        "2001-02-19",
        "andrei.p@outlook.com",
        "andreiPass",
        "andreiPass",
    ],
    [
        "Ioana Mihai",
        "1999-11-11",
        "ioana.m@gmail.com",
        "ioana2023",
        "ioana2023",
    ],
];

export const fetchUser = (user) => {
    return new Promise((resolve, reject) => {
        const { fullName, birthDate, email, password, confirmPassword } = user;

        setTimeout(() => {
            let users = JSON.parse(localStorage.getItem("users"));
            const userExist = users.find(
                (user) => user.email === email && user.password === password
            );

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
                resolve("Account created successfully!");
            }
        }, 1000);
    });
};

signUpButtonEl.addEventListener("click", (e) => {
    e.preventDefault();

    const fullName = signUpNameEl.value;
    const birthDate = birthDateEl.value;
    const email = emailEl.value;
    const password = signUpPasswordEl.value;
    const confirmPassword = confirmPasswordEl.value;

    fetchUser({
        fullName,
        birthDate,
        email,
        password,
        confirmPassword,
    })
        .then((message) => {
            alert(message);
            window.location.href = "/index.html";
        })
        .catch((error) => {
            alert(error);
        });

    console.log(
        fullName +
            " " +
            birthDate +
            " " +
            email +
            " " +
            password +
            " " +
            confirmPassword
    );
});
