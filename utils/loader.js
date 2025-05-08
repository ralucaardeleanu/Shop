const addLoaderTo = (element) => {
	element.classList.add("has-loader");
	const loader = document.createElement("span");
	loader.classList.add("loader");
	element.prepend(loader);
};

const removeLoaderFrom = (element) => {
	element.classList.remove("has-loader");
	const loader = element.querySelector(".loader");
	loader.remove();
};

export { addLoaderTo, removeLoaderFrom };
