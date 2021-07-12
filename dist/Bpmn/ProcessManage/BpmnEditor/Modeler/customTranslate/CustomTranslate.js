"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var TranslationsGerman_1 = __importDefault(require("./TranslationsGerman"));
function customTranslate(template, replacements) {
    var isReplacements = replacements || {};
    // Translate
    var isTemplate = TranslationsGerman_1.default[template] || template;
    // Replace
    return isTemplate.replace(/{([^}]+)}/g, function (_, key) {
        return isReplacements[key] || "{" + key + "}";
    });
}
exports.default = customTranslate;
//# sourceMappingURL=CustomTranslate.js.map