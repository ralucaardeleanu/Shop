import { mapProducts, getTotals } from "/utils/product.js";

const createOrder = (userId) =>
	new Promise((resolve, reject) => {
		setTimeout(() => {
			// se iau comenzile existente (daca exista)
			let userOrders;
			// daca nu exista se ia un array gol
			const orders = JSON.parse(window.localStorage.getItem("app-orders")) || [];
			const userOrdersIndex = orders.findIndex((order) => order.id == userId);

			// se iau produsele din cos ale userului curent
			const cartProducts = JSON.parse(window.localStorage.getItem("app-cart-products"));
			const userProductsIndex = cartProducts.findIndex((products) => products.id == userId);
			const userProducts = cartProducts[userProductsIndex];

			//daca userul nu are produse in cos se trimite un mesaj de eroare
			if (!userProducts) reject({ type: "error", message: "Cosul este gol." });

			const displayProducts = mapProducts(userProducts.products);
			const total = getTotals(displayProducts);

			// daca userul nu are comenzi ii punem un obiect nou pentru comenzi in localstorage
			if (userOrdersIndex < 0) {
				userOrders = { id: userId, orders: [{ date: new Date(), products: userProducts.products, total }] };
				orders.push(userOrders);
			} else {
				userOrders = orders[userOrdersIndex].orders;
				userOrders.push({ date: new Date(), products: userProducts.products, total });
			}

			// salveaza comanda in localstorage
			window.localStorage.setItem("app-orders", JSON.stringify(orders));
			//sterge produsele din cos
			window.localStorage.removeItem("app-cart-products");
			// trimitem raspunsul pozitiv catre frontend
			resolve({ type: "succes", message: "Comanda trimisa cu succes." });
		}, 2000);
	});

export { createOrder };
