import { products } from "/pages/listing/products.js";

const mapProducts = (orderProducts) => {
	return orderProducts.map((product) => {
		const plainProduct = products.find((pd) => pd.id == product.id);
		return {
			...plainProduct,
			qty: product.qty,
			total: product.qty * plainProduct.price,
		};
	});
};

const getTotals = (products) => products.reduce((acc, product) => acc + product.qty * product.price, 0);

export { mapProducts, getTotals };
