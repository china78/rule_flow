import React, { useState, useEffect } from 'react';
import { notification } from 'antd';
import FullModal from '@/pages/ruleFlow/components/Flow/widgets/FullModal';
import EditingTools from './BpmnEditor/EditingTools';
import BpmnModelerFn from './BpmnEditor/Modeler';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';
import getDefaultXml from './BpmnEditor/sources/xml';
import styles from './BpmnEditor/sources/Bpmn.less';
import fileDrop from 'file-drops';
import 'bpmn-js-bpmnlint/dist/assets/css/bpmn-js-bpmnlint.css';

type Props = {
  customePaletteData: any;
  contextData: any;
};
declare const window: any;

const ProcessDesign = (props: Props) => {
  const { customePaletteData, contextData, ...control } = props;
  const [scale, setScale] = useState(1);
  const [svgVisible, setSvgVisible] = useState(false);
  const [svgSrc, setSvgSrc] = useState('');
  const [bpmnModeler, setBpmnModeler] = useState<any>(null);

  useEffect(() => {
    const bpmn: any = BpmnModelerFn({
      container: '#canvas',
      height: '100%',
      width: '100%',
      customePaletteData,
      contextData,
    });

    bpmn.on('linting.toggle', (event: any) => {
      const { active } = event;
      setUrlParam('linting', active);
    });
    const dndHandler = fileDrop('Drop BPMN Diagram here.', (files: any) => {
      bpmn.importXML(files[0].contents);
    });
    document?.querySelector('body')?.addEventListener('dragover', dndHandler);

    const diagramXML = getDefaultXml();
    renderDiagram(diagramXML, bpmn);

    window.bpmnModeler = bpmn;

    setBpmnModeler(bpmn);
  }, []);

  // 流程校验使用
  function setUrlParam(name: any, value: any) {
    const url = new URL(window.location.href);

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
  function download(type: any, data: any, name?: any) {
    let dataTrack = '';
    const a = document.createElement('a');

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

    const rname = name || `diagram.${dataTrack}`;

    a.setAttribute('href', `data:application/bpmn20-xml;charset=UTF-8,${encodeURIComponent(data)}`);
    a.setAttribute('target', '_blank');
    a.setAttribute('dataTrack', `diagram:download-${dataTrack}`);
    a.setAttribute('download', rname);

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // 导入 xml 文件
  function handleOpenFile(e: any): void {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      let data: string | any = '';
      reader.readAsText(file);
      reader.onload = (event) => {
        data = event?.target?.result;
        renderDiagram(data, bpmnModeler);
      };
    }
  }

  // 保存
  function handleSave(): void {
    let bpmnXml = '';
    let svgXml = '';
    bpmnModeler?.saveXML({ format: true }, (err: any, xml: any) => {
      window.console.log(xml);
      bpmnXml = xml;
    });
    bpmnModeler.saveSVG({ format: true }, (err: any, data: any) => {
      window.console.log(data);
      svgXml = data;
    });
    // 将bpmnXml和svgXml传给后台
    window.console.log(bpmnXml);
    window.console.log(svgXml);
  }

  // 前进
  function handleRedo(): void {
    bpmnModeler.get('commandStack').redo();
  }

  // 后退
  function handleUndo(): void {
    bpmnModeler.get('commandStack').undo();
  }

  // 下载 SVG 格式
  function handleDownloadSvg(): void {
    bpmnModeler.saveSVG({ format: true }, (err: any, data: any) => {
      download('svg', data);
    });
  }

  // 下载 XML 格式
  function handleDownloadXml(): void {
    bpmnModeler.saveXML({ format: true }, (err: any, data: any) => {
      download('xml', data);
    });
  }

  // 流程图放大缩小
  function handleZoom(radio?: any): void {
    let newScale;
    if (!radio) {
      newScale = 1.0;
    } else if (scale + radio <= 0.2) {
      newScale = 0.2;
    } else {
      newScale = scale + radio;
    }

    bpmnModeler.get('canvas').zoom(newScale);
    setScale(newScale);
  }

  // 渲染 xml 格式
  function renderDiagram(xml: any, bpmn: any) {
    bpmn.importXML(xml, (err: any) => {
      if (err) {
        window.console.log(err);
        window.console.log(xml);
        notification.error({
          message: '提示',
          description: '导入失败',
        });
      }
    });
  }

  // 预览图片
  function handlePreview() {
    bpmnModeler.saveSVG({ format: true }, (err: any, data: any) => {
      setSvgSrc(data);
      setSvgVisible(true);
    });
  }

  // 预览XML
  function handlePreviewXml() {
    bpmnModeler.saveXML({ format: true }, (err: any, data: any) => {
      console.log(data);
    });
  }

  // 关闭流程图弹窗
  function handleCancel() {
    setSvgSrc('');
    setSvgVisible(false);
  }

  return (
    <div>
      <div style={{ width: '100%', height: '600px' }}>
        <div className={styles.container} id="js-drop-zone">
          <div className={styles.canvas} id="canvas" />
          <EditingTools
            onOpenFIle={handleOpenFile}
            onSave={handleSave}
            onUndo={handleUndo}
            onRedo={handleRedo}
            onDownloadSvg={handleDownloadSvg}
            onDownloadXml={handleDownloadXml}
            onZoomIn={() => handleZoom(0.1)}
            onZoomOut={() => handleZoom(-0.1)}
            onZoomReset={() => handleZoom()}
            onPreview={handlePreview}
            onPreviewXml={handlePreviewXml}
            {...control}
          />
        </div>
      </div>

      {/* 查看流程图弹窗 */}
      {svgVisible && (
        <FullModal visible={svgVisible} onCancel={handleCancel}>
          <div
            dangerouslySetInnerHTML={{
              __html: svgSrc,
            }}
          />
        </FullModal>
      )}
    </div>
  );
};

export default ProcessDesign;
