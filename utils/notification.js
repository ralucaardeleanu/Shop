const addNotification = (type, message) => {
	const element = document.createElement("div");
	const icon = type == "succes" ? "&#9989" : "&#10060;";
	const iconHolder = document.createElement("span");
	iconHolder.innerHTML = icon;
	element.classList.add(type);
	element.classList.add("notification");
	element.prepend(iconHolder);
	const title = document.createElement("p");
	title.innerText = message;
	element.append(title);
	document.body.append(element);
	setTimeout(() => {
		element.classList.add("show");
	}, 100);

	setTimeout(() => {
		element.classList.remove("show");
		setTimeout(() => {
			element.remove();
		}, 100);
	}, 2000);
};

export { addNotification };
