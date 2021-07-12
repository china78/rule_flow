"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var min_dash_1 = require("min-dash");
exports.default = (function (props) {
    var contextData = props.contextData;
    var CustomContextPad = /** @class */ (function () {
        function CustomContextPad(config, contextPad, create, elementFactory, injector, translate, modeling, connect) {
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
        CustomContextPad.prototype.getContextPadEntries = function (element) {
            var _a = this, autoPlace = _a.autoPlace, create = _a.create, elementFactory = _a.elementFactory, translate = _a.translate, modeling = _a.modeling, connect = _a.connect;
            function appendAction(type, className, title, options) {
                var iTitle = title;
                var iOptions = options;
                if (typeof title !== 'string') {
                    iOptions = iTitle;
                    iTitle = translate('Append {type}', { type: type.replace(/^bpmn:/, '') });
                }
                function appendStart(event, ele) {
                    var shape = elementFactory.createShape(min_dash_1.assign({ type: type }, iOptions));
                    create.start(event, shape, {
                        source: ele,
                    });
                }
                var append = autoPlace
                    ? function (event, ele) {
                        var shape = elementFactory.createShape(min_dash_1.assign({ type: type }, iOptions));
                        autoPlace.append(ele, shape);
                    }
                    : appendStart;
                return {
                    group: 'model',
                    className: className,
                    iTitle: iTitle,
                    action: {
                        dragstart: appendStart,
                        click: append,
                    },
                };
            }
            function startConnect(event, ele) {
                connect.start(event, ele);
            }
            function appendUserTask(event, ele) {
                if (autoPlace) {
                    var shape = elementFactory.createShape({ type: 'bpmn:UserTask' });
                    autoPlace.append(ele, shape);
                }
                else {
                    appendUserTaskStart(event);
                }
            }
            function appendUserTaskStart(event) {
                var shape = elementFactory.createShape({ type: 'bpmn:UserTask' });
                create.start(event, shape, element);
            }
            function appendCallActivityStart(event) {
                var shape = elementFactory.createShape({ type: 'bpmn:CallActivity' });
                create.start(event, shape, element);
            }
            function appendCallActivity(event, ele) {
                if (autoPlace) {
                    var shape = elementFactory.createShape({ type: 'bpmn:CallActivity' });
                    autoPlace.append(ele, shape);
                }
                else {
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
                    var _a, _b, _c, _d;
                    // 用户任务
                    if (key === 'append.user-task' ||
                        key === 'append.call-activity' ||
                        key === 'connect' ||
                        key === 'delete') {
                        if (key === 'append.user-task') {
                            Object.assign(result, (_a = {},
                                _a[key] = {
                                    group: data[key][0],
                                    className: data[key][1],
                                    title: "" + translate(data[key][2]),
                                    action: {
                                        click: appendUserTask,
                                        dragstart: appendUserTaskStart,
                                    },
                                },
                                _a));
                        }
                        // 调用活动
                        if (key === 'append.call-activity') {
                            Object.assign(result, (_b = {},
                                _b[key] = {
                                    group: data[key][0],
                                    className: data[key][1],
                                    title: "" + translate(data[key][2]),
                                    action: {
                                        click: appendCallActivity,
                                        dragstart: appendCallActivityStart,
                                    },
                                },
                                _b));
                        }
                        if (key === 'connect') {
                            Object.assign(result, (_c = {},
                                _c[key] = {
                                    group: data[key][0],
                                    className: data[key][1],
                                    title: "" + translate(data[key][2]),
                                    action: {
                                        click: startConnect,
                                        dragstart: startConnect,
                                    },
                                },
                                _c));
                        }
                    }
                    else {
                        Object.assign(result, (_d = {},
                            _d[key] = appendAction(data[key][0], data[key][1], translate(data[key][2])),
                            _d));
                    }
                });
                return result;
            }
            if (element.type === 'bpmn:UserTask' ||
                element.type === 'bpmn:CallActivity' ||
                element.type === 'bpmn:ServiceTask' ||
                element.type === 'bpmn:SequenceFlow' ||
                element.type === 'bpmn:StartEvent' ||
                element.type === 'bpmn:ExclusiveGateway' ||
                element.type === 'bpmn:InclusiveGateway' ||
                element.type === 'bpmn:ParallelGateway') {
                actions = translateData(contextData);
            }
            else {
                actions = {};
            }
            // 所有节点都有删除
            min_dash_1.assign(actions, {
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
        };
        return CustomContextPad;
    }());
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
});
//# sourceMappingURL=CustomContextPad.js.map