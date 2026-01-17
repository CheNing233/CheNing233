## 作用

new 操作符用于创建一个给定构造函数的实例对象

构造函数返回原始值将会被丢掉，返回对象则直接使用该对象（丢弃构造函数 this 定义的属性，因为你手动返回的对象，跟 this 是不同的对象，给 this 设置属性是没用的）

## 手写 myNew

- 创建一个`obj`
- 绑定原型链，`obj.__proto__ = Func.prototype`
- 将构造函数的`this`绑定到新建的`obj`上（用来设置属性方法等），并执行获取结果
- 如果结果是对象，那么直接使用，否则使用创建的`obj`

翻译版：

- 创建一个对象
- 将该对象的隐式原型赋值为构造函数的原型，连接原型链
- 将该对象绑定到构造函数的 this 上，然后给构造函数通过 this 操作这个对象
- 最后根据返回获得构造函数生产完成的对象

总的来说就是创建一个 obj 丢给构造函数，构造函数通过 this 来设置这个 obj，然后返回，可以灵活选择生成的 obj

```js
function myNew(constructorFunc, ...args) {
	// 创建一个空obj对象
	const obj = {}
	// 将obj对象的原型绑定到构造函数的原型对象上，实现原型链绑定
	obj.__proto__ = constructorFunc.prototype
	// 将obj对象作为构造函数的this联同参数丢给构造函数处理，获取结果
	const result = constructorFunc.apply(obj, args)
	// 优先使用构造函数返回的对象，否则使用myNew创建的对象
	return result instanceof Object
			? result
			: obj
}
```
