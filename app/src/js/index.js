var Menu = require('./modules/menu');
var Panel = require('./modules/panel.js');
var Iframe = require('./modules/iframe.js');
var data = require('../../menu.json');

// load style
require('../sass/index.scss');

var panel = new Panel('mainPanel');
var iframe = new Iframe({title: 'test', url: './HTML5/', id: '000000'});
panel.addIframe(iframe);

var menu = new Menu('navBar', panel, data);
menu.genMenu();
