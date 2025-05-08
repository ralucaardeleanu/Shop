import { products } from "../pages/listing/products.js";

const getCartProducts = () => JSON.parse(window.localStorage.getItem("app-cart-products"));

const setCartProducts = (products) => window.localStorage.setItem("app-cart-products", JSON.stringify(products));

const addToCart = (id) =>
	new Promise((resolve, reject) => {
		setTimeout(() => {
			const user = JSON.parse(window.localStorage.getItem("app-user"));
			if (!user) reject({ type: "error", message: "Pentru a adauga un produs in cos trebuie sa fii logat." });
			const { id: userId } = user;
			const product = products.find((product) => product.id === Number(id));
			if (product) {
				let userProducts;
				const cartProducts = getCartProducts() || [];
				const userProductsIndex = cartProducts.findIndex((item) => item.id === userId);

				if (userProductsIndex > -1) {
					userProducts = cartProducts.find((item) => item.id === userId);
				}

				if (userProducts) {
					const { products } = userProducts;
					const index = products.findIndex((item) => item.id == id);
					if (index > -1) {
						userProducts.products[index].qty += 1;
					} else {
						products.push({ id, qty: 1 });
					}
				} else {
					cartProducts.push({ id: userId, products: [{ id, qty: 1 }] });
				}

				setCartProducts(cartProducts);

				resolve({ type: "succes", message: `Produsul ${product.title} a fost adaugat in cos.` });
			} else {
				reject({ type: "error", message: "Produsul nu a fost gasit." });
			}
		}, 1000);
	});

const updateQuantity = (id, userId, qty) =>
	new Promise((resolve, reject) =>
		setTimeout(() => {
			const cartProducts = getCartProducts();
			const userProductsIndex = cartProducts.findIndex((item) => item.id == userId);
			const userProducts = cartProducts[userProductsIndex];
			const productIndex = userProducts.products.findIndex((item) => id == item.id);
			if (productIndex < 0) reject({ type: "error", message: "Produsul nu a fost gasit in baza de date." });
			userProducts.products[productIndex].qty = qty;
			cartProducts[userProductsIndex] = userProducts;
			setCartProducts(cartProducts);
			resolve({ type: "succes", message: "Cantitatea a fost modificata." });
		}, 2000)
	);

const removeFromCart = (id, userId) =>
	new Promise((resolve, reject) => {
		setTimeout(() => {
			const cartProducts = getCartProducts();
			const userProductsIndex = cartProducts.findIndex((item) => item.id == userId);
			const userProducts = cartProducts[userProductsIndex];
			if (!cartProducts && !userProducts) reject({ type: "error", message: "Cosul este cos!" });
			const productIndex = userProducts.products.findIndex((item) => item.id == id);
			if (productIndex < 0) reject({ type: "error", message: "Produsul nu este in cos!" });
			userProducts.products.splice(productIndex, 1);
			resolve({ type: "succes", message: "Produsul a fost sters din cos." });
			cartProducts[userProductsIndex] = userProducts;
			setCartProducts(cartProducts);
		}, 2000);
	});

const getTotals = (userId) => {
	const products = getCartProducts();
	const userProductsIndex = products.findIndex((item) => item.id == userId);
	const userProducts = products[userProductsIndex];
	console.log(userProducts);
};

export { addToCart, updateQuantity, removeFromCart, getTotals };
