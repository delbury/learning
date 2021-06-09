# 题目
## JS 相关
### 用js递归的方式写1到100求和？

### 说一下事件代理？
  > 事件委托是指将事件绑定到目标元素的父元素上，利用冒泡机制触发该事件

### target、currentTarget的区别？
  > currentTarget：当前所绑定事件的元素 

  > target：当前被点击的元素

### 说一下宏任务和微任务？
  [事件循环](https://zhuanlan.zhihu.com/p/87684858)
  > 宏任务：当前调用栈中执行的任务称为宏任务（主线程、定时器）
  > 微任务：当前事件循环执行完成后，下一个事件循环执行前需要执行的任务（Promise）

### 说一下继承的几种方式及优缺点？
  > 借用构造函数继承，使用call或apply方法，将父对象的构造函数绑定在子对象上 

  > 原型继承，将子对象的prototype指向父对象的一个实例 B.prototype = A 

  > 组合继承
  > class B extends A

### 说一下闭包？
  > 闭包的实质是因为函数嵌套而形成的作用域链 

  > 闭包的定义即：函数 A 内部有一个函数 B，函数 B 可以访问到函数 A 中的变量，那么函数 B 就是闭包 


### export和export default的区别？ 

### 说一下自己常用的es6的功能？
  > let/const | class | module | promise | async/await | => | ...args | const { a, b } = obj | Set() | Map() | ArrayBuffer | `` | ...

### 什么是会话cookie,什么是持久cookie?

### 数组去重？
  > 遍历计数 

  > 使用 Set 
