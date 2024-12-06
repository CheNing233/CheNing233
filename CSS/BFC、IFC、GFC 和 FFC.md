### BFC（Block Formatting Context，块级格式化上下文）

简单来说，一旦触发创建了一个BFC，那么其中的内容元素就和外部的元素隔绝了，相互不能影响，相当于创建了一块独立渲染的区域。

#### BFC防止margin折叠

```html
<div class="outer">
  <p>I am paragraph one and I have a margin top and bottom of 20px;</p>
  <p>I am paragraph one and I have a margin top and bottom of 20px;</p>
</div>
```

```css
.outer {
   background-color: #ccc;
  margin: 0 0 40px 0;
}

p {
  padding: 0;
  margin: 20px 0 20px 0;
  background-color: rgb(233,78,119);
  color: #fff;
}
```

![image.png](https://img.glcn.top//piclist/1733518140676-dd300d5fdd734637871e1e5a153b89ed.png)

因为 `p` 元素的 margin 和外部 `div` 上的 margin 之间没有任何东西，所以两个会折叠

因此 `p` 最终与 `div` 的顶部和底部齐平。 我们在 `p` 的上方和下方看不到任何灰色。

如果我们把盒子设为 **BFC**，为里面的`p`创建了独立的渲染区域，使其跟外部的元素隔绝（隔绝俩个临接的margin），我们可以看到边距后面容器的灰色背景。

![image.png](https://img.glcn.top//piclist/1733518286088-55f55276a3634dd29407e315898f0376.png)

#### BFC防止float塌陷（清除浮动）

![image.png](https://img.glcn.top//piclist/1733518449178-109e1607068749b0b0301abbbe90940a.png)

给虚线框容器添加`overflow: auto;`，创建一个BFC包裹粉色浮动元素和文字

![image.png](https://img.glcn.top//piclist/1733518497252-8c607b62d3b340a1bef1111a353419e3.png)

这样就防止float子元素高度塌陷了

#### BFC阻止元素被float元素覆盖

```html
<div class="outer">
  <div class="float">I am a floated element.</div>
  <div>
  I am text inside a div nested inside the outer box. If there is enough text then the text will wrap around the floated element. The border on the outer will then wrap around the text.
  </div>
</div>

<div class="outer">
  <div class="float">I am a floated element.</div>
  <div class="text">
  I am text inside a div nested inside the outer box. I have overflow auto which makes me a BFC and therefore I do not wrap.
  </div>
</div>
```

```css
.outer {
  border: 5px dotted rgb(214,129,137);
  border-radius: 5px;
  width: 450px;
  padding: 10px;
  margin-bottom: 40px;
}

.float {
  padding: 10px;
  border: 5px solid rgba(214,129,137,.4);
  border-radius: 5px;
  background-color: rgba(233,78,119,.4);
  color: #fff;
  float: left;  
  width: 200px;
  margin: 0 20px 0 0;
}

.text {
  overflow: auto;
}
```

下面是`文字元素`没有被BFC包裹：

![image.png](https://img.glcn.top//piclist/1733518776090-69360f7011bc45dca135cf58a3194633.png)

下面是`文字元素`被BFC包裹：

![image.png](https://img.glcn.top//piclist/1733518839173-2a1bed663c0c44fc89e87d9050a32610.png)

给`div`设置`overflow: auto`，创建了一个BFC，里面的文字就在独立的渲染空间里渲染了，就不会跑出去，外部的`float`元素也不会跑进来

#### 如何创建一个BFC

- float 的值不是 `none`
- position 的值不是 `static` 或者 `relative`，而是 `absolute` 或 `fixed`
- display 的值是 `inline-block`、`table-cell`、`flex`、`table-caption` 或者 `inline-flex`
- overflow 的值不是 `visible`，而是 `hidden`、`auto`、`scroll`
- 使用`display: flow-root;`方法，设置该属性后，该元素会变成块级元素，同时生成一个BFC

### IFC（Inline Formatting Context，行内格式化上下文）

在行内格式化上下文中，框(boxes)一个接一个地水平排列，起点是包含块的顶部。水平方向上的 `margin`，`border` 和 `padding`在框之间得到保留。框在垂直方向上可以以不同的方式对齐：它们的顶部或底部对齐，或根据其中文字的基线对齐。包含那些框的长方形区域，会形成一行，叫做行框(line-box)。

IFC中的line box一般左右都贴紧整个IFC，但是会因为float元素而扰乱。float元素会位于IFC与与line box之间，使得line box宽度缩短。 同个ifc下的多个line box高度会不同。

#### **Line Box 的基本概念**

在 **IFC** 中，所有的行内元素会被放置在 **line box** 内。这个 **line box** 是由一组行内元素组成的框，它定义了这些元素在水平方向上的排列和在垂直方向上的对齐方式。

- **行内元素的排列**：所有行内元素都排列在一个个 line box 中，每个 line box 包含一组在同一行内的元素。
- **line box 的高度**：每个 **line box** 的高度由该行内的最高元素决定。换句话说，line box 会根据其中内容的高度来自动调整高度。
- **line box 的宽度**：line box 的宽度由其包含的行内元素的宽度和间距决定。在没有换行的情况下，line box 会尽可能地填满父容器的宽度。

#### **Line Box 的布局特性**

1. **基线对齐**：行内元素的基线通常决定了它们在 **line box** 中的垂直对齐方式。基线是字体的底部位置，对于文本来说，它是行内元素的关键参考点。
    
2. **line box 的宽度**：line box 的宽度会根据其中元素的内容自动调整，但也受到父容器宽度的限制。如果父容器的宽度不足以容纳所有行内元素，内容会自动换行，并创建新的 **line box**。
    
3. **高度的影响**：line box 的高度取决于其内容，尤其是行内元素的字体大小、行高以及图像的高度等。例如，如果一行中有较大的图像或较大的字体，line box 会自动扩展以适应这些内容。

