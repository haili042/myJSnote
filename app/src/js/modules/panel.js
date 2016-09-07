var Iframe = require('./iframe.js');
var Tab = require('./tab.js');

class Panel {

	constructor(selector) {
		this.$elem = $(selector);
		this.$tab = this.$elem.children('.tabs');
		this.$panel = this.$elem.children('.panel');
		this.data = {};
		this.lastId = null;
		this.tabProxyHandler('click');
	}


	add(data) {
		let id = data.id;

		if (this.data[id]) {
			// 如果已经存在就刷新
			this.select(id);

		} else {
			// 如果没有则新增一个tab iframe

			var iframe = new Iframe(data);
			var tab = new Tab(data);
			this.data[id] = {iframe, tab};

			this.$panel.append(iframe.$elem);
			this.$tab.append(tab.$elem);

			tab.proxyHandler('click', 'i', e => {
				tab.remove();
				iframe.remove();
				delete this.data[id];

				// 如果关了当前tab就默认选最后一个tab
				if (id === this.lastId) {
					this.lastId = this.$tab.find('.tab:last-child').attr('data-id') || '';
					this.select(this.lastId);
				}
			});
			this.select(id);
		}

	}

	tabProxyHandler(type) {

		this.$tab.bind(type, (e => {
			e.preventDefault();
			let target = e.target;

			if (target.nodeName == 'A') {

				let $target = $(target);
				let dataId = $target.parent().attr('data-id');

				this.select(dataId);

			}
		}));
	}

	select(id) {
		if (!id) { return; }

		// unselect last
		this.lastId && this.lastId !== id && this.data[this.lastId].iframe.unselect();
		this.lastId && this.lastId !== id && this.data[this.lastId].tab.unselect();

		// select current
		this.data[id].iframe.select();
		this.data[id].tab.select();

		// record last selcet
		this.lastId = id;
	}

}


module.exports = Panel;