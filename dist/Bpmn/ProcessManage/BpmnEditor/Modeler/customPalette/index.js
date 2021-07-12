"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @功能：自定义左侧面板
 */
var palette_1 = __importDefault(require("./palette"));
// import PaletteModule from 'diagram-js/lib/features/palette';
var CustomPalette_1 = __importDefault(require("./CustomPalette"));
exports.default = (function (props) {
    var customePaletteData = props.customePaletteData;
    return {
        __depends__: [palette_1.default],
        __init__: ['paletteProvider'],
        paletteProvider: ['type', CustomPalette_1.default({ customePaletteData: customePaletteData })],
    };
});
//# sourceMappingURL=index.js.map