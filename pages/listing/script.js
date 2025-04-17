const products = [{ id: 1, title: "Phone", img: "src", price: 10 }];

const renderProduct = (product) => {
	return `<div>
    <img src="${product.img}">
    <h4 class="product-tile">${product.title}</h4>
    <p><strong>${product.price} Lei</strong></p>
    <button data-id="${product.id}">Adauga in Cos</button>
    </div>`;
};

const renderProducts = () => {
	let html = ``;
	products.forEach((product) => {
		html = html + renderProduct(product);
	});
};
