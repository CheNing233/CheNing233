---
title: Storybook 快速初始化及使用
slug: storybook-kuai-su-chu-shi-hua
cover: ""
categories:
  - 前端
  - 学习
tags:
  - Storybook
  - 文档
halo:
  site: https://blog.glcn.top
  name: 7bcfde54-d710-4a81-8cdd-97da16280988
  publish: true
---
## 官网

- 中文网 https://storybook.nodejs.cn/
- 英文官网 https://storybook.js.org/

## 安装

官网每个框架都有教程，而且一键配置

```sh
npx storybook@latest init
```

会引导你填写一些信息，然后就帮你初始化好了

## 启动

```json
// package.json
{  
  "name": "wa-ai-frontend",  
  "private": true,  
  "version": "0.25.2.25.4.24",  
  "type": "module",  
  "scripts": {  
    "dev": "vite",  
    "build": "tsc && vite build",  
    "lint": "eslint -c .eslintrc.json ./src/**/**/*.{ts,tsx} --fix",  
    "preview": "vite preview",  
    "test": "jest",  
    "storybook": "storybook dev -p 6006",  // npm run storybook
    "build-storybook": "storybook build"  
  },
}
```

## 配置

一搬默认就够用了

- 手动添加一些目录进来

```ts
import type {StorybookConfig} from '@storybook/react-vite';  
  
const config: StorybookConfig = {  
  "stories": [  
    "../src/**/*.mdx",  // src所有目录
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",  
    "../stories/**/*.mdx",  // 外部stories目录
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"  
  ],  
  "addons": [  
    "@storybook/addon-essentials",  
    "@storybook/addon-onboarding",  
    "@chromatic-com/storybook",  
    "@storybook/experimental-addon-test"  
  ],  
  "framework": {  
    "name": "@storybook/react-vite",  
    "options": {}  
  }  
};  
export default config;
```

## 编写组件

- 一般实现

```tsx
import ImageCard from "@/components/common/image-card.tsx";  
import {Meta, type StoryObj} from "@storybook/react";  

// 定义meta，参数都能在官网查字典
const meta = {  
  title: 'src/components/common/image-card.tsx/Image Card',  
  component: ImageCard,  // 组件
  tags: ['autodocs'],  
  parameters: {  
    layout: 'centered',  
    viewport: {  
      viewports: {  
        "3-4": {  
          name: '3:4',  
          styles: {  
            width: '300px',  
            height: '400px',  
          },  
        },  
      },  
    }  
  },  
} satisfies Meta<typeof ImageCard>;  
  
export default meta;  // 必须导出meta，供storybook识别

type Story = StoryObj<typeof meta>; // 定义一些story 
  
export const 一般实现: Story = {  
  args: {  
    src: './test.png',  
    width: 832,  
    height: 1216,  
  },  
};  
  
export const 全参数实现: Story = {  
  args: {  
    src: './test.png',  
    width: 832,  
    height: 1216,  
    title: 'test card aaaaaaaaaaaaaaaaaaaaaaaaaa',  
    userNickName: 'xChenNing',  
    userAvatarUrl: 'https://avatars.githubusercontent.com/u/32773451?v=4',  
    withRankBar: true,  
    isLiked: true,  
    isFavourited: true,  
    likeNum: 233,  
    favouriteNum: 666,  
  },  
};
```

- 自定义render函数

```tsx
export const 完整控制器示例: Story = {  
  render: (args) => <ControllerDemo/>,  
};
```

- 定义字段说明

```tsx
const meta: Meta<typeof SelectionWrapper> = {  
  title: 'src/components/tools/selection-manager.tsx/选择控制器',  
  component: SelectionWrapper,  
  tags: ['autodocs'],  
  argTypes: {  // 定义字段说明
    isSelected: {  
      control: 'boolean',  
      description: '当前选中状态'  
    },  
    isMultiSelect: {  
      control: 'boolean',  
      description: '是否多选模式'  
    },  
    children: {  
      control: 'text',  
      description: '被包裹的内容'  
    }  
  }  
};
```

## 编写mdx

`mdx`就是`markdown` + `tsx`，可以在markdown里编写tsx语法组件

同样需要定义`meta`字段，否则storybook读不到

```md
import {Meta} from "@storybook/blocks";  
  
<Meta title="example/示例 README"/>  
  
# Storybook 使用示例  
  
这里边都是 Storybook 的示例
```

