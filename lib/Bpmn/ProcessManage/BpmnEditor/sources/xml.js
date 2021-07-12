"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDefaultXml;

function getDefaultXml() {
  var diagramXML = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n    <bpmn2:definitions\n      xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\n      xmlns:bpmn2=\"http://www.omg.org/spec/BPMN/20100524/MODEL\"\n      xmlns:bpmndi=\"http://www.omg.org/spec/BPMN/20100524/DI\"\n      xmlns:dc=\"http://www.omg.org/spec/DD/20100524/DC\"\n      xmlns:di=\"http://www.omg.org/spec/DD/20100524/DI\"\n      xsi:schemaLocation=\"http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd\"\n      id=\"sample-diagram\"\n      targetNamespace=\"http://www.flowable.org/processdef\"\n    >\n      <bpmn2:process id=\"Process_1\" isExecutable=\"true\" name=\"\" normal:isGreen=\"0\" >\n      </bpmn2:process>\n      <bpmndi:BPMNDiagram id=\"BPMNDiagram_1\" >\n        <bpmndi:BPMNPlane id=\"BPMNPlane_1\" bpmnElement=\"Process_1\">\n        </bpmndi:BPMNPlane>\n      </bpmndi:BPMNDiagram>\n    </bpmn2:definitions>";
  return diagramXML;
}

module.exports = exports.default;