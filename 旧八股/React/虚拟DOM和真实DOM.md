## 虚拟DOM（Virtual DOM）

- 本质：js对象
- 属性和真实DOM是一一对应的

### 创建一个虚拟DOM并渲染

#### JSX代码如下

**JSX** 是 JavaScript 语法扩展，可以让你在 JavaScript 文件中书写类似 HTML 的标签。

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

// 创建虚拟 DOM
const vDom = <h1>Hello, Virtual DOM!</h1>;

// 查看对象
console.log(vDom) 
/*
{
    "type": "h1",
    "key": null,
    "ref": null,
    "props": {
        "children": "Hello, Virtual DOM!"
    },
    "_owner": null
}
*/

// 找到容器元素
const root = document.getElementById('root');

// 渲染虚拟 DOM 到真实 DOM
ReactDOM.render(vDom, root);
```

#### 通过 Babel 等工具编译为 JS 后

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

// 创建虚拟 DOM，这里JSX语法将会被编译为JavaScript语法（Babel等工具编译为适合ES5标准的）
// React.createElement(type, [props], ...children);
const vDom = React.createElement('h1', null, 'Hello, Virtual DOM!');

// 查看对象
console.log(vDom) 
/*
{
    "type": "h1",
    "key": null,
    "ref": null,
    "props": {
        "children": "Hello, Virtual DOM!"
    },
    "_owner": null
}
*/

// 找到容器元素
const root = document.getElementById('root');

// 渲染虚拟 DOM 到真实 DOM
ReactDOM.render(vDom, root);
```

### 优缺点

#### 真实 `DOM` 的优势：

- 易用，用各种 JS API 可以操作

缺点：

- 效率低，解析速度慢，内存占用量过高
- 性能差：频繁操作真实 DOM，易于导致重绘与回流

#### 虚拟 `DOM` 的优势：

- 简单方便：如果使用手动操作真实 `DOM` 来完成页面，繁琐又容易出错，在大规模应用下维护起来也很困难
- 性能方面：使用 Virtual DOM，能够有效避免真实 DOM 数频繁更新，减少多次引起重绘与回流，提高性能
- 跨平台：React 借助虚拟 DOM，带来了跨平台的能力，一套代码多端运行
    

缺点：

- 在一些性能要求极高的应用中虚拟 DOM 无法进行针对性的极致优化
- 首次渲染大量 DOM 时，由于多了一层虚拟 DOM 的计算，速度比正常稍慢

