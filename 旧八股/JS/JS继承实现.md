## 原型链继承

原型链继承是 JavaScript 中最基本的继承方式。它通过将构造函数的原型赋值为父类的一个实例来达成继承

那么通过构造函数生产的对象就共享父类实例的所有属性和方法

### 核心

```js
// 将父类实例复制到子类构造函数的原型上
// 因此子类构造函数构造的对象，就可以通过原型链（__proto__）访问到父类实例及其上层原型
Child.prototype = new Parent();
```

### 代码

```js
function Parent() {
    this.name = 'parent1';
    this.play = [1, 2, 3]
}

function Child() {
    this.type = 'child2';
}

Child1.prototype = new Parent();
console.log(new Child())
```

- 子类实例共享父类实例的所有属性和方法
- 无法在创建子类实例时调用父类构造函数传参
- 相当于手动将父类实例赋值到子类构造函数原型上，子类顺着原型链首先会找到这个父类实例，但是会缺少 constructor 属性

### 分析

子类实例都顺着原型链指向同一个父类实例

任意一方修改了父类实例（包括从子类上修改的）都会影响所有子类实例

```js
function Parent() {
	this.name = 'Parent'
	this.arr1 = [233]
}
Parent.prototype.abc = "abc"

function Child1(){}
function Child2(){}

const parent = new Parent()

Child1.prototype = parent;
Child2.prototype = parent;

const child1 = new Child1()
const child2 = new Child2()

console.log(child1, child2, parent)
console.log(child1.arr1, child2.arr1, parent.arr1)

child1.arr1.push(567)

console.log(child1, child2, parent)
console.log(child1.arr1, child2.arr1, parent.arr1)

// 输出
// Child1 {} Child2 {} Parent {name: 'Parent', arr1: Array(1)}
// [233] [233] [233]
// Child1 {} Child2 {} Parent {name: 'Parent', arr1: Array(2)}
// [233, 567] [233, 567] [233, 567]
```

child1.arr1.push(567) 属于在父类实例上修改

- **特点 ​**​：
  - 父类实例的属性和方法会被所有子类实例共享。
  - 引用类型属性（如数组）的修改会影响所有子类实例
- ​**​ 缺点 ​**​：
  - 无法向父类构造函数传参。
  - 子类实例共享父类引用属性，可能导致数据污染。

### 注意点

构造函数内操作的 this 是指要生产的对象，而不是自己的 prototype

自己的 prototype 会被要生产的对象的隐式原型引用连接

## 构造函数继承

通过构造函数复制属性，解决属性共享问题

因为每执行一次 new Child()，也会跟着执行一遍 new Parent()

### 核心

```js
function Child(name, age) {
  Parent.call(this, name); // 借用父类构造函数
}
```

在子类构造函数使用 .call 方法，将父类属性构造到子类实例当中

### 代码

```js
function Parent(name) { this.name = name; }
function Child(name, age) {
  Parent.call(this, name); // 借用父类构造函数
  this.age = age;
}

const child = new Child("bob", 21)
```

### 分析

通过 Parent.call 来将 Child 要生产的对象丢给 Parent 构造函数先处理，然后自己再处理

达到复制 Parent 属性的操作

但是其中少了对 Child 的对象的隐式原型进行绑定的操作

因此子类实例只能拿到父类实例的属性和方法，而无法顺着父类原型向上查找

相当于只是复制一个父类实例

### 优缺点

优点：

- 解决了引用数据类型属性被共享的问题，因为调用了父类构造函数进行复制属性，内存地址是不一样的

缺点：

- 只能继承父类实例，而不能继承父类原型，因为没有让子类的隐式原型连接到父类
- 实例里面一般是属性，无法复制父类的方法（父类复用的方法一般挂在原型上），因此无法做到方法的复用

## 组合继承

结合`原型链继承`和`构造函数继承`的优点，组合两种方式

### 核心

