import { assign } from 'min-dash';

type Props = {
  contextData: any;
};
const CustomContextPads: any = (props: Props) => {
  const { contextData } = props;

  class CustomContextPad {
    create: any;
    elementFactory: any;
    translate: any;
    modeling: any;
    connect: any;
    autoPlace: any;
    static $inject: string[];

    constructor(
      config: any,
      contextPad: any,
      create: any,
      elementFactory: any,
      injector: any,
      translate: any,
      modeling: any,
      connect: any,
    ) {
      this.create = create;
      this.elementFactory = elementFactory;
      this.translate = translate;
      this.modeling = modeling;
      this.connect = connect;
      // 自动摆放位置
      if (config.autoPlace !== false) {
        this.autoPlace = injector.get('autoPlace', false);
      }
      // 注册工具
      contextPad.registerProvider(this);
    }
    getContextPadEntries(element: any) {
      const { autoPlace, create, elementFactory, translate, modeling, connect } = this;

      function appendAction(type?: any, className?: any, title?: any, options?: any) {
        let iTitle = title;
        let iOptions = options;
        if (typeof title !== 'string') {
          iOptions = iTitle;
          iTitle = translate('Append {type}', { type: type.replace(/^bpmn:/, '') });
        }

        function appendStart(event: any, ele: any) {
          const shape = elementFactory.createShape(assign({ type }, iOptions));
          create.start(event, shape, {
            source: ele,
          });
        }

        const append = autoPlace
          ? (event: any, ele: any) => {
            const shape = elementFactory.createShape(assign({ type }, iOptions));

            autoPlace.append(ele, shape);
          }
          : appendStart;

        return {
          group: 'model',
          className,
          iTitle,
          action: {
            dragstart: appendStart,
            click: append,
          },
        };
      }

      function startConnect(event: any, ele: any) {
        connect.start(event, ele);
      }

      function appendUserTask(event: any, ele: any) {
        if (autoPlace) {
          const shape = elementFactory.createShape({ type: 'bpmn:UserTask' });
          autoPlace.append(ele, shape);
        } else {
          appendUserTaskStart(event);
        }
      }

      function appendUserTaskStart(event: any) {
        const shape = elementFactory.createShape({ type: 'bpmn:UserTask' });
        create.start(event, shape, element);
      }
      function appendCallActivityStart(event: any) {
        const shape = elementFactory.createShape({ type: 'bpmn:CallActivity' });
        create.start(event, shape, element);
      }

      function appendCallActivity(event: any, ele: any) {
        if (autoPlace) {
          const shape = elementFactory.createShape({ type: 'bpmn:CallActivity' });
          autoPlace.append(ele, shape);
        } else {
          appendCallActivityStart(event);
        }
      }

      function removeElement() {
        // 点击的时候实现删除功能
        modeling.removeElements([element]);
      }
      let actions = {};

      if (element.type === 'label') {
        return actions;
      }

      function translateData(data: any) {
        // debugger
        const result = {};
        Object.keys(data).forEach((key) => {
          // 用户任务
          if (
            key === 'append.user-task' ||
            key === 'append.call-activity' ||
            key === 'connect' ||
            key === 'delete'
          ) {
            if (key === 'append.user-task') {
              Object.assign(result, {
                [key]: {
                  group: data[key][0],
                  className: data[key][1],
                  title: `${translate(data[key][2])}`,
                  action: {
                    click: appendUserTask,
                    dragstart: appendUserTaskStart,
                  },
                },
              });
            }
            // 调用活动
            if (key === 'append.call-activity') {
              Object.assign(result, {
                [key]: {
                  group: data[key][0],
                  className: data[key][1],
                  title: `${translate(data[key][2])}`,
                  action: {
                    click: appendCallActivity,
                    dragstart: appendCallActivityStart,
                  },
                },
              });
            }
            if (key === 'connect') {
              Object.assign(result, {
                [key]: {
                  group: data[key][0],
                  className: data[key][1],
                  title: `${translate(data[key][2])}`,
                  action: {
                    click: startConnect,
                    dragstart: startConnect,
                  },
                },
              });
            }
          } else {
            Object.assign(result, {
              [key]: appendAction(data[key][0], data[key][1], translate(data[key][2])),
            });
          }
        });
        return result;
      }

      if (
        element.type === 'bpmn:UserTask' ||
        element.type === 'bpmn:CallActivity' ||
        element.type === 'bpmn:ServiceTask' ||
        element.type === 'bpmn:SequenceFlow' ||
        element.type === 'bpmn:StartEvent' ||
        element.type === 'bpmn:ExclusiveGateway' ||
        element.type === 'bpmn:InclusiveGateway' ||
        element.type === 'bpmn:ParallelGateway'
      ) {
        actions = translateData(contextData);
      } else {
        actions = {};
      }
      // 所有节点都有删除
      assign(actions, {
        delete: {
          group: 'edit',
          className: 'bpmn-icon-trash',
          title: translate('Remove'),
          action: {
            click: removeElement,
          },
        },
      });
      return actions;
    }
  }
  CustomContextPad.$inject = [
    'config',
    'contextPad',
    'create',
    'elementFactory',
    'injector',
    'translate',
    'modeling',
    'connect',
  ];
  return CustomContextPad;
};
export default CustomContextPads;