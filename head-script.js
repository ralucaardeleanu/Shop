const users = [
	{
		id: 1,
		username: "maria_popescu@yahoo.com",
		password: "maria00",
		nume: "Maria Popescu",
		birthDate: "01/10/2000",
	},
	{
		id: 2,
		username: "mihai.preda95@gmail.com",
		password: "preda95",
		nume: "Mihai Preda",
		birthDate: "12/01/1995",
	},
	{
		id: 3,
		username: "ana_popa99@gmail.com",
		password: "popa99",
		nume: "Ana Popa",
		birthDate: "01/01/1999",
	},
	{
		id: 4,
		username: "rares_anghel@yahoo.com",
		password: "rares123",
		nume: "Rares Anghel",
		birthDate: "29/11/2001",
	},
	{
		id: 5,
		username: "costel123@gmail.com",
		password: "costel90",
		nume: "Costel Ionescu",
		birthDate: "01/01/1990",
	},
	{
		id: 6,
		username: "costelionescu@gmail.com",
		password: "parola90",
		nume: "Costel Ionescu",
		birthDate: "01/01/1990",
	},
	{
		id: 7,
		username: "elena.stan@gmail.com",
		password: "elena123",
		nume: "Elena Stan",
		birthDate: "15/05/1998",
	},
	{
		id: 8,
		username: "george.popa@yahoo.com",
		password: "george88",
		nume: "George Popa",
		birthDate: "20/03/1988",
	},
	{
		id: 9,
		username: "daria.iliescu@gmail.com",
		password: "daria00",
		nume: "Daria Iliescu",
		birthDate: "30/06/2000",
	},
	{
		id: 10,
		username: "bogdan.enache@gmail.com",
		password: "bogdan01",
		nume: "Bogdan Enache",
		birthDate: "11/09/1997",
	},
];

let appUsers = localStorage.getItem("users");

if (!appUsers) {
	localStorage.setItem("users", JSON.stringify(users));
}
