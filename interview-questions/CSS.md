# CSS 相关
## calc, support, media各自的含义及用法？
  > calc: 计算值，加减乘除；

  > @support: 是否支持 CSS 样式的条件判断；

  > @media: 媒体查询，判断不同的媒体条件。

## css水平、垂直居中的写法，请至少写出4种？
  > 水平 => 行内元素：text-align | 块级元素：margin | absolute + translate | flex；

  > 垂直：line-height | absolute + translate | flex | table + table-cell + vertical-align。

## 1rem、1em、1vh、1px各自代表的含义？
  > 1rem：相对于根元素的 font-size 大小，（优先级:root > html）；

  > 1em：相对于当前元素或父元素的 font-size；

  > 1vh：document 的可视区高度的 1 / 100；

  > 1px：一个像素的长度。


## 画一条0.5px的直线？
  > transform: scale(0.5);

  > box-shadow: 0 0 0 0.5px black;
  
  > border-image: 使用 5x5 的图片，切宽为 2px 的图片设置为 1px 的边框
  > border: 1px solid transparent;
  > border-image: url(border1.png) 2 repeat;
  > border-image-width: 1px;

## 画一个三角形？
  > 使用 border 的一条或两条边，其余的边透明。

## 清除浮动的几种方式，及原理？
  > clear: both | left | right ；

  > BFC：块级格式化上下文（独立的布局环境，其中的元素布局是不受外界的影响）；

  > 规则：
  内部的Box会在垂直方向，一个接一个地放置 
  Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠 
  每个盒子（块盒与行盒）的margin box的左边，与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此 
  BFC的区域不会与float box重叠 
  BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此 
  计算BFC的高度时，浮动元素也参与计算 

  > 创建：
  float的值不是none 
  position的值不是static或者relative 
  display的值是inline-block、table-cell、flex、table-caption或者inline-flex 
  overflow的值不是visible 

  > 作用：防止 margin 重叠、自适应两栏布局、清除浮动

## 响应式布局的常用解决方案
  - viewport
  
    `<meta id="viewport" name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">`

    device-width一般是表示分辨率的宽，通过width=device-width的设置我们就将布局视口设置成了理想的视口
    | 属性名        | 取值                                      | 描述                                     |
    | ------------- | ----------------------------------------- | ---------------------------------------- |
    | width         | 正整数                                    | 定义布局视口的宽度，单位为像素           |
    | height        | 正整数                                    | 定义布局视口的高度，单位为像素，很少使用 |
    | initial-scale | [0,10]                                    | 初始缩放比例，1表示不缩放                |
    | minimum-scale | [0,10]                                    | 最小缩放比例                             |
    | maximum-scale | [0,10]                                    | 最大缩放比例                             |
    | user-scalable | yes／no	是否允许手动缩放页面，默认值为yes |


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

      相对于自身的宽度/高度。
  
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
  
  - vw / vh / vmin（使用vw/vh中较小的那一个） / vmax（使用vw/vh中较大的那一个）


## 说一下css盒模型
  > 就是用来装页面上的元素的矩形区域。CSS中的盒子模型包括IE盒子模型和标准的W3C盒子模型。
  > margin, border, padding, content
  > box-sizing：content-box | border-box。
  ```
  box-sizing: border-box | content-box;

  border-box: width/height = content
  content-box: width/height = content + padding + border
  ```


## border-image
将图片设置为边框
```
  border-image: xxx;
  => 
    border-image-source: 
    border-image-slice:
    border-image-repeat:
    border-image-width:
    border-image-outset:
```

## link标签和import标签的区别
> link属于html标签，而@import是css提供的

>页面被加载时，link会同时被加载，而@import引用的css会等到页面加载结束后加载。

> link是html标签，因此没有兼容性，而@import只有IE5以上才能识别。

> link方式样式的权重高于@import的。


## transition和animation的区别
> Animation和transition大部分属性是相同的，他们都是随时间改变元素的属性值，他们的主要区别是transition需要触发一个事件才能改变属性，而animation不需要触发任何事件的情况下就会随时间改变属性值，并且transition为2帧，从from .... to，而animation可以一帧一帧的。


