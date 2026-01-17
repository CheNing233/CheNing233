---
title: Tailwind 快速初始化
slug: tailwind-kuai-su-chu-shi-hua
cover: ""
categories:
  - 前端
  - 学习
tags:
  - TailwindCSS
halo:
  site: https://blog.glcn.top
  name: 76734dd9-c6ad-4aa4-bcca-92eb801d5b92
  publish: true
---
## 开始

- 中文文档： https://www.tailwindcss.cn/docs/installation
- 英文官方文档（Vite）： https://tailwindcss.com/docs/installation/using-vite

中文文档貌似只支持到`3.4.17`，而最新的`4.0`版本安装方法不一样

## 安装

这里演示 `Vite` + `3.4.17` 版本的，使用`postcss`方式

```sh
npm install -D tailwindcss@3 postcss autoprefixer
```

这里要指定版本`@3`

## 初始化配置文件

使用`-p`初始化`tailwind.config.js`和`postcss.config.js`文件

```sh
npx tailwindcss init -p
```

## 修改配置文件

```ts
/** @type {import('tailwindcss').Config} */ 
module.exports = { 
	content: [
		"./index.html", // 记得把你的顶层html也包含进来
		"./src/**/*.{html,js}" // 添加模板匹配路径
		// "./src/**/*.{html,js,ts,jsx,tsx}"
	], 
	theme: { 
		extend: {}, 
	}, 
	plugins: [], 
}
```

不过推荐使用这个 `"./src/**/*.{html,js,ts,jsx,tsx}"` ，手动加上了一堆`tsx`

## 全局 CSS 导入

新建一个全局的css文件，随便放在哪，最好`./src`

```css
/* src/index.css */
@tailwind base;
@tailwind components; 
@tailwind utilities;
```

然后在最顶层入口引入，比如`react`是这样的

```jsx
import React from 'react';  
import ReactDOM from 'react-dom/client';  
import App from './App';  
import './index.css'  // 引入
  
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(  
	<React.StrictMode>  
	    <App />  
	</React.StrictMode>
)
```

## 测试

```html
<div className={"flex flex-row flex-nowrap"}>  
  <div className={"basis-1/2"}>  
    123  
  </div>  
  
  <div className={"basis-1/2"}>  
    456  
  </div>  
</div>
```

看到正常的分两栏就说明能用了
