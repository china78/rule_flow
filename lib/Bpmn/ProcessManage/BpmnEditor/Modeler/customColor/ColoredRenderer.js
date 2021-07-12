"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ColoredRenderer;

var _inherits = _interopRequireDefault(require("inherits"));

var _tinySvg = require("tiny-svg");

var _BpmnRenderer = _interopRequireDefault(require("bpmn-js/lib/draw/BpmnRenderer"));

var _ModelUtil = require("bpmn-js/lib/util/ModelUtil");

function ColoredRenderer(config, eventBus, styles, pathMap, canvas, textRenderer) {
  var _this = this;

  _BpmnRenderer.default.call(this, config, eventBus, styles, pathMap, canvas, textRenderer, 1400);

  this.canRender = function (element) {
    return (0, _ModelUtil.is)(element, 'bpmn:BaseElement') && element.color;
  };

  this.drawShape = function (parent, shape) {
    var bpmnShape = _this.drawBpmnShape(parent, shape);

    (0, _tinySvg.attr)(bpmnShape, {
      fill: shape.color
    });
    return bpmnShape;
  };
}

(0, _inherits.default)(ColoredRenderer, _BpmnRenderer.default);
ColoredRenderer.prototype.drawBpmnShape = _BpmnRenderer.default.prototype.drawShape;
ColoredRenderer.$inject = ['config.bpmnRenderer', 'eventBus', 'styles', 'pathMap', 'canvas', 'textRenderer'];
module.exports = exports.default;