```js
function Parent () {}

function Child (name) {
	Parent.call(this)
	this.name = name
}

Child.prototype = new Parent()

let child1 = new Child('child1')
```

子类构造函数中调用父类构造函数进行复制属性，创建出来的子类实例将单独一份父类的属性和方法

子类构造函数的原型被赋值为父类实例，通过 new 将隐式原型绑定到父类实例上

### 分析

通过这种方法继承的子类实例，会调用构造函数两次，也会出现两套属性

```js
function Parent (name) {
	this.name = name
	console.log("这里是父构造函数")
}

function Child (name) {
	Parent.call(this, name)
}

Child.prototype = new Parent("parent")

let child1 = new Child('abc')

console.log(child1)
```

![image.png](https://img.glcn.top//piclist/1744048528227-fc05711e168549379a5b7f321f365ee1.png)

### 优缺点

优点：

- 综合了原型链继承和构造函数继承的优点
- 解决了引用数据类型属性共享问题

缺点：

- 调用父类构造函数两次，造成性能问题
- 产出的子类实例含有两套属性，在遮蔽效应下很可能会出安全问题

## 寄生组合继承

```js
function Parent (name) {
  this.name = name
}
Parent.prototype.getName = function () {
  console.log(this.name)
}

function Child (name) {
  this.sex = 'boy'
  Parent.call(this, name)
}
// 与组合继承的区别
Child.prototype = Object.create(Parent.prototype)


var child1 = new Child('child1')

console.log(child1)
child1.getName()

console.log(child1.__proto__)
console.log(Object.create(null))
console.log(new Object())
```

### 跟组合继承的区别

- 组合继承

会创建一个父类实例，让子类构造函数的原型被赋值为该父类实例

```js
// 原型链方法绑定父类原型链
Child.prototype = new Parent()
```

- 寄生组合式继承

使用 Object.create 方法创建一个空的对象，但隐式原型是父类的原型

```js
// 原型式方法绑定父类原型链
Child.prototype = Object.create(Parent.prototype)
```

这其中的不同点就是原型式创建出来的空对象是不含父类实例任何属性的

这部分缺失的父类属性将会由`构造函数继承`来实现，也就是复制父类的属性

那么各司其职，解决了组合继承的两套冗余属性问题

达成要复用的方法挂在 prototype 上达成代码复用

而每个实例的属性（包括引用数据类型）是独立分开的，不会影响其他实例

### 注意点

ES6 的 class 继承使用的就是寄生组合式方法，可见这是一种可靠性安全性强的 JS 继承解决方案

## 原型式继承

就是父对象实例单纯用 Object.create 创建的子对象

```js
var cat = {
  heart: '❤️',
  colors: ['white', 'black']
}

var guaiguai = Object.create(cat)
var huaihuai = Object.create(cat)

console.log(guaiguai)
console.log(huaihuai)

console.log(guaiguai.heart)
console.log(huaihuai.colors)
```

### 手写 Object.create()

```js
function createObject(obj) {
	function F(){}
	F.prototype = obj;

	// obj.constructor = F;

	return new F()
}
```

总的来说就是用一个空的构造函数

将函数的原型绑定为传入的 obj

再通过 new 方法创建一个空对象，但隐式原型是传入的 obj 的操作

## 寄生式继承

在原型式继承上封装了一层

原型式继承：

```js
let parent = {
	heart: '❤️',
	colors: ['white', 'black']
}

const child = Object.create(parent)
```

寄生式继承：

```js
function createAnother(original) {
	const child = Object.create(parent)
	child.a = "xxx"

	return child
}
```

额没啥好说的了

## 混入式继承

```js
function Child () {
    Parent.call(this)
    OtherParent.call(this)
}
Child.prototype = Object.create(Parent.prototype)
Object.assign(Child.prototype, OtherParent.prototype)
Child.prototype.constructor = Child
```

看得出来是寄生组合式继承，但是混入了多个父类，从而实现多继承
