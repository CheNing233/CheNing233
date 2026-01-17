---
title: 基于 Nonebot 的 SDWebUI 画图机器人
date: 2024-07-17 21:25:11
auther: xchenning
cover: ""
excerpt: 基于Nonebot的Stable-diffusion-webui的画图机器人，支持QQ、飞书等，该项目已归档，转为开发 wa.xcning.top 前端AI生成平台
permalink: /archives/ji-yu-nonebot-de-sdwebui-hua-tu-ji-qi-ren
categories:
  - 解决方案
tags:
  - Python
slug: ji-yu-nonebot-de-sdwebui-hua-tu-ji-qi-ren
halo:
  site: https://blog.glcn.top
  name: ee62a07a-b152-4d1b-b85e-f9e24bf35ccf
  publish: true
---

~~博主闲来没事，写了一个涩图机器人插件，帮助同学们在厕所能够获得少许慰藉~~

太shi了，已弃坑。况且QQ对私有机器人的管控一直非常严格，见一个封一个，其他平台没什么可玩性（没人陪我玩），故停止继续开发，转战前端AI生成平台[WA - AI Generation Platform](wa.xcning.top)，有兴趣的可以继续拿该项目来玩。

## Nonebot

> 跨平台 PYTHON 异步机器人框架

[官网：https://nonebot.dev/](https://nonebot.dev/)

## 基于Nonebot的插件

> 基于nonebot2的使用SD-Webui-API的跨平台画图机器人，面向小群自用，以及想将自己日用电脑显卡挂上来任群友摆弄的，该版本为不稳定测试版

该插件为博主闲的没事干写的，可能BUG一堆，目前正在测试中

本篇文章基于该插件

[GitHub：https://github.com/CheNing233/nonebot_plugin_xcn-sdwebui](https://github.com/CheNing233/nonebot_plugin_xcn-sdwebui)

需要`OneBot V11适配器`对QQ进行适配，建议登陆方法为`手表登录`

需要`Feishu适配器`对飞书进行适配，飞书下发事件时要求访问Nonebot部署的地方，因此如果部署在本地，则需要自行配置内网穿透

Telegram平台暂未适配

丢进插件文件夹，配置启动即可，详见Nonebot官方对插件相关的介绍

## 适用于QQ的签名服务器

> 获取QQSign参数通过Unidbg，开放HTTP API
> 该方法虽然让消息能正常发出，但增大了被冻号的风险（非常大）

有公共API，这边建议自己搭建，貌似不难，重要的是防止信息泄露

[GitHub：https://github.com/fuqiuluo/unidbg-fetch-qsign](https://github.com/fuqiuluo/unidbg-fetch-qsign)

预装Java环境

下载 Release [V1.1.0 JAR](https://github.com/fuqiuluo/unidbg-fetch-qsign/releases/tag/1.1.0)，原因是go-cqhttp只支持到该版本

下载 `/txlib`里的所有文件，丢到解压的根目录中

新建`launch.bat`或`sh`文件，键入下列代码并修改部分信息：

```shell title="Windows"
"bin/unidbg-fetch-qsign" --host=0.0.0.0 --port=8866  --count=2 --library=txlib\8.9.63 --android_id=你的安卓ID（从gocq的device.json找）
```

或者

```shell title="Linux"
bash bin/unidbg-fetch-qsign --host=0.0.0.0 --port=8866  --count=2 --library=txlib\8.9.63 --android_id=你的安卓ID（从gocq的device.json找）
```

启动不闪退即可，再在go-cqhttp的`config.yml`配置`sign-server`为：

```
http://127.0.0.1:8866
```

`device.json`选择`protocol`为1，即Android phone

如果不想暴露接口，可将地址和端口修改