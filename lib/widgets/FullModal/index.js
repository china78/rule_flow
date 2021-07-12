"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/modal/style/css");

var _modal = _interopRequireDefault(require("antd/lib/modal"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireWildcard(require("react"));

var _index = _interopRequireDefault(require("./index.less"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var FullModal = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(FullModal, _Component);

  var _super = _createSuper(FullModal);

  function FullModal() {
    (0, _classCallCheck2.default)(this, FullModal);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(FullModal, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          visible = _this$props.visible,
          _this$props$title = _this$props.title,
          title = _this$props$title === void 0 ? '' : _this$props$title,
          onCancel = _this$props.onCancel,
          children = _this$props.children;
      return /*#__PURE__*/_react.default.createElement(_modal.default, {
        title: title,
        visible: visible,
        onCancel: onCancel,
        width: 'calc(100% - 20px)',
        height: 'calc(100% - 10px)',
        footer: null,
        className: _index.default.fullModal
      }, children);
    }
  }]);
  return FullModal;
}(_react.Component);

var _default = FullModal;
exports.default = _default;
module.exports = exports.default;