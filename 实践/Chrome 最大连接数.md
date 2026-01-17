---
title: Chrome 最大连接数
slug: chrome-zui-da-lian-jie-shu
cover: ""
categories:
  - 问题处理
  - 学习
tags:
  - TCP
  - 代码分割
halo:
  site: https://blog.glcn.top
  name: 8b7eea2b-5337-4d9a-b1d8-1b3b88c169d1
  publish: true
---

## 场景复现

在开开心心写网站的时候，发现切换 child 时 `@loadable/component` 懒加载被卡住了，控制台发现和那堆异步请求出现时间高度重合

故检查了下异步代码是不是堵了，发现毛病没有

重新检查发现，A组件开屏要异步加载大量图片，用户在加载过程中切换到B组件时，导致了 `@loadable/component` 要加载的 `代码分片` 在 `DevTool-网络` 中是 `已停止` 状态，持续时间达到 `2.37` 秒

经过研究，这个图片加载请求是我用`Promise`手动发出去的（不建议学，后面我传个`AbortController`暂时用来调试，后续将移回`img`标签进行请求），而在组件切换时，旧组件卸载了，但是`Promise`仍然不会停止，导致B组件的代码分片因为网络堵塞而被挂起，直到图片全部加载完毕

继续查证发现，**Chrome 最多允许对同一个 Host 建立六个 TCP 连接。不同的浏览器有一些区别**

## 解决方案

- 升级HTTP2
- 采用多域名方法