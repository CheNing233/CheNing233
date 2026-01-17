---
title: 基于 SDWebUI 的 AI 生成平台
id: c00db456-791b-42e6-98b4-c37c429fc8b8
date: 2024-07-17 23:47:07
auther: xchenning
cover: ""
excerpt: 基于 stable-diffusion-webui 的 AI 生成平台
permalink: /archives/ji-yu-sdwebui-de-ai-sheng-cheng-ping-tai
categories:
  - 解决方案
tags:
  - Python
  - Docker
  - Stable-Diffusion
  - AI
  - K8S
slug: ji-yu-sdwebui-de-ai-sheng-cheng-ping-tai
halo:
  site: https://blog.glcn.top
  name: 016f93d6-ccb4-48ba-9fe0-aaa076750261
  publish: true
---
通过[stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui)的`FastApi`提供的接口，调用sd进行画图等AI内容生成
## Release

- https://wa.xcning.top/
- https://wa.glcn.top/

可以直接使用上述链接注册体验，免费，关于`全站教程`后续再补，也可能重构UI了

入口部署在`新加坡`，中途还要访问国内的后端服务器，所以速度极慢，建议开小飞机
## Repositories

- 前端: https://github.com/CheNing233/Wa-Ai-frontend
- 后端: https://github.com/1328411791/Wa-Ai-backend
- SDWebUI: https://github.com/AUTOMATIC1111/stable-diffusion-webui

## 已知问题

- SDWebUI部署在K8s上，会出现缓存问题，重载模型的时候缓存不释放，可能会爆掉内存
- 当前团队并没有深入sd-webui的代码，所以有很多隐藏问题，不过暂时能用

## 部署问题

- 构建给k8s用的sdwebui镜像时，必须要在实体机Linux构建才行，原因是WSL2构建的镜像移植到实体机Linux上会出GPU驱动问题，这个问题在容器里也无法屏蔽，是容器外d的问题了，要修的话可能要改一大堆软链接，非常麻烦；并且VM Ware无法直通显卡
- 还要要求部署环境有魔法，原因是sdwebui初始化时会上huggingface获取一个配置文件（暂时不知道在哪改），没魔法是无法初始化的

如果上述环境都没有，那只能在k8s上build镜像，使用DooD方法调用容器外的dockersock，commit出能用的镜像，一般为20G+，很难移动

等到完全能启动了，再commit为镜像，就可以快速部署了

## FastApi问题

https://github.com/CheNing233/sd-webui-api-payload-display

经过修改的`sd-webui-api-payload-display`，可以在控制台输出生成用的参数

可以先在webui调整参数，再通过webui内部补全的参数判断每个参数的用法和有效值，进而方便的调试fastapi

### txt2img

```json
{  
    "prompt": "",  
    "steps": 28,  
    "seed": -1,  
    "sampler_name": "Euler a",  
    "cfg_scale": 7.0,  
    "width": 512,  
    "height": 768,  
    "negative_prompt": "(worst quality:2), (low quality:2), (normal quality:2),",  
    "enable_hr": true,  
    "denoising_strength": 0.58,  
    "n_iter": 1,  
    "hr_scale": 2.0,  
    "hr_upscaler": "Latent",  
    "hr_second_pass_steps": 20,  
    "override_settings": {  
        "sd_model_checkpoint": "",  
        "sd_vae": "ClearVAE_NansLess1.safetensors",  
        "CLIP_stop_at_last_layers": 2,  
        "eta_noise_seed_delta": 0,  
    },  
}
```

一般没啥问题，不需要的参数可以直接去除，内部代码有赋值默认值的操作，一般不会出问题

### img2img

```json
{  
    "prompt": "",  
    "steps": 28,  
    "seed": -1,  
    "sampler_name": "Euler a",  
    "cfg_scale": 7.0,  
    "width": 512,  
    "height": 768,  
    "negative_prompt": "(worst quality:2), (low quality:2), (normal quality:2),",  
    "denoising_strength": 0.58,  
    "n_iter": 1,  
    "override_settings": {  
        "sd_model_checkpoint": "",  
        "sd_vae": "ClearVAE_NansLess1.safetensors",  
        "CLIP_stop_at_last_layers": 2,  
        "eta_noise_seed_delta": 0  
    },  
    "restore_faces": false, // 停用人脸修复  
    "tiling": false, // 停用tiling  
    "resize_mode": 0,  
    "mask": "",  // 蒙版
    "mask_blur": 4, // 蒙版边缘模糊  
    "inpainting_fill": 1, // 蒙版区域内容处理  
    "inpaint_full_res": false, // 仅蒙版区域重绘  
    "inpaint_full_res_padding": 32, // 仅蒙版区域重绘下，蒙版边缘预留像素  
    "inpainting_mask_invert": 0, // 蒙版模式，是否反转蒙版  
    "init_images": "",  // 用来图生图的图
}
```

这里有些参数比如`latent_mask`，如果没有正确的值，那么就不要传