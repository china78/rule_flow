"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var inherits_1 = __importDefault(require("inherits"));
var tiny_svg_1 = require("tiny-svg");
var BpmnRenderer_1 = __importDefault(require("bpmn-js/lib/draw/BpmnRenderer"));
var ModelUtil_1 = require("bpmn-js/lib/util/ModelUtil");
function ColoredRenderer(config, eventBus, styles, pathMap, canvas, textRenderer) {
    var _this = this;
    BpmnRenderer_1.default.call(this, config, eventBus, styles, pathMap, canvas, textRenderer, 1400);
    this.canRender = function (element) {
        return ModelUtil_1.is(element, 'bpmn:BaseElement') && element.color;
    };
    this.drawShape = function (parent, shape) {
        var bpmnShape = _this.drawBpmnShape(parent, shape);
        tiny_svg_1.attr(bpmnShape, { fill: shape.color });
        return bpmnShape;
    };
}
exports.default = ColoredRenderer;
inherits_1.default(ColoredRenderer, BpmnRenderer_1.default);
ColoredRenderer.prototype.drawBpmnShape = BpmnRenderer_1.default.prototype.drawShape;
ColoredRenderer.$inject = [
    'config.bpmnRenderer',
    'eventBus',
    'styles',
    'pathMap',
    'canvas',
    'textRenderer',
];
//# sourceMappingURL=ColoredRenderer.js.map