
### 常见选择器



#### 属性选择器

##### 1、`[attribute]`

选择带有指定属性的所有元素（无论属性值是什么）。

```css
/* 选择所有具有 `type` 属性的元素 */
[type] {
  border: 1px solid red;
}
```

##### 2、`[attribute="value"]`

选择具有指定属性和值完全匹配的元素。

```css
/* 选择所有 `type` 属性等于 `text` 的元素 */
[type="text"] {
  background-color: yellow;
}
```

##### 3、`[attribute~="value"]`

选择属性值中包含指定词（用空格分隔的词列表之一）的元素。

```css
/* 选择属性值中包含 `button` 的元素 */
[class~="button"] {
  font-weight: bold;
}
```

##### 4、`[attribute|="value"]`

选择具有指定值或者以指定值开头并紧跟着连字符 - 的属性值的元素，常用于语言代码。

```css
/* 选择所有 `lang` 属性是 `en` 或者以 `en-` 开头的元素 */
[lang|="en"] {
  color: green;
}
```

##### 5、`[attribute^="value"]`

选择属性值以指定值开头的元素。

```css
/* 选择所有 `href` 属性以 `https` 开头的链接 */
[href^="https"] {
  text-decoration: none;
}
```

##### 6、`[attribute$="value"]`

选择属性值以指定值结尾的元素。

```css
/* 选择所有 src 属性以 .jpg 结尾的图片 */
[src$=".jpg"] {
  border: 2px solid blue;
}
```

##### 7、`[attribute*="value"]`

选择属性值中包含指定值的元素。

```css
/* 选择所有 `title` 属性中包含 `tutorial` 的元素 */
[title*="tutorial"] {
  font-style: italic;
}
```

### 优先级

!important > 内联样式 > id 选择器 > 类选择器 = 伪类选择器 = 属性选择器 > 标签选择器 = 伪元素选择器

| **选择器** | **格式**        | **优先级权重** |
| ------- | ------------- | --------- |
| id选择器   | \#id          | 100       |
| 类选择器    | .classname    | 10        |
| 属性选择器   | a[ref=“eee”]  | 10        |
| 伪类选择器   | li:last-child | 10        |
| 标签选择器   | div           | 1         |
| 伪元素选择器  | li:after      | 1         |
| 相邻兄弟选择器 | h1+p          | 0         |
| 子选择器    | ul>li         | 0         |
| 后代选择器   | li a          | 0         |
| 通配符选择器  | *             | 0         |
- `!important`声明的样式的优先级最高；
- 如果优先级相同，则最后出现的样式生效；
- 继承得到的样式的优先级最低；
- 通用选择器（*）、子选择器（>）和相邻同胞选择器（+）并不在这四个等级中，所以它们的权值都为 0 ；
- 样式表的来源不同时，优先级顺序为：内联样式 > 内部样式 > 外部样式 > 浏览器用户自定义样式 > 浏览器默认样式。

