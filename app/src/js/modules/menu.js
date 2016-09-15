
var Component = require('./component.js');
var Iframe = require('./iframe.js');
var Tab = require('./tab.js');
var MenuItem = require('./menu-item.js');


class Menu extends Component {

	constructor({ 
		data,
		events,
		template = `<ul></ul>`,
	}) {
		super({template, data, events});
	}

	// override
	create() {
		let data = this.data;

		if (!Array.isArray(data)) {
			throw TypeError('menu data must be an array');
		}

		let $ul = $(this.template);

		data.forEach((v, i) => {

			let menuItem = new MenuItem({
				id: v.id, 
				title: v.title,
				onclick: this.onclick
			});

			// 子菜单
			if (v.children) {
				let menu = new Menu({data: v.children }, this.events);
				menuItem.$elem.append(menu.$elem);
			}

			$ul.append(menuItem.$elem);
		});

		return $ul;
	}

	// 根据id 查找
	static getById(data, id) {

		if (!data) {
			return;
		}

		if (!Array.isArray(data)) {
			throw TypeError('menu data must be an array');
		}

		for (var i = 0; i < data.length; i++) {
			let v = data[i];
			if (v.id === id) {
				return v;
			} else if (v.children) {
				let d = Menu.getById(v.children, id);
				if (d) {
					return d;
				} 
			}
		}
		return;
	}

}

module.exports = Menu;
