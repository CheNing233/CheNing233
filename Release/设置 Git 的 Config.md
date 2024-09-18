---
title: 设置 Git 的 Config
slug: she-zhi-git-de-config
cover: ""
categories:
  - 问题处理
tags:
  - Git
halo:
  site: https://blog.glcn.top/
  name: 846e1dfc-a45e-44e7-b511-ac4bc262d7fe
  publish: true
excerpt: 设置 Git 的 Config，Windows 的位于 C:\Users\<用户>\.gitconfig
---

## Windows 位置

```
C:\Users\<用户>\.gitconfig
```

一般长下面这样

```sh
[core]
    editor = \"C:\\Users\\<用户>\\AppData\\Local\\Programs\\Microsoft VS Code\\bin\\code\" --wait
[http]
    proxy = http://127.0.0.1:10809
[https]
    proxy = http://127.0.0.1:10809
```
## 设置代理

设置到`http://127.0.0.1:10809`

```sh
git config --global http.proxy http://127.0.0.1:10809
git config --global https.proxy http://127.0.0.1:10809
```

