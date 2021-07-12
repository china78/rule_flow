"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _index = _interopRequireDefault(require("./index.less"));

var EditingTools = function EditingTools(props) {
  var _useState = (0, _react.useState)(null),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      ref = _useState2[0],
      setRef = _useState2[1];

  function handleOpen() {
    ref.click();
  }

  var onOpenFIle = props.onOpenFIle,
      onZoomIn = props.onZoomIn,
      onZoomOut = props.onZoomOut,
      onZoomReset = props.onZoomReset,
      onUndo = props.onUndo,
      onRedo = props.onRedo,
      onSave = props.onSave,
      onDownloadXml = props.onDownloadXml,
      onDownloadSvg = props.onDownloadSvg,
      onPreview = props.onPreview,
      onPreviewXml = props.onPreviewXml,
      openBPMNFile = props.openBPMNFile,
      revoke = props.revoke,
      recovery = props.recovery,
      resize = props.resize,
      enlarge = props.enlarge,
      narrow = props.narrow,
      saveProcess = props.saveProcess,
      downloadBPMNFile = props.downloadBPMNFile,
      downloadProcessPicture = props.downloadProcessPicture,
      previewProcessPicture = props.previewProcessPicture,
      viewProcessXML = props.viewProcessXML;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: _index.default.editingTools
  }, /*#__PURE__*/_react.default.createElement("ul", {
    className: _index.default.controlList
  }, /*#__PURE__*/_react.default.createElement("li", {
    className: "".concat(_index.default.control, " ").concat(_index.default.line),
    style: {
      display: !openBPMNFile ? 'none' : 'block'
    }
  }, /*#__PURE__*/_react.default.createElement("input", {
    ref: function ref(file) {
      return setRef(file);
    },
    className: _index.default.openFile,
    type: "file",
    onChange: onOpenFIle
  }), /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    title: "\u6253\u5F00BPMN\u6587\u4EF6",
    onClick: handleOpen
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: _index.default.open
  }))), /*#__PURE__*/_react.default.createElement("li", {
    className: _index.default.control,
    style: {
      display: !revoke ? 'none' : 'block'
    }
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    title: "\u64A4\u9500",
    onClick: onUndo
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: _index.default.undo
  }))), /*#__PURE__*/_react.default.createElement("li", {
    className: "".concat(_index.default.control, " ").concat(_index.default.line),
    style: {
      display: !recovery ? 'none' : 'block'
    }
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    title: "\u6062\u590D",
    onClick: onRedo
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: _index.default.redo
  }))), /*#__PURE__*/_react.default.createElement("li", {
    className: _index.default.control,
    style: {
      display: !resize ? 'none' : 'block'
    }
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    title: "\u91CD\u7F6E\u5927\u5C0F",
    onClick: onZoomReset
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: _index.default.zoom
  }))), /*#__PURE__*/_react.default.createElement("li", {
    className: _index.default.control,
    style: {
      display: !enlarge ? 'none' : 'block'
    }
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    title: "\u653E\u5927",
    onClick: onZoomIn
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: _index.default.zoomIn
  }))), /*#__PURE__*/_react.default.createElement("li", {
    className: "".concat(_index.default.control, " ").concat(_index.default.line),
    style: {
      display: !narrow ? 'none' : 'block'
    }
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    title: "\u7F29\u5C0F",
    onClick: onZoomOut
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: _index.default.zoomOut
  }))), /*#__PURE__*/_react.default.createElement("li", {
    className: _index.default.control,
    style: {
      display: !saveProcess ? 'none' : 'block'
    }
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    title: "\u4FDD\u5B58\u6D41\u7A0B",
    onClick: onSave
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: _index.default.save
  }))), /*#__PURE__*/_react.default.createElement("li", {
    className: _index.default.control,
    style: {
      display: !downloadBPMNFile ? 'none' : 'block'
    }
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    title: "\u4E0B\u8F7DBPMN\u6587\u4EF6",
    onClick: onDownloadXml
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: _index.default.download
  }))), /*#__PURE__*/_react.default.createElement("li", {
    className: _index.default.control,
    style: {
      display: !downloadProcessPicture ? 'none' : 'block'
    }
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    title: "\u4E0B\u8F7D\u6D41\u7A0B\u56FE\u7247",
    onClick: onDownloadSvg
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: _index.default.image
  }))), /*#__PURE__*/_react.default.createElement("li", {
    className: _index.default.control,
    style: {
      display: !previewProcessPicture ? 'none' : 'block'
    }
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    title: "\u9884\u89C8\u6D41\u7A0B\u56FE\u7247",
    onClick: onPreview
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: _index.default.preview
  }))), /*#__PURE__*/_react.default.createElement("li", {
    className: _index.default.control,
    style: {
      display: !viewProcessXML ? 'none' : 'block'
    }
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    title: "\u67E5\u770B\u6D41\u7A0Bxml",
    onClick: onPreviewXml
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: _index.default.preview
  })))));
};

var _default = EditingTools;
exports.default = _default;
module.exports = exports.default;