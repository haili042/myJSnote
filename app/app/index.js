webpackJsonp([0,1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var Component = __webpack_require__(2);
	var Menu = __webpack_require__(3);
	var Panel = __webpack_require__(7);
	var data = __webpack_require__(8);

	// load style
	__webpack_require__(9);

	// 默认
	var panel = new Panel('#mainPanel');
	panel.add(data[0]);

	// 点击菜单
	var menu = new Menu({
		data: data,
		events: {
			// 事件代理
			click: function click(e) {
				e.preventDefault();
				e.stopPropagation();

				var target = e.target;

				if (target.nodeName == 'A') {

					var id = $(target).attr('data-id');
					var selectedData = Menu.getById(data, id);
					panel.add(selectedData);
				}
			}
		}
	});

	$('#navBar').append(menu.$elem);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Component = function () {
		function Component(_ref) {
			var template = _ref.template;
			var data = _ref.data;
			var events = _ref.events;

			_classCallCheck(this, Component);

			this.template = template;
			this.data = data;
			this.events = events;
			this.$elem = this.create();
			events && this.addEvent();
		}

		_createClass(Component, [{
			key: "create",
			value: function create() {
				return $(this.template);
			}
		}, {
			key: "remove",
			value: function remove() {
				this.$elem.remove();
			}
		}, {
			key: "addEvent",
			value: function addEvent() {
				for (var event in this.events) {
					if (this.events.hasOwnProperty(event)) {
						this.$elem.bind(event, this.events[event]);
					}
				}
			}
		}]);

		return Component;
	}();

	module.exports = Component;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Component = __webpack_require__(2);
	var Iframe = __webpack_require__(4);
	var Tab = __webpack_require__(5);
	var MenuItem = __webpack_require__(6);

	var Menu = function (_Component) {
		_inherits(Menu, _Component);

		function Menu(_ref) {
			var data = _ref.data;
			var events = _ref.events;
			var _ref$template = _ref.template;
			var template = _ref$template === undefined ? '<ul></ul>' : _ref$template;

			_classCallCheck(this, Menu);

			return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, { template: template, data: data, events: events }));
		}

		// override


		_createClass(Menu, [{
			key: 'create',
			value: function create() {
				var _this2 = this;

				var data = this.data;

				if (!Array.isArray(data)) {
					throw TypeError('menu data must be an array');
				}

				var $ul = $(this.template);

				data.forEach(function (v, i) {

					var menuItem = new MenuItem({
						id: v.id,
						title: v.title,
						onclick: _this2.onclick
					});

					// 子菜单
					if (v.children) {
						var menu = new Menu({ data: v.children }, _this2.events);
						menuItem.$elem.append(menu.$elem);
					}

					$ul.append(menuItem.$elem);
				});

				return $ul;
			}

			// 根据id 查找

		}], [{
			key: 'getById',
			value: function getById(data, id) {

				if (!data) {
					return;
				}

				if (!Array.isArray(data)) {
					throw TypeError('menu data must be an array');
				}

				for (var i = 0; i < data.length; i++) {
					var v = data[i];
					if (v.id === id) {
						return v;
					} else if (v.children) {
						var d = Menu.getById(v.children, id);
						if (d) {
							return d;
						}
					}
				}
				return;
			}
		}]);

		return Menu;
	}(Component);

	module.exports = Menu;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Component = __webpack_require__(2);

	var Iframe = function (_Component) {
		_inherits(Iframe, _Component);

		function Iframe(_ref) {
			var url = _ref.url;
			var id = _ref.id;
			var _ref$template = _ref.template;
			var template = _ref$template === undefined ? '<iframe src="' + url + '" id="iframe_' + id + '" class="iframe" data-id="' + id + '" frameborder="0"></iframe>' : _ref$template;

			_classCallCheck(this, Iframe);

			var _this = _possibleConstructorReturn(this, (Iframe.__proto__ || Object.getPrototypeOf(Iframe)).call(this, { template: template }));

			_this.id = id;
			_this.url = url;
			return _this;
		}

		_createClass(Iframe, [{
			key: 'select',
			value: function select() {
				var _this2 = this;

				this.$elem.show();
				setTimeout(function () {
					return _this2.$elem.addClass('iframe-selected');
				}, 0);
			}
		}, {
			key: 'unselect',
			value: function unselect() {
				var _this3 = this;

				this.$elem.hide();
				setTimeout(function () {
					return _this3.$elem.removeClass('iframe-selected');
				}, 0);
			}
		}]);

		return Iframe;
	}(Component);

	module.exports = Iframe;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Component = __webpack_require__(2);

	var Tab = function (_Component) {
		_inherits(Tab, _Component);

		function Tab(_ref) {
			var title = _ref.title;
			var id = _ref.id;
			var _ref$template = _ref.template;
			var template = _ref$template === undefined ? '<div class="tab" id="tab_' + id + '" data-id="' + id + '">\n\t\t\t  <a href="javascript:void(0)" class="tab-title">' + title + '</a>\n\t\t\t  <i class="tab-rm">x</i>\n\t\t\t</div>' : _ref$template;

			_classCallCheck(this, Tab);

			var _this = _possibleConstructorReturn(this, (Tab.__proto__ || Object.getPrototypeOf(Tab)).call(this, { template: template }));

			_this.id = id;
			_this.title = title;
			return _this;
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
	}(Component);

	module.exports = Tab;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Component = __webpack_require__(2);

	var MenuItem = function (_Component) {
		_inherits(MenuItem, _Component);

		function MenuItem(_ref) {
			var title = _ref.title;
			var id = _ref.id;
			var _ref$template = _ref.template;
			var template = _ref$template === undefined ? '<li>\n\t\t\t  <a href="javascript:void(0)" class="menu-item" id="memnu_' + id + '" data-id="' + id + '">\n\t\t\t    ' + title + '\n\t\t\t  </a>\n\t\t\t</li>' : _ref$template;

			_classCallCheck(this, MenuItem);

			var _this = _possibleConstructorReturn(this, (MenuItem.__proto__ || Object.getPrototypeOf(MenuItem)).call(this, { template: template }));

			_this.id = id;
			_this.title = title;
			return _this;
		}

		return MenuItem;
	}(Component);

	module.exports = MenuItem;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Iframe = __webpack_require__(4);
	var Tab = __webpack_require__(5);

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = [
		{
			"id": "000010000",
			"title": "React",
			"icon": "",
			"url": "./React/",
			"children": [
				{
					"id": "000000002",
					"title": "1.1",
					"icon": "",
					"url": ""
				},
				{
					"id": "000000003",
					"title": "1.2",
					"icon": "",
					"url": ""
				}
			]
		},
		{
			"id": "000020000",
			"title": "Angular",
			"icon": "",
			"url": "./Angular/",
			"children": [
				{
					"id": "000000005",
					"title": "2.1",
					"icon": "",
					"url": ""
				},
				{
					"id": "000000006",
					"title": "2.2",
					"icon": "",
					"url": ""
				}
			]
		},
		{
			"id": "000030000",
			"title": "HTML5",
			"icon": "",
			"url": "./HTML5/",
			"children": [
				{
					"id": "000060100",
					"title": "worker",
					"icon": "",
					"url": "./HTML5/html5.html"
				}
			]
		},
		{
			"id": "000040000",
			"title": "AMD",
			"icon": "",
			"url": "./AMD/"
		},
		{
			"id": "000050000",
			"title": "CMD",
			"icon": "",
			"url": "./CMD/"
		},
		{
			"id": "000060000",
			"title": "CSS3",
			"icon": "",
			"url": "./CSS3/Flex/",
			"children": [
				{
					"id": "000060100",
					"title": "Animation",
					"icon": "",
					"url": "./CSS3/Animation/"
				},
				{
					"id": "000060200",
					"title": "Flex",
					"icon": "",
					"url": "./CSS3/Flex/"
				}
			]
		}
	];

/***/ },
/* 9 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
]);