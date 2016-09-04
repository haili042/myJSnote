class Iframe {

	constructor({title, url, id}) {
		this.title = title;
		this.url = url;
		this.id = 'iframe_' + id;
		this.template = `<iframe src="${url}" id="${this.id}" frameborder="0"></iframe>`;
		this.$elem = $(this.template);
	}

	hide() {
		this.$elem.css({display: 'none'});
	}

	show() {
		this.$elem.css({display: 'block'});
	}

}

module.exports = Iframe; 