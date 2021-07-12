declare interface Props {
  onOpenFIle: any;
  onZoomIn: any;
  onZoomOut: any;
  onZoomReset: any;
  onUndo: any;
  onRedo: any;
  onSave: any;
  onDownloadXml: any;
  onDownloadSvg: any;
  onPreview: any;
  onPreviewXml: any;
  // 打开BPMN文件
  openBPMNFile: boolean;
  // 撤销
  revoke: boolean;
  // 恢复
  recovery: boolean;
  // 重置大小
  resize: boolean;
  // 放大
  enlarge: boolean;
  // 缩小
  narrow: boolean;
  // 保存流程
  saveProcess: boolean;
  // 下载BPMN文件
  downloadBPMNFile: boolean;
  // 下载流程图片
  downloadProcessPicture: boolean;
  // 预览流程图片
  previewProcessPicture: boolean;
  // 查看流程xml
  viewProcessXML: boolean;
}

declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';