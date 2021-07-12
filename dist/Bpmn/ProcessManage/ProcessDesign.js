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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var antd_1 = require("antd");
var FullModal_1 = __importDefault(require("@/pages/ruleFlow/components/Flow/widgets/FullModal"));
var EditingTools_1 = __importDefault(require("./BpmnEditor/EditingTools"));
var Modeler_1 = __importDefault(require("./BpmnEditor/Modeler"));
require("bpmn-js/dist/assets/diagram-js.css");
require("bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css");
require("bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css");
var xml_1 = __importDefault(require("./BpmnEditor/sources/xml"));
var Bpmn_less_1 = __importDefault(require("./BpmnEditor/sources/Bpmn.less"));
var file_drops_1 = __importDefault(require("file-drops"));
require("bpmn-js-bpmnlint/dist/assets/css/bpmn-js-bpmnlint.css");
var ProcessDesign = function (props) {
    var customePaletteData = props.customePaletteData, contextData = props.contextData, control = __rest(props, ["customePaletteData", "contextData"]);
    var _a = react_1.useState(1), scale = _a[0], setScale = _a[1];
    var _b = react_1.useState(false), svgVisible = _b[0], setSvgVisible = _b[1];
    var _c = react_1.useState(''), svgSrc = _c[0], setSvgSrc = _c[1];
    var _d = react_1.useState(null), bpmnModeler = _d[0], setBpmnModeler = _d[1];
    react_1.useEffect(function () {
        var _a;
        var bpmn = Modeler_1.default({
            container: '#canvas',
            height: '100%',
            width: '100%',
            customePaletteData: customePaletteData,
            contextData: contextData,
        });
        bpmn.on('linting.toggle', function (event) {
            var active = event.active;
            setUrlParam('linting', active);
        });
        var dndHandler = file_drops_1.default('Drop BPMN Diagram here.', function (files) {
            bpmn.importXML(files[0].contents);
        });
        (_a = document === null || document === void 0 ? void 0 : document.querySelector('body')) === null || _a === void 0 ? void 0 : _a.addEventListener('dragover', dndHandler);
        var diagramXML = xml_1.default();
        renderDiagram(diagramXML, bpmn);
        window.bpmnModeler = bpmn;
        setBpmnModeler(bpmn);
    }, []);
    // 流程校验使用
    function setUrlParam(name, value) {
        var url = new URL(window.location.href);
        if (value) {
            url.searchParams.set(name, '1');
        }
        else {
            url.searchParams.delete(name);
        }
        window.history.replaceState({}, null, url.href);
    }
    /**
     * 下载xml/svg
     *  @param  type  类型  svg / xml
     *  @param  data  数据
     *  @param  name  文件名称
     */
    function download(type, data, name) {
        var dataTrack = '';
        var a = document.createElement('a');
        switch (type) {
            case 'xml':
                dataTrack = 'bpmn';
                break;
            case 'svg':
                dataTrack = 'svg';
                break;
            default:
                break;
        }
        var rname = name || "diagram." + dataTrack;
        a.setAttribute('href', "data:application/bpmn20-xml;charset=UTF-8," + encodeURIComponent(data));
        a.setAttribute('target', '_blank');
        a.setAttribute('dataTrack', "diagram:download-" + dataTrack);
        a.setAttribute('download', rname);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    // 导入 xml 文件
    function handleOpenFile(e) {
        if (e.target.files.length > 0) {
            var file = e.target.files[0];
            var reader = new FileReader();
            var data_1 = '';
            reader.readAsText(file);
            reader.onload = function (event) {
                var _a;
                data_1 = (_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.result;
                renderDiagram(data_1, bpmnModeler);
            };
        }
    }
    // 保存
    function handleSave() {
        var bpmnXml = '';
        var svgXml = '';
        bpmnModeler === null || bpmnModeler === void 0 ? void 0 : bpmnModeler.saveXML({ format: true }, function (err, xml) {
            window.console.log(xml);
            bpmnXml = xml;
        });
        bpmnModeler.saveSVG({ format: true }, function (err, data) {
            window.console.log(data);
            svgXml = data;
        });
        // 将bpmnXml和svgXml传给后台
        window.console.log(bpmnXml);
        window.console.log(svgXml);
    }
    // 前进
    function handleRedo() {
        bpmnModeler.get('commandStack').redo();
    }
    // 后退
    function handleUndo() {
        bpmnModeler.get('commandStack').undo();
    }
    // 下载 SVG 格式
    function handleDownloadSvg() {
        bpmnModeler.saveSVG({ format: true }, function (err, data) {
            download('svg', data);
        });
    }
    // 下载 XML 格式
    function handleDownloadXml() {
        bpmnModeler.saveXML({ format: true }, function (err, data) {
            download('xml', data);
        });
    }
    // 流程图放大缩小
    function handleZoom(radio) {
        var newScale;
        if (!radio) {
            newScale = 1.0;
        }
        else if (scale + radio <= 0.2) {
            newScale = 0.2;
        }
        else {
            newScale = scale + radio;
        }
        bpmnModeler.get('canvas').zoom(newScale);
        setScale(newScale);
    }
    // 渲染 xml 格式
    function renderDiagram(xml, bpmn) {
        bpmn.importXML(xml, function (err) {
            if (err) {
                window.console.log(err);
                window.console.log(xml);
                antd_1.notification.error({
                    message: '提示',
                    description: '导入失败',
                });
            }
        });
    }
    // 预览图片
    function handlePreview() {
        bpmnModeler.saveSVG({ format: true }, function (err, data) {
            setSvgSrc(data);
            setSvgVisible(true);
        });
    }
    // 预览XML
    function handlePreviewXml() {
        bpmnModeler.saveXML({ format: true }, function (err, data) {
            console.log(data);
        });
    }
    // 关闭流程图弹窗
    function handleCancel() {
        setSvgSrc('');
        setSvgVisible(false);
    }
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { style: { width: '100%', height: '600px' } },
            react_1.default.createElement("div", { className: Bpmn_less_1.default.container, id: "js-drop-zone" },
                react_1.default.createElement("div", { className: Bpmn_less_1.default.canvas, id: "canvas" }),
                react_1.default.createElement(EditingTools_1.default, __assign({ onOpenFIle: handleOpenFile, onSave: handleSave, onUndo: handleUndo, onRedo: handleRedo, onDownloadSvg: handleDownloadSvg, onDownloadXml: handleDownloadXml, onZoomIn: function () { return handleZoom(0.1); }, onZoomOut: function () { return handleZoom(-0.1); }, onZoomReset: function () { return handleZoom(); }, onPreview: handlePreview, onPreviewXml: handlePreviewXml }, control)))),
        svgVisible && (react_1.default.createElement(FullModal_1.default, { visible: svgVisible, onCancel: handleCancel },
            react_1.default.createElement("div", { dangerouslySetInnerHTML: {
                    __html: svgSrc,
                } })))));
};
exports.default = ProcessDesign;
//# sourceMappingURL=ProcessDesign.js.map