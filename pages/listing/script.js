import { addToCart } from "../../services/product.js";
import { addLoaderTo, removeLoaderFrom } from "../../utils/loader.js";
import { addNotification } from "../../utils/notification.js";
import { products } from "./products.js";

const productElement = document.querySelector(".js-products");
const searchEl = document.querySelector(".js-search-products");

let isRequestPending = false;

searchEl.addEventListener("input", (ev) => {
	const { value: searchValue } = ev.target;
	const filteredProducts = products.filter((product) =>
		product.title.toLowerCase().includes(searchValue.toLowerCase())
	);

	renderProducts(filteredProducts);
});

const addEventListeners = (container) => {
	const buttons = container.querySelectorAll("button");
	[...buttons].forEach((button) =>
		button.addEventListener("click", () => {
			if (isRequestPending) return;
			isRequestPending = true;
			const card = button.closest(".prod-container");
			const id = button.getAttribute("data-id");

			addLoaderTo(card);
			addToCart(id)
				.then((response) => {
					addNotification(response.type, response.message);
				})
				.catch((err) => addNotification(err.type, err.message))
				.finally(() => {
					removeLoaderFrom(card);
					isRequestPending = false;
				});
		})
	);
};

const renderProduct = (product) => {
	return `<div class="prod-container">
        <img src="${product.img}" alt="${product.title}">
        <h2 class="prod-name">${product.title}</h2>
        <div class="price">${product.price} Lei</div>
        <button class="add-to-cart" data-id="${product.id}"><span>Adauga in Cos</span></button>
    </div>`;
};

const renderProducts = (products) => {
	let html = ``;
	products.forEach((product) => {
		html = html + renderProduct(product);
	});

	productElement.innerHTML = html;
	addEventListeners(productElement);
};

renderProducts(products);
