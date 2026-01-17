`<meta>` 标签是 HTML 中的一个重要标签，它用于定义网页的元数据（metadata），即描述网页的属性和信息。这些信息通常不会直接显示在网页上，而是用于向浏览器、搜索引擎、其他应用程序等提供关于页面的额外信息。

### **`<meta>` 标签的基本语法**

`<meta name="属性名" content="属性值">`

- `name` 属性指定了元数据的类型（例如：页面描述、关键字、作者等）。
- `content` 属性指定了元数据的具体内容。

`<meta>` 标签通常放置在 HTML 文档的 `<head>` 部分。

### **`<meta>` 标签使用**

（1）​`charset`​，用来描述HTML文档的编码类型：

`<meta charset="UTF-8" >`

（2） `keywords`，页面关键词：  

`<meta name="keywords" content="关键词" />`

（3）`description`，页面描述：  

`<meta name="description" content="页面描述内容" />`

（4）`refresh`，页面重定向和刷新：  

`<meta http-equiv="refresh" content="0;url=" />`

设置30秒后刷新当前页面：

`<meta http-equiv="refresh" content="30">`

设置5秒后跳转到指定页面：

`<meta http-equiv="refresh" content="5;url=https://example.com">`

（5）`viewport`，适配移动端，可以控制视口的大小和比例：  

`<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">`

其中，`content` 参数有以下几种：  

- ​`width viewport`​ ：宽度(数值/device-width)
- ​`height viewport`​ ：高度(数值/device-height)
- ​`initial-scale`​ ：初始缩放比例
- ​`maximum-scale`​ ：最大缩放比例
- ​`minimum-scale`​ ：最小缩放比例
- ​`user-scalable`​ ：是否允许用户缩放(yes/no）

（6）搜索引擎索引方式：  

`<meta name="robots" content="index,follow" />`

其中，`content` 参数有以下几种：  

- ​`all`​：文件将被检索，且页面上的链接可以被查询；
- ​`none`​：文件将不被检索，且页面上的链接不可以被查询；
- ​`index`​：文件将被检索；
- ​`follow`​：页面上的链接可以被查询；
- ​`noindex`​：文件将不被检索；
- ​`nofollow`​：页面上的链接不可以被查询。

除开上述，还能设置其他类型的meta标签，比如Open Graph等，用来做SEO优化
