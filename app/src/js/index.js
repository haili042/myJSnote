var Component = require('./modules/component.js');
var Menu = require('./modules/menu.js');
var Panel = require('./modules/panel.js');
var data = require('../../menu.json');

// load style
require('../sass/index.scss');

// 默认
var panel = new Panel('#mainPanel');
panel.add(data[0]); 

// 点击菜单
var menu = new Menu({
	data: data,
	events: {
		// 事件代理
		click: e => {
			e.preventDefault();
			e.stopPropagation();

			let target = e.target;

			if (target.nodeName == 'A') {

				let id = $(target).attr('data-id');
				let selectedData = Menu.getById(data, id);
				panel.add(selectedData);
			}
		}
	}
});

$('#navBar').append(menu.$elem);

