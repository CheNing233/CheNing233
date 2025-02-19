## 需求

碰到了要保持比例，但是要宽高尽量填充满父容器，就跟`img`标签的`object-fit: contain`一样，只不过是`div`填充`div`

## 实现

### 父容器

固定宽高即可，貌似也可以自动

```css
.parent {
	width: auto;
	height: auto;
}
```

### 子容器

需要两层`div`，外层叫`child-outer`，内层叫`child-inner`

```css
.child-outer {
	max-width: 100%; // 限制宽高
	max-height: 100%;
	width: auto; 
	height: 100dvh; // 设置100dvh，实际上会被 max-height 限制住
	aspect-ratio: w/h; // 任意宽高比

	// 可以写一些居中的样式，如果你的目标是居中，那么outer、inner两个都要写
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%)
}

.child-inner {
	max-width: 100%; // 限制宽高
	max-height: 100%;
	width: 100dvw; // 设置100dvw，实际上会被 max-width 限制住
	height: auto; 
	aspect-ratio: w/h; // 任意宽高比，跟outer一致

	// 可以写一些居中的样式，如果你的目标是居中，那么outer、inner两个都要写
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%)
}
```

### 原理

首先通过设置`outer`的宽高都限制为`100%`，然后设置`aspect-ratio`维持比例，并且高设置为`100dvh`

这样`outer`就会表现出高度填满并被max限制，但是宽度跟随`aspect-ratio`维持比例的样子

但此时还不行，只能适应”竖条状的比例“，因为高度是固定填满的，如果宽高比变为宽长高短，也就是横条状div，那么宽度会打破`aspect-ratio`，硬是填满整个父容器

但是可以如法炮制，前面的方法让我们可以只在”竖条状“比例的时候完美contain，那么把这个子容器再当父容器，设置成”横条状“比例的时候完美contain，那这样两个div互相限制，最里层就符合要求了

所以`inner`的宽高都限制为`100%`，然后设置`aspect-ratio`维持比例，并且宽设置为`100dvw`

这样`inner`就会表现出宽度填满并被max限制，但是高度跟随`aspect-ratio`维持比例的样子

这样两个div套住之后，如果比例是”竖条状“，那么`outer`的`aspect-ratio`发挥作用，`inner`的`100dvw`会因为max被限制在`outer`上

如果比例是”横条状“，那么`outer`的`100dvh`会被max限制在父容器上（表现为填满父容器，因此居中也需要对`inner`设置一次，不然`inner`会掉到`outer`顶部），`inner`的`aspect-ratio`发挥作用

