"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CustomContextPad = _interopRequireDefault(require("./CustomContextPad"));

var CustomContextPad = function CustomContextPad(props) {
  var contextData = props.contextData;
  return {
    __init__: ['contextPadProvider'],
    contextPadProvider: ['type', (0, _CustomContextPad.default)({
      contextData: contextData
    })]
  };
};

var _default = CustomContextPad;
exports.default = _default;
module.exports = exports.default;