## 作用

new操作符用于创建一个给定构造函数的实例对象

构造函数返回原始值将会被丢掉，返回对象则直接使用该对象（丢弃构造函数this定义的属性，因为你手动返回的对象，跟this是不同的对象，给this设置属性是没用的）

## 手写myNew

- 创建一个`obj`
- 绑定原型链，`obj.__proto__ = Func.prototype`
- 将构造函数的`this`绑定到新建的`obj`上（用来设置属性方法等），并执行获取结果
- 如果结果是对象，那么直接使用，否则使用创建的`obj`

总的来说就是创建一个obj丢给构造函数，构造函数通过this来设置这个obj，然后返回，可以灵活选择生成的obj

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

