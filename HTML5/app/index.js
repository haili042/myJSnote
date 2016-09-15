webpackJsonp([0,1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var Component = __webpack_require__(2);
	var TextBox = __webpack_require__(3);

	for (var i = 0; i < 5; i++) {
		var textBox = new TextBox({});
		$('#a').append(textBox.$elem);
	}
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
			key: "addEvent",
			value: function addEvent() {
				for (var event in this.events) {
					if (this.events.hasOwnProperty(event)) {
						this.$elem.bind(event, this.events[event]);
					}
				}
			}
		}, {
			key: "remove",
			value: function remove() {
				this.$elem.remove();
			}
		}]);

		return Component;
	}();

	module.exports = Component;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Component = __webpack_require__(2);

	var TextBox = function (_Component) {
		_inherits(TextBox, _Component);

		function TextBox(_ref) {
			var _ref$template = _ref.template;
			var template = _ref$template === undefined ? '<input type="text" />' : _ref$template;

			_classCallCheck(this, TextBox);

			return _possibleConstructorReturn(this, (TextBox.__proto__ || Object.getPrototypeOf(TextBox)).call(this, { template: template }));
		}

		return TextBox;
	}(Component);

	module.exports = TextBox;

/***/ }
]);