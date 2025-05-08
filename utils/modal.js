class Modal {
	constructor(options) {
		this.title = options.title;
		this.content = options.content;

		this.createModal();
	}

	createModal() {
		let title;
		const modal = document.createElement("div");
		const modalBody = document.createElement("div");

		modal.classList.add("modal");
		modalBody.classList.add("modal-body");
		modalBody.innerHTML = this.content;
		modal.append(modalBody);

		if (this.title) {
			const titleWrap = document.createElement("div");
			titleWrap.classList.add("modal-title");
			title = document.createElement("h4");
			title.innerText = this.title;
			titleWrap.prepend(title);
			modal.prepend(titleWrap);
		}

		document.body.prepend(modal);
		this.modalEl = modal;
	}

	open() {
		document.body.classList.add("modal-in");
	}

	close() {
		document.body.classList.remove("modal-in");
	}

	destroy() {
		document.body.classList.remove("modal-in");
		this.modalEl.remove();
	}
}

export { Modal };
