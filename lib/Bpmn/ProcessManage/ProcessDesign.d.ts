/// <reference types="react" />
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';
import 'bpmn-js-bpmnlint/dist/assets/css/bpmn-js-bpmnlint.css';
declare type Props = {
    customePaletteData: any;
    contextData: any;
};
declare const ProcessDesign: (props: Props) => JSX.Element;
export default ProcessDesign;
