# HTML 的 src 和 href 区别

都是在需要加载外部资源的时候用来指定外部资源的位置，但是加载方式和适用标签有不同

## src

用于指定外部资源，一般用于嵌入这个资源

浏览器在碰到 src 引用的资源的时候，一般会立即发送请求给这个 URL，也就是触发后立即加载

发送请求后，阻塞情况分为阻塞方式和非阻塞方式

阻塞方式：对于`<script>`标签，如果没有加`defer`或`async`属性，则属于阻塞情况，浏览器会暂停解析 HTML，阻塞等待这个资源加载完成，并立即执行（参考[script 的 default-async-defer 加载](script的default-async-defer加载.md)）

非阻塞方式：对于`<img>`和`<iframe>`一类的标签，请求是异步的，就是加载的时候不阻塞 HTML 的解析

### src 的优化

#### script 的 src 引用可以加上 async 和 defer

[script 的 default-async-defer 加载](script的default-async-defer加载.md)

#### 图片懒加载

使用 loading="lazy" 属性声明图片懒加载

[img 的 loading 属性](img的loading属性.md)

#### CDN 优化

经常加载的脚本图片和字体都可以放在 CDN 加速加载

CDN 有地理分布优势，用户会选择最并解析完成。

> 🔍 举个例子：如果 CSS 文件很大，浏览器在下载 CSS 的过程中，\*\*页面的渲染（如近的 CDN 进行资源的下载

#### 压缩图片

将图片压缩为 webp 格式节省流量

### src 的错误处理

#### img 标签

设置 onerror 事件属性，`onerror="this.src='default-avatar.png'"`

注意有概率死循环，原因是兜底图也不存在，导致疯狂闪屏

解决办法是在 onerror 事件执行中把 onerror 事件属性清掉，达成只执行一次的效果

`onerror="this.onerror = null; this.src='default-avatar.png'"`

#### script 脚本

设置 onerror 属性

```js
const script = document.createElement('script')

script.src = 'xxx.js'
script.onerror = () => {
	// 错误处理
}

document.head.appendChild(script)
```

## href

指定外部资源，但一般用于标记为外部引用，浏览器不会立即加载这个资源

而是等到用户自己点击这个 link 链接才会跳转

常用于`<a>`和`<link>`标签中

但是 link 的 href 引用的 CSS，加载是异步的，HTML 解析也是异步的，渲染是阻塞的（加载或者说请求、HTML 解析、渲染是三个不同的东西）

如果渲染不阻塞，容易引发 FOUC 无样式内容闪烁（先显示没样式的内容，突变成有样式的内容），也会导致重排重绘浪费计算资源

link 加载 CSS 也会阻塞 script 脚本执行，原因类似 HTML 解析，避免 JS 脚本修改未完成的 CSS（参考[关于为什么阻塞](script的default-async-defer加载.md#关于为什么阻塞)）

### href 的优化

#### 预加载

使用`<link rel="preload" href="xxx" />`的方法

来提前加载后面要用到的资源

#### CSS 提前加载

link 加载 CSS 优先放到 head 里，提前加载好（因为阻塞渲染），缩短白屏时间
