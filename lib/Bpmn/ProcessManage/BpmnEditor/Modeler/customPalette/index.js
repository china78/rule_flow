"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _palette = _interopRequireDefault(require("./palette"));

var _CustomPalette = _interopRequireDefault(require("./CustomPalette"));

/*
 * @功能：自定义左侧面板
 */
// import PaletteModule from 'diagram-js/lib/features/palette';
var CustomPalette = function CustomPalette(props) {
  var customePaletteData = props.customePaletteData;
  return {
    __depends__: [_palette.default],
    __init__: ['paletteProvider'],
    paletteProvider: ['type', (0, _CustomPalette.default)({
      customePaletteData: customePaletteData
    })]
  };
};

var _default = CustomPalette;
exports.default = _default;
module.exports = exports.default;