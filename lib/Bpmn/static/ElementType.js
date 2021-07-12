"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var BPMN_PREFIX = 'bpmn:';
var CUSTOM_PROFIX = 'flowable:';
var ELEMETN_TYPE = {
  // 以下为 bpmn规范的元素
  collaboration: "".concat(BPMN_PREFIX, "Collaboration"),
  textAnnotation: "".concat(BPMN_PREFIX, "TextAnnotation"),
  group: "".concat(BPMN_PREFIX, "Group"),
  process: "".concat(BPMN_PREFIX, "Process"),
  documentation: "".concat(BPMN_PREFIX, "Documentation"),
  startEvent: "".concat(BPMN_PREFIX, "StartEvent"),
  endEvent: "".concat(BPMN_PREFIX, "EndEvent"),
  throwEvent: "".concat(BPMN_PREFIX, "IntermediateThrowEvent"),
  exclusiveGateway: "".concat(BPMN_PREFIX, "ExclusiveGateway"),
  inclusiveGateway: "".concat(BPMN_PREFIX, "InclusiveGateway"),
  parallelGateway: "".concat(BPMN_PREFIX, "ParallelGateway"),
  sequenceFlow: "".concat(BPMN_PREFIX, "SequenceFlow"),
  userTask: "".concat(BPMN_PREFIX, "UserTask"),
  callActivity: "".concat(BPMN_PREFIX, "CallActivity"),
  // 以下为flowable的拓展元素
  listener: "".concat(CUSTOM_PROFIX, "Listener"),
  // 只读设计器
  startEventReadonly: "".concat(BPMN_PREFIX, "StartEventReadonly"),
  endEventReadonly: "".concat(BPMN_PREFIX, "EndEventReadonly"),
  throwEventReadonly: "".concat(BPMN_PREFIX, "IntermediateThrowEventReadonly"),
  exclusiveGatewayReadonly: "".concat(BPMN_PREFIX, "ExclusiveGatewayReadonly"),
  inclusiveGatewayReadonly: "".concat(BPMN_PREFIX, "InclusiveGatewayReadonly"),
  parallelGatewayReadonly: "".concat(BPMN_PREFIX, "ParallelGatewayReadonly"),
  sequenceFlowReadonly: "".concat(BPMN_PREFIX, "SequenceFlowReadonly"),
  userTaskReadonly: "".concat(BPMN_PREFIX, "UserTaskReadonly"),
  callActivityReadonly: "".concat(BPMN_PREFIX, "CallActivityReadonly")
};
var _default = ELEMETN_TYPE;
exports.default = _default;
module.exports = exports.default;