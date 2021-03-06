var Component = require('./component.js');

class Tab extends Component {
	constructor({
		title, 
		id,
		template = 
			`<div class="tab" id="tab_${id}" data-id="${id}">
			  <a href="javascript:void(0)" class="tab-title">${title}</a>
			  <i class="tab-rm">x</i>
			</div>`
	}) {

		super({template});
		this.id = id;
		this.title = title;
	}

	select() {
		this.$elem.addClass('tab-selected');
	}

	unselect() {
		this.$elem.removeClass('tab-selected');
	}

	proxyHandler(event, type, fn) {

		this.$elem.bind(event, e => {
			e.preventDefault();
			let target = e.target;

			if (target.nodeName == type.toUpperCase()) {

				let $target = $(target);
				let id = $target.parent().attr('data-id');

				fn(id, $target);
			}
		});

	}
}

module.exports = Tab;