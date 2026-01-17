---
title: NPM打组件包
slug: npmda-zu-jian-bao
cover: ""
categories:
  - 前端
  - 项目控制
  - 编程
tags:
  - React
  - Npm
  - Vite
  - TypeScript
halo:
  site: https://blog.glcn.top
  name: d3ac9e6f-6602-4fed-8a01-6470ae8b163c
  publish: true
---
## 使用`vite + react + ts`

- 先使用`create-vite`生成`vite + react + ts`架构的项目
- 执行`npm i`安装依赖

### 修改`vite.config.ts`

以我写的虚拟列表瀑布流组件为例：

- 添加`build`
- 安装`npm i -D @rollup/plugin-typescript`，使用该插件进行编译

```ts
import {defineConfig} from 'vite'  
import react from '@vitejs/plugin-react'  
import {resolve} from 'path'  
import typescript from '@rollup/plugin-typescript';  
  
function fixPath(str: string) {  
  return resolve(__dirname, str)  
}  
  
// https://vite.dev/config/  
export default defineConfig({  
  build: {  
    lib: {  
      entry: fixPath('src/index.ts'),  // 入口文件  
      name: 'xcn-waterfall',      // 库的全局名称  
      fileName: (format) => `xcn-waterfall.${format}.js`, // 输出文件名  
      formats: ["es", 'umd'],  
    },  
    rollupOptions: {  
      // 确保外部化处理那些你不想打包进库的依赖  
      external: ['react', 'react-dom'],  
      output: {  
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量  
        globals: {  
          react: 'react',  
          'react-dom': 'react-dom',  
        },  
      },  
    },  
  },  
  plugins: [  
    react(),  
    typescript({  
      target: 'es5',  
      rootDir: fixPath('src/'),  
      declaration: true,  
      declarationDir: fixPath('dist'),  
      exclude: fixPath('node_modules/**'),  
      allowSyntheticDefaultImports: true,  
    })  
  ],  
})
```

### 修改`tsconfig.*.json`

一般是`tsconfig.app.json`

```json
{  
  "compilerOptions": {  
    "declaration": true,  // 手动加上，开启类型文件生成
    "declarationMap": true,  // 可选，生成类型文件map，便于调试定位源代码
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",  
    "target": "ES2020",  
    "useDefineForClassFields": true,  
    "lib": ["ES2020", "DOM", "DOM.Iterable"],  
    "module": "ESNext",  
    "skipLibCheck": true,  
  
    /* Bundler mode */  
    "moduleResolution": "bundler",  
    "allowImportingTsExtensions": true,  // 允许引入ts拓展
    "isolatedModules": true,  
    "moduleDetection": "force",  
    "noEmit": false,  // 不输出编译结果
    
    // 允许只生成类型声明文件
    "emitDeclarationOnly": true,  // 这行要手动加上，生成.d.ts文件提供类型检查
    
    "jsx": "react-jsx",  
  
    /* Linting */  
    "strict": true,  
    "noUnusedLocals": false,  
    "noUnusedParameters": false,  
    "noFallthroughCasesInSwitch": true,  
    "noUncheckedSideEffectImports": true  
  },  
  "include": ["src"]  
}
```

### 修改`package.json`

```json
{  
  "name": "@xchenning/waterfall",  // 名字，符合npm规范即可
  "private": true,  // 发布到npm需要关掉
  "version": "0.9.0",  
  "type": "module",  
  "main": "dist/xcn-waterfall.umd.js",  // main定位到umd文件
  "module": "dist/xcn-waterfall.es.js",  // module定位到es文件
  "types": "src/index.d.ts",  // type定位到build出来的类型声明文件，这里定位到入口的.d.ts
  "files": [  // 包含以下文件
    "dist/*"  
  ],  
  "scripts": {  
    "dev": "vite",  
    "build": "tsc -b --declaration && vite build",  
    "lint": "eslint .",  
    "preview": "vite preview"  
  },  
  "peerDependencies": {  
    "react": "^18.3.1",  
    "react-dom": "^18.3.1"  
  },  
  "devDependencies": {  
    "@eslint/js": "^9.17.0",  
    "@rollup/plugin-typescript": "^12.1.2",  
    "@types/node": "^22.10.7",  
    "@types/react": "^18.3.18",  
    "@types/react-dom": "^18.3.5",  
    "@vitejs/plugin-react": "^4.3.4",  
    "eslint": "^9.17.0",  
    "eslint-plugin-react-hooks": "^5.0.0",  
    "eslint-plugin-react-refresh": "^0.4.16",  
    "globals": "^15.14.0",  
    "tslib": "^2.8.1",  
    "typescript": "~5.6.2",  
    "typescript-eslint": "^8.18.2",  
    "vite": "^6.0.5"  
  }  
}
```

### 构建并使用

- 构建
```sh
tsc -b --declaration && vite build
```

- 使用
```tsx
import "xcn-waterfall/dist/waterfall.css"  // 独立的css文件，必须额外引入
import {useXCNWaterfallItem, XCNWaterfall} from "xcn-waterfall";
```

### 关于css

一般build完之后，会生成一个独立的css文件，但是这样需要额外引入一个css文件

> 参考：https://segmentfault.com/a/1190000042278132
> 仓库：https://github.com/lovelliu/vite-plugin-style-inject

该文章指出可以自己写一个插件，将bundle里的css提取并注入到css中

适合我那个虚拟瀑布流组件（只有四个样式）

然后发现他那个插件已经在2022年归档了......，并且也不支持高版本的vite

> 参考：https://juejin.cn/post/7214374960192782373
> 仓库：https://github.com/emosheeep/vite-plugin-lib-inject-css

对于我这个四个样式的组件库，只需要安装并引入使用即可

```ts
// import ...
import {libInjectCss} from 'vite-plugin-lib-inject-css';  

// https://vite.dev/config/  
export default defineConfig({  
  build: {  
	// ...
  },  
  plugins: [  
	// ...
    libInjectCss(),  
    // ...
  ],  
})
```

