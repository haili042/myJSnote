class Iframe {

	constructor({title, url, id}) {
		this.id = id;
		this.elemId = 'iframe_' + id;
		this.title = title;
		this.url = url;
		this.template = `<iframe src="${url}" id="${this.id}" class="iframe" data-id="${id}" frameborder="0"></iframe>`;
		this.$elem = $(this.template);
	}

	select() {
		this.$elem.addClass('iframe-selected');
	}

	unselect() {
		this.$elem.removeClass('iframe-selected');
	}

	remove() {
		this.$elem.remove();
	}
}

module.exports = Iframe; 