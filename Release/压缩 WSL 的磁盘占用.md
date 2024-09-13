---
title: 压缩 WSL 的磁盘占用
id: f1a96142-bb50-478b-a845-46b1e046ca7e
date: 2024-08-27 15:34:05
auther: xchenning
cover: ""
excerpt: 压缩 WSL 虚拟磁盘的占用空间
permalink: /archives/ya-suo-wsl-de-ci-pan-zhan-yong
categories:
  - 问题处理
tags:
  - Docker
  - WSL
slug: ya-suo-wsl-de-ci-pan-zhan-yong
halo:
  site: https://blog.glcn.top/
  name: 19735215-52dc-4717-b780-d674ff5485fb
  publish: true
---

最近磁盘满了，拿个工具一查，发现WSL虚拟磁盘占了177G，想起上次建SD镜像，一建就是20G一个，还建了好几个，把这些镜像清理了之后，WSL虚拟磁盘并不会自动缩水。

故学习怎么压缩WSL的占用空间。

## 需求

- 一台WSL功能正常的Windows，Windows自带diskpart工具

## 1. 查找WSL的虚拟磁盘文件

推荐使用`wiztree`

https://www.diskanalyzer.com/download

![image.png](http://img.glcn.top/piclist/1724743702045-adc0192881c54f1b9e20ab1569c61fdd.png)

一般叫ext4，可以去`C:\Users\<用户名>\AppData\Local\Docker\wsl\data`找找看

## 2. 停止 WSL 并压缩虚拟磁盘

建议管理员模式的命令行，先停止WSL

```powershell
wsl --shutdown
```

运行diskpart工具

```powershell
diskpart
```

选中虚拟磁盘文件

```powershell
select vdisk file="<刚刚找到的ext4.vhdx>"
```

压缩

```powershell
compact vdisk
```

如果没报错基本完事了，我从177G压缩到了8G

本文完