# 题目
## CSS 相关
### calc, support, media各自的含义及用法？
  > calc: 计算值，加减乘除；

  > @support: 是否支持 CSS 样式的条件判断；

  > @media: 媒体查询，判断不同的媒体条件。

### css水平、垂直居中的写法，请至少写出4种？
  > 水平 => 行内元素：text-align | 块级元素：margin | absolute + translate | flex；

  > 垂直：line-height | absolute + translate | flex | table + table-cell + vertical-align。

### 1rem、1em、1vh、1px各自代表的含义？
  > 1rem：相对于根元素的 font-size 大小，（优先级:root > html）；

  > 1em：相对于当前元素或父元素的 font-size；

  > 1vh：document 的可视区高度的 1 / 100；

  > 1px：一个像素的长度。


### 画一条0.5px的直线？
  > transform: scale(0.5);

### 说一下盒模型？
  > content，padding， border，margin 组成；

  > box-sizing：content-box | border-box。

### 画一个三角形？
  > 使用 border 的一条或两条边，其余的边透明。

### 清除浮动的几种方式，及原理？
  > clear: both | left | right ；

  > BFC：块级格式化上下文（独立的布局环境，其中的元素布局是不受外界的影响）；

  > 规则：<br>
  内部的Box会在垂直方向，一个接一个地放置 <br>
  Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠 <br>
  每个盒子（块盒与行盒）的margin box的左边，与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此 <br>
  BFC的区域不会与float box重叠 <br>
  BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此 <br>
  计算BFC的高度时，浮动元素也参与计算 

  > 创建：<br>
  float的值不是none <br>
  position的值不是static或者relative <br>
  display的值是inline-block、table-cell、flex、table-caption或者inline-flex <br>
  overflow的值不是visible 

  > 作用：防止 margin 重叠、自适应两栏布局、清除浮动

### 响应式布局的常用解决方案
  - viewport
  
    `<meta id="viewport" name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1; user-scalable=no;">`

    device-width一般是表示分辨率的宽，通过width=device-width的设置我们就将布局视口设置成了理想的视口
    |属性名|取值|描述|
    |-|-|-|
    | width |	正整数 |	定义布局视口的宽度，单位为像素 |
    | height |	正整数 |	定义布局视口的高度，单位为像素，很少使用 |
    | initial-scale |	[0,10] |	初始缩放比例，1表示不缩放 |
    | minimum-scale |	[0,10] |	最小缩放比例 |
    | maximum-scale |	[0,10] |	最大缩放比例 |
    | user-scalable |	yes／no	是否允许手动缩放页面，默认值为yes |


  - 媒体查询
  
    `@media condition1 and/or/... condition2`
  
  - 百分比
    - 子元素height和width的百分比：
  
      子元素的height或width中使用百分比，是相对于子元素的直接父元素，width相对于父元素的width，height相对于父元素的height。

    - top和bottom、left和right：
  
      子元素的top和bottom如果设置百分比，则相对于直接非static定位(默认定位)的父元素的高度，同样子元素的left和right如果设置百分比，则相对于直接非static定位(默认定位的)父元素的宽度。

    - padding、margin：

      子元素的padding、margin如果设置百分比，不论是垂直方向或者是水平方向，都相对于直接父亲元素的width，而与父元素的height无关。

    - border-radius、translate、background-size：

      border-radius不一样，如果设置border-radius为百分比，则是相对于自身的宽度。
  
  - rem

    与em单位不同，rem单位无论嵌套层级如何，都只相对于浏览器的根元素（HTML元素）的font-size。
    ```css
    /* 在 html 下 :root 与 html 选择器一样，但是优先级更高 */
    :root {
      font-size: 20px;
    }
    html {
      font-size: 20px;
    }
    ```
  
  - vw / vh / vmin / vmax

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
