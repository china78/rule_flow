import React, { useState } from 'react';
import styles from './index.less';

const EditingTools: any = (props: Props) => {
  const [ref, setRef] = useState<any>(null);

  function handleOpen() {
    ref.click();
  }
  const {
    onOpenFIle,
    onZoomIn,
    onZoomOut,
    onZoomReset,
    onUndo,
    onRedo,
    onSave,
    onDownloadXml,
    onDownloadSvg,
    onPreview,
    onPreviewXml,
    // 打开BPMN文件
    openBPMNFile,
    // 撤销
    revoke,
    // 恢复
    recovery,
    // 重置大小
    resize,
    // 放大
    enlarge,
    // 缩小
    narrow,
    // 保存流程
    saveProcess,
    // 下载BPMN文件
    downloadBPMNFile,
    // 下载流程图片
    downloadProcessPicture,
    // 预览流程图片
    previewProcessPicture,
    // 查看流程xml
    viewProcessXML,
  } = props;
  return (
    <div className={styles.editingTools}>
      <ul className={styles.controlList}>
        <li
          className={`${styles.control} ${styles.line}`}
          style={{ display: !openBPMNFile ? 'none' : 'block' }}
        >
          <input
            ref={(file) => setRef(file)}
            className={styles.openFile}
            type="file"
            onChange={onOpenFIle}
          />
          <button type="button" title="打开BPMN文件" onClick={handleOpen}>
            <i className={styles.open} />
          </button>
        </li>

        <li className={styles.control} style={{ display: !revoke ? 'none' : 'block' }}>
          <button type="button" title="撤销" onClick={onUndo}>
            <i className={styles.undo} />
          </button>
        </li>
        <li
          className={`${styles.control} ${styles.line}`}
          style={{ display: !recovery ? 'none' : 'block' }}
        >
          <button type="button" title="恢复" onClick={onRedo}>
            <i className={styles.redo} />
          </button>
        </li>

        <li className={styles.control} style={{ display: !resize ? 'none' : 'block' }}>
          <button type="button" title="重置大小" onClick={onZoomReset}>
            <i className={styles.zoom} />
          </button>
        </li>
        <li className={styles.control} style={{ display: !enlarge ? 'none' : 'block' }}>
          <button type="button" title="放大" onClick={onZoomIn}>
            <i className={styles.zoomIn} />
          </button>
        </li>
        <li
          className={`${styles.control} ${styles.line}`}
          style={{ display: !narrow ? 'none' : 'block' }}
        >
          <button type="button" title="缩小" onClick={onZoomOut}>
            <i className={styles.zoomOut} />
          </button>
        </li>

        <li className={styles.control} style={{ display: !saveProcess ? 'none' : 'block' }}>
          <button type="button" title="保存流程" onClick={onSave}>
            <i className={styles.save} />
          </button>
        </li>
        <li className={styles.control} style={{ display: !downloadBPMNFile ? 'none' : 'block' }}>
          <button type="button" title="下载BPMN文件" onClick={onDownloadXml}>
            <i className={styles.download} />
          </button>
        </li>
        <li
          className={styles.control}
          style={{ display: !downloadProcessPicture ? 'none' : 'block' }}
        >
          <button type="button" title="下载流程图片" onClick={onDownloadSvg}>
            <i className={styles.image} />
          </button>
        </li>
        <li
          className={styles.control}
          style={{ display: !previewProcessPicture ? 'none' : 'block' }}
        >
          <button type="button" title="预览流程图片" onClick={onPreview}>
            <i className={styles.preview} />
          </button>
        </li>
        <li className={styles.control} style={{ display: !viewProcessXML ? 'none' : 'block' }}>
          <button type="button" title="查看流程xml" onClick={onPreviewXml}>
            <i className={styles.preview} />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default EditingTools;
