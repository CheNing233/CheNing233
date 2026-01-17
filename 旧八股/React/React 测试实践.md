---
title: React 测试实践
slug: react-jian-dan-ce-shi
cover: ""
categories:
  - 前端
  - 学习
  - 项目控制
  - 测试
tags:
  - TypeScript
  - Vite
  - React
  - Jest
  - ReactTestingLibrary
  - PlayWright
  - Babel
  - ts-jest
halo:
  site: https://blog.glcn.top
  name: 8a0cb0af-4374-46c6-b405-70450afb61da
  publish: true
---

## 说明

- **Jest** 是一个独立的 JavaScript 测试框架，负责测试运行、断言（如 `expect().toBe()`）和测试报告生成[3](https://segmentfault.com/a/1190000044980872)[4](https://developer.aliyun.com/article/1491871)[5](https://blog.csdn.net/zw52yany/article/details/125745529)。
- **React Testing Library (RTL)** 是一个专注于 React 组件行为测试的库，提供组件渲染、DOM 查询、用户交互模拟等功能。
- **PlayWright** 是由 Microsoft 开发的现代化前端自动化测试框架，专为跨浏览器、跨平台和端到端测试设计。

Jest和React Testing Library一般配合使用，需要分别安装

|**功能**|**Jest 负责**|**RTL 负责**|
|---|---|---|
|测试运行|✅|❌|
|组件渲染|❌|✅（通过 `render` 函数）|
|DOM 查询|❌|✅（如 `getByText`）|
|用户交互模拟|❌|✅（如 `fireEvent.click` ）|
|断言|✅（基础断言）|❌（需结合 `jest-dom` 扩展）|

而PlayWright属于端到端测试，模拟用户行为更真实，适合多步骤全流程模拟

| **工具**                    | **核心用途**                                                                                                                                                                                                                             | **测试层级**   | **适用场景**                      |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- | ----------------------------- |
| **Playwright**            | 跨浏览器端到端测试，模拟真实用户操作流程（如页面跳转、表单提交、文件上传等）[1](https://blog.csdn.net/gitblog_01139/article/details/141795657)[6](https://www.jb51.net/article/273672.htm)[9](https://blog.csdn.net/ceshirenhemin/article/details/128582780)               | 端到端测试（E2E） | 多浏览器兼容性验证、复杂交互流程测试、视觉回归测试     |
| **Jest**                  | 提供测试运行环境、断言库、Mock 能力，作为通用 JavaScript/TypeScript 测试框架[2](http://coding.imooc.com/learn/questiondetail/jxkpVPBWbvLYrwRQ.html)[3](https://cloud.tencent.com/developer/article/2428023)[4](https://developer.aliyun.com/article/1491871) | 单元测试/集成测试  | 纯函数逻辑验证、组件/工具函数测试、异步操作模拟      |
| **React Testing Library** | 针对 React 组件的渲染与交互测试，强调以用户视角验证组件行为[2](http://coding.imooc.com/learn/questiondetail/jxkpVPBWbvLYrwRQ.html)[3](https://cloud.tencent.com/developer/article/2428023)[4](https://developer.aliyun.com/article/1491871)                    | 组件级集成测试    | 组件 DOM 结构验证、用户事件触发测试（如点击、输入等） |

## 参考

- React Testing Library Tutorial： [https://www.robinwieruch.de/react-testing-library/](https://www.robinwieruch.de/react-testing-library/)
- React Testing Library文档： [https://testing-library.com/docs/react-testing-library/intro](https://testing-library.com/docs/react-testing-library/intro)
- Jest一般报错(babel配法)： https://juejin.cn/post/6971636068915347492
- Jest文档： https://jestjs.io/zh-Hans/docs/getting-started
- `window.matchMedia() not a function`问题： https://jestjs.io/docs/manual-mocks
- Vite中可用的Jest+RTL全流程：[https://zaferayan.medium.com/how-to-setup-jest-and-react-testing-library-in-vite-project-2600f2d04bdd](https://zaferayan.medium.com/how-to-setup-jest-and-react-testing-library-in-vite-project-2600f2d04bdd)

## 安装

### Jest + React Testing Library

Jest部分：

```sh
npm install --save-dev jest jest-environment-jsdom
```

对typescript类型检查补充安装：

```sh
npm install --save-dev @types/jest
```

RTL部分：

```sh
npm install --save-dev @testing-library/react @testing-library/dom @testing-library/jest-dom react-test-renderer
```

- `jest`：测试框架[2](https://developer.aliyun.com/article/1491871)[4](https://segmentfault.com/a/1190000044980872)
- `jest-environment-jsdom`：提供浏览器环境模拟
- `@testing-library/react`：React 组件测试工具[2](https://developer.aliyun.com/article/1491871)[7](https://blog.csdn.net/cumi7754/article/details/108100753)
- `@testing-library/dom`：提供通用的 DOM 测试工具
- `@testing-library/jest-dom`：扩展 Jest 的 DOM 断言（如 `toBeInTheDocument`）[4](https://segmentfault.com/a/1190000044980872)[7](https://blog.csdn.net/cumi7754/article/details/108100753)
- `react-test-renderer`：主要用于在不依赖真实 DOM 或原生移动环境的情况下渲染 React 组件，并生成可测试的 JavaScript 对象结构

接下来是两种配法，因为Jest不能直接处理typescript，要额外引入转换器（transformer）进行转换，svg、css、less等其他文件也是如此

第一种是使用`ts-jest`对`js|jsx|ts|tsx`进行处理
第二种则是使用`Babel`系列工具进行处理

#### ts-jest 配法

安装：

```sh
npm install --save-dev ts-jest
```

`jest.config.ts`修改如下

```ts
/**  
 * For a detailed explanation regarding each configuration property, visit: * https://jestjs.io/docs/configuration */  
import type {Config} from 'jest';  
  
const config: Config = {  
  testEnvironment: "jsdom", // 使用 jest-environment-jsdom 测试
  moduleNameMapper: {  
    "^@/(.*)$": "<rootDir>/src/$1"  // 关键配置：解析@路径，就是老生长谈的那个@ 
  },  
  transform: {  
    "^.+\\.(js|jsx|ts|tsx)$": ["ts-jest",{}],  // 使用 ts-jest 处理这些文件
  },  
};  
  
export default config;
```

你也可以使用`ts-jest`提供的命令自动修改（不过他改的是js文件）：

```sh
# 修改或生成 jest.config.js 文件
npx ts-jest config:init
```

注意：不能同时存在`jest.config.ts`和`jest.config.js`

`tsconfig.json`修改如下

```json
{
  "compilerOptions": {    
	// ...
    "esModuleInterop": true, // 把模块互操作开了，不然会报错
    "types": [  
	  "jest",  
	  "@testing-library/jest-dom"  
	], // 把类型包含进来，不然找不到一些方法，写了这个不用写setupTest的那个引入了
    // ...
  }
}
```

如果你想写`setupTest.ts`，根目录新建这个文件加一行就行

> `setupTest.ts`是用于 **全局测试环境初始化** 的 TypeScript 文件，通常用于配置测试前的通用设置、模拟依赖项或注册全局组件/插件。

```ts
import "@testing-library/jest-dom" // 全局注册这些类型
```

然后给`jest.config.ts`加上

```ts
const config: Config = {  
  // ...
  setupFiles: ['<rootDir>/setupTest.ts'],
  // ...
}
```

然后就可以写测试运行了（具体在后面），接下来是`Babel`配法

#### Babel 配法

先安装`Babel`相关工具

```sh
npm install --save-dev babel-jest @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript
```

建立`babel.config.cjs`，如果不是`cjs`后缀可能遇到问题，具体查看babel关于后缀的说明

```js
module.exports = {  
  presets: [  
    "@babel/preset-env",  
    '@babel/preset-typescript',  
    ["@babel/preset-react", { runtime: "automatic" }]  
  ]  
};
```

`jest.config.ts`修改如下，跟`ts-jest`差不多

```ts
/**  
 * For a detailed explanation regarding each configuration property, visit: * https://jestjs.io/docs/configuration */  
import type {Config} from 'jest';  
  
const config: Config = {  
  testEnvironment: "jsdom", // 使用 jest-environment-jsdom 测试
  moduleNameMapper: {  
    "^@/(.*)$": "<rootDir>/src/$1"  // 关键配置：解析@路径，就是老生长谈的那个@ 
  },  
  transform: {  
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest",{}],  // 使用 babel-jest 处理这些文件
  },  
};  
  
export default config;
```

`tsconfig.json`修改如下

```json
{
  "compilerOptions": {    
	// ...
    // "esModuleInterop": false, // 保留该项默认即可，跟ts-jest要求不一样
    "types": [  
	  "jest",  
	  "@testing-library/jest-dom"  
	], // 把类型包含进来，不然找不到一些方法，写了这个不用写setupTest的那个引入了
    // ...
  }
}
```

然后就可以写测试运行了

#### 运行

```sh
jest
```

可以自行添加到`package.json`里头去

#### TypeError: window.matchMedia is not a function

```ts
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
```

参考：[https://jestjs.io/docs/en/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom](https://jestjs.io/docs/en/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom)

### Playwright

#### 安装（命令行交互）

```sh
npm init playwright@latest
```

询问你（英文）：

- 在 TypeScript 或 JavaScript 之间进行选择（默认为 TypeScript）
- 你的测试文件夹的名称（如果你的项目中已有测试文件夹，则默认为测试或 e2e）
- 添加 GitHub Actions 工作流程以轻松在 CI 上运行测试
- 安装 Playwright 浏览器（默认为 true，浏览器有点大，超过100MB）

一键直接帮你配好：

```sh
playwright.config.ts
package.json
package-lock.json
tests/
  example.spec.ts
tests-examples/
  demo-todo-app.spec.ts
```

#### 运行

- 无头模式

```sh
npx playwright test
npx playwright show-report
```

- UI模式，打开一个窗口手把手进行测试

```sh
npx playwright test --ui
```

无了（Playwright配起来真轻松）

Playwright相对于Jest和RTL，更加无侵入，因为它直接浏览器跳到对应地址进行测试，因此，你甚至能在本地帮DeepSeek那个网站测一测

