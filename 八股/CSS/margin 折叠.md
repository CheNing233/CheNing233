**Margin 折叠**（Margin Collapsing）是 CSS 中的一个机制，它发生在两个或多个块级元素的**垂直相邻**情况下。

### 折叠发生条件

#### 必须是垂直相邻的条件，水平不会触发

#### **相邻块级元素之间的外边距会折叠**

- 大概效果：

![image.png](https://img.glcn.top//piclist/1733514978212-2d5d2df9c2ec4135afde7b3c5681ca1c.png)

上图两个p标签的margin20px，被折叠为1个20px来间隔两个元素。

- 代码：

```html
<div class="box1" style="margin-bottom: 20px;"></div>
<div class="box2" style="margin-top: 30px;"></div>
```

当两个块级元素在垂直方向上相邻时，只有较大的 `margin` 会生效，较小的 `margin` 会被折叠掉

#### **父子块级元素的外边距会折叠**，

即如果父元素的 `margin-top` 和子元素的 `margin-top` 相邻且没有其他内容分隔，它们可能会折叠。

- 大概效果：

![image.png](https://img.glcn.top//piclist/1733515981949-e0aaba6410274811a5d9507bce33a7ae.png)

p标签的margin-top200px，和他的父元素div标签的margin-top200px合并为1个了

- 代码：

```html
<div class="parent" style="margin-top: 50px;">
  <div class="child" style="margin-top: 20px;"></div>
</div>
```

如果一个父元素和子元素之间没有边框、内边距或内容，它们的垂直外边距会发生折叠。

父元素 `.parent` 和子元素 `.child` 的 `margin-top` 相邻且没有其他内容分隔，则会发生折叠，最终的 `margin-top` 为 50px，而不是 50px + 20px。

#### **空块级元素的上下外边距也会折叠**

即如果一个块级元素没有内容、内边距或边框，那么它的上下外边距会折叠在一起。

- 大概效果：

![image.png](https://img.glcn.top//piclist/1733516368840-c59bcf7ee0d54a5bb987556bae18c64a.png)

删除123之后（好像看不出来什么）：

![image.png](https://img.glcn.top//piclist/1733516407752-21d812d305c245df85d081eb8ef65f0a.png)

- 代码：

```html
<div class="empty" style="margin-top: 30px; margin-bottom: 60px;"></div>
```

当一个块级元素没有内容、内边距或边框时，它的 `margin-top` 和 `margin-bottom` 也会发生折叠

在这个例子中，`margin-top` 和 `margin-bottom` 会折叠为 60px，而不是 30px + 60px

### 总结

相邻且没有任何内容或属性隔开的 `margin` 就会发生折叠，最终折叠效果取决于`margin`值最大的那个，并且可以多个元素折叠在同一个地方

### 避免折叠的情况：

- 浮动元素不会与任何元素发生叠加，也包括它的子元素
- 创建了BFC的元素(如浮动、overflow属性不为visible的元素)不会和它的子元素发生外边距叠加
- 绝对定位元素和其他任何元素之间不发生外边距叠加，也包括它的子元素
- inline-block元素和其他任何元素之间不发生外边距叠加，也包括它的子元素
- 普通流中的块级元素的margin-bottom永远和它相邻的下一个块级元素的margin-top叠加，除非相邻的兄弟元素clear
- 普通流中的块级元素（没有border-top、没有padding-top）的margin-top和它的第一个普通流中的子元素（没有clear）发生margin-top叠加
- 普通流中的块级元素（height为auto、min-height为0、没有border-bottom、没有padding-bottom）和它的最后一个普通流中的子元素（没有自身发生margin叠加或clear）发生margin-bottom叠加
- 如果一个元素的min-height为0、没有border、没有padding、高度为0或者auto、不包含子元素，那么它自身的外边距会发生叠加

### 应用场景

简化`margin`累加，减少布局代码

比如说设置一套`margin`上下`20px`给`p`标签，那么垂直排列他们的时候，从上到下的所有边距都是`20px`，也就是`20px p 20px p 20px p 20px`，不会出现`20px p 40px p 40px p 20px`的情况
