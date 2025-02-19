## typeof

用来判断基本数据类型，返回一个小写数据类型的字符串

```js
typeof undefined;    // "undefined"
typeof null;         // "object"  （历史遗留问题）
typeof true;         // "boolean"
typeof 42;           // "number"
typeof "Hello";      // "string"
typeof Symbol();     // "symbol"
typeof function(){}; // "function"  （特殊情况：函数是一种对象，但返回 "function"）
typeof {};           // "object"
typeof [];           // "object"  （数组也是对象的一种）
```

只能判断基本数据类型和函数，其他的都是object
## instanceof

检测一个对象的原型链`__proto__`上有没有构造函数的`prototype`原型对象

```js
object instanceof constructor
```

构造函数通过`new`可以实例对象，`instanceof`能判断这个对象是否是之前那个构造函数生成的对象

```js
// 定义构建函数
let Car = function() {}
let benz = new Car()

// 通过new创建的对象，可以判断这个对象的原型链上出现了构造函数的原型对象
benz instanceof Car // true

// 基本数据类型可通过包装对象new出来，也可以被检测
let car = new String('xxx') 
car instanceof String // true

let str = 'xxx'
str instanceof String // false
```

注意：不能检测基本数据类型，因为基本数据类型不是对象，也没有构造函数，强行检测会出现false

### 手写myInstanceof

```js
function myInstanceof(left, right) {
	// 先判断左边是否是基础数据类型或者null，返回false
	if (typeof left !== 'object' || left == null) {
		return false
	}

	// 开始循环查找原型链，直到出现构造函数的原型对象
	let lproto = Object.getPrototypeOf(left)
	while (true) {
		if (lproto == null) return false // 找到底了没找到返回false
		if (lproto === right.prototype) return true // 构造函数的原型对象出现在原型链上
		lproto = Object.getPrototypeOf(lproto) // 继续沿着原型链查找
	}
}
```

## Object.prototype.toString()

可以返回一个表示对象类型的字符串，格式为`[object Type]`

原理是查找内部的类型标识符`[[Class]]`

#### 示例 1：基本类型的检测

```js
console.log(Object.prototype.toString.call(123));       // [object Number]
console.log(Object.prototype.toString.call("hello"));   // [object String]
console.log(Object.prototype.toString.call(true));      // [object Boolean]
console.log(Object.prototype.toString.call(undefined)); // [object Undefined]
console.log(Object.prototype.toString.call(null));      // [object Null]
console.log(Object.prototype.toString.call(Symbol()));  // [object Symbol]
```

#### 示例 2：内置对象的检测

```js
console.log(Object.prototype.toString.call([]));         // [object Array]
console.log(Object.prototype.toString.call({}));         // [object Object]
console.log(Object.prototype.toString.call(new Date())); // [object Date]
console.log(Object.prototype.toString.call(/regex/));    // [object RegExp]
console.log(Object.prototype.toString.call(new Map()));  // [object Map]
console.log(Object.prototype.toString.call(new Set()));  // [object Set]
```

toString()这个函数是写在Object原型上的，但不意味着可以直接在随便一个obj上.toString()

因为某些对象已经重写了这个方法，比如数组的.toString是把数组转换为字符串

```js
const arr = [1, 2, 3];
console.log(arr.toString());  // "1,2,3"
```

因此需要通过`Object.prototype.toString.call()`来强制绕过对象自定义的`toString`方法来获取对象的准确类型

### 手写通用myGetType

```js
function getType(obj) {
	// 先进行基础的typeof判断，直接返回
	let t = typeof obj
	if (t !== 'object') {
		return t
	}

	// 否则调用toString方法获取并正则替换获取类型字符串
	return Object.prototype.toString.call(obj)
			.replace(
				/^\[object (\S+)\]$/, '$1'
			)
}
```

```js
getType([])     // "Array" typeof []是object，因此toString返回
getType('123')  // "string" typeof 直接返回
getType(window) // "Window" toString返回
getType(null)   // "Null"首字母大写，typeof null是object，需toString来判断
getType(undefined)   // "undefined" typeof 直接返回
getType()            // "undefined" typeof 直接返回
getType(function(){}) // "function" typeof能判断，因此首字母小写
getType(/123/g)      //"RegExp" toString返回
```

