import { products } from "./products.js";

const productElement = document.querySelector(".js-products");

const addEventListeners = (container) => {
	const buttons = container.querySelectorAll("button");
	[...buttons].forEach((button) => button.addEventListener("click", () => {}));
};

const renderProduct = (product) => {
	return `<div class="prod-container">
        <img src="${product.img}" alt="${product.title}">
        <h2 class="prod-name">${product.title}</h2>
        <div class="price">${product.price} Lei</div>
        <button class="add-to-cart" data-id="${product.id}"><span>Adauga in Cos</span></button>
    </div>`;
};

const renderProducts = () => {
	let html = ``;
	products.forEach((product) => {
		html = html + renderProduct(product);
	});

	productElement.innerHTML = html;
	addEventListeners(productElement);
};
// exemplu storage pt cos clienti
window.localStorage.setItem("app-cart-products", JSON.stringify([{ userId: 1, products: [1, 2, 3] }]));

renderProducts();
