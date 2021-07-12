import CustomContextPads from './CustomContextPad';

type Props = {
  contextData: any;
};
const CustomContextPad: any = (props: Props) => {
  const { contextData } = props;
  return {
    __init__: ['contextPadProvider'],
    contextPadProvider: ['type', CustomContextPads({ contextData })],
  };
};

export default CustomContextPad;