---
title: Python 装饰器
id: da2b2a9f-f496-46c2-bc31-55ce3f3842be
date: 2024-07-17 16:35:22
auther: xchenning
cover: ""
excerpt: 装饰器 def StdExceptionHandler(func)	def wrapper(*args, **kwargs)		try			return func(*args, **kwargs)		except Exception as e			logger.error
permalink: /archives/python-zhuang-shi-qi
categories:
  - 编程
tags:
  - Python
slug: python-zhuang-shi-qi
halo:
  site: https://blog.glcn.top/
  name: 5839f0b7-24f1-4410-b63e-fde374f1dd71
  publish: true
---

# 装饰器

```
def StdExceptionHandler(func):

	def wrapper(*args, **kwargs):

		try:

			return func(*args, **kwargs)

		except Exception as e:

			logger.error(f"{str(func)} {e}")
			return SDWebUI_API.StdResult(None, text=f"{str(func)} {e}")

	return wrapper

@StdExceptionHandler
def _utils_req(
	host: str,
	port: int,
	api: str,
	json: dict,
	use_get: bool = False,
	use_https: bool = False,
	use_WebUIApiResult: bool = False,
	timeout: int = 0,
) -> dict:
	...
	return SDWebUI_API.StdResult(...)
```

上面定义了一个装饰器`StdExceptionHandler`用于捕获错误并按照要求返回一个`SDWebUI_API.StdResult()`对象。

假设有一个被装饰的`_utils_req`函数需要执行，则大致意思如下：

1. 使用`@StdExceptionHandler`时，会立即执行`StdExceptionHandler`，此时返回`wrapper`
2. 所以执行`_utils_req`就等于执行`wrapper`
3. `wrapper`实际上是个包装器，在执行`原函数`的同时拓展一下功能
4. `原函数`该传入啥`wrapper`传入啥，`原函数`该返回啥`wrapper`返回啥

结论就是这样做可以拓展原函数的功能。