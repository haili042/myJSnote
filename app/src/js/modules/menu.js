var Iframe = require('./iframe.js');
var Tab = require('./tab.js');

class Menu {

	constructor(id, panel, data) {
		this.id = id;
		this.data = data;
		this.panel = panel;
		this.$elem = $('#' + id);
	}

	getElem() {
		return this.$elem;
	}

	genMenu() {
		let data = this.data;

		if (!Array.isArray(data)) {
			throw TypeError('menu data must be an array');
		}

		let $ul = $('<ul></ul>');
		for (let i = 0; i < data.length; i++) {


			let temp = `<li><a href="javascript:void(0)" data-index="${i}">${data[i].title}</a></li>`;
			let $li = $(temp);

			for (let j = 0; j < data[i].children.length; j++) {

			}
			$ul.append($li);
		}
		$ul.click(clickHandler.bind(this));

		this.$elem.append($ul);
	}

}

function clickHandler(e) {
	e.preventDefault();

	let target = e.target;

	if (target.nodeName == 'A') {

		let i = $(target).attr('data-index');
		console.log(i);

		var iframe = new Iframe(this.data[i]);
		var tab = new Tab(this.data[i]);
		this.panel.addIframe(iframe);

	}
}

module.exports = Menu;