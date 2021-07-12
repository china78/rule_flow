"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/notification/style/css");

var _notification2 = _interopRequireDefault(require("antd/lib/notification"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _FullModal = _interopRequireDefault(require("@/pages/ruleFlow/components/Flow/widgets/FullModal"));

var _Modeler = _interopRequireDefault(require("./BpmnEditor/Modeler"));

require("bpmn-js/dist/assets/diagram-js.css");

require("bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css");

require("bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css");

var _xml = _interopRequireDefault(require("./BpmnEditor/sources/xml"));

var _Bpmn = _interopRequireDefault(require("./BpmnEditor/sources/Bpmn.less"));

var _fileDrops = _interopRequireDefault(require("file-drops"));

require("bpmn-js-bpmnlint/dist/assets/css/bpmn-js-bpmnlint.css");

var ProcessDesign = function ProcessDesign(props) {
  var customePaletteData = props.customePaletteData,
      contextData = props.contextData,
      control = (0, _objectWithoutProperties2.default)(props, ["customePaletteData", "contextData"]);

  var _useState = (0, _react.useState)(1),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      scale = _useState2[0],
      setScale = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      svgVisible = _useState4[0],
      setSvgVisible = _useState4[1];

  var _useState5 = (0, _react.useState)(''),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      svgSrc = _useState6[0],
      setSvgSrc = _useState6[1];

  var _useState7 = (0, _react.useState)(null),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      bpmnModeler = _useState8[0],
      setBpmnModeler = _useState8[1];

  (0, _react.useEffect)(function () {
    var _document, _document$querySelect;

    var bpmn = (0, _Modeler.default)({
      container: '#canvas',
      height: '100%',
      width: '100%',
      customePaletteData: customePaletteData,
      contextData: contextData
    });
    bpmn.on('linting.toggle', function (event) {
      var active = event.active;
      setUrlParam('linting', active);
    });
    var dndHandler = (0, _fileDrops.default)('Drop BPMN Diagram here.', function (files) {
      bpmn.importXML(files[0].contents);
    });
    (_document = document) === null || _document === void 0 ? void 0 : (_document$querySelect = _document.querySelector('body')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.addEventListener('dragover', dndHandler);
    var diagramXML = (0, _xml.default)();
    renderDiagram(diagramXML, bpmn);
    window.bpmnModeler = bpmn;
    setBpmnModeler(bpmn);
  }, []); // 流程校验使用

  function setUrlParam(name, value) {
    var url = new URL(window.location.href);

    if (value) {
      url.searchParams.set(name, '1');
    } else {
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

    var rname = name || "diagram.".concat(dataTrack);
    a.setAttribute('href', "data:application/bpmn20-xml;charset=UTF-8,".concat(encodeURIComponent(data)));
    a.setAttribute('target', '_blank');
    a.setAttribute('dataTrack', "diagram:download-".concat(dataTrack));
    a.setAttribute('download', rname);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } // 导入 xml 文件


  function handleOpenFile(e) {
    if (e.target.files.length > 0) {
      var file = e.target.files[0];
      var reader = new FileReader();
      var data = '';
      reader.readAsText(file);

      reader.onload = function (event) {
        var _event$target;

        data = event === null || event === void 0 ? void 0 : (_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.result;
        renderDiagram(data, bpmnModeler);
      };
    }
  } // 保存


  function handleSave() {
    var bpmnXml = '';
    var svgXml = '';
    bpmnModeler === null || bpmnModeler === void 0 ? void 0 : bpmnModeler.saveXML({
      format: true
    }, function (err, xml) {
      window.console.log(xml);
      bpmnXml = xml;
    });
    bpmnModeler.saveSVG({
      format: true
    }, function (err, data) {
      window.console.log(data);
      svgXml = data;
    }); // 将bpmnXml和svgXml传给后台

    window.console.log(bpmnXml);
    window.console.log(svgXml);
  } // 前进


  function handleRedo() {
    bpmnModeler.get('commandStack').redo();
  } // 后退


  function handleUndo() {
    bpmnModeler.get('commandStack').undo();
  } // 下载 SVG 格式


  function handleDownloadSvg() {
    bpmnModeler.saveSVG({
      format: true
    }, function (err, data) {
      download('svg', data);
    });
  } // 下载 XML 格式


  function handleDownloadXml() {
    bpmnModeler.saveXML({
      format: true
    }, function (err, data) {
      download('xml', data);
    });
  } // 流程图放大缩小


  function handleZoom(radio) {
    var newScale;

    if (!radio) {
      newScale = 1.0;
    } else if (scale + radio <= 0.2) {
      newScale = 0.2;
    } else {
      newScale = scale + radio;
    }

    bpmnModeler.get('canvas').zoom(newScale);
    setScale(newScale);
  } // 渲染 xml 格式


  function renderDiagram(xml, bpmn) {
    bpmn.importXML(xml, function (err) {
      if (err) {
        window.console.log(err);
        window.console.log(xml);

        _notification2.default.error({
          message: '提示',
          description: '导入失败'
        });
      }
    });
  } // 预览图片


  function handlePreview() {
    bpmnModeler.saveSVG({
      format: true
    }, function (err, data) {
      setSvgSrc(data);
      setSvgVisible(true);
    });
  } // 预览XML


  function handlePreviewXml() {
    bpmnModeler.saveXML({
      format: true
    }, function (err, data) {
      console.log(data);
    });
  } // 关闭流程图弹窗


  function handleCancel() {
    setSvgSrc('');
    setSvgVisible(false);
  }

  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '100%',
      height: '600px'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: _Bpmn.default.container,
    id: "js-drop-zone"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: _Bpmn.default.canvas,
    id: "canvas"
  }))), svgVisible && /*#__PURE__*/_react.default.createElement(_FullModal.default, {
    visible: svgVisible,
    onCancel: handleCancel
  }, /*#__PURE__*/_react.default.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: svgSrc
    }
  })));
};

var _default = ProcessDesign;
exports.default = _default;
module.exports = exports.default;