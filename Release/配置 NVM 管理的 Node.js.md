---
title: 配置 NVM 管理的 Node.js
slug: pei-zhi-nvm-guan-li-de-node.js
cover: ""
categories:
  - 问题处理
tags:
  - NodeJs
  - NVM
excerpt: 用 NVM  管理 NodeJs 版本
halo:
  site: https://blog.glcn.top
  name: 7894e706-7fbf-406f-b868-fccf2b0f83b1
  publish: true
---
换新系统，需要重新配置Node.js，故~~学习~~重走一遍坑

## 需求

- 一台Windows电脑，建议可以开星穹列车、小飞机、小蹄子的那种
- 或者一台Linux，一样建议可以开星穹列车、小飞机、小蹄子的那种
- 要先卸载原来的nodejs

## 下载NVM

- Windows

https://github.com/coreybutler/nvm-windows/releases

挑个`nvm-setup.exe`，下完安装

- Linux
```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
source ~/.bashrc
```

## 命令行启动

- 检查版本
```sh
nvm -v
```

- 查看root路径（改setting用）
```sh
nvm root
```

- 设置proxy
```sh
nvm proxy <你的代理地址>
```

- 查看可用的Nodejs版本列表（如果网通了就不会报错）
```sh
nvm list available
```

- 下载Nodejs 16（16经典版本少报错省心）
```sh
nvm install 16
```

- 切换版本
```sh
nvm use 16
```

- 查看已安装的版本
```sh
nvm ls
```

## NPM 操作

- 设置Proxy
```sh
npm config set proxy <你的代理>
npm config set https-proxy <你的代理>
```

（本文完）
