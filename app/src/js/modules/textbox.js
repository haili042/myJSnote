var Component = require('./component.js');

class TextBox extends Component {

	constructor({
		template = 
			`<input type="text" />`
	}) {
		super({template});
	}
}

module.exports = TextBox;
