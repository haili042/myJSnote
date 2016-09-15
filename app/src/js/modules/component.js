
class Component {

	constructor({template, data, events}) {
		this.template = template;
		this.data = data;
		this.events = events;
		this.$elem = this.create();
		events && this.addEvent();
	}

	create() {
		return $(this.template);
	}

	remove() {
		this.$elem.remove();
	}

	addEvent() {
		for (let event in this.events) {
			if (this.events.hasOwnProperty(event)) {
				this.$elem.bind(event, this.events[event]);
			}
		}
	}

}

module.exports = Component;