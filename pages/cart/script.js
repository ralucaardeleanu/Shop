import { createOrder } from "/services/order.js";
import { removeFromCart, updateQuantity } from "/services/product.js";
import { addLoaderTo, removeLoaderFrom } from "/utils/loader.js";
import { Modal } from "/utils/modal.js";
import { addNotification } from "/utils/notification.js";
import { mapProducts, getTotals } from "/utils/product.js";

const productsEl = document.querySelector(".js-products");
const totalsEl = document.querySelector(".js-totals");
const user = JSON.parse(window.localStorage.getItem("app-user"));
let total;

const renderProductsHtml = (products) => {
	let html = "";
	if (!products) {
		html = `<p style="text-align: center">Cosul este gol</p>`;
	} else {
		products.forEach((product) => {
			html += renderProduct(product);
		});
	}

	productsEl.innerHTML = html;
};

const renderTotals = (total) => {
	const totalsString = `
	<div class="totals">
		<h4>Sumar Total</h4>
		<p>Cost Produse: ${total} lei</p>
		<p>Cost Livrare: 20 lei</p>
		<hr />
		<p>
			Total: <strong>${total + 20} </strong>lei
		</p>

		<button class="js-order btn-order" type="button" title="Trimite Comanda">Trimite Comanda</button>
	</div>`;

	totalsEl.innerHTML = totalsString;
	const orderBtn = totalsEl.querySelector(".js-order");
	const totalsContainer = totalsEl.querySelector(".totals");

	orderBtn.addEventListener("click", (ev) => {
		addLoaderTo(totalsContainer);

		createOrder(user.id)
			.then((response) => {
				const successModal = new Modal({
					title: "Comanda trimisa",
					content: `
					<div style="text-align: center;">
						<p style="font-size:42px; margin: 0" class="text-succes">&#9989</p>
						<p>Comanda Efectuata cu succes</p>
						<p>Vei fi directionat catre listing.</p>
					</div>
					`,
				});

				successModal.open();
				setTimeout(() => {
					successModal.destroy();
					window.location.href = "/pages/listing/index.html";
				}, 5000);
			})
			.catch((error) => addNotification(error.type, error.message))
			.finally(() => {
				removeLoaderFrom(totalsContainer);
			});
	});
};

const renderProducts = () => {
	const cartProducts = JSON.parse(window.localStorage.getItem("app-cart-products")) || [];

	if (cartProducts.length == 0 || !user) {
		renderProductsHtml(null);
	} else {
		const userProductsIndex = cartProducts.findIndex((products) => products.id == user.id);

		const userProducts = cartProducts[userProductsIndex];
		const productsToRender = mapProducts(userProducts.products);

		total = getTotals(productsToRender);
		renderProductsHtml(productsToRender);
		renderTotals(total);
		addCardEventListeners(productsEl);
	}
};

const addCardEventListeners = (container) => {
	const qtySelectors = container.querySelectorAll("select");
	const deleteButtons = container.querySelectorAll(".js-delete-product");

	[...qtySelectors, ...deleteButtons].forEach((item) => {
		const isSelect = item.tagName == "SELECT";
		item.addEventListener(isSelect ? "change" : "click", () => {
			const card = item.closest(".cart-card");
			addLoaderTo(card);
			const productId = item.getAttribute("data-product-id");

			if (isSelect) {
				updateQuantity(productId, user.id, item.options[item.selectedIndex].value)
					.then((response) => {
						addNotification(response.type, response.message);
						renderProducts();
					})
					.catch((error) => {
						addNotification(error.type, error.message);
					})
					.finally(() => {
						removeLoaderFrom(card);
					});
			} else {
				removeFromCart(productId, user.id)
					.then((response) => {
						addNotification(response.type, response.message);
						card.remove();
					})
					.catch((err) => addNotification(err.type, err, message))
					.finally(() => {
						removeLoaderFrom(card);
					});
			}
		});
	});
};

const renderProduct = (product) => {
	return `<div class="cart-card">
        <div class="product-image">
            <img src="${product.img}" alt="${product.title}" />
        </div>
        <div class="product-info">
            <p><strong>${product.title}</strong></p>
            <p>Pret: $${product.price}</p>
            <p>Total: <strong>$${product.total}</strong></p>
            
        </div>
        <div class="product-actions" style="text-align: right">
            <button type="button" data-product-id="${product.id}" class="js-delete-product">Sterge din cos</button>
            <p>
                <select data-product-id="${
					product.id
				}" name="quantity-select" title="Select Quantity" class="select-quantity js-select-quantity">
                    <option value="1" ${product.qty == 1 ? "selected" : ""}>1</option>
                    <option value="2" ${product.qty == 2 ? "selected" : ""}>2</option>
                    <option value="3" ${product.qty == 3 ? "selected" : ""}>3</option>
                    <option value="4" ${product.qty == 4 ? "selected" : ""}>4</option>
                    <option value="5" ${product.qty == 5 ? "selected" : ""}>5</option>
                    <option value="6" ${product.qty == 6 ? "selected" : ""}>6</option>
                    <option value="7" ${product.qty == 7 ? "selected" : ""}>7</option>
                    <option value="8" ${product.qty == 8 ? "selected" : ""}>8</option>
                    <option value="9" ${product.qty == 9 ? "selected" : ""}>9</option>
                    <option value="10" ${product.qty == 10 ? "selected" : ""}>10</option>
                </select>
            </p>
        </div>
    </div>`;
};

renderProducts();
