---
title: Webstorm 前端调试
slug: webstorm-qian-duan-diao-shi
cover: ""
categories:
  - 问题处理
  - 前端
tags:
  - NodeJs
  - Webstorm
halo:
  site: https://blog.glcn.top/
  name: 274c0a82-4c4a-46f8-9f64-9fd3eb0ab9a5
  publish: true
excerpt: 添加一个JavaScript调试
---
拒绝 console.log，从你我做起

# 添加配置

## 坑

已知直接点击`npm run start`的调试，有可能会出现断点断不住的现象，也就是压根没进入debug模式或者其他什么原因，也可能是启动器和配置千奇百怪导致的。

![image.png](https://img.glcn.top//piclist/1730487457802-f193db7a33b247ad9493820c64f825c5.png)

## 设置Webstorm调用浏览器调试

这种方法直接启动本地的浏览器进行调试，拓展性强

### 添加一个JavaScript调试

- URL设置为项目监听的URL
- 浏览器设置你常用的

![image.png](https://img.glcn.top//piclist/1730487807608-28376ae7af1a4194a98bfc3dd4d81256.png)

### 设置自定义浏览器（可选）

~~我用百分浏览器，纯粹是因为有个右键关闭标签页功能~~

![image.png](https://img.glcn.top//piclist/1730488040817-b085001ac54244098571e1a355c6913c.png)

点 + 号选一个就行，支持 Chrome 等各种系列的，路径选择浏览器本体（找快捷方式，按打开文件位置）

### 运行流程

1. 先`npm run start`，正常启动你的项目
2. 启动完能访问后，点击你新建的“JavaScript 调试”的debug按钮
3. 随后webstorm就会打开一个浏览器定位到你的项目，并且启用调试功能

![image.png](https://img.glcn.top//piclist/1730488307814-eaac98cd3af94f0c969d9c7b68d43bbc.png)

然后就可以愉快的打断点了

## 设置一键启动（可选）

![image.png](https://img.glcn.top//piclist/1730488390086-89159284e21d426a8d7434cb6fee3e87.png)

直接在这个面板上配置一下，就可以点一个按钮开两份运行了

