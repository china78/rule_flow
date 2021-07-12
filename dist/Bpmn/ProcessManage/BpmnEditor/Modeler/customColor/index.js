"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ColorPicker_1 = __importDefault(require("./ColorPicker"));
var ColoredRenderer_1 = __importDefault(require("./ColoredRenderer"));
exports.default = {
    __init__: ['colorPicker', 'coloredRenderer'],
    colorPicker: ['type', ColorPicker_1.default],
    coloredRenderer: ['type', ColoredRenderer_1.default],
};
//# sourceMappingURL=index.js.map