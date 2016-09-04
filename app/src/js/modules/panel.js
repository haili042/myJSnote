
class Panel {

	constructor(id) {
		this.id = id;
		this.$elem = $('#' + id);
		this.$tab = this.$elem.children('.tab');
		this.$panel = this.$elem.children('.panel');
		this.iframes = [];
		this.lastSelect = '';
	}

	addIframe(iframe) {
		this.iframes.forEach((v) => v.hide());
		this.iframes.push(iframe);
		
		this.$panel.append(iframe.$elem);
	}

	getPanel() {
		return this.$panel;
	}

	getTab() {
		return this.$tab;
	}

	isExist(id) {
		this.iframes.filter((v) => id == id);
	}
}

module.exports = Panel;