var Component = require('./component.js');

class MenuItem extends Component {

	constructor({
		title, 
		id,
		template = 
			`<li>
			  <a href="javascript:void(0)" class="menu-item" id="memnu_${id}" data-id="${id}">
			    ${title}
			  </a>
			</li>`
	}) {
		super({template});
		this.id = id;
		this.title = title;
	}
 }

module.exports = MenuItem;