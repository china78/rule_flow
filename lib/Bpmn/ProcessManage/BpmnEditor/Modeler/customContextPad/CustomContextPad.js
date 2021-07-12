"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _minDash = require("min-dash");

var CustomContextPads = function CustomContextPads(props) {
  var contextData = props.contextData;

  var CustomContextPad = /*#__PURE__*/function () {
    function CustomContextPad(config, contextPad, create, elementFactory, injector, translate, modeling, connect) {
      (0, _classCallCheck2.default)(this, CustomContextPad);
      (0, _defineProperty2.default)(this, "create", void 0);
      (0, _defineProperty2.default)(this, "elementFactory", void 0);
      (0, _defineProperty2.default)(this, "translate", void 0);
      (0, _defineProperty2.default)(this, "modeling", void 0);
      (0, _defineProperty2.default)(this, "connect", void 0);
      (0, _defineProperty2.default)(this, "autoPlace", void 0);
      this.create = create;
      this.elementFactory = elementFactory;
      this.translate = translate;
      this.modeling = modeling;
      this.connect = connect; // 自动摆放位置

      if (config.autoPlace !== false) {
        this.autoPlace = injector.get('autoPlace', false);
      } // 注册工具


      contextPad.registerProvider(this);
    }

    (0, _createClass2.default)(CustomContextPad, [{
      key: "getContextPadEntries",
      value: function getContextPadEntries(element) {
        var autoPlace = this.autoPlace,
            create = this.create,
            elementFactory = this.elementFactory,
            translate = this.translate,
            modeling = this.modeling,
            connect = this.connect;

        function appendAction(type, className, title, options) {
          var iTitle = title;
          var iOptions = options;

          if (typeof title !== 'string') {
            iOptions = iTitle;
            iTitle = translate('Append {type}', {
              type: type.replace(/^bpmn:/, '')
            });
          }

          function appendStart(event, ele) {
            var shape = elementFactory.createShape((0, _minDash.assign)({
              type: type
            }, iOptions));
            create.start(event, shape, {
              source: ele
            });
          }

          var append = autoPlace ? function (event, ele) {
            var shape = elementFactory.createShape((0, _minDash.assign)({
              type: type
            }, iOptions));
            autoPlace.append(ele, shape);
          } : appendStart;
          return {
            group: 'model',
            className: className,
            iTitle: iTitle,
            action: {
              dragstart: appendStart,
              click: append
            }
          };
        }

        function startConnect(event, ele) {
          connect.start(event, ele);
        }

        function appendUserTask(event, ele) {
          if (autoPlace) {
            var shape = elementFactory.createShape({
              type: 'bpmn:UserTask'
            });
            autoPlace.append(ele, shape);
          } else {
            appendUserTaskStart(event);
          }
        }

        function appendUserTaskStart(event) {
          var shape = elementFactory.createShape({
            type: 'bpmn:UserTask'
          });
          create.start(event, shape, element);
        }

        function appendCallActivityStart(event) {
          var shape = elementFactory.createShape({
            type: 'bpmn:CallActivity'
          });
          create.start(event, shape, element);
        }

        function appendCallActivity(event, ele) {
          if (autoPlace) {
            var shape = elementFactory.createShape({
              type: 'bpmn:CallActivity'
            });
            autoPlace.append(ele, shape);
          } else {
            appendCallActivityStart(event);
          }
        }

        function removeElement() {
          // 点击的时候实现删除功能
          modeling.removeElements([element]);
        }

        var actions = {};

        if (element.type === 'label') {
          return actions;
        }

        function translateData(data) {
          // debugger
          var result = {};
          Object.keys(data).forEach(function (key) {
            // 用户任务
            if (key === 'append.user-task' || key === 'append.call-activity' || key === 'connect' || key === 'delete') {
              if (key === 'append.user-task') {
                Object.assign(result, (0, _defineProperty2.default)({}, key, {
                  group: data[key][0],
                  className: data[key][1],
                  title: "".concat(translate(data[key][2])),
                  action: {
                    click: appendUserTask,
                    dragstart: appendUserTaskStart
                  }
                }));
              } // 调用活动


              if (key === 'append.call-activity') {
                Object.assign(result, (0, _defineProperty2.default)({}, key, {
                  group: data[key][0],
                  className: data[key][1],
                  title: "".concat(translate(data[key][2])),
                  action: {
                    click: appendCallActivity,
                    dragstart: appendCallActivityStart
                  }
                }));
              }

              if (key === 'connect') {
                Object.assign(result, (0, _defineProperty2.default)({}, key, {
                  group: data[key][0],
                  className: data[key][1],
                  title: "".concat(translate(data[key][2])),
                  action: {
                    click: startConnect,
                    dragstart: startConnect
                  }
                }));
              }
            } else {
              Object.assign(result, (0, _defineProperty2.default)({}, key, appendAction(data[key][0], data[key][1], translate(data[key][2]))));
            }
          });
          return result;
        }

        if (element.type === 'bpmn:UserTask' || element.type === 'bpmn:CallActivity' || element.type === 'bpmn:ServiceTask' || element.type === 'bpmn:SequenceFlow' || element.type === 'bpmn:StartEvent' || element.type === 'bpmn:ExclusiveGateway' || element.type === 'bpmn:InclusiveGateway' || element.type === 'bpmn:ParallelGateway') {
          actions = translateData(contextData);
        } else {
          actions = {};
        } // 所有节点都有删除


        (0, _minDash.assign)(actions, {
          delete: {
            group: 'edit',
            className: 'bpmn-icon-trash',
            title: translate('Remove'),
            action: {
              click: removeElement
            }
          }
        });
        return actions;
      }
    }]);
    return CustomContextPad;
  }();

  (0, _defineProperty2.default)(CustomContextPad, "$inject", void 0);
  CustomContextPad.$inject = ['config', 'contextPad', 'create', 'elementFactory', 'injector', 'translate', 'modeling', 'connect'];
  return CustomContextPad;
};

var _default = CustomContextPads;
exports.default = _default;
module.exports = exports.default;