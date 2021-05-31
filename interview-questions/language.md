# 题目
## HTML 相关
### 说一下<label>标签的用法
  > for="id" 用于关联元素，扩大可点击范围

### 遍历A节点的父节点下的所有子节点
 > el.parentNode.children

### Doctype作用?严格模式与混杂模式如何区分？它们有何意义?
  > Doctype声明于文档最前面，告诉浏览器以何种方式来渲染页面，这里有两种模式：<br>
  严格模式的排版和JS 运作模式是 以该浏览器支持的最高标准运行。<br>
  混杂模式，向后兼容，模拟老式浏览器，防止浏览器无法兼容页面。

  ```html
  <!-### 内部的DOCTYPE声明 -->
  <!DOCTYPE 根元素 [元素声明]>

  <!-### 外部的DOCTYPE声明 -->
  <!DOCTYPE 根元素 SYSTEM ‘文件名’>

  <!-### html5，没有 DTD -->
  <!DOCTYPE html>

  <!-### html4.01 -->
  <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">

  <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

  <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">

  <!-### xhtml1.0 -->
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">

  <!-### xhtml1.1 -->
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
  ```

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
