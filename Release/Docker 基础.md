---
title: Docker 避坑
id: 371f87f7-3512-4c34-8795-b05c06bc9cc5
date: 2024-07-17 16:45:21
auther: xchenning
cover: ""
excerpt: Docker 的一般避坑
permalink: /archives/ji-chu
categories:
  - 容器化
tags:
  - Docker
slug: docker-bi-keng
halo:
  site: https://blog.glcn.top/
  name: 2269e4ac-eefe-4984-9088-27501fe3a200
  publish: true
---


## 安装

### 保持更新

```bash
sudo apt update 

sudo apt upgrade
```

### 安装docker依赖项

```bash
sudo apt install apt-transport-https ca-certificates curl software-properties-common
```

### 安装密钥，设置存储库

```bash
# 安装密钥
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# 设置存储库
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
```

### 安装docker-ce

```bash
# 更新存储库
sudo apt update

# 安装docker-ce
sudo apt install docker-ce
```

### 启动服务并开机自启

```bash
sudo systemctl start docker 
sudo systemctl enable docker
```

### 验证

```bash
sudo docker --version
```

## 安装 NVIDIA Container Toolkit

> https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html

### 配置存储库

```bash
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg \
  && curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | \
    sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
    sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list
```

### 安装

```bash
# 更新包列表
sudo apt-get update

# 安装
sudo apt-get install -y nvidia-container-toolkit
```

### 配置运行时

> The `nvidia-ctk` command modifies the `/etc/docker/daemon.json` file on the host. The file is updated so that Docker can use the NVIDIA Container Runtime.
> 
> `nvidia-ctk` 命令修改主机上的 `/etc/docker/daemon.json` 文件。以便 Docker 可以使用 NVIDIA 容器运行时。


```bash
sudo nvidia-ctk runtime configure --runtime=docker
```

验证（/etc/docker/daemon.json）

```json
{
    "runtimes": {
        "nvidia": {
            "args": [],
            "path": "nvidia-container-runtime"
        }
    }
}
```

### 重启

```bash
sudo systemctl restart docker
```

## Deamon.json

### 修改

`/etc/docker/daemon.json`

```json
{
    "runtimes": {
        "nvidia": {
            "args": [],
            "path": "nvidia-container-runtime"
        }
    },
    "registry-mirrors": [
        "http://10.180.193.11:30002"
    ],
    "insecure-registries":["10.180.193.11:30002"]
}
```

### 重启

```bash
systemctl daemon-reload
systemctl restart docker
```

## 容器内使用宿主机Docker（DooD）

将宿主机的`.sock`文件挂载在容器内部即可

该容器通过使用宿主机的`.sock`执行各种docker命令

文件路径一般为`/var/run/docker.sock`

```bash
# 运行容器时使用 -v 将 sock 文件挂载进去
docker run -v /var/run/docker.sock:/var/run/docker.sock -it <你的容器> /bin/bash
```

k8s可使用以下代码段

```yaml
spec:
	containers:
	- name: container-20-04
	  ...
	  volumeMounts:
		- name: docker-sock-volume
		  mountPath: /var/run/docker.sock
	volumes:
	- name: docker-sock-volume
	  hostPath:
		path: /var/run/docker.sock
```

## 基本使用

### 查看

```bash
# 运行的容器
docker ps

# 所有容器
docker ps -a

# 镜像列表
docker images
```

### 启动

```bash
# 运行一个镜像
docker run

# 运行已有的容器
docker start

# 连接已有容器终端
docker exec -it [CONTAINER ID] /bin/bash 

# 用root模式连接已有容器终端
docker exec -it -u root [CONTAINER ID] /bin/bash
```

### 构建

```bash
# 指定镜像名称和使用的Dockerfile
docker build -t <IMAGE_NAME>:<IMAGE_TAG> -f ./<DOCKERFILE_NAME> .

# 添加额外的环境参数（比如设置全局代理）
docker build -t <IMAGE_NAME>:<IMAGE_TAG> -f ./<DOCKERFILE_NAME> . --build-arg ALL_PROXY=http://xxxx:xxx
```

在国内构建镜像，如果有代理，则可以使用`--build-arg ALL_PROXY=http://xxxx:xxx`的方法为`构建过程中`添加`ALL_PROXY`设置

## 清理

### 查看

```bash
docker system df
```

### 全部移除

```bash
docker system prune -a
```
