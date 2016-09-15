var Component = require('./component.js');


class Iframe extends Component {

	constructor({
		url, 
		id,
		template = `<iframe src="${url}" id="iframe_${id}" class="iframe" data-id="${id}" frameborder="0"></iframe>`
	}) {

		super({template});
		this.id = id;
		this.url = url;
	}

	select() {
		this.$elem.show();
		setTimeout(() => this.$elem.addClass('iframe-selected'), 0);
	}

	unselect() {
		this.$elem.hide();
		setTimeout(() => this.$elem.removeClass('iframe-selected'), 0);
	}

}

module.exports = Iframe; 