## Flex布局
弹性布局
```
/* 父元素属性 */
display: flex;
flex-direction
flex-wrap
justify-content
align-items
align-content

/* 子元素属性 */
order
flex-grow
flex-shrink
flex-basis
align-self
```


## BFC（块级格式化上下文，用于清楚浮动，防止margin重叠等）
具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。
> 块级格式化上下文，是一个独立的渲染区域，并且有一定的布局规则。
> 
> BFC区域不会与float box重叠
> 
> BFC是页面上的一个独立容器，子元素不会影响到外面
> 
> 计算BFC的高度时，浮动元素也会参与计算
> 
> 部分元素会生成BFC：
> 
>1. 根元素
> 
>1. float不为none的元素
> 
>1. position为fixed和absolute的元素
> 
>1. display为inline-block、table-cell、table-caption，flex，inline-flex的元素
> 
>1. overflow不为visible的元素


## 垂直居中的方法
- 绝对定位 + margin: auto
  ```css
  .parent {
    width: 400px;
    height: 400px;
    position: relative;
  }
  .child {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 200px;
    height: 200px;
  }
  ```

- 绝对定位 + 偏移一半的宽/高 (translate 或 margin 或 calc)
  ```css
  .parent {
    width: 400px;
    height: 400px;
    position: relative;
  }
  .child1 {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 200px;
    height: 200px;
    margin-top: -100px;
    margin-left: -100px;
  }
  .child2 {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 200px;
    height: 200px;
    transform: translate(-50%, -50%);
  }
  .child3 {
    position: absolute;
    left: calc(50% - 100px);
    top: calc(50% - 100px);
    width: 200px;
    height: 200px;
  }
  ```

- table
  ```css
  .parent {
    height: 400px;
    width: 400px;
    display: table-cell;
    vertical-align: middle;
  }
  .child {
    height: 200px;
    width: 200px;
    margin: auto;
  }
  ```

- flex
  ```css
  .parent {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ```

## 多行元素的文本省略号
```css
.parent {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
```


## visibility=hidden, opacity=0, display: none 区别
> opacity=0，该元素隐藏起来了，但不会改变页面布局，并且，如果该元素已经绑定一些事件，如click事件，那么点击该区域，也能触发点击事件的
> 
> visibility=hidden，该元素隐藏起来了，但不会改变页面布局，也不会触发该元素已经绑定的事件
> 
> display=none，把元素隐藏起来，并且会改变页面布局，可以理解成在页面中把该元素删除掉一样。


## 双边距重叠问题（外边距折叠）
> 多个相邻（兄弟或者父子关系）普通流的块元素垂直方向marigin会重叠
> 
> 折叠的结果为：
>1. 两个相邻的外边距都是正数时，折叠结果是它们两者之间较大的值。
>1. 两个相邻的外边距都是负数时，折叠结果是两者绝对值的较大值。
>1. 两个外边距一正一负时，折叠结果是两者的相加的和。


## position 属性比较
- 固定定位fixed：
  
  元素的位置相对于浏览器窗口是固定位置，即使窗口是滚动的它也不会移动。Fixed定位使元素的位置与文档流无关，因此不占据空间。 Fixed定位的元素和其他元素重叠。
  
  其父元素中有 transform/will-change: transform 属性，则降级为 absolute 定位

- 相对定位relative：

  如果对一个元素进行相对定位，它将出现在它所在的位置上。然后，可以通过设置垂直或水平位置，让这个元素“相对于”它的起点进行移动。 在使用相对定位时，无论是否进行移动，元素仍然占据原来的空间。因此，移动元素会导致它覆盖其它框。

- 绝对定位absolute：

  绝对定位的元素的位置相对于最近的已定位父元素，如果元素没有已定位的父元素，那么它的位置相对于`<html>`。 absolute 定位使元素的位置与文档流无关，因此不占据空间。 absolute 定位的元素和其他元素重叠。

