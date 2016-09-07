webpackJsonp([0,1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Menu = __webpack_require__(1);
	var Panel = __webpack_require__(5);
	var data = __webpack_require__(6);

	// load style
	__webpack_require__(7);

	var panel = new Panel('#mainPanel');
	panel.add(data[0]);

	var menu = new Menu('#navBar', data);
	menu.proxyHandler('click', function (data, menuItem) {
		panel.add(data);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Iframe = __webpack_require__(3);
	var Tab = __webpack_require__(4);

	var Menu = function () {
		function Menu(selector, data) {
			_classCallCheck(this, Menu);

			this.data = data;
			this.$elem = $(selector);
			this.init();
		}

		_createClass(Menu, [{
			key: 'init',
			value: function init(conf) {
				var data = this.data;

				if (!Array.isArray(data)) {
					throw TypeError('menu data must be an array');
				}

				var $ul = $('<ul></ul>');
				for (var i = 0; i < data.length; i++) {

					var temp = '<li><a href="javascript:void(0)" id="memnu_' + data[i].id + '" data-index="' + i + '">' + data[i].title + '</a></li>';
					var $li = $(temp);

					$ul.append($li);
				}
				this.$elem.append($ul);
			}
		}, {
			key: 'proxyHandler',
			value: function proxyHandler(type, fn) {
				var _this = this;

				this.$elem.bind(type, function (e) {
					e.preventDefault();
					var target = e.target;

					if (target.nodeName == 'A') {

						var $target = $(target);
						var i = $target.attr('data-index');

						fn(_this.data[i], $target);
					}
				});
			}
		}]);

		return Menu;
	}();

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

			this.id = id;
			this.elemId = 'iframe_' + id;
			this.title = title;
			this.url = url;
			this.template = '<iframe src="' + url + '" id="' + this.id + '" class="iframe" data-id="' + id + '" frameborder="0"></iframe>';
			this.$elem = $(this.template);
		}

		_createClass(Iframe, [{
			key: 'select',
			value: function select() {
				this.$elem.addClass('iframe-selected');
			}
		}, {
			key: 'unselect',
			value: function unselect() {
				this.$elem.removeClass('iframe-selected');
			}
		}, {
			key: 'remove',
			value: function remove() {
				this.$elem.remove();
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

			this.id = id;
			this.title = title;
			this.elemId = 'tab_' + id;
			this.template = '<div class="tab" id="' + this.id + '" data-id="' + id + '">\n\t\t  <a href="javascript:void(0)" class="tab-title">' + this.title + '</a>\n\t\t  <i class="tab-rm">x</i>\n\t\t</div>';
			this.$elem = $(this.template);
		}

		_createClass(Tab, [{
			key: 'select',
			value: function select() {
				this.$elem.addClass('tab-selected');
			}
		}, {
			key: 'unselect',
			value: function unselect() {
				this.$elem.removeClass('tab-selected');
			}
		}, {
			key: 'remove',
			value: function remove() {
				this.$elem.remove();
			}
		}, {
			key: 'proxyHandler',
			value: function proxyHandler(event, type, fn) {

				this.$elem.bind(event, function (e) {
					e.preventDefault();
					var target = e.target;

					if (target.nodeName == type.toUpperCase()) {

						var $target = $(target);
						var id = $target.parent().attr('data-id');

						fn(id, $target);
					}
				});
			}
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

	var Iframe = __webpack_require__(3);
	var Tab = __webpack_require__(4);

	var Panel = function () {
		function Panel(selector) {
			_classCallCheck(this, Panel);

			this.$elem = $(selector);
			this.$tab = this.$elem.children('.tabs');
			this.$panel = this.$elem.children('.panel');
			this.data = {};
			this.lastId = null;
			this.tabProxyHandler('click');
		}

		_createClass(Panel, [{
			key: 'add',
			value: function add(data) {
				var _this = this;

				var id = data.id;

				if (this.data[id]) {
					// 如果已经存在就刷新
					this.select(id);
				} else {
					// 如果没有则新增一个tab iframe

					var iframe = new Iframe(data);
					var tab = new Tab(data);
					this.data[id] = { iframe: iframe, tab: tab };

					this.$panel.append(iframe.$elem);
					this.$tab.append(tab.$elem);

					tab.proxyHandler('click', 'i', function (e) {
						tab.remove();
						iframe.remove();
						delete _this.data[id];

						// 如果关了当前tab就默认选最后一个tab
						if (id === _this.lastId) {
							_this.lastId = _this.$tab.find('.tab:last-child').attr('data-id') || '';
							_this.select(_this.lastId);
						}
					});
					this.select(id);
				}
			}
		}, {
			key: 'tabProxyHandler',
			value: function tabProxyHandler(type) {
				var _this2 = this;

				this.$tab.bind(type, function (e) {
					e.preventDefault();
					var target = e.target;

					if (target.nodeName == 'A') {

						var $target = $(target);
						var dataId = $target.parent().attr('data-id');

						_this2.select(dataId);
					}
				});
			}
		}, {
			key: 'select',
			value: function select(id) {
				if (!id) {
					return;
				}

				// unselect last
				this.lastId && this.lastId !== id && this.data[this.lastId].iframe.unselect();
				this.lastId && this.lastId !== id && this.data[this.lastId].tab.unselect();

				// select current
				this.data[id].iframe.select();
				this.data[id].tab.select();

				// record last selcet
				this.lastId = id;
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
			"url": "./HTML5/"
		},
		{
			"id": "040000",
			"title": "AMD",
			"icon": "",
			"url": "./AMD/"
		},
		{
			"id": "050000",
			"title": "CMD",
			"icon": "",
			"url": "./CMD/"
		},
		{
			"id": "060000",
			"title": "CSS3",
			"icon": "",
			"url": "./CSS3/Flex/"
		}
	];

/***/ },
/* 7 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
]);