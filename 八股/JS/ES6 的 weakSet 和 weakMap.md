## weakSet

`WeakSet`也是一种集合，类似于`Set`。`WeakSet`与`Set`的主要区别包括：

- 在`WeakSet`中，只有对象可以作为值。也就是说，我们不能将基本类型（如数字，字符串，布尔值等）添加到`WeakSet`中。
- `WeakSet`中的对象是弱引用的。如果一个对象只被`WeakSet`引用，那么这个对象可以被垃圾回收。当这个对象被垃圾回收后，它会自动从`WeakSet`中移除。
- `WeakSet`不可遍历，也就是说，我们不能使用像`for...of`这样的循环来遍历`WeakSet`。

`WeakSet`在处理对象的唯一性、内存泄漏等问题上有其独特的应用。

- `add(value)`：向 `WeakSet` 中添加一个对象。
- `has(value)`：检查某个对象是否存在于 `WeakSet` 中。
- `delete(value)`：删除 `WeakSet` 中的某个对象。

### 用法：保存DOM

当DOM从DOM树上销毁的时候，由于weakSet是弱引用的，此时该DOM引用计数为0，该DOM将会被销毁（垃圾回收）。

如果是普通set，该set将会对该DOM保持强引用（引用计数不为0），造成内存泄漏

```javascript
const doms = new weakSet()

let div = document..getElementById("myDiv")

doms.add(div)

// 处理div的东西

div.remove() // 移除后，div可被GC回收
```

### 用法：暂存需要跟踪的数据

将需要跟踪的数据对象加入到weakSet中，无需担心weakSet会带来额外的引用计数，方便跟踪目标对象的存活或值

```javascript
const activeTracker = new weakSet()

function setActive(obj) {
	activeTracker.add(obj)
}

function isActive(obj) {
	return activeTracker.has(obj)
}

let user1 = {}

setActive(user1)
console.log('isActive', isActive(user1)) // true

user1 = null
console.log('isActive', isActive(user1)) // false
```

### 用法：
## weakMap

`WeakMap`是一种键值对的集合，类似于`Map`。不过，`WeakMap`与`Map`有几个重要的区别：

- 在`WeakMap`中，只有对象可以作为键。换句话说，我们不能使用基本类型（如数字，字符串，布尔值等）作为`WeakMap`的键。
- `WeakMap`的键是弱引用的。这意味着，如果一个对象只被`WeakMap`引用，那么这个对象可以被垃圾回收（GC）。当这个对象被垃圾回收后，它对应的键值对也会从`WeakMap`中自动移除。
- `WeakMap`不可遍历，也就是说，我们不能使用像`for...of`这样的循环来遍历`WeakMap`。

由于这些特性，`WeakMap`在处理内存泄漏问题和管理对象私有数据等场景中有着显著的优势。

- `set(key, value)`：向 `WeakMap` 中添加键值对。
- `get(key)`：获取与键关联的值。
- `has(key)`：检查某个键是否存在于 `WeakMap` 中。
- `delete(key)`：删除指定键的键值对。

### 用法：保存私有数据

声明一个weakMap，把自己的实例当作键，值用来存数据，所以当自己实例销毁的时候，键值对将会一起从weakMap中删除，并且weakMap的值只能通过键（也就是自己的实例对象）来访问

```javascript
let privateData = new weakMap()

function myClass() {
	privateData.set(this, {
		secretData: 'some data'
	})
}

myClass.prototype.getSecret = function() {
	return privateData.get(this).secretData
}

let myCls = new myClass()

console.log('get secret data', myCls.getSecret()) // 'some data'

myCls = null

console.log('get secret data', myCls.getSecret()) // undefined
```

### 用法：缓存

使用weakMap来存储结果，将参数对象作为键，这样在键没变化时可以直接获取通过该键计算的结果，达到缓存效果

```javascript
const cache = new weakMap()

function caculation(obj) {
	// 返回缓存结果
	if (cache.has(obj)) {
		return cache.get(obj)
	}

	const result = Math.random() // 模拟复杂计算

	// 使用参数作为键，用参数和结果建立映射，用参数管理结果
	cache.set(obj, result)

	return result
}

let newObj = {}

console.log(caculation(newObj)) // 结果A
console.log(caculation(newObj)) // 还是结果A，因为参数是一样的，该函数直接使用了缓存

newObj = null // 清除缓存
newObj = {}

console.log(caculation(newObj)) // 结果B
```

### 用法：避免内存泄漏

使用weakMap代替map，避免意外的引用计数不归0

```javascript
const btn = document.getElementById("btn1")

const btnG = new weakMap()

function btnProcessEvent() {
  // do something
}

btnG.set(btn, btnProcessEvent) // 把函数引用存到weakMap，存到map会内存泄漏 

btn.addEventListener('click', btnG.get(btn)) // 设置事件

btn.remove() // 销毁DOM

// 此时btn被销毁，事件处理器也可以一并被销毁
// 如果使用map，则一直引用计数为1，无法被GC清理
```

## 特性

弱引用、无序、不可遍历、无法清除整个、无法获取大小

### weakMap

- weakMap的键是弱引用的，值是强引用的，注意要把需要弱引用的对象设置为键
- 当键被GC回收，值也会一并被回收，通过这种方法可以管理值（私有变量、闭包等）
- 不可遍历，因为JavaScript无法保证里面指向的值还在不在

## weakSet

- 同理，值是弱引用的
- 不可遍历，因为JavaScript无法保证里面指向的值还在不在
