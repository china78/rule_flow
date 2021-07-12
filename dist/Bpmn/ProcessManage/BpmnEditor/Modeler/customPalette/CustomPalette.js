"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var min_dash_1 = require("min-dash");
exports.default = (function (props) {
    var customePaletteData = props.customePaletteData;
    var CustomPalette = /** @class */ (function () {
        function CustomPalette(palette, create, elementFactory, spaceTool, lassoTool, handTool, globalConnect, translate) {
            var _this = this;
            this.getPaletteEntries = function () {
                var actions = [];
                var _a = _this, create = _a.create, elementFactory = _a.elementFactory, translate = _a.translate, spaceTool = _a.spaceTool, lassoTool = _a.lassoTool, handTool = _a.handTool, globalConnect = _a.globalConnect;
                function returnData(data) {
                    var whichAction = function (id) {
                        if (id === 'hand-tool') {
                            return { click: function (event) { return handTool.activateHand(event); } };
                        }
                        if (id === 'lasso-tool') {
                            return { click: function (event) { return lassoTool.activateSelection(event); } };
                        }
                        if (id === 'global-connect-tool') {
                            return { click: function (event) { return spaceTool.activateSelection(event); } };
                        }
                        if (id === 'space-tool') {
                            return { click: function (event) { return globalConnect.toggle(event); } };
                        }
                        return null;
                    };
                    var ergodicChildren = function (father) {
                        var children = father.children, group = father.group;
                        var result = [];
                        if (group === 'flowGateway' || group === 'processControl') {
                            children.forEach(function (item) {
                                result.push(__assign({ id: item.id }, createAction.apply(void 0, item === null || item === void 0 ? void 0 : item.attrs)));
                            });
                        }
                        else {
                            children.forEach(function (item) {
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
                    var result = data === null || data === void 0 ? void 0 : data.map(function (item) {
                        return {
                            title: translate(item.title),
                            group: item.group,
                            children: ergodicChildren(item),
                        };
                    });
                    return result;
                }
                function createAction(type, group, className, title, options, customType) {
                    function createListener(event) {
                        var shape = elementFactory.createShape(min_dash_1.assign({ type: type }, options, { customType: customType }));
                        if (options) {
                            shape.businessObject.di.isExpanded = options.isExpanded;
                        }
                        create.start(event, shape);
                    }
                    var shortType = type.replace(/^bpmn:/, '');
                    var action = {
                        group: group,
                        className: className,
                        title: (title && translate(title)) || translate("" + shortType),
                        action: {
                            dragstart: createListener,
                            click: createListener,
                        },
                    };
                    return action;
                }
                min_dash_1.assign(actions, returnData(customePaletteData));
                return actions;
            };
            this.create = create;
            this.elementFactory = elementFactory;
            this.spaceTool = spaceTool;
            this.lassoTool = lassoTool;
            this.handTool = handTool;
            this.globalConnect = globalConnect;
            this.translate = translate;
            palette.registerProvider(this);
        }
        return CustomPalette;
    }());
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
});
//# sourceMappingURL=CustomPalette.js.map