var Menu = require('./modules/menu');
var Panel = require('./modules/panel.js');
var data = require('../../menu.json');

// load style
require('../sass/index.scss');

var panel = new Panel('#mainPanel');
panel.add(data[0]);

var menu = new Menu('#navBar', data);
menu.proxyHandler('click', (data, menuItem) => {
	panel.add(data);
});