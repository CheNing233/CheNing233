---
title: Docker 避坑
id: 5874adff-a153-4bc3-98de-9ebd83de6429
date: 2024-07-17 18:21:30
auther: xchenning
cover: 
excerpt: Docker 的一般避坑
permalink: /archives/docker-bi-keng
categories:
 - rong-qi-hua
tags: 
 - docker
---

## WSL2上面build的镜像转移到Linux会出现GPU驱动问题

貌似是WSL2的nVidia驱动是专门设计给WSL2的，如果直接转移会丢失一部分软连接啥的

解决办法（CSDN）：

- 不要开`--gpus all`
- 换虚拟机build，不过貌似VM Ware是不能直通显卡的
- 换实体机Linux来build

## 连接私有Harbor仓库出现x509错误

### 创建目录安装证书

在客户端的`/etc/docker`下新建目录：`certs.d/<URL>:<PORT>`

比如（内网地址）`/etc/docker/certs.d/10.180.193.11:30003/`

### 获取Harbor证书

![](http://img.glcn.top/piclist/1721222201067-18459d2a381b4125b64365a52e15452a.png)

链接一般为`https://XXXXXXX:XXXXX/api/v2.0/systeminfo/getcert`

### 下载到目录并命名为ca.crt

```bash
# 到你新建的那个目录
cd /etc/docker/certs.d/10.180.193.11:30003/

# 下载
wget -O ./ca.crt <你的证书链接>
```

### 验证

```bash
docker login <你的内网Harbor仓库>:<端口>
```

成功的话就会成功登录
