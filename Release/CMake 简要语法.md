---
title: CMake 简要语法
id: d7c19fe5-3122-4931-9def-0fe4dd7d9b34
date: 2024-07-17 16:28:02
auther: xchenning
cover: 
excerpt: CMake https//subingwen.cn/categories/CMake/ 注释 # 注释#[[012多行的]] 项目 # 需求版本cmake_minimum_required(VERSION 3.0)# 声明项目名project(	<PROJECT-NAME
permalink: /archives/cmake-jian-yao-yu-fa
categories:
 - bian-cheng
tags: 
 - c
 - cpp
---

# CMake

> https://subingwen.cn/categories/CMake/
## 注释

```cmake
# 注释

#[[
0
1
2
多行的
]]
```

## 项目

```cmake
# 需求版本
cmake_minimum_required(VERSION 3.0)

# 声明项目名
project(
	<PROJECT-NAME>  
    [VERSION <major>[.<minor>[.<patch>[.<tweak>]]]]  
    [DESCRIPTION <project-description-string>]  
    [HOMEPAGE_URL <url-string>]  
    [LANGUAGES <language-name>...]
)
```

## 输出可执行文件

```
# 定义一个或多个（复制粘贴）可执行
add_executable(
	EXENAME
	<.c>
	[.c]
	[.c]
)

# 改变输出路径
set(EXECUTABLE_OUTPUT_PATH /path/to/exec)
```

## 变量

### 用

```
# 写
set(
	VAR 
	[VALUE] 
	[CACHE TYPE DOCSTRING [FORCE]]
)

# 用
${VAR}
```

### 改

```
list(APPEND <list> [<element> ...])
list(REMOVE_ITEM <list> <value> [<value> ...])
```

## 找文件

```
file(<GLOB/GLOB_RECURSE> <变量名> <要搜索的文件路径和文件类型>)

# 找头文件和源文件
file(GLOB MAIN_SRC ${CMAKE_CURRENT_SOURCE_DIR}/src/*.cpp)  
file(GLOB MAIN_HEAD ${CMAKE_CURRENT_SOURCE_DIR}/include/*.h)
```

## 引入.h

```
include_directories(${PROJECT_SOURCE_DIR}/include)
```

`PROJECT_SOURCE_DIR`宏对应的值就是我们在使用cmake命令时，后面紧跟的目录，一般是工程的根目录。

## 定义宏

```
add_definitions(-D宏名称)

# 自定义 DEBUG 宏
add_definitions(-DDEBUG)
```

## 生成库

```
# 静态（.a或.lib）
add_library(库名称 STATIC 源文件1 [源文件2] ...)

# 动态（.so或.dll）
add_library(库名称 SHARED 源文件1 [源文件2] ...)

# 改变库的输出路径
set(LIBRARY_OUTPUT_PATH ${PROJECT_SOURCE_DIR}/lib)
```

## 引入库

```
# 声明库路径
link_directories(<lib path>)

# 静态库
link_libraries(<static lib> [<static lib>...])

# 动态库
target_link_libraries(  
    <target>   
    <PRIVATE|PUBLIC|INTERFACE> <item>...   
    [<PRIVATE|PUBLIC|INTERFACE> <item>...]
    ...
)
```

静态库在编译前插入到程序中，动态库运行时加载，因此引入动态库叫`target_link...`，并且要插入到`生成可执行`的指令后

并且使用 `target_link_libraries` 命令就可以链接动态库，也可以链接静态库文件。

## 显示消息

```
message(
	[STATUS|WARNING|AUTHOR_WARNING|FATAL_ERROR|SEND_ERROR] 
	"message to display" 
	...
)
```
