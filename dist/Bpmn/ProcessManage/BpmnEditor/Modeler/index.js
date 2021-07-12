"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Modeler_1 = __importDefault(require("bpmn-js/lib/Modeler"));
var inherits_1 = __importDefault(require("inherits"));
var customTranslate_1 = __importDefault(require("./customTranslate"));
var customPalette_1 = __importDefault(require("./customPalette"));
var customContextPad_1 = __importDefault(require("./customContextPad"));
var customColor_1 = __importDefault(require("./customColor"));
exports.default = (function (options) {
    var customePaletteData = options.customePaletteData, contextData = options.contextData, width = options.width, height = options.height, container = options.container;
    var CustomModeler = function () {
        Modeler_1.default.call(this, options);
    };
    inherits_1.default(CustomModeler, Modeler_1.default);
    var CustomPalette = customPalette_1.default({ customePaletteData: customePaletteData });
    var CustomContextPad = customContextPad_1.default({ contextData: contextData });
    var modules = [];
    // eslint-disable-next-line no-underscore-dangle
    CustomModeler.prototype._modules = modules.concat(
    // eslint-disable-next-line no-underscore-dangle
    CustomModeler.prototype._modules, [customTranslate_1.default, CustomPalette, CustomContextPad, customColor_1.default]);
    return new CustomModeler({ width: width, height: height, container: container });
});
//# sourceMappingURL=index.js.map