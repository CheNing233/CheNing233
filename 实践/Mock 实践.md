---
title: Mock 实践
slug: mock-shi-jian
cover: https://img.glcn.top//piclist/1740420920052-819ae8d92b5a47d2b10f20b723ffd477.png
categories:
  - 测试
  - 前端
  - 项目控制
  - 学习
tags:
  - Apifox
  - Mockjs
  - Mockm
halo:
  site: https://blog.glcn.top
  name: 6ffb5947-af99-4edc-8b61-cc219f78b56c
  publish: true
---
## 需求和开端

想找一个模拟数据的库，看了一些其他项目，都用的`Mockjs`。

今天npm下好发现`package.json`警告

![image.png](https://img.glcn.top//piclist/1740420662677-c9276b50bfa943cc9c71e2d1430be2f4.png)

> GHSA-mh8j-9jvh-gjf6
> mockjs vulnerable to Prototype Pollution via the Util. extend function
> 
> mockjs 容易通过Util受到原型污染。

`What the hell ???`

赶紧爬上`issue`看看怎么个事，然后看到前辈老哥的温柔话语

![image.png](https://img.glcn.top//piclist/1740420920052-819ae8d92b5a47d2b10f20b723ffd477.png)

一看提交，十年前、六年前额

继续翻，有人建议使用`Mockm`，然后一查，发现`Apifox`也支持mock

看了眼`Mockm`，理念确实不错，但因为后端就有现成的apifox文档，所以决定直接使用apifox

其实Apifox看着更先进

## 对比

|**对比维度**|**Apifox Mock**|**Mock.js**|
|---|---|---|
|**产品定位**|全流程 API 管理工具（集成文档、调试、Mock、测试）[1](https://blog.csdn.net/m0_52289188/article/details/128803838)[6](https://apifox.com/)|前端数据模拟库（仅生成随机数据）[1](https://blog.csdn.net/m0_52289188/article/details/128803838)[5](https://blog.csdn.net/m0_71808387/article/details/132491887)|
|**Mock 规则生成**|可视化定义字段规则，智能匹配数据类型（如邮箱、手机号）[4](https://apifox.com/apiskills/mock-done/)[8](https://apifox.com/blog/mock-manual/)|需手动编写数据模板，依赖代码实现[1](https://blog.csdn.net/m0_52289188/article/details/128803838)[5](https://blog.csdn.net/m0_71808387/article/details/132491887)|
|**协作能力**|支持团队实时协作，Mock 数据与接口文档自动同步[3](https://www.zhihu.com/topic/26274134/hot)[6](https://apifox.com/)|仅限本地使用，无协作功能[1](https://blog.csdn.net/m0_52289188/article/details/128803838)[4](https://apifox.com/apiskills/mock-done/)|
|**环境支持**|支持本地/云端 Mock 切换，内置鉴权机制[4](https://apifox.com/apiskills/mock-done/)[6](https://apifox.com/)|仅限本地开发环境[1](https://blog.csdn.net/m0_52289188/article/details/128803838)[5](https://blog.csdn.net/m0_71808387/article/details/132491887)|
|**扩展性**|支持 Nunjucks 脚本、自定义脚本及 Mock.js 语法[2](https://developer.aliyun.com/article/1139110)[5](https://blog.csdn.net/m0_71808387/article/details/132491887)[8](https://apifox.com/blog/mock-manual/)|依赖 Mock.js 原生语法，灵活性高但需编码实现复杂逻辑[1](https://blog.csdn.net/m0_52289188/article/details/128803838)[5](https://blog.csdn.net/m0_71808387/article/details/132491887)|
|**自动化能力**|与自动化测试、性能测试联动，支持 CI/CD 集成[1](https://blog.csdn.net/m0_52289188/article/details/128803838)[6](https://apifox.com/)|仅生成数据，需搭配其他工具完成测试[1](https://blog.csdn.net/m0_52289188/article/details/128803838)[3](https://www.zhihu.com/topic/26274134/hot)|
|**学习成本**|低（可视化操作，零代码配置）[4](https://apifox.com/apiskills/mock-done/)[8](https://apifox.com/blog/mock-manual/)|较高（需熟悉 JavaScript 及 Mock.js 语法）[5](https://blog.csdn.net/m0_71808387/article/details/132491887)[7](https://blog.csdn.net/weixin_44404014/article/details/126127694)|
|**适用场景**|中大型团队协作、全生命周期 API 管理[1](https://blog.csdn.net/m0_52289188/article/details/128803838)[6](https://apifox.com/)|个人或小型项目快速生成静态数据[1](https://blog.csdn.net/m0_52289188/article/details/128803838)[5](https://blog.csdn.net/m0_71808387/article/details/132491887)|
|**安全性**|支持鉴权、IP 白名单等安全策略[4](https://apifox.com/apiskills/mock-done/)[6](https://apifox.com/)|无内置安全机制[1](https://blog.csdn.net/m0_52289188/article/details/128803838)|
|**维护成本**|接口修改后 Mock 规则自动更新[4](https://apifox.com/apiskills/mock-done/)[8](https://apifox.com/blog/mock-manual/)|需手动同步接口变更[1](https://blog.csdn.net/m0_52289188/article/details/128803838)[5](https://blog.csdn.net/m0_71808387/article/details/132491887)|

## Apifox 文档

https://docs.apifox.com/?nav=1

## 场景搭建

平时简单场景搭建示例

### 项目设置Mock地址

![image.png](https://img.glcn.top//piclist/1740427700635-74760ae6e932404880596233bf67d51a.png)

我的项目是通过dotenv注入到`vite.config.ts`的proxy设置上

### 登录

- 期望里选择哪一项等于哪一项不等于就行
- Header新建`Set-Cookie`可以给客户端设置`Cookie`

