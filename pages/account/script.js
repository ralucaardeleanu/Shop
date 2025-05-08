import { mapProducts } from "/utils/product.js";

const user = JSON.parse(window.localStorage.getItem("app-user"));

if (!user) {
	window.location.href = "/pages/log-in/index.html";
}

const orders = JSON.parse(window.localStorage.getItem("app-orders")) || [];
const userOrders = orders.find((order) => order.id == user.id);

const userHeadHtml = `
<div class="logo-wrap">
	<div class="logo">
		<img src="/assets/logo.jpg" alt="User Logo" />
	</div>
    <div class="flex-1">
        <div class="user-name"><h2>${user.nume}</h2></div>
        <div class="client-since">Client din: 2012</div>
    </div>
    <div class="header-right">
        <button type="button" class="js-logout btn-logout" title="Log out">Log out</button>
    </div>
</div>`;

const userHeadEl = document.querySelector(".js-user-area");
const ordersEl = document.querySelector(".js-orders-area");
userHeadEl.innerHTML = userHeadHtml;
const logoutBtn = document.querySelector(".js-logout");

logoutBtn.addEventListener("click", () => {
	window.localStorage.removeItem("app-user");
	window.location.href = "/pages/listing/index.html";
});

const renderOrder = (order) => {
	const { date, total, products } = order;
	const productsMapped = mapProducts(products);
	const images = productsMapped.map((product) => `<img src="${product.img}" alt="${product.title}"/>`);
	const dateObj = new Date(date);
	const dateString = `${dateObj.getDate()} / ${dateObj.getMonth()} / ${dateObj.getFullYear()}`;

	return `
    <div class="ord-line">
        <div class="order-left">
            <h4>
                Order no: 1
            <h4/>
            <div class="order-total">
                Total: <strong>${total}</strong> Lei
            </div>
        </div>
        <div style="text-align: right" class="order-right">
            <div class="order-date">
                <p>Data: <strong>${dateString}</strong></p>
            </div>
            <div class="order-imgs">
                ${images.join("")}
            </div>
        </div>
    </div>
    `;
};

const renderOrders = () => {
	let html = ``;
	userOrders.orders.forEach((order) => {
		html += renderOrder(order);
	});

	ordersEl.innerHTML = html;
};

renderOrders();
