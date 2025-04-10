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

signUpButtonEl.addEventListener("click", (e) => {
    e.preventDefault();

    const fullName = signUpNameEl.value;
    const birthDate = birthDateEl.value;
    const email = emailEl.value;
    const password = signUpPasswordEl.value;
    const confirmPassword = confirmPasswordEl.value;

    if (password.length < 6) {
        alert("Parola trebuie să aibă cel puțin 6 caractere.");
    } else if (password !== confirmPassword) {
        alert("Parolele nu coincid.");
    } else {
        console.log("Parola este validă!");
    }

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
