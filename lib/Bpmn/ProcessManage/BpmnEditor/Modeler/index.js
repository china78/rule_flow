"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Modeler = _interopRequireDefault(require("bpmn-js/lib/Modeler"));

var _inherits = _interopRequireDefault(require("inherits"));

var _customTranslate = _interopRequireDefault(require("./customTranslate"));

var _customPalette = _interopRequireDefault(require("./customPalette"));

var _customContextPad = _interopRequireDefault(require("./customContextPad"));

var _customColor = _interopRequireDefault(require("./customColor"));

var _default = function _default(options) {
  var customePaletteData = options.customePaletteData,
      contextData = options.contextData,
      width = options.width,
      height = options.height,
      container = options.container;

  var CustomModeler = function CustomModeler() {
    _Modeler.default.call(this, options);
  };

  (0, _inherits.default)(CustomModeler, _Modeler.default);
  var CustomPalette = (0, _customPalette.default)({
    customePaletteData: customePaletteData
  });
  var CustomContextPad = (0, _customContextPad.default)({
    contextData: contextData
  });
  var modules = []; // eslint-disable-next-line no-underscore-dangle

  CustomModeler.prototype._modules = modules.concat( // eslint-disable-next-line no-underscore-dangle
  CustomModeler.prototype._modules, [_customTranslate.default, CustomPalette, CustomContextPad, _customColor.default]);
  return new CustomModeler({
    width: width,
    height: height,
    container: container
  });
};

exports.default = _default;
module.exports = exports.default;