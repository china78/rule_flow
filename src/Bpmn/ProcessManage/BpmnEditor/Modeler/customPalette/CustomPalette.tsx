import { assign } from 'min-dash';

/**
 * A palette that allows you to create BPMN _and_ custom elements.
 */

type Props = {
  customePaletteData: any;
};
const CustomPalettes: any = (props: Props) => {
  const { customePaletteData } = props;
  class CustomPalette {
    create: any;
    elementFactory: any;
    spaceTool: any;
    lassoTool: any;
    handTool: any;
    globalConnect: any;
    translate: any;
    static $inject: string[];

    constructor(
      palette: any,
      create: any,
      elementFactory: any,
      spaceTool: any,
      lassoTool: any,
      handTool: any,
      globalConnect: any,
      translate: any,
    ) {
      this.create = create;
      this.elementFactory = elementFactory;
      this.spaceTool = spaceTool;
      this.lassoTool = lassoTool;
      this.handTool = handTool;
      this.globalConnect = globalConnect;
      this.translate = translate;
      palette.registerProvider(this);
    }

    getPaletteEntries = () => {
      const actions: any = [];
      const {
        create,
        elementFactory,
        translate,
        spaceTool,
        lassoTool,
        handTool,
        globalConnect,
      } = this;

      function returnData(data: any) {
        const whichAction = (id: any) => {
          if (id === 'hand-tool') {
            return { click: (event: any) => handTool.activateHand(event) };
          }
          if (id === 'lasso-tool') {
            return { click: (event: any) => lassoTool.activateSelection(event) };
          }
          if (id === 'global-connect-tool') {
            return { click: (event: any) => spaceTool.activateSelection(event) };
          }
          if (id === 'space-tool') {
            return { click: (event: any) => globalConnect.toggle(event) };
          }
          return null;
        };
        const ergodicChildren = (father: any) => {
          const { children, group } = father;
          const result: any = [];
          if (group === 'flowGateway' || group === 'processControl') {
            children.forEach((item: any) => {
              result.push({
                id: item.id,
                ...createAction(...item?.attrs),
              });
            });
          } else {
            children.forEach((item: any) => {
              result.push({
                id: item.id,
                group: item.group,
                className: item.className,
                title: translate(item.title),
                action: whichAction(item.id),
              });
            });
          }
          return result;
        };

        const result = data?.map((item: any) => {
          return {
            title: translate(item.title),
            group: item.group,
            children: ergodicChildren(item),
          };
        });
        return result;
      }

      function createAction(
        type?: any,
        group?: any,
        className?: any,
        title?: any,
        options?: any,
        customType?: any,
      ) {
        function createListener(event: any) {
          const shape = elementFactory.createShape(assign({ type }, options, { customType }));

          if (options) {
            shape.businessObject.di.isExpanded = options.isExpanded;
          }

          create.start(event, shape);
        }

        const shortType = type.replace(/^bpmn:/, '');
        const action = {
          group,
          className,
          title: (title && translate(title)) || translate(`${shortType}`),
          action: {
            dragstart: createListener,
            click: createListener,
          },
        };
        return action;
      }

      assign(actions, returnData(customePaletteData));
      return actions;
    };
  }

  CustomPalette.$inject = [
    'palette',
    'create',
    'elementFactory',
    'spaceTool',
    'lassoTool',
    'handTool',
    'globalConnect',
    'translate',
  ];
  return CustomPalette;
};

export default CustomPalettes;