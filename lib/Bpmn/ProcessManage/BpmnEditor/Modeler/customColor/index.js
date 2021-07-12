"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ColorPicker = _interopRequireDefault(require("./ColorPicker"));

var _ColoredRenderer = _interopRequireDefault(require("./ColoredRenderer"));

var _default = {
  __init__: ['colorPicker', 'coloredRenderer'],
  colorPicker: ['type', _ColorPicker.default],
  coloredRenderer: ['type', _ColoredRenderer.default]
};
exports.default = _default;
module.exports = exports.default;