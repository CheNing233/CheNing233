---
title: MC 全平台互通 Paper 服解决方案
slug: mc-quan-ping-tai-hu-tong-paper-fu-jie-jue-fang-an
cover: https://img.glcn.top//piclist/1740086674708-0cd21284bb684200af01404f474465a0.png
categories:
  - 解决方案
tags:
  - 服务器
  - 反向代理
  - Minecraft
halo:
  site: https://blog.glcn.top
  name: 06c274bb-9020-40b1-be3d-b25915aad1a4
  publish: true
---
## 架构图

基于`Velocity反代`+`Multilogin插件`+`Geyser插件`+`Floodgate插件`方案

![image.png](https://img.glcn.top//piclist/1740086674708-0cd21284bb684200af01404f474465a0.png)

- **全平台支持**：PC、安卓、iOS、平板等所有支持Java、基岩端的平台
- **存档互通**：支持多端使用同一个存档（基于档案重定向功能）
- **混合登录**：支持正版、离线和第三方（littleskin等）登录

~~相当于一个《原神》的体验~~

## 参考配置

简单给出我服的一个参考配置。我服定位1.21.4原版生电服，使用`Paper`服务端

### Paper服务端插件

```
![PlaceholderAPI 是一个允许其他插件注册并共享变量的插件。它可以在服务器配置文件和记分板中使用，提供了丰富的功能和指令。](PlaceholderAPI-2.11.6.jar)

![PlugManX 是在线热重载插件，快速调试服务器，允许服务器管理员无需重启服务器即可管理插件。](PlugManX-2.4.1.jar)

![用于快速砍伐树木和开采矿石！](TreeFella-1.3.jar)

![语音插件，建立服务器内语音，需要客户端mod](voicechat-bukkit-2.5.27.jar)

![高级规则更改，禁止小黑搬方块，fix修改了内置的配置]([XCNFix]FKeepInventoryPro-1.2.0.fix.jar)

![CommandAPI为Minecraft 1.13更新中实现的新命令UI提供全面支持。](CommandAPI-9.7.0-Mojang-Mapped.jar)

![菜单插件](DeluxeMenus-1.14.0-Release.jar)

![假人插件](fakeplayer-0.3.13.jar)

![扫地插件，清理掉落物防卡顿](FastClearLag.jar)

![计分板插件，右侧状态板](InfiniteScoreboard-1.2.2.jar)

![物品命令插件，给物品绑定命令，我服只有一个打开菜单的命令给指南针](ItemCommand-1.0.3.jar)

![传送插件](LiteTeleport-1.10.2.jar)

![多世界插件](multiverse-core-4.3.14.jar)
```

### Velocity反代端插件

```
![为Geyser插件提供floodgate登录](floodgate-velocity.jar)

![间歇泉插件，为velocity提供基岩协议转Java协议](Geyser-Velocity.jar)

![权限插件，提供命令行或UI级权限管理功能](LuckPerms-Velocity-5.4.153.jar)

![混合登录插件，接管所有登录方法，调控存档档案](MultiLogin-Velocity-Build_90c9cd8.jar)

![皮肤修复](SkinsRestorer.jar)

![语音插件的反代端，协同Paper服务端的语音插件工作](voicechat-velocity-2.5.24.jar)
```

### 生电配置

由于`Paper`服务端~~修复~~砍掉大量生电特性，这边给出部分通过配置文件还原的方法

目前能还原：TNT复制、刷沙、无头活塞等

> 参考资料：
> 
> 列表： https://www.bilibili.com/opus/949222574569553953
> Paper官方配置 https://docs.papermc.io/paper/reference/global-configuration
> 翠鸟列表： https://wiki.pha.pub/books/109/page/minecraft-paper
> 被修特性总结： https://github.com/lilingfengdev/PaperCrash
> Paper配置： https://mineplugin.org/Paper

实在不行就换`Purpur`服务端了

### Java客户端

#### 版本

客户端必须与服务端版本一致（我服为1.21.4）

#### 登录方法

- 正版（online）登录
- LittleSkin登录

#### 皮肤

无法显示就使用`SkinsRestorer`插件命令为自己修复

#### 建议mod列表

这里是`fabric`建议，`forge`等可以自行寻找替代，服务端对客户端无任何mod要求

```
#### 重要

![语音mod，配合服务端插件使用]([简单的语音聊天]voicechat-fabric-1.21.4-2.5.27.jar)

#### 建议

![光影前置]([钠]sodium-fabric-0.6.6+mc1.21.4.jar)

![光影](iris-fabric-1.8.5+mc1.21.4.jar)

#### 自选

![合成表显示]([REI物品管理器]RoughlyEnoughItems-18.0.796-fabric.jar)

![M键大地图]([Xaero的世界地图]XaerosWorldMap_1.39.3_Fabric_1.21.4.jar)

![左上角小地图]([Xaero的小地图]Xaeros_Minimap_25.0.1_Fabric_1.21.4.jar)

#### 生电

![蓝图投影]([投影]litematica-fabric-1.21.4-0.21.1.jar)

![方块显示]([玉🔍]Jade-1.21.4-Fabric-17.2.2.jar)

![高级方块放置](tweakeroo-fabric-1.21.4-0.23.0.jar)

![前置](malilib-fabric-1.21.4-0.23.1.jar)

#### 支持库

![支持库](architectury-15.0.1-fabric.jar)

![支持库](cloth-config-17.0.144-fabric.jar)

![支持库](fabric-api-0.115.1+1.21.4.jar)
```

#### 其他

存档重定向功能，可以使用`MultiLogin`插件指令将自己的存档更换为其他UUID下的存档

### 基岩端

#### 版本

客户端必须与服务端版本一致（我服为1.21.4）

#### 登录方法

- 正版（online）登录
- 离线（offline）登录

#### 皮肤

无法显示就使用`SkinsRestorer`插件命令为自己修复

#### 其他

存档重定向功能，可以使用`MultiLogin`插件指令将自己的存档更换到电脑Java端的存档（需指定UUID），重定向后所有背包等均与电脑Java端一致

不支持语音

`完～(∠・ω< )⌒★`
