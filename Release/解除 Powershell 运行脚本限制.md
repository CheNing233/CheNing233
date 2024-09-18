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

## 双击运行脚本

可以通过设置`默认打开方式`，双击就能开`*.PS1`脚本

注意`Powershell`有两个，一个是x86版本，还有一个是x64版本，在不同的两个路径

- x64
```sh
C:\Windows\System32\WindowsPowerShell\v1.0\
```

- x86
```sh
C:\Windows\SysWOW64\WindowsPowerShell\v1.0\
```

x86的不能双击打开，必须要选到x64的路径才行

![image.png](https://img.glcn.top/piclist/1726426417430-0083c96597844e788d6b25c1e6a68f37.png)

如果不小心误选x86版本的路径，不能通过再选一个默认程序来打开该文件（貌似并不会覆盖原来的路径，只会识别成一个程序），那么可以改注册表，Win + R 运行 `regedit`

找：`计算机\HKEY_CLASSES_ROOT\Applications\powershell.exe`

删掉其中的内容即可

![image.png](https://img.glcn.top/piclist/1726426581655-4c988f56c91c42f6aaee60ce35091edb.png)

其他多余的`默认打开方式`，也可以通过注册表删
## 某游获取抽卡记录链接脚本

- 某原
```powershell
iex(irm 'https://img.lelaer.com/gf.ps1')
```

- 某铁
```powershell
Invoke-Expression (New-Object Net.WebClient).DownloadString( 'https://xingqiong-oss.oss-cn-hangzhou.aliyuncs.com/pc/down/s_gf.ps1')
```

- 某绝
```powershell
Invoke-Expression (New-Object Net.WebClient).DownloadString('https://xingqiong-oss.oss-cn-hangzhou.aliyuncs.com/pc/down/zzz_gf.ps1')
```

（完，已经能用了 `＜（＾－＾）＞` ）
