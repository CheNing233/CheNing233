---
title: 解除 Powershell 运行脚本限制
slug: jie-chu-powershell-yun-xing-jiao-ben-xian-zhi
cover: ""
categories:
  - 问题处理
tags:
  - Powershell
excerpt: 解除 Powershell 运行脚本限制，运行 set-executionpolicy remotesigned 即可
halo:
  site: https://blog.glcn.top/
  name: ebcc759d-532d-4590-8664-0275c943b1e0
  publish: true
---
# 解除 Powershell 运行脚本限制

因为某游抽鼠结果出了三只猫，刚换新系统想导出抽卡记录，发现`.ps1`脚本被禁了，故学习怎么解除限制。

## 需求

- 一台Windows

## 直接管理员打开 PS，运行代码

```powershell
set-executionpolicy remotesigned
```

![QQ20240910-034319.png](https://img.glcn.top/piclist/1725920003345-72eb183e969c43e68ea3938a8dea5fbf.png)

选`A`或者`Y`

（完，已经能用了 `＜（＾－＾）＞` ）
