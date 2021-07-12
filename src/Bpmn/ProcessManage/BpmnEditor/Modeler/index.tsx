import Modeler from 'bpmn-js/lib/Modeler';
import inherits from 'inherits';
import CustomTranslate from './customTranslate';
import customPalette from './customPalette';
import customContextPad from './customContextPad';
import ColorPickerModule from './customColor';

export default (options: any) => {
  const { customePaletteData, contextData, width, height, container } = options;

  const CustomModeler: any = function (this: any): void {
    Modeler.call(this, options);
  };

  inherits(CustomModeler, Modeler);

  const CustomPalette = customPalette({ customePaletteData });
  const CustomContextPad = customContextPad({ contextData });

  const modules: any[] = [];
  // eslint-disable-next-line no-underscore-dangle
  CustomModeler.prototype._modules = modules.concat(
    // eslint-disable-next-line no-underscore-dangle
    CustomModeler.prototype._modules,
    [CustomTranslate, CustomPalette, CustomContextPad, ColorPickerModule],
  );
  return new CustomModeler({ width, height, container });
};
