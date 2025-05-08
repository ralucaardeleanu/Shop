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

// 1.randarea produselor
// 1.1 facem o functie care returneaza htmlul unei singur produs - un nou folder components cu fisiere js care contin o functie => return html
// 1.2 TIP: butonul trebuie sa continuta un atribut data-product-id al produsul care va fi folosit la addToCart
// 1.3 o functie care grupeaza tot html-ul intr-un singur string care va popula innerHTML in containerul produselor
// 2. adaugarea de evenimente  pe butoanele din carduri. (IMPORTANT: se adauga dupa ce cardurile sunt in pagina)
// 2.1 evenimentul este de click
// 2.2 se apeleaza o functie din services/product.js care va stoca in localstorage app-cart-product produsele userului
// 2.3 exemplu obiect stocat [{ userId: id, products: [{productId: id, qty: 1}]  }]
// 2.3 se verifica daca produsul este deja in cos si se incrementeaza cantitatea if true
