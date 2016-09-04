webpackJsonp([0,1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Menu = __webpack_require__(1);
	var Panel = __webpack_require__(5);
	var Iframe = __webpack_require__(3);
	var data = __webpack_require__(6);

	// load style
	__webpack_require__(7);

	var panel = new Panel('mainPanel');
	var iframe = new Iframe({ title: 'test', url: './HTML5/', id: '000000' });
	panel.addIframe(iframe);

	var menu = new Menu('navBar', panel, data);
	menu.genMenu();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Iframe = __webpack_require__(3);
	var Tab = __webpack_require__(4);

	var Menu = function () {
		function Menu(id, panel, data) {
			_classCallCheck(this, Menu);

			this.id = id;
			this.data = data;
			this.panel = panel;
			this.$elem = $('#' + id);
		}

		_createClass(Menu, [{
			key: 'getElem',
			value: function getElem() {
				return this.$elem;
			}
		}, {
			key: 'genMenu',
			value: function genMenu() {
				var data = this.data;

				if (!Array.isArray(data)) {
					throw TypeError('menu data must be an array');
				}

				var $ul = $('<ul></ul>');
				for (var i = 0; i < data.length; i++) {

					var temp = '<li><a href="javascript:void(0)" data-index="' + i + '">' + data[i].title + '</a></li>';
					var $li = $(temp);

					for (var j = 0; j < data[i].children.length; j++) {}
					$ul.append($li);
				}
				$ul.click(clickHandler.bind(this));

				this.$elem.append($ul);
			}
		}]);

		return Menu;
	}();

	function clickHandler(e) {
		e.preventDefault();

		var target = e.target;

		if (target.nodeName == 'A') {

			var i = $(target).attr('data-index');
			console.log(i);

			var iframe = new Iframe(this.data[i]);
			var tab = new Tab(this.data[i]);
			this.panel.addIframe(iframe);
		}
	}

	module.exports = Menu;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Iframe = function () {
		function Iframe(_ref) {
			var title = _ref.title;
			var url = _ref.url;
			var id = _ref.id;

			_classCallCheck(this, Iframe);

			this.title = title;
			this.url = url;
			this.id = 'iframe_' + id;
			this.template = '<iframe src="' + url + '" id="' + this.id + '" frameborder="0"></iframe>';
			this.$elem = $(this.template);
		}

		_createClass(Iframe, [{
			key: 'hide',
			value: function hide() {
				this.$elem.css({ display: 'none' });
			}
		}, {
			key: 'show',
			value: function show() {
				this.$elem.css({ display: 'block' });
			}
		}]);

		return Iframe;
	}();

	module.exports = Iframe;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Tab = function () {
		function Tab(_ref) {
			var title = _ref.title;
			var id = _ref.id;

			_classCallCheck(this, Tab);

			this.title = title;
			this.id = 'tab_' + id;
			this.template = '<div class="tab" id="' + this.id + '">\n\t\t  <span>' + this.title + '</span>\n\t\t  <i class="tab-rm"></i>\n\t\t</div>';
			this.$elem = $(this.template);
		}

		_createClass(Tab, [{
			key: 'init',
			value: function init() {}
		}]);

		return Tab;
	}();

	module.exports = Tab;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Panel = function () {
		function Panel(id) {
			_classCallCheck(this, Panel);

			this.id = id;
			this.$elem = $('#' + id);
			this.$tab = this.$elem.children('.tab');
			this.$panel = this.$elem.children('.panel');
			this.iframes = [];
			this.lastSelect = '';
		}

		_createClass(Panel, [{
			key: 'addIframe',
			value: function addIframe(iframe) {
				this.iframes.forEach(function (v) {
					return v.hide();
				});
				this.iframes.push(iframe);

				this.$panel.append(iframe.$elem);
			}
		}, {
			key: 'getPanel',
			value: function getPanel() {
				return this.$panel;
			}
		}, {
			key: 'getTab',
			value: function getTab() {
				return this.$tab;
			}
		}, {
			key: 'isExist',
			value: function isExist(id) {
				this.iframes.filter(function (v) {
					return id == id;
				});
			}
		}]);

		return Panel;
	}();

	module.exports = Panel;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = [
		{
			"id": "010000",
			"title": "React",
			"icon": "",
			"url": "./React/",
			"children": [
				{
					"id": "010100",
					"title": "1.1",
					"icon": "",
					"url": ""
				},
				{
					"id": "010200",
					"title": "1.2",
					"icon": "",
					"url": ""
				}
			]
		},
		{
			"id": "020000",
			"title": "Angular",
			"icon": "",
			"url": "./Angular/",
			"children": [
				{
					"id": "020100",
					"title": "1.1",
					"icon": "",
					"url": ""
				},
				{
					"id": "020200",
					"title": "1.2",
					"icon": "",
					"url": ""
				}
			]
		},
		{
			"id": "030000",
			"title": "HTML5",
			"icon": "",
			"url": "./HTML5/",
			"children": [
				{
					"id": "030100",
					"title": "1.1",
					"icon": "",
					"url": ""
				},
				{
					"id": "030200",
					"title": "1.2",
					"icon": "",
					"url": ""
				}
			]
		}
	];

/***/ },
/* 7 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
]);