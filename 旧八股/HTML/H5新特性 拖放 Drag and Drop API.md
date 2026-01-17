---
title: H5新特性 拖放 Drag and Drop API
slug: h5xin-te-xing-tuo-fang-drag-and-drop-api
cover: ""
categories:
  - 前端
  - 学习
tags:
  - HTML
  - HTML5
halo:
  site: https://blog.glcn.top
  name: 7166fb00-d2df-4ce2-ac3d-d96d80ddee40
  publish: true
excerpt: HTML5新特性：Drag and Drop API
---
## 基础原理

- 属性`draggable`，设置给源元素，允许源元素可拖拽
- 事件`dragstart`，处理函数`ondragstart`，设置给源元素，开始拖拽源元素时触发，可以将一些数据通过`e.dataTransfer.setData("名字", 数据)`挂到event里
- 事件`dragover`，处理函数`ondragover`，设置给目标元素，`ondragover`里边必须设置`event.preventDefault()`来屏蔽浏览器默认行为（不允许放置的行为）
- 事件`drop`，处理函数`ondrop`，设置给目标元素，放置东西时触发，`ondrop`里边通过`event.dataTransfer.getData("名字")`拿到数据

## 代码

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    </meta>

    <script>
        // 一个标准节流函数，不要对handleDragOver节流
        function throttle(fn, delay) {
            let preTime = Date.now();

            return function () {
                let ctx = this;
                let args = [...arguments];
                let nowTime = Date.now();

                if (nowTime - preTime >= delay) {
                    preTime = nowTime;
                    fn.apply(ctx, args);
                }
            }
        }

        // 源元素被开始拖拽触发 dragstart 事件
        function handleDragStart(e) {
            console.log("handleDragStart", e);
            e.dataTransfer.setData("image.id", e.target.id);
        }

        // 丢到函数里来节流
        function console_dragOver(e) {
            console.log("handleDragOver", e);
        }
        const console_dragOver_t = throttle(console_dragOver, 1000);

        // 拖拽到目标元素上晃荡触发 dragover 事件，连续触发，需要节流
        function handleDragOver(e) {
            e.preventDefault();
            // 为什么不能直接节流handleDragOver函数
            // 因为handleDragOver需要对每一个e进行preventDefault，否则无法触发drop事件
            // 浏览器默认 放置操作 不被允许，要使用preventDefault来屏蔽
            console_dragOver_t(e)
        }

        // 拖拽到目标元素上松开，触发 drop 事件
        function handleDrop(e) {
            console.log("handleDrop", e);
            e.preventDefault();
            const t = document.getElementById(e.target.id);
            const i = document.getElementById(e.dataTransfer.getData("image.id"));

            // 尝试获取元素
            if (i) {
                t.appendChild(i);
            }
            // 尝试获取文件
            else {
                // getData不能拿到文件了，需要从e.dataTransfer.files里拿
                // e.dataTransfer.files是一个File对象的列表
                const f = e.dataTransfer.files

                if (f) {
                    for (let f_idx = 0; f_idx < f.length; f_idx++) {
                        console.log("file", f[f_idx]);
                    }
                }
            }
        }
    </script>
</head>

<body>
    <!--这俩div可以使用同一个drop函数，因为操作一样，并且id是从e.target.id里拿的-->
    <div id="targetContainer1" ondrop="handleDrop(event)" ondragover="handleDragOver(event)"
        style="width: 300px; height: 300px; border: 1px black solid;"></div>

    <div id="targetContainer2" ondrop="handleDrop(event)" ondragover="handleDragOver(event)"
        style="width: 300px; height: 300px; border: 1px black solid;"></div>

    <img id="image" src="https://www.runoob.com/images/logo.png" draggable="true"
        ondragstart="handleDragStart(event)" />
</body>

</html>
```

顺手把之前学的节流敲了一遍，然后发现不能乱节流

## 拖拽文件

因为`e.dataTransfer`里面的数据类型和内容依赖拖动源，如果是从操作系统拖文件进来的话，文件是包含在`e.dataTransfer.files`中的

## 其他API

来自[MDN HTML 拖放 API](https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API)

|事件|On 型事件处理程序|触发时刻|
|---|---|---|
|[`drag`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/drag_event)|[`ondrag`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/drag_event "ondrag")|当拖拽元素或选中的文本时触发。|
|[`dragend`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragend_event)|[`ondragend`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragend_event "此页面目前仅提供英文版本")|当拖拽操作结束时触发 (比如松开鼠标按键或敲“Esc”键). (见[结束拖拽](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#dragend "此页面目前仅提供英文版本"))|
|[`dragenter`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragenter_event)|[`ondragenter`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragenter_event "此页面目前仅提供英文版本")|当拖拽元素或选中的文本到一个可释放目标时触发（见 [指定释放目标](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#droptargets "此页面目前仅提供英文版本")）。|
|[`dragleave`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragleave_event)|[`ondragleave`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragleave_event "ondragleave")|当拖拽元素或选中的文本离开一个可释放目标时触发。|
|[`dragover`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragover_event)|[`ondragover`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragover_event "此页面目前仅提供英文版本")|当元素或选中的文本被拖到一个可释放目标上时触发（每 100 毫秒触发一次）。|
|[`dragstart`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragstart_event)|[`ondragstart`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragstart_event "此页面目前仅提供英文版本")|当用户开始拖拽一个元素或选中的文本时触发（见[开始拖拽操作](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#dragstart "此页面目前仅提供英文版本")）。|
|[`drop`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/drop_event)|[`ondrop`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/drop_event "ondrop")|当元素或选中的文本在可释放目标上被释放时触发（见[执行释放](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#drop "此页面目前仅提供英文版本")）。|
助记：

- **`drag` 系列事件** 是作用在拖动源上的，控制元素被拖动时的各种状态。
- **`drop` 系列事件** 是作用在目标元素上的，控制元素如何被放置。
