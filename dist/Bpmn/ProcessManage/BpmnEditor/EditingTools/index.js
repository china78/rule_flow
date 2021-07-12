"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var index_less_1 = __importDefault(require("./index.less"));
var EditingTools = function (props) {
    var _a = react_1.useState(null), ref = _a[0], setRef = _a[1];
    function handleOpen() {
        ref.click();
    }
    var onOpenFIle = props.onOpenFIle, onZoomIn = props.onZoomIn, onZoomOut = props.onZoomOut, onZoomReset = props.onZoomReset, onUndo = props.onUndo, onRedo = props.onRedo, onSave = props.onSave, onDownloadXml = props.onDownloadXml, onDownloadSvg = props.onDownloadSvg, onPreview = props.onPreview, onPreviewXml = props.onPreviewXml, 
    // 打开BPMN文件
    openBPMNFile = props.openBPMNFile, 
    // 撤销
    revoke = props.revoke, 
    // 恢复
    recovery = props.recovery, 
    // 重置大小
    resize = props.resize, 
    // 放大
    enlarge = props.enlarge, 
    // 缩小
    narrow = props.narrow, 
    // 保存流程
    saveProcess = props.saveProcess, 
    // 下载BPMN文件
    downloadBPMNFile = props.downloadBPMNFile, 
    // 下载流程图片
    downloadProcessPicture = props.downloadProcessPicture, 
    // 预览流程图片
    previewProcessPicture = props.previewProcessPicture, 
    // 查看流程xml
    viewProcessXML = props.viewProcessXML;
    return (react_1.default.createElement("div", { className: index_less_1.default.editingTools },
        react_1.default.createElement("ul", { className: index_less_1.default.controlList },
            react_1.default.createElement("li", { className: index_less_1.default.control + " " + index_less_1.default.line, style: { display: !openBPMNFile ? 'none' : 'block' } },
                react_1.default.createElement("input", { ref: function (file) { return setRef(file); }, className: index_less_1.default.openFile, type: "file", onChange: onOpenFIle }),
                react_1.default.createElement("button", { type: "button", title: "\u6253\u5F00BPMN\u6587\u4EF6", onClick: handleOpen },
                    react_1.default.createElement("i", { className: index_less_1.default.open }))),
            react_1.default.createElement("li", { className: index_less_1.default.control, style: { display: !revoke ? 'none' : 'block' } },
                react_1.default.createElement("button", { type: "button", title: "\u64A4\u9500", onClick: onUndo },
                    react_1.default.createElement("i", { className: index_less_1.default.undo }))),
            react_1.default.createElement("li", { className: index_less_1.default.control + " " + index_less_1.default.line, style: { display: !recovery ? 'none' : 'block' } },
                react_1.default.createElement("button", { type: "button", title: "\u6062\u590D", onClick: onRedo },
                    react_1.default.createElement("i", { className: index_less_1.default.redo }))),
            react_1.default.createElement("li", { className: index_less_1.default.control, style: { display: !resize ? 'none' : 'block' } },
                react_1.default.createElement("button", { type: "button", title: "\u91CD\u7F6E\u5927\u5C0F", onClick: onZoomReset },
                    react_1.default.createElement("i", { className: index_less_1.default.zoom }))),
            react_1.default.createElement("li", { className: index_less_1.default.control, style: { display: !enlarge ? 'none' : 'block' } },
                react_1.default.createElement("button", { type: "button", title: "\u653E\u5927", onClick: onZoomIn },
                    react_1.default.createElement("i", { className: index_less_1.default.zoomIn }))),
            react_1.default.createElement("li", { className: index_less_1.default.control + " " + index_less_1.default.line, style: { display: !narrow ? 'none' : 'block' } },
                react_1.default.createElement("button", { type: "button", title: "\u7F29\u5C0F", onClick: onZoomOut },
                    react_1.default.createElement("i", { className: index_less_1.default.zoomOut }))),
            react_1.default.createElement("li", { className: index_less_1.default.control, style: { display: !saveProcess ? 'none' : 'block' } },
                react_1.default.createElement("button", { type: "button", title: "\u4FDD\u5B58\u6D41\u7A0B", onClick: onSave },
                    react_1.default.createElement("i", { className: index_less_1.default.save }))),
            react_1.default.createElement("li", { className: index_less_1.default.control, style: { display: !downloadBPMNFile ? 'none' : 'block' } },
                react_1.default.createElement("button", { type: "button", title: "\u4E0B\u8F7DBPMN\u6587\u4EF6", onClick: onDownloadXml },
                    react_1.default.createElement("i", { className: index_less_1.default.download }))),
            react_1.default.createElement("li", { className: index_less_1.default.control, style: { display: !downloadProcessPicture ? 'none' : 'block' } },
                react_1.default.createElement("button", { type: "button", title: "\u4E0B\u8F7D\u6D41\u7A0B\u56FE\u7247", onClick: onDownloadSvg },
                    react_1.default.createElement("i", { className: index_less_1.default.image }))),
            react_1.default.createElement("li", { className: index_less_1.default.control, style: { display: !previewProcessPicture ? 'none' : 'block' } },
                react_1.default.createElement("button", { type: "button", title: "\u9884\u89C8\u6D41\u7A0B\u56FE\u7247", onClick: onPreview },
                    react_1.default.createElement("i", { className: index_less_1.default.preview }))),
            react_1.default.createElement("li", { className: index_less_1.default.control, style: { display: !viewProcessXML ? 'none' : 'block' } },
                react_1.default.createElement("button", { type: "button", title: "\u67E5\u770B\u6D41\u7A0Bxml", onClick: onPreviewXml },
                    react_1.default.createElement("i", { className: index_less_1.default.preview }))))));
};
exports.default = EditingTools;
//# sourceMappingURL=index.js.map