## 题目
### CSS 相关
- calc, support, media各自的含义及用法？
  > calc: 计算值，加减乘除；<br>
  > @support: 是否支持 CSS 样式的条件判断；<br>
  > @media: 媒体查询，判断不同的媒体条件。

- css水平、垂直居中的写法，请至少写出4种？
  > 水平 => 行内元素：text-align | 块级元素：margin | absolute + translate | flex；<br>
  > 垂直：line-height | absolute + translate | flex | table + table-cell + vertical-align。

- 1rem、1em、1vh、1px各自代表的含义？
  > 1rem：相对于根元素的 font-size 大小，（优先级:root > html）；<br>
  > 1em：相对于当前元素或父元素的 font-size；<br>
  > 1vh：document 的可视区高度的 1 / 100；<br>
  > 1px：一个像素的长度。<br>

- 画一条0.5px的直线？
  > transform: scale(0.5);

- 说一下盒模型？
  > content，padding， border，margin 组成；<br>
  > box-sizing：content-box | border-box。

- 画一个三角形？
  > 使用 border 的一条或两条边，其余的边透明。

- 清除浮动的几种方式，及原理？
  > clear: both | left | right ；<br>
  > BFC：块级格式化上下文（独立的布局环境，其中的元素布局是不受外界的影响）；<br>
  > 规则：<br>
    内部的Box会在垂直方向，一个接一个地放置 <br>
    Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠 <br>
    每个盒子（块盒与行盒）的margin box的左边，与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此 <br>
    BFC的区域不会与float box重叠 <br>
    BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此 <br>
    计算BFC的高度时，浮动元素也参与计算 <br>
  > 创建：<br>
    float的值不是none <br>
    position的值不是static或者relative <br>
    display的值是inline-block、table-cell、flex、table-caption或者inline-flex <br>
    overflow的值不是visible <br>
  > 作用：防止 margin 重叠、自适应两栏布局、清除浮动

### HTML 相关
- 说一下<label>标签的用法
  > for="id" 用于关联元素，扩大可点击范围

- 遍历A节点的父节点下的所有子节点
 > el.parentNode.children

 ### JS 相关
- 用js递归的方式写1到100求和？

- 页面渲染html的过程？
  [浏览器渲染原理与过程](https://www.jianshu.com/p/e6252dc9be32)
  > 1.解析 HTML 代码，创建 DOM 树，请求资源 <br>
  > 2.解析 CSS 代码，计算出样式，构建 CSSOM 树 <br>
  > 3.将 DOM 和 CSSOM 合并为渲染树 Rendering Tree <br>
  > 4.确定渲染树中的每个元素的确切位置，布局 Layout <br>
  > 5.将渲染树的各个节点绘制到屏幕上 Painting，若 DOM 或 CSSOM 修改时会重新渲染

- 说一下CORS？
  [跨域资源共享CORS](http://www.ruanyifeng.com/blog/2016/04/cors.html)
  > 全称：跨域资源共享 (Cross-origin resource sharing) <br>
  > 允许浏览器向跨源服务器，发出XMLHttpRequest请求，从而克服了AJAX只能同源使用的限制 <br>

- 如何中断ajax请求？
  > HMLHttpRequest： HMLHttpRequest.abort() <br>
  > Fetch：new AbortController() | fetch(url, { signal: ac.signal })

- 说一下事件代理？
  > 事件委托是指将事件绑定到目标元素的父元素上，利用冒泡机制触发该事件

- target、currentTarget的区别？
  > currentTarget：当前所绑定事件的元素 <br>
  > target：当前被点击的元素

- 说一下宏任务和微任务？
  [事件循环](https://zhuanlan.zhihu.com/p/87684858)
  > 宏任务：当前调用栈中执行的任务称为宏任务（主线程、定时器）
  > 微任务：当前事件循环执行完成后，下一个事件循环执行前需要执行的任务（Promise）

- 说一下继承的几种方式及优缺点？
  > 借用构造函数继承，使用call或apply方法，将父对象的构造函数绑定在子对象上 <br>
  > 原型继承，将子对象的prototype指向父对象的一个实例 B.prototype = A <br>
  > 组合继承
  > class B extends A

- 说一下闭包？
  > 闭包的实质是因为函数嵌套而形成的作用域链 <br>
  > 闭包的定义即：函数 A 内部有一个函数 B，函数 B 可以访问到函数 A 中的变量，那么函数 B 就是闭包 <br>

- export和export default的区别？ 

- 说一下自己常用的es6的功能？
  > let/const | class | module | promise | async/await | => | ...args | const { a, b } = obj | Set() | Map() | ArrayBuffer | `` | ...

- 什么是会话cookie,什么是持久cookie?

- 数组去重？
  > 遍历计数 <br>
  > 使用 Set <br>

- get、post的区别
  > GET：query 传参 <br>
  > POST：query/body 传参 <br>
  > 一般对 GET 缓存，很少对 POST 缓存

- 你所知道的http的响应码及含义？
  > 101：切换协议，WebSockets <br>
  > 206：部分成果，header: range <br>
  > 304：请求的资源未被更改 <br>
  > 400、401、403、404 <br>
  > 500、502、504
