---
title: Git 基础
id: 3c45c7c3-6d3a-45a9-bb4b-c6bb4ff81f70
date: 2024-07-17 16:30:55
auther: xchenning
cover: 
excerpt: 查看 查看远程仓库URL git remote -v 查看分支追踪关系 git branch -r 添加 添加远程仓库 git remote add <仓库别名> <仓库URL> 推送 普通推送
permalink: /archives/git-ji-chu
categories:
 - xiang-mu-kong-zhi
tags: 
 - git
---


## 查看

- 查看远程仓库URL

```bash
git remote -v
```

- 查看分支追踪关系

```bash
git branch -r
```

## 添加

- 添加远程仓库

```bash
git remote add <仓库别名> <仓库URL>
```

## 推送

- 普通推送

```bash
git push
```

- 推送所有提交

```bash
git push [仓库别名] [分支名] --all
```

## 从所有记录中删除

用于脱敏

```bash
git filter-branch -f --index-filter 'git rm -rf --cached --ignore-unmatch <你的文件或文件夹>' HEAD
```


