---
title: ComfyUI frontend 源码剖析
slug: comfyui-frontend-yuan-ma-pou-xi
cover: https://avatars.githubusercontent.com/u/166579949?s=48&v=4
categories:
  - 前端
  - 学习
tags:
  - Vite
  - TypeScript
  - Vue3
  - ComfyUI
halo:
  site: https://blog.glcn.top
  name: 09e4ccb5-05dc-43d4-8bf3-d0e0216d0f3c
  publish: true
---
只是一些读源码的随笔

因为要做一个AI平台，需要集成`ComfyUI`，刚好查到这个项目有一个前后端分离的前端，故拉下来学习

[https://github.com/Comfy-Org/ComfyUI_frontend](https://github.com/Comfy-Org/ComfyUI_frontend)

因作者水平有限，本文将持续不稳定更新

## 架构方面

`Vite` + `Vue3` + `PrimeVue UI` + `Electron`

- [Zod](https://zod.dev/README_ZH)，一个 TypeScript 优先的模式声明和验证库
- [litegraph](https://github.com/Comfy-Org/litegraph.js)，Comfy自家的图形库，可以在浏览器中创建图形、节点，负责ComfyUI工作流的节点显示
- [Xterm.js](https://xtermjs.org/)，终端库，实现`Web终端`
- [Fuse.js](https://www.fusejs.io/)，实现模糊搜索
- [dotenv](https://github.com/motdotla/dotenv)，一个零依赖性模块，将环境变量从`.env`文件加载到[`process.env`](https://nodejs.org/docs/latest/api/process.html#process_process_env)中。

主要使用Web模式，Electron实现跨平台

## 测试方面

- Playwright
- [Jest](https://www.jestjs.cn/docs/getting-started)

## Class

### ComfyApp

核心功能类

### ComfyUI

类似MVVM的VM层

### ComfyApi extends EventTarget

api方面，用来和后端通信，建立socket

#### EventTarget

继承自`EventTarget`，允许对象接收事件并注册监听器，任务队列动态更新就是依靠`WebSocket`和这种方法实时更新的

DeepSeek示例：

- 自定义类继承 EventTarget

```ts
// 继承 EventTarget 的 API 服务类  
class ApiService extends EventTarget {  
  constructor() {  
    super();  
    this.status = "idle";  
  }  
  
  fetchData(url) {  
    this.status = "loading";  
    this.dispatchEvent(new CustomEvent("status-change", {  
      detail: { prev: "idle", current: "loading" }  
    }));  
  
    fetch(url)  
      .then(response => {  
        this.status = "success";  
        this.dispatchEvent(new CustomEvent("success", { detail: response }));  
      })  
      .catch(error => {  
        this.status = "error";  
        this.dispatchEvent(new CustomEvent("error", { detail: error }));  
      });  
  }  
}  
  
// 使用示例 
const service = new ApiService();  
  
// 监听自定义事件 
service.addEventListener("status-change", (e) => {  
  console.log(` 状态变更：${e.detail.prev} → ${e.detail.current}`);  
});  
  
service.addEventListener("success", (e) => {  
  console.log(" 数据获取成功:", e.detail);  
});  
  
service.fetchData("https://api.example.com/data");
```

1. 通过 `super()` 调用确保继承链完整
2. 使用 `CustomEvent` 构造事件对象，`detail` 字段传递自定义数据
3. 事件类型命名建议采用全小写+连字符格式（如 `status-change`）

- 对象组合模式（非继承方案）

```ts
class AudioPlayer {  
  constructor() {  
    this.eventTarget = new EventTarget();  
  }  
  
  play() {  
    this.eventTarget.dispatchEvent(new Event("play"));  
  }  
  
  addEventListener(type, callback) {  
    this.eventTarget.addEventListener(type, callback);  
  }  
}
```

#### fetch 和 Axios

大量使用`fetch`，少量使用`Axios`

DS解释：

1. **技术定位**
    - Axios：基于 Promise 封装的 HTTP 客户端库，支持浏览器和 Node.js 环境[3](https://blog.csdn.net/qq_36407875/article/details/84642060)[5](https://blog.csdn.net/2401_84094506/article/details/138980989)
    - Fetch()：浏览器原生 API，属于 Web 标准规范，仅限浏览器环境使用[2](https://blog.csdn.net/twodogya/article/details/80223508)[8](https://blog.csdn.net/m0_55734628/article/details/132515775)
2. **请求本质**
    - Axios 底层使用 XMLHttpRequest(XHR) 实现[8](https://blog.csdn.net/m0_55734628/article/details/132515775)
    - Fetch() 采用更现代的流式数据处理机制，不依赖 XHR[1](https://blog.csdn.net/qq_44905636/article/details/105496073)[4](https://blog.csdn.net/zuggs_/article/details/80775455)

| 特性          | Axios                 | Fetch()                 | 关键差异说明                                                                                                                                               |
| ----------- | --------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **错误处理**    | 自动将 HTTP 4xx/5xx 视为错误 | 仅网络故障时 reject           | Fetch 需手动检查 `response.ok`[2](https://blog.csdn.net/twodogya/article/details/80223508)[3](https://blog.csdn.net/qq_36407875/article/details/84642060) |
| **数据转换**    | 自动转换 JSON 数据          | 需手动调用 `response.json()` | Axios 减少 30% 样板代码[5](https://blog.csdn.net/2401_84094506/article/details/138980989)[7](https://blog.csdn.net/changbozizf/article/details/105456089)  |
| **超时控制**    | 原生支持 `timeout` 配置     | 需结合 AbortController 实现  | Axios 简化复杂场景处理[5](https://blog.csdn.net/2401_84094506/article/details/138980989)[6](https://blog.csdn.net/weixin_45532305/article/details/107707956) |
| **请求取消**    | 内置 CancelToken 机制     | 依赖 AbortController API  | Axios 提供更直观的取消接口[4](https://blog.csdn.net/zuggs_/article/details/80775455)[5](https://blog.csdn.net/2401_84094506/article/details/138980989)         |
| **进度监控**    | 支持上传/下载进度事件           | 无原生支持                   | Axios 适合大文件传输场景[5](https://blog.csdn.net/2401_84094506/article/details/138980989)                                                                    |
| **CSRF 防护** | 自动携带 XSRF-TOKEN       | 需手动设置请求头                | Axios 提升安全性[2](https://blog.csdn.net/twodogya/article/details/80223508)[7](https://blog.csdn.net/changbozizf/article/details/105456089)              |

✅ **选择 Axios 的场景**：

- 需要处理复杂错误逻辑（如自动重试）
- 项目涉及文件上传进度监控
- 要求 IE11 等老旧浏览器兼容性
- 需要统一的前后端请求配置

✅ **选择 Fetch() 的场景**：

- 开发轻量级现代浏览器应用
- 希望减少第三方依赖
- 需要直接操作底层流数据
- 项目已采用 Service Worker 等新技术栈（PWA应用）

## View

### TopMenubar

负责渲染顶栏和运行按钮

### LiteGraphCanvasSplitterOverlay

建立可调整的分割块，用于分栏面板

### SideToolbar

`src/components/sidebar/tabs`

侧栏

- QueueSidebarTab，渲染任务队列
- NodeLibrarySidebarTab，渲染节点库列表
- ModelLibrarySidebarTab，渲染模型库列表
- WorkflowsSidebarTab，渲染工作流列表

### GlobalDialog

`src/components/dialog`

全局对话框，用于渲染包含设置面板内的组件，包含`content`、`header`

- `src/components/dialog/content/SettingDialogContent.vue`设置面板内容

### SettingDialogContent

渲染所有设置项

#### SettingGroup

设置分组，并通过动态渲染设置项组件：

```jsx
<component  
  :is="markRaw(getSettingComponent(setting))"  
  :id="setting.id"  
  :modelValue="settingStore.get(setting.id)"  
  @update:modelValue="updateSetting(setting, $event)"  
  v-bind="getSettingAttrs(setting)"  
/>
```

