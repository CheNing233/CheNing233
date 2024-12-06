### 什么是 attribute 和 property

**attribute** 是我们在 **html** 代码中经常看到的键值对, 例如:

```html
<input id="the-input" type="text" value="Name:" />
```

上面代码中的 input 节点有三个 attribute:

- id : the-input
- type : text
- value : Name:

**property** 是 attribute 对应的 DOM 节点的 对象属性 (Object field), 例如:

```js
HTMLInputElement.id === 'the-input'
HTMLInputElement.type === 'text'
HTMLInputElement.value === 'Name:'
```

### 区别

```html
<input id="the-input" type="typo" value="Name:" /> // 在页面加载后,
```

```js
// attribute still remains the original value
input.getAttribute('id') // the-input
input.getAttribute('type') // typo
input.getAttribute('value') // Name:

// property is a different story
input.id // the-input
input.type //  text
input.value // Jack
```

attribute 会始终保持 HTML 代码中的初始值，而 Property 是有可能变化的，其实，我们从这两个单词的名称也能看出些端倪：

- **attribute** 从语义上更倾向于不可变更的
- **property** 从语义上更倾向于在其生命周期中是可变的

### 自定义的 attribute 和 property

```html
<body>
	<h1 id="123" customAttr="test">我的第一个标题</h1>
</body>

<script>
	const h = document.getElementById("123");
	console.log(h.getAttribute("id")) // 123
	console.log(h.id) // 123
	console.log(h.getAttribute("customAttr")) // test
	console.log(h.customAttr) // undefined
</script>
```

自定义的 **attributes** 没有对应的 **properties**，会被浏览器忽略，只能拿到`undefined`

### 总结

- **Attributes** 定义了 HTML 元素的初始属性值，并在浏览器解析时用来生成 DOM 元素。
- **Properties** 是 DOM 元素的实际状态，它们反映元素的当前值，并可以被动态修改。
- 如果某些 **attributes** 没有对应的 **properties**，浏览器会忽略它们，导致访问这些属性时返回 `undefined`。

