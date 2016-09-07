var Iframe = require('./iframe.js');
var Tab = require('./tab.js');

class Menu {

	constructor(selector, data) {
		this.data = data;
		this.$elem = $(selector);
		this.init();
	}


	init(conf) {
		let data = this.data;

		if (!Array.isArray(data)) {
			throw TypeError('menu data must be an array');
		}

		let $ul = $('<ul></ul>');
		for (let i = 0; i < data.length; i++) {

			let temp = `<li><a href="javascript:void(0)" id="memnu_${data[i].id}" data-index="${i}">${data[i].title}</a></li>`;
			let $li = $(temp);

			$ul.append($li);
		}
		this.$elem.append($ul);
	}

	proxyHandler(type, fn) {

		this.$elem.bind(type, e => {
			e.preventDefault();
			let target = e.target;

			if (target.nodeName == 'A') {

				let $target = $(target);
				let i = $target.attr('data-index');

				fn(this.data[i], $target);
			}
		});

	}

}


module.exports = Menu;