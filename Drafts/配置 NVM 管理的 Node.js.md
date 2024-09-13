# 配置 NVM 管理的 Node.js

换新系统，需要重新配置Node.js，故~~学习~~重走一遍坑

## 需求

- 一台Windows电脑，建议可以开星穹列车、小飞机、小蹄子的那种
- 要先卸载原来的nodejs

## 下载NVM

https://github.com/coreybutler/nvm-windows/releases

挑个`nvm-setup.exe`，下完安装

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

（本文完）