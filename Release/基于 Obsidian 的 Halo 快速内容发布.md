---
title: 基于 Obsidian 的 Halo 快速内容发布
id: b8939684-2840-4327-9f60-9d6d78e8f543
date: 2024-07-17 22:11:04
auther: xchenning
cover: 
excerpt: 基于 obsidian、piclist、halo、docker、七牛云图床 的博客内容发布
permalink: /archives/ji-yu-obsidian-de-halo-kuai-su-nei-rong-fa-bu
categories:
 - jie-jue-fang-an
tags: 
 - obsidian
 - halo
---

# 基于 Obsidian 的 Halo 快速内容发布

闲的没事，终于又把之前挂了的Blog又建回来了，之前使用 [obsidian](https://obsidian.md/) + [verysync](http://www.verysync.com/) + [mkdocs](https://www.mkdocs.org/) + [docker](https://www.docker.com/)的笔记方案，为的就是写啥上传啥，省心，但是缺了点东西，纯docs不好玩。

所以换成博客了。

这次的技术栈（好像这形容词有点高大上了）是 [obsidian](https://obsidian.md/) + [piclist](https://github.com/Kuingsmile/PicList) + [halo](https://halo.run/) + [docker](https://www.docker.com/) + 任意图床（我使用七牛云）

不过说是`Docker`，其实是[1Panel](https://1panel.cn/)的应用商店一键安装的镜像。

## Halo 端配置

首先你得有台服务器，其次安装`1Panel`，不过能把`Halo`装上初始化能用了就行，跟着步骤走就ok了。

然后到`控制台>用户中心`建一个`个人令牌`，建议全选权限，防止出各种毛病。记录好各种key。

## PicList 和 图床 端配置

Windows，其他平台应该也行，挑个平台下载安装

https://github.com/Kuingsmile/PicList/releases/

![image.png](http://img.glcn.top/piclist/1721224478962-83929f2e80de4078bd2405a3e4f72073.png)

首先把`管理页面自动导入配置`开开

![image.png](http://img.glcn.top/piclist/1721224626888-f6a3ea82539d414f83c414f805ce44ef.png)

然后在`图床`页配置好图床就完全好了，`管理`页配置就会自动载入

记得把存储路径设置为`<文件夹名>/`，后面的斜杠才是新建一个这样的文件夹，其他地方加的话自行摸索，七牛云是可以`//`连续两个根目录（没名字的目录），到时候会出问题。

![image.png](http://img.glcn.top/piclist/1721224922747-8ae19655ce664fc4bffe5b0f061b5265.png)

然后记得改`上传设置`的重命名，上传图片不要使用默认名字，到时候文件名有空格的话处理起来很麻烦（到时候就一个个查找替换了）

可以上传一张图片试试能不能成功

piclist客户端的话，会自动后台挂住`http://127.0.0.1:36677/`，到时候obisidian依赖这个来上传图片

## Obisidian 端配置

直接搜索`Halo`和`Image auto upload`插件，前者用来把文章上传到Halo，后者用来把图片上传到图床，负责Markdown的图片。
### Halo 插件

Halo插件添加Halo站点，把令牌丢进去，验证成功就行了。

不过可惜的是这个插件并不能帮你处理图片，所以要用另一个插件来搞。

完事的文章，点一下左侧栏图标发布就行，顶上会出一个文档属性

![image.png](http://img.glcn.top/piclist/1721225505852-4278cae41f334f139c6748db8f96ad66.png)
这些是改文章的相关设置的，`cover`是文字头图的链接，可以留空，如果要手动修改摘要的话，要添加一个`excerpt`文档属性，具体可以查看Halo的主题开发相关的API

### Image auto upload 插件

基本不用改，默认上传器选PicGo就行，PicList是基于PicGo上开发的

完事之后obisidian粘贴图片，就可以把图片自动推图床了

可以看看这个插件的 [doc](https://github.com/renmu123/obsidian-image-auto-upload-plugin/blob/master/readme-zh.md)

关于历史遗留的旧md文档，用的是本地链接图片的话，可以打开某个文档，`Ctrl + P`调出命令行，然后输入`image`

![image.png](http://img.glcn.top/piclist/1721225312188-768cdf6a05df4aeb97612d47b6923eb1.png)

选`Upload all images`，插件就会自动搜索该文档下链接的所有图片，然后上传，最后替换

所以一定要在piclist选手动重命名，不然无法处理带空格的图片路径

这种方法只能一个文档一个文档来，但是好过一条条链接来

暂时博主没发现什么批处理方法，博主笔记也少 (* ￣︿￣)

（完，已经能用了 `＜（＾－＾）＞` ）
