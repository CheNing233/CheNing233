---
title: fetch() 流式数据处理
slug: fetch-liu-shi-shu-ju-chu-li
cover: ""
categories:
  - 编程
  - 前端
  - 学习
tags:
  - TypeScript
  - 流式请求
  - fetch
halo:
  site: https://blog.glcn.top
  name: 78ed2ccf-78ba-4889-b861-3feb70f48179
  publish: true
---
## 流式请求 vs 普通请求

|**对比维度**|**流式请求**|**普通请求**|
|---|---|---|
|**数据接收方式**|分块实时接收，逐步处理（如逐字符显示）[6](https://blog.csdn.net/qq_43750656/article/details/131591198)|一次性接收完整响应后处理[6](https://blog.csdn.net/qq_43750656/article/details/131591198)|
|**内存占用**|内存占用低，适合大文件/长文本[3](https://blog.csdn.net/yaxuan88521/article/details/115607010)|需完整加载响应体，大文件易导致内存压力|
|**实时性**|支持动态更新（如聊天、日志流）[6](https://blog.csdn.net/qq_43750656/article/details/131591198)|需等待全部数据到达后才能操作|
|**应用场景**|实时数据推送、大文件下载、打字机效果[6](https://blog.csdn.net/qq_43750656/article/details/131591198)|常规 JSON/文本请求、小文件传输|
|**技术实现复杂度**|需手动管理数据块和流状态[3](https://blog.csdn.net/yaxuan88521/article/details/115607010)|直接调用 `response.json()` 等快捷方法[1](https://blog.csdn.net/weichushun/article/details/123043355)|
## 实现

### 发送请求并获取流对象

通过 `fetch()` 发起请求后，从 `response.body` 获取可读流：

```ts
fetch("https://api.example.com/stream")  
  .then(response => {  
    const reader = response.body.getReader();  
    return processStream(reader);  
  });
```

### 逐块读取数据

使用 `ReadableStream.getReader()` 创建读取器，循环读取数据块：

```ts
async function processStream(reader) {  
  while (true) {  
    const { done, value } = await reader.read();  
    if (done) break;  
    // 处理每个数据块（value 是 Uint8Array 类型）    
	console.log(new TextDecoder().decode(value));  
  }  
}
```

### 特殊场景：Server-Sent Events（SSE） 

若服务端返回 `Content-Type: text/event-stream`，可使用 `EventSource` 或第三方库（如 `fetch-event-source`）处理事件流[6](https://blog.csdn.net/qq_43750656/article/details/131591198)。

### 关键注意事项

1. **流式请求的终止控制**  
    可通过 `reader.cancel()` 主动中断流，避免资源泄漏[3](https://blog.csdn.net/yaxuan88521/article/details/115607010)。
    
2. **编码转换**  
    流数据默认以 `Uint8Array` 格式传输，需用 `TextDecoder` 转换为字符串[3](https://blog.csdn.net/yaxuan88521/article/details/115607010)。
    
3. **错误处理**  
    Fetch 默认不拒绝 HTTP 错误状态码（如 404/500），需手动检查 `response.ok`

