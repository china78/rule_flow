import { is } from 'bpmn-js/lib/util/ModelUtil';
/**
 * A handler updating an elements color.
 */
function UpdateColorHandler(this: any) {
  this.execute = (context: any) => {
    context.oldColor = context.element.color;
    context.element.color = context.color;

    return context.element;
  };

  this.revert = (context: any) => {
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
export default function ColorPicker(this: any, eventBus: any, contextPad: any, commandStack: any) {
  contextPad.registerProvider(this);

  commandStack.registerHandler('shape.updateColor', UpdateColorHandler);

  function changeColor(event: any, element: any) {
    // eslint-disable-next-line no-alert
    const color = window.prompt('填入色值');
    commandStack.execute('shape.updateColor', { element, color });
  }

  this.getContextPadEntries = (element: any) => {
    if (is(element, 'bpmn:Event')) {
      return {
        changeColor: {
          group: 'edit',
          className: 'icon-red',
          title: 'Change element color',
          action: {
            click: changeColor,
          },
        },
      };
    }
    return null;
  };
}

ColorPicker.$inject = ['eventBus', 'contextPad', 'commandStack'];
