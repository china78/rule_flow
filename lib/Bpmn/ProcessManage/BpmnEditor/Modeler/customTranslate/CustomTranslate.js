"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = customTranslate;

var _TranslationsGerman = _interopRequireDefault(require("./TranslationsGerman"));

function customTranslate(template, replacements) {
  var isReplacements = replacements || {}; // Translate

  var isTemplate = _TranslationsGerman.default[template] || template; // Replace

  return isTemplate.replace(/{([^}]+)}/g, function (_, key) {
    return isReplacements[key] || "{".concat(key, "}");
  });
}

module.exports = exports.default;