---
title: Windows 向 Linux 一根网线共享网络
id: 3368ac3b-5c0c-4711-8771-b3f449b4e74c
date: 2024-08-15 16:27:04
auther: xchenning
cover: ""
excerpt: Windows 和 Linux 网线互联，设置两台机同一个局域网，并共享 Windows 的网络
permalink: /archives/windows-xiang-linux-gong-xiang-wang-luo
categories:
  - 问题处理
tags:
  - Linux
  - 常用操作
slug: windows-xiang-linux-yi-gen-wang-xian-gong-xiang-wang-luo
halo:
  site: https://blog.glcn.top/
  name: 174a8ba3-243e-42ea-af7c-bccaea4ae523
  publish: true
---

# Windows 向 Linux 一根网线共享网络

最近需要向某台机械臂的Ubuntu板子上开发，结果这块板子只有个网线接口，没办法连同一个WiFi变成同一个局域网里，只能插网线互联，写代码最好还是上个VSCode，用VSC的SSH直连板子进行开发非常方便，但是VSC的SSH要求板子得通网......

所以得学习把这两机子连同一个局域网，并且共享网络.

## 需求

- 一台Windows，有两个网卡，一个网卡不管有线无线得联网，另一个网卡接网线连接Linux
- 一台Linux
- 一根网线

## 1. Windows设置有网的网卡共享给没网的网卡

先在Windows找到网络适配器

![image.png](http://img.glcn.top/piclist/1723711281492-4fc1a487854e4bc8ba47ef6d78544203.png)

我这边联网的网卡是`Realtek RTL8852BE WiFi 6 802.11ax PCIe Adapter`（名字可能不同，我特意改过），接了Linux的网卡是`Realtek USB GbE Family Controller`

双击联网的网卡，单击「属性」，单机「共享」选项卡，勾上「允许其他网络用户通过此计算机的 Internet 连接来连接(N)」，并选择连了Linux的那张网卡

![image.png](http://img.glcn.top/piclist/1723711513896-62420f515de54b3cb0a606ffadfaf8ff.png)

保存退出，回去发现联网网卡旁边多了「共享的」字样，这一步是将联网网卡的网络分享给没联网网卡

## 2. 设置连了Linux的网卡的IP

双击联网的网卡，单击「属性」，找到`Internet 协议版本 4(TCP/IPv4)属性`，记得勾上，双击点开

![image.png](http://img.glcn.top/piclist/1723711749265-b79c41807abd4a77afb7052f231352b8.png)

一般来说刚刚共享那步，会将这个网卡的IP自动设成上图的样子，如果没有，可以把这一页全部设置成自动获取，然后退回去重新设置共享，你也可以手动设置成这样

- IP地址固定为：192.168.137.1
- 子网掩码：255.255.255.0
- 默认网关：一般留空
- DNS相关：一般留空

至于为啥是`192.168.137.1`，听大佬说Windows只在这个IP上做了DNS和路由，用其他的IP可能无法共享网络（但能同局域网）

## 3. 设置Linux自动DHCP获取IP

这一步就同标题一样，直接在Linux上设置自动获取IP和DNS即可

![image.png](http://img.glcn.top/piclist/1723712183694-097785db5fc441448a849a2da765d9ea.png)

可能界面不太一样（什么神奇Ubuntu桌面都有），但是操作逻辑是一样的

然后查看连接信息，看看是不是自动获取到了IP是`192.168.137.XXX`，如果是，那就已经同属一个局域网了，接下来上个浏览器看看能不能访问就行了

## 坑

- 笔记本无线网卡设置共享后，如果不手动关闭，有可能会影响笔记本的「移动热点」，建议用完就把网卡共享关了

本文完
