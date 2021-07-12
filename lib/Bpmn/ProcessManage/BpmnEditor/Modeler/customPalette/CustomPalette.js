"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _minDash = require("min-dash");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var CustomPalettes = function CustomPalettes(props) {
  var customePaletteData = props.customePaletteData;

  var CustomPalette = function CustomPalette(palette, _create, _elementFactory, _spaceTool, _lassoTool, _handTool, _globalConnect, _translate) {
    var _this = this;

    (0, _classCallCheck2.default)(this, CustomPalette);
    (0, _defineProperty2.default)(this, "create", void 0);
    (0, _defineProperty2.default)(this, "elementFactory", void 0);
    (0, _defineProperty2.default)(this, "spaceTool", void 0);
    (0, _defineProperty2.default)(this, "lassoTool", void 0);
    (0, _defineProperty2.default)(this, "handTool", void 0);
    (0, _defineProperty2.default)(this, "globalConnect", void 0);
    (0, _defineProperty2.default)(this, "translate", void 0);
    (0, _defineProperty2.default)(this, "getPaletteEntries", function () {
      var actions = [];
      var create = _this.create,
          elementFactory = _this.elementFactory,
          translate = _this.translate,
          spaceTool = _this.spaceTool,
          lassoTool = _this.lassoTool,
          handTool = _this.handTool,
          globalConnect = _this.globalConnect;

      function returnData(data) {
        var whichAction = function whichAction(id) {
          if (id === 'hand-tool') {
            return {
              click: function click(event) {
                return handTool.activateHand(event);
              }
            };
          }

          if (id === 'lasso-tool') {
            return {
              click: function click(event) {
                return lassoTool.activateSelection(event);
              }
            };
          }

          if (id === 'global-connect-tool') {
            return {
              click: function click(event) {
                return spaceTool.activateSelection(event);
              }
            };
          }

          if (id === 'space-tool') {
            return {
              click: function click(event) {
                return globalConnect.toggle(event);
              }
            };
          }

          return null;
        };

        var ergodicChildren = function ergodicChildren(father) {
          var children = father.children,
              group = father.group;
          var result = [];

          if (group === 'flowGateway' || group === 'processControl') {
            children.forEach(function (item) {
              result.push(_objectSpread({
                id: item.id
              }, createAction.apply(void 0, (0, _toConsumableArray2.default)(item === null || item === void 0 ? void 0 : item.attrs))));
            });
          } else {
            children.forEach(function (item) {
              result.push({
                id: item.id,
                group: item.group,
                className: item.className,
                title: translate(item.title),
                action: whichAction(item.id)
              });
            });
          }

          return result;
        };

        var result = data === null || data === void 0 ? void 0 : data.map(function (item) {
          return {
            title: translate(item.title),
            group: item.group,
            children: ergodicChildren(item)
          };
        });
        return result;
      }

      function createAction(type, group, className, title, options, customType) {
        function createListener(event) {
          var shape = elementFactory.createShape((0, _minDash.assign)({
            type: type
          }, options, {
            customType: customType
          }));

          if (options) {
            shape.businessObject.di.isExpanded = options.isExpanded;
          }

          create.start(event, shape);
        }

        var shortType = type.replace(/^bpmn:/, '');
        var action = {
          group: group,
          className: className,
          title: title && translate(title) || translate("".concat(shortType)),
          action: {
            dragstart: createListener,
            click: createListener
          }
        };
        return action;
      }

      (0, _minDash.assign)(actions, returnData(customePaletteData));
      return actions;
    });
    this.create = _create;
    this.elementFactory = _elementFactory;
    this.spaceTool = _spaceTool;
    this.lassoTool = _lassoTool;
    this.handTool = _handTool;
    this.globalConnect = _globalConnect;
    this.translate = _translate;
    palette.registerProvider(this);
  };

  (0, _defineProperty2.default)(CustomPalette, "$inject", void 0);
  CustomPalette.$inject = ['palette', 'create', 'elementFactory', 'spaceTool', 'lassoTool', 'handTool', 'globalConnect', 'translate'];
  return CustomPalette;
};

var _default = CustomPalettes;
exports.default = _default;
module.exports = exports.default;