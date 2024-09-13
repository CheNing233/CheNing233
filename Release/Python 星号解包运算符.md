---
title: Python 星号解包运算符
id: 8adbf4fe-e6e0-42ac-b8f7-5fe1eb1057be
date: 2024-07-17 16:34:37
auther: xchenning
cover: ""
excerpt: 解包运算符 在python里，星号就是解包的意思。 比如： def func(*args)	a, b, c = *argsfunc(1, 2, 3) 在上述例子中， 整个*arg这个东西就是1, 2, 3 那arg自然就是没有被解包之前的，因此arg就是打包的(1, 2, 3) 继续解释，
permalink: /archives/python-xing-hao-jie-bao-yun-suan-fu
categories:
  - 编程
tags:
  - Python
slug: python-xing-hao-jie-bao-yun-suan-fu
halo:
  site: https://blog.glcn.top/
  name: 5ea3410f-c804-4ee7-a1f5-2abc9c56d201
  publish: true
---

# 解包运算符

在python里，星号就是解包的意思。

比如：

```
def func(*args):
	a, b, c = *args

func(1, 2, 3)
```

在上述例子中，

+ 整个`*arg`这个东西就是`1, 2, 3`
+ 那`arg`自然就是没有被解包之前的，因此`arg`就是打包的`(1, 2, 3)`

继续解释，按照上述代码列出等式：

```
# 用星号将args拆成多个量分别赋值
a, b, c = *args

# 没被星号拆之前是一个元组
tuple(a, b, c) = args
```