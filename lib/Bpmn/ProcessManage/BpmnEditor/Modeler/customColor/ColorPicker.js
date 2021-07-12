"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ColorPicker;

var _ModelUtil = require("bpmn-js/lib/util/ModelUtil");

/**
 * A handler updating an elements color.
 */
function UpdateColorHandler() {
  this.execute = function (context) {
    context.oldColor = context.element.color;
    context.element.color = context.color;
    return context.element;
  };

  this.revert = function (context) {
    context.element.color = context.oldColor;
    return context.element;
  };
}
/**
 * A basic color picker implementation.
 *
 * @param {EventBus} eventBus
 * @param {ContextPad} contextPad
 * @param {CommandStack} commandStack
 */


function ColorPicker(eventBus, contextPad, commandStack) {
  contextPad.registerProvider(this);
  commandStack.registerHandler('shape.updateColor', UpdateColorHandler);

  function changeColor(event, element) {
    // eslint-disable-next-line no-alert
    var color = window.prompt('填入色值');
    commandStack.execute('shape.updateColor', {
      element: element,
      color: color
    });
  }

  this.getContextPadEntries = function (element) {
    if ((0, _ModelUtil.is)(element, 'bpmn:Event')) {
      return {
        changeColor: {
          group: 'edit',
          className: 'icon-red',
          title: 'Change element color',
          action: {
            click: changeColor
          }
        }
      };
    }

    return null;
  };
}

ColorPicker.$inject = ['eventBus', 'contextPad', 'commandStack'];
module.exports = exports.default;