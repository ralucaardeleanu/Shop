const renderProduct = (product) => {
	return `<div class="prod-container">
        <img src="${product.img}" alt="${product.title}">
        <h2 class="prod-name">${product.title}</h2>
        <div class="price">${product.price} Lei</div>
        <button class="add-to-cart" data-id="${product.id}"><span>Adauga in Cos</span></button>
    </div>`;
};

export { renderProduct };
