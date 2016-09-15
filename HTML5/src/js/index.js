let Component = require('../../../App/src/js/modules/component.js');
let TextBox = require('../../../App/src/js/modules/textbox.js');



for (var i = 0; i < 5; i++) {
	let textBox = new TextBox({});
	$('#a').append(textBox.$elem);
}

