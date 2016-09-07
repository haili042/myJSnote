class Tab {
	constructor({title, id}) {
		this.id = id;
		this.title = title;
		this.elemId = 'tab_' + id;
		this.template = 
		`<div class="tab" id="${this.id}" data-id="${id}">
		  <a href="javascript:void(0)" class="tab-title">${this.title}</a>
		  <i class="tab-rm">x</i>
		</div>`;
		this.$elem = $(this.template);
	}

	select() {
		this.$elem.addClass('tab-selected');
	}

	unselect() {
		this.$elem.removeClass('tab-selected');
	}

	remove() {
		this.$elem.remove();
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