- 粘性定位sticky：

  元素先按照普通文档流定位，然后相对于该元素在流中的flow root（BFC）和 containing block（最近的块级祖先元素）定位。而后，元素定位表现为在跨越特定阈值前为相对定位，之后为固定定位。

- 默认定位static：

  默认值。没有定位，元素出现在正常的流中（忽略top, bottom, left, right 或者 z-index 声明）。

- inherit:

  规定应该从父元素继承position 属性的值。



## 三栏布局的实现方式，尽可能多写
三列布局又分为两种，两列定宽一列自适应，以及两侧定宽中间自适应

- float + margin
  ```html
  <div>
    <div class="l"></div>
    <div class="r"></div>
    <div class="c"></div>
  </div>
  l => float: left
  r => float: right
  c => margin-left: lwidth; margin-right: rwidth;
  ```

- float + overflow
  ```html
  <div>
    <div class="l"></div>
    <div class="r"></div>
    <div class="c"></div>
  </div>
  l => float: left
  r => float: right
  c => overflow: hidden; // 触发 BFC
  ```

- postion 实现
  
  父元素设置 position：relative

  子元素设置 position：absolute 和 宽度和间隔

- table 实现

- flex 实现

- grid 实现


## CSS 叠层上下文 （stacking context）
z-index属性值并不是在任何元素上都有效果。它仅在定位元素（定义了position属性，且属性值为非static值的元素）上有效果。

判断元素在Z轴上的堆叠顺序，不仅仅是直接比较两个元素的z-index值的大小，这个堆叠顺序实际由元素的**层叠上下文**、**层叠等级**、**层叠顺序**共同决定。

如果一个元素含有层叠上下文，(也就是说它是层叠上下文元素)，我们可以理解为这个元素在Z轴上就“高人一等”，最终表现就是它离屏幕观察者更近。

### 层叠等级（stacking level）
在同一个层叠上下文中，它描述定义的是该层叠上下文中的层叠上下文元素在Z轴上的上下顺序。

在其他普通元素中，它描述定义的是这些普通元素在Z轴上的上下顺序。

普通元素的层叠等级优先由其所在的层叠上下文决定。
层叠等级的比较只有在当前层叠上下文元素中才有意义。不同层叠上下文中比较层叠等级是没有意义的。

### 如何产生“层叠上下文”
  1. HTML中的根元素`<html></html>`本身j就具有层叠上下文，称为“根层叠上下文”。
  2. 普通元素设置 position 属性为非 static 值并设置 z-index 属性为具体数值，产生层叠上下文。
  3. CSS3中的新属性也可以产生层叠上下文。

### 什么是“层叠顺序” （stacking order）
“层叠顺序”(stacking order)表示元素发生层叠时按照特定的顺序规则在Z轴上垂直显示

```
// 从高到底
z-index > 0
z-index: 0 | auto
inline | inline-block
float
block
z-index < 0
background | border
```
> 左上角"层叠上下文background/border"指的是层叠上下文元素的背景和边框。
> 
> inline/inline-block元素的层叠顺序要高于block(块级)/float(浮动)元素。
> 
> 单纯考虑层叠顺序，z-index: auto和z-index: 0在同一层级，但这两个属性值本身是有根本区别的。

### 判断叠层顺序
1. 首先先看要比较的两个元素是否处于同一个层叠上下文中
    1. 如果是，谁的层叠等级大，谁在上面。 
    2. 如果两个元素不在统一层叠上下文中，请先比较他们所处的层叠上下文的层叠等级。 
2. 当两个元素层叠等级相同、层叠顺序相同时，在DOM结构中后面的元素层叠等级在前面元素之上。

### CSS3中的属性对层叠上下文的影响
1. 父元素的display属性值为flex|inline-flex，子元素z-index属性值不为auto的时候，子元为层叠上下文元素；
1. 元素的 opacity 属性值不是1；
1. 元素的 transform 属性值不是none；
1. 元素 mix-blend-mode 属性值不是normal`；
1. 元素的 filter 属性值不是none；
1. 元素的 isolation 属性值是isolate；
1. will-change 指定的属性值为上面任意一个；
1. 元素的 -webkit-overflow-scrolling 属性值设置为touch。