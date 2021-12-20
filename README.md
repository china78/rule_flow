## 使用方法


### 页面引用

```
import ProcessDesign from '@lnpm/lampui-rule-flow';

const configs = {
  // 调色板配置
  customePaletteData: [
    // 工具大类
    {
      title: 'Tools',
      group: 'tools',
      children: [
        // 激活抓手工具
        {
          id: 'hand-tool',
          // 所属分组
          group: 'tools',
          // icon_样式
          className: 'bpmn-icon-hand-tool',
          // 对应翻译列表
          title: 'Activate the hand tool',
        },
        // 激活套索工具
        {
          id: 'lasso-tool',
          group: 'tools',
          className: 'bpmn-icon-lasso-tool',
          title: 'Activate the lasso tool',
        },
        // 激活创建/删除空间工具
        {
          id: 'space-tool',
          group: 'tools',
          className: 'bpmn-icon-space-tool',
          title: 'Activate the create/remove space tool',
        },
        // 激活全局连接工具
        {
          id: 'global-connect-tool',
          group: 'tools',
          className: 'bpmn-icon-connection-multi',
          title: 'Activate the global connect tool',
        },
      ],
    },
    // 流程网关
    {
      title: 'FlowGateway',
      group: 'flowGateway',
      children: [
        // 排他网关
        {
          id: 'create.exclusive-gateway',
          // [名称, 分组, icon_样式]
          attrs: ['bpmn:ExclusiveGateway', 'gateway', 'bpmn-icon-gateway-xor'],
        },
        // 并行网关
        {
          id: 'create.parallel-gateway',
          attrs: ['bpmn:ParallelGateway', 'gateway', 'bpmn-icon-gateway-parallel'],
        },
        // 相容网关
        {
          id: 'create.inclusive-gateway',
          attrs: ['bpmn:InclusiveGateway', 'gateway', 'bpmn-icon-gateway-or'],
        },
      ],
    },
    // 流程节点
    {
      title: 'ProcessControl',
      group: 'processControl',
      children: [
        // 开始事件
        {
          id: 'create.start-event',
          attrs: ['bpmn:StartEvent', 'event', 'bpmn-icon-start-event-none'],
        },
        // 用户任务
        {
          id: 'create.user-task',
          attrs: ['bpmn:UserTask', 'activity', 'bpmn-icon-user-task'],
        },
        // 调用活动
        {
          id: 'create.call-activity',
          attrs: ['bpmn:CallActivity', 'activity', 'bpmn-icon-call-activity'],
        },
        // 结束事件
        {
          id: 'create.end-event',
          attrs: ['bpmn:EndEvent', 'event', 'bpmn-icon-end-event-none'],
        },
      ],
    },
  ],
  // 上下文配置
  contextData: {
    // 排他网关
    'append.exclusive-gateway': [
      // 类型
      'bpmn:ExclusiveGateway',
      // icon_样式
      'bpmn-icon-gateway-xor',
      // 名称
      'Append Gateway',
    ],
    // 并行网关
    'append.parallel-gateway': [
      'bpmn:ParallelGateway',
      'bpmn-icon-gateway-parallel',
      'Append Gateway',
    ],
    // 相融网关
    'append.inclusive-gateway': [
      'bpmn:InclusiveGateway',
      'bpmn-icon-gateway-or',
      'Append Gateway',
    ],
    // 结束事件
    'append.intermediate-event': [
      'bpmn:IntermediateThrowEvent',
      'bpmn-icon-intermediate-event-none',
      'Append Intermediate/Boundary Event',
    ],
    // 用户任务
    'append.user-task': ['model', 'bpmn-icon-user-task', 'UserTask'],
    // 调用活动
    'append.call-activity': ['model', 'bpmn-icon-call-activity', 'Append CallActivity'],
    // 连接线
    connect: ['connect', 'bpmn-icon-connection-multi', 'Connect using DataInputAssociation'],
    // 删除节点
    delete: ['edit', 'bpmn-icon-trash', 'Remove'],
  },
  // 打开BPMN文件
  openBPMNFile: true,
  // 撤销
  revoke: true,
  // 恢复
  recovery: true,
  // 重置大小
  resize: false,
  // 放大
  enlarge: true,
  // 缩小
  narrow: true,
  // 保存流程
  saveProcess: true,
  // 下载BPMN文件
  downloadBPMNFile: true,
  // 下载流程图片
  downloadProcessPicture: false,
  // 预览流程图片
  previewProcessPicture: false,
  // 查看流程xml
  viewProcessXML: false,
};

<ProcessDesign {...configs} />
```

### 参数

| 字段名称                     | 字段含义         | 是否必填 | 备注                                                        |
| ------------------------| -------------------| --------| ---------------------------------------------------------- |
| customePaletteData      | 调色板              | Y       |  调色板 (左侧) 注意: [工具大类]与[流程网关&&流程节点]的数据结构不同 下文详解 customePaletteData  |
| contextData             | 节点-上下文          | Y       |  元素拖入画板后, 点击出现上下文面板选项 下文详解 contextData    |
| openBPMNFile            | 打开BPMN文件         | N       |                                                            |
| revoke                  | 撤销                | N       |                                                            |
| recovery                | 恢复                | N       |             |
| resize                  | 重置大小             | N       |                                      |
| enlarge                 | 放大                | N       |                |
| narrow                  | 缩小                | N       |                                                 |
| saveProcess             | 保存流程             | Y       |                                      |
| downloadBPMNFile        | 下载BPMN文件         | N       |                                                            |
| downloadProcessPicture  | 下载流程图片          | N       |                                                            |
| previewProcessPicture   | 预览流程图片          | N       |                                                            |
| viewProcessXML          | 查看流程xml          | N       |                                                             |

### customePaletteData

```
customePaletteData: [
  // 工具大类
  {
    title: 'Tools',
    group: 'tools',
    children: [
      // 激活抓手工具
      {
        id: 'hand-tool',
        // 所属分组
        group: 'tools',
        // icon_样式
        className: 'bpmn-icon-hand-tool',
        // 对应翻译列表
        title: 'Activate the hand tool',
      },
      ...
    ],
  },
  // 流程网关
  {
    title: 'FlowGateway',
    group: 'flowGateway',
    children: [
      // 排他网关
      {
        id: 'create.exclusive-gateway',
        // [名称, 分组, icon_样式]
        attrs: ['bpmn:ExclusiveGateway', 'gateway', 'bpmn-icon-gateway-xor'],
      },
      ...
    ],
  },
]

```

### contextData

```
  contextData: {
    // 排他网关
    'append.exclusive-gateway': [
      // 类型
      'bpmn:ExclusiveGateway',
      // icon_样式
      'bpmn-icon-gateway-xor',
      // 名称
      'Append Gateway',
    ],
  }

```

