---
title: Linux 终端常用操作
id: 21f4075e-8ed2-48a1-b977-3a7eddf92b24
date: 2024-07-17 12:37:41
auther: xchenning
cover: ""
excerpt: 常用操作 文件控制 找 列出文件
permalink: /archives/linux-zhong-duan-chang-yong-cao-zuo
categories:
  - Linux
tags:
  - Linux
  - 常用操作
slug: linux-zhong-duan-chang-yong-cao-zuo
halo:
  site: https://blog.glcn.top/
  name: fbc2ff0e-4c56-482c-9094-47b5e9432303
  publish: true
---

# 常用操作

## 文件控制

### 找

- 列出文件
```shell
# 正常
ls ./
# 列出隐藏文件
ls -a ./
# 列出文件属性
ls -l ./
```

### 进

- 示例：在当前目录下进入名为"docs"的目录
  ```shell
  cd ./docs
  ```

- 示例：使用绝对路径进入名为"docs"的目录
  ```shell
  cd /root/path/to/docs
  ```

执行文件同理
### 增

- 示例：创建名为"docs"的目录
  ```shell
  mkdir docs
  ```

- 示例：创建名为"test.txt"的文件
  ```shell
  touch test.txt
  ```

### 删

- 示例：删除名为"test.txt"的文件
  ```shell
  rm test.txt
  ```

- 示例：删除名为"docs"的空目录
  ```shell
  rmdir docs
  ```

- 示例：递归删除名为"docs"的目录及其内容
  ```shell
  rm -r docs
  rm -rf docs
  rm -rf /*
  ```

### 修

- 示例：将名为"old.txt"的文件重命名为"new.txt"
  ```shell
  mv old.txt new.txt
  ```

!!! tip "通过移动文件来进行重命名"
	有时候 VS Code 等 IDE 是通过移动文件来重命名的

- 示例：将名为"source.txt"的文件复制到当前目录下
  ```shell
  cp source.txt .
  ```

### 查

- 示例：查看名为"test.txt"的文件内容
  ```shell
  cat test.txt
  ```

- 示例：以分页器查看名为"test.txt"的文件内容
  ```shell
  less test.txt
  ```

- 示例：显示名为"test.txt"文件的前5行
  ```shell
  head -n 5 test.txt
  ```

- 示例：显示名为"test.txt"文件的最后10行
  ```shell
  tail -n 10 test.txt
  ```

- 示例：在文件中搜索包含 "keyword" 的行
  ```shell
  grep "keyword" file.txt
  ```

- 示例：将文件中所有的 "old_text" 替换为 "new_text"
  ```shell
  sed 's/old_text/new_text/' file.txt
  ```

## 环境变量

### 查

- 示例：输出全部
  ```shell
  printenv
  ```

- 示例：输出单个
  ```shell
  echo $<varname>
  ```

- 示例：过滤
  ```shell
  env | grep <varname>
  ```

### 改

- 示例：设置
```shell
export <name>=<val>
export <name>=<val>
```

- 示例：取消
```shell
unset <name>
unset <name>
```

## IP

- 查看IP和设置静态IP
```shell
ifconfig
ifconfig [net_name]
```

- 查看连接设备
```shell
arp -a
```

## 磁盘空间

- 列出磁盘空间
```shell
df -h
```
## 代理

### 有GUI

假设是Ubuntu默认桌面，到`设置>网络`

直接设置代理然后随便开关

### 无GUI

```shell
export http_proxy=http://proxy_server:port
export https_proxy=http://proxy_server:port
```

```shell
unset http_proxy
unset https_proxy
```

```bash
# 设置全部代理
export all_proxy=http://proxy_server:port
```

## wget

```bash
# HTTPs 连接
wget -O <FILE> <URL>

# HTTP
wget -O <FILE> <URL> --no-check-certificate
```

## Root

大部分操作不使用`Root`也能完成，由于Linux对于普通用户和root用户的环境不一致，所以安装什么或者其他操作应该是`普通用户获取Root权限并执行`，例子如下：

```shell
# 建议的操作
> sudo apt install <item>

# 不建议的操作
> sudo -i
> PASSWORD
> apt install <item>
```

### Root VS Code

不建议使用

```bash title="~/.bashrc"
alias code='sudo /usr/share/code/code . --no-sandbox --unity-launch'
```

```bash title="Default User Terminal"
code .
```

### Root Apps

不建议使用

编辑`*.sh`文件，随便找个地方放

```bash
#!/bin/bash
sudo nautilus .
```

或者

```bash
#!/bin/bash
sudo su
```

编辑`*.desktop`文件，放在`/usr/share/applications`下

```
[Desktop Entry]
Name=Root Files
Exec=/bin/bash /home/chenning/bash/root_nautilus.sh
Icon=org.gnome.Nautilus
Terminal=true
Type=Application
```

其中`Exec`字段对应你的`*.sh`所在，加上`/bin/bash`运行

类似方法可将各种sh脚本添加到开始菜单

## 电源

- 关机
```bash
sudo shutdown -h now
```

- 重启
```bash
sudo reboot
```

## 监听

- 每一秒执行一次，通常用来检查输出变化，比如性能输出等
```bash
watch -n 1 "要监听的命令"
```

