class Tab {
	constructor({title, id}) {
		this.title = title;
		this.id = 'tab_' + id;
		this.template = 
		`<div class="tab" id="${this.id}">
		  <span>${this.title}</span>
		  <i class="tab-rm"></i>
		</div>`;
		this.$elem = $(this.template);
	}

	init() {

	}
}

module.exports = Tab;