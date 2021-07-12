/*
 * @功能：自定义左侧面板
 */
import PaletteModule from './palette';
// import PaletteModule from 'diagram-js/lib/features/palette';
import CustomPaletteFn from './CustomPalette';

type Props = {
  customePaletteData: any;
};
const CustomPalette: any = (props: Props) => {
  const { customePaletteData } = props;
  return {
    __depends__: [PaletteModule],
    __init__: ['paletteProvider'],
    paletteProvider: ['type', CustomPaletteFn({ customePaletteData })],
  };
};

export default CustomPalette;