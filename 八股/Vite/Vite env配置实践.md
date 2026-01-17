---
title: Vite env配置实践
slug: vite-envpei-zhi-shi-jian
cover: https://cn.vite.dev/logo.svg
categories:
  - 前端
  - 解决方案
  - 学习
  - 项目控制
tags:
  - Vite
halo:
  site: https://blog.glcn.top
  name: 9e9eef17-1791-4cd2-97e2-4886611a52f7
  publish: true
---
## 参考

[Vite环境变量和模式](https://cn.vite.dev/guide/env-and-mode#env-files)

## 使用

### 内置常量

一些内置常量在所有情况下都可用：

- **`import.meta.env.MODE`**: {string} 应用运行的[模式](https://cn.vite.dev/guide/env-and-mode#modes)。
- **`import.meta.env.BASE_URL`**: {string} 部署应用时的基本 URL。他由[`base` 配置项](https://cn.vite.dev/config/shared-options.html#base)决定。
- **`import.meta.env.PROD`**: {boolean} 应用是否运行在生产环境（使用 `NODE_ENV='production'` 运行开发服务器或构建应用时使用 `NODE_ENV='production'` ）。
- **`import.meta.env.DEV`**: {boolean} 应用是否运行在开发环境 (永远与 `import.meta.env.PROD`相反)。
- **`import.meta.env.SSR`**: {boolean} 应用是否运行在 [server](https://cn.vite.dev/guide/ssr.html#conditional-logic) 上。

### 环境变量

Vite 自动将环境变量暴露在 `import.meta.env` 对象下，作为字符串。

但是只有 `VITE_SOME_KEY` 会被暴露为 `import.meta.env.VITE_SOME_KEY` 提供给客户端源码

### `.env` 文件

Vite 使用 [dotenv](https://github.com/motdotla/dotenv) 从你的 [环境目录](https://cn.vite.dev/config/shared-options.html#envdir) 中的下列文件加载额外的环境变量：

```
.env                # 所有情况下都会加载
.env.local          # 所有情况下都会加载，但会被 git 忽略
.env.[mode]         # 只在指定模式下加载
.env.[mode].local   # 只在指定模式下加载，但会被 git 忽略
```

|Command|NODE_ENV|Mode|
|---|---|---|
|`vite build`|`"production"`|`"production"`|
|`vite build --mode development`|`"production"`|`"development"`|
|`NODE_ENV=development vite build`|`"development"`|`"production"`|
|`NODE_ENV=development vite build --mode development`|`"development"`|`"development"`|

### `dotenv`库

#### 任意地方使用

比如`vite.config.ts`，用来从`.env.*.local`导入类似`API_URL`这样的敏感数据，而`.env.*.local`不会被添加到`git`（当然你得确认一下）

```ts
// Load env variables  
dotenv.config();
```

#### 添加其他文件

```ts
// Load env variables  
dotenv.config({  
  path: [  
    ".env.development",  
    ".env.development.local",  
    ".env.production",  
    ".env.production.local",  
    ".env"  
  ]  
});
```

详细查看[dotenv文档](https://github.com/motdotla/dotenv?tab=readme-ov-file#-documentation)
