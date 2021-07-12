"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CustomContextPad_1 = __importDefault(require("./CustomContextPad"));
exports.default = (function (props) {
    var contextData = props.contextData;
    return {
        __init__: ['contextPadProvider'],
        contextPadProvider: ['type', CustomContextPad_1.default({ contextData: contextData })],
    };
});
//# sourceMappingURL=index.js.map