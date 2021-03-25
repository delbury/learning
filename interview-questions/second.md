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