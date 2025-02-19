## .call

### 原理

- 函数内的`this`是最后一个调用它的对象决定的
- 想要绑定`this`到指定对象，只需要让指定对象调用这个函数即可

### 代码

#### 简易实现

```javascript
// 给所有函数添加 myCall 方法，原理是直接修改 Function 的原型
Function.protoype.myCall = function(thisArg, ...args) {
	// 给 thisArg 上面挂载一个新属性 f，并将 this 赋值
	// 由于 this 是在运行时确定，并且将由最后一个调用它的对象作为 this
	// 通常使用函数的 call 是这样：随便一个函数.myCall(要绑定的this对象, 其他参数...)
	// 那这个此时 myCall 的 this 就是指这个 "随便一个函数" 了
	thisArg.f = this // 设置原函数挂载到指定对象的 this 上
	// 通过 指定的对象 调用这个 原函数，此时原函数的 this 就绑到指定对象上了
	const res = thisArg.f(...args) // 执行并获取返回值
	// 删除这个额外创建的属性
	delete thisArg.f
	// 返回结果
	return res
}
```

让指定的对象去调用这个函数，这个函数的`this`就会绑定到这个对象

#### Symbol 调优

上面的代码有个坑，就是我给指定对象挂载原函数的时候，挂载的属性名是固定的，也就是说，很有可能会导致属性重名，这里使用`Symbol()`生成绝对唯一的对象标识符并挂载

```javascript
// 给所有函数添加 myCall 方法，原理是直接修改 Function 的原型
Function.protoype.myCall = function(thisArg, ...args) {
	// 创建一个绝对唯一的标识符
	const key = Symbol("myCallFuncProperty")
	// 给 thisArg 上面挂载一个新属性 f，并将 this 赋值
	// 由于 this 是在运行时确定，并且将由最后一个调用它的对象作为 this
	// 通常使用函数的 call 是这样：随便一个函数.myCall(要绑定的this对象, 其他参数...)
	// 再根据 谁调用函数，函数里的 this 就绑谁的规则
	// 那这个此时 myCall 的 this 就是绑这个 "随便一个函数" 了
	thisArg[key] = this // 设置原函数挂载到指定对象的 this 上
	// 通过 指定的对象 调用这个 原函数，此时原函数的 this 就绑到指定对象上了
	const res = thisArg[key](...args) // 执行并获取返回值
	// 删除这个额外创建的属性
	delete thisArg[key]
	// 返回结果
	return res
}
```

#### 使用

```javascript
随便一个函数.myCall(obj, arg1, arg2, arg3)
```

## .apply

原理跟`.call`差不多，只不过`call`的传参是一个个传递的，`apply`的传参是打包为数组传递的，其他逻辑不变，可以照抄

### 代码

#### 实现

```javascript
// 给所有函数添加 myApply 方法，原理是直接修改 Function 的原型
// 直接第二个参数接收数组就行
Function.protoype.myApply = function(thisArg, args) {
	// 创建一个绝对唯一的标识符
	const key = Symbol("myApplyFuncProperty")
	// 给 thisArg 上面挂载一个新属性 f，并将 this 赋值
	// 由于 this 是在运行时确定，并且将由最后一个调用它的对象作为 this
	// 通常使用函数的 call 是这样：随便一个函数.myApply(要绑定的this对象, [其他参数...])
	// 再根据 谁调用函数，函数里的 this 就绑谁的规则
	// 那这个此时 myApply 的 this 就是绑这个 "随便一个函数" 了
	thisArg[key] = this // 设置原函数挂载到指定对象的 this 上
	// 通过 指定的对象 调用这个 原函数，此时原函数的 this 就绑到指定对象上了
	// 展开参数数组
	const res = thisArg[key](...args) // 执行并获取返回值
	// 删除这个额外创建的属性
	delete thisArg[key]
	// 返回结果
	return res
}
```

#### 使用

```javascript
随便一个函数.myApply(obj, [arg1, arg2, arg3])
```

## .bind

会`.call`其实都会了

### 代码

#### call实现

```javascript
// 将该函数绑定到原型上，接受其余的第一部分参数
Function.prototype.myBind = function(thisArg, ...args) {
	// 返回一个箭头函数，箭头函数中的 this 将会从上一级寻找
	// 也就是箭头函数中的 this 就是这个 myBind 的 this
	// 由于 myBind 是在 原来的那个函数中调用的，那这个 this 就是指原函数

	// 这里接收其余的第二部分参数
	return (...reArgs) => {
		// 使用 call 方法绑定 this，合并参数，并执行
		return this.call(thisArg, ...args, ...reArgs)
	}
}
```

#### 纯原生实现

```javascript
// 将该函数绑定到原型上，接受其余的第一部分参数
Function.prototype.myBind = function(thisArg, ...args) {
	// 这里我们返回一个自己写的 call 就行了

	// 这里接收其余的第二部分参数
	return (...reArgs) => {
		// 定义唯一键
		const key = Symbol("myBindFuncProperty")
		// 将原函数挂载到指定对象完成 this 绑定
		// 执行这个箭头函数的时候再挂载原函数，因为还要删
		thisArg[key] = this
		// 执行并获取返回
		const res = thisArg[key](...args, ...reArgs)
		// 删除键
		delete thisArg[key]
		// 返回
		return res
	}
}
```

#### 使用

```javascript
const bind完的函数 = 随便一个函数.myBind(obj, arg1, arg2)
bind完的函数(arg3)
```
