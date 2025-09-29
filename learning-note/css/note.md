# 属性全局值
## 特殊属性
### all: [*]
CSS 简写属性 all 将除了 unicode-bidi、direction 与 CSS 自定义属性之外的所有属性重设
它可以将属性设置为初始值或继承值，也可以设置为其他层叠层或样式表来源中指定的值
#### 值
```css
/* 全局值 */
all: initial;
all: inherit;
all: unset;
all: revert;
all: revert-layer;
```

## 属性值
<https://www.zhangxinxu.com/wordpress/2020/01/css-initial-unset/>
<https://www.zhangxinxu.com/wordpress/2021/02/css-revert/>
<https://www.zhangxinxu.com/wordpress/2023/03/css-revert-layer-global-keyword/>
### initial
将属性值还原成 css 语法规定中的初始（默认）值，而非浏览器默认值
它可以应用于任何 CSS 属性

### inherit
属性值使用与父元素相同的值
它可以应用于任何 CSS 属性

### unset
有两种情况：
- 如果这个属性本来有从父级继承的值（这个属性默认可以继承，且父级有定义），则将该属性重新设置为继承的值
- 如果没有继承父级样式，则将该属性重新设置为初始值

在第一种情况下（继承属性）它的行为类似于inherit ，在第二种情况下（非继承属性）类似于initial
它可以应用于任何 CSS 属性

### revert
将属性值还原成浏览器的内置样式
它可以应用于任何 CSS 属性

### revert-layer
将属性值还原成上一层 @layer 中设置的相同属性
若没有上一层 @layer 或属性不存在，则表现为 revert
它可以应用于任何 CSS 属性

# 数值单位
<https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Values_and_Units/Numeric_data_types>
## 本地字体相对长度
- cap：大写字母的高度
- ch：字符 0 的宽度
- em：当前元素的 font-size
- ex：小写字母 "x" 的高度
- ic：全宽字符的宽度，例如汉字的 "水"
- lh：当前元素的行高
## 根字体相对长度
## 视口单位
## 容器单位
## 绝对长度单位
- cm：1cm = 96px/2.54
- in：1in = 2.54cm = 96px
- mm：1mm = 1/10th of 1cm
- pc：1pc = 1/6th of 1in
- pt：1pt = 1/72th of 1in
- px：1px = 1/96th of 1in
- Q：1Q = 1/40th of 1cm
## 角度单位
<https://developer.mozilla.org/zh-CN/docs/Web/CSS/angle>
- deg：There are 360 degrees in a full circle
- grad：There are 400 gradians in a full circle
- rad：There are 2π radians in a full circle
- turn：There is 1 turn in a full circle
## 时间单位
<https://developer.mozilla.org/zh-CN/docs/Web/CSS/time>
- ms：There are 1,000 milliseconds in a second
- s：second
## 频率单位
<https://developer.mozilla.org/zh-CN/docs/Web/CSS/frequency>
- Hz：Represents the number of occurrences per second
- kHz：A kiloHertz is 1000 Hertz
## 弹性单位
<https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex_value>
- fr：Represents a flexible length within a grid container
## 分辨率单位
<https://developer.mozilla.org/zh-CN/docs/Web/CSS/resolution>
- dpi：Dots per inch
- dpcm：Dots per centimeter，1dpcm ≈ 2.54dpi
- dppx：Dots per px unit，1dppx = 96dpi
- x：Same as dppx
## 百分比单位
<https://developer.mozilla.org/zh-CN/docs/Web/CSS/percentage>
- %：一般是相对于父元素的百分比

# mask 遮罩
<https://www.zhangxinxu.com/wordpress/2017/11/css-css3-mask-masks/>
## 相关属性
### mask-image
遮罩使用的图片
可以是 url() 引入的静态图片，如：jpg/png/svg/webp 等
也可以是动态生成的图片，如：渐变
#### 值
```css
/* 关键字值 */
mask-image: none;

/* <mask-source> 值 */
mask-image: url(masks.svg#mask1);

/* <image> 值 */
mask-image: linear-gradient(rgba(0, 0, 0, 1), transparent);
mask-image: image(url(mask.png), skyblue);

/* 多个属性值 */
mask-image:
  image(url(mask.png), skyblue), linear-gradient(rgba(0, 0, 0, 1), transparent);

/* 全局属性值 */
mask-image: inherit;
mask-image: initial;
mask-image: revert;
mask-image: revert-layer;
mask-image: unset;
```

### mask-mode
### mask-repeat
### mask-position
### mask-clip
### mask-origin
### mask-size
### mask-type
### mask-composite

# @supports 特性查询

# @container 容器查询
<https://www.zhangxinxu.com/wordpress/2022/09/css-container-rule/>

# @layer 层级规则
<https://www.zhangxinxu.com/wordpress/2022/05/deep-in-css-cascade/>
<https://www.zhangxinxu.com/wordpress/2022/05/css-layer-rule/>
## 作用
同一个 css 上下文中，在层级的方面来控制 css 优先级，不受 css 选择器的权重影响
## CSS 级联优先级
1. 常规CSS： css 文件、style 元素、 HTML style 内联的 css 样式
2. @layer 规则
3. 用户设置
4. 浏览器内置（用户代理）

规则：
- 继承是最底层，低于所有的级联规则
- 每一种优先级的都是高于下一个，除非使用 !important
- 同一级联规则内的优先级按照选择器权重和先后顺序决定

完整优先级：
1. 级联
  1. 浏览器内置（用户代理）!important
  2. 用户设置 !important
  3. @layer 规则 !important
  4. 常规 CSS !important
  5. 常规 CSS
    1. style 内联
    2. id 选择器
    3. 类、属性选择器
    4. 标签选择器
    5. 通配符选择器
  6. @layer 规则
  7. 用户设置
  8. 浏览器内置（用户代理）
2. 继承

## 语法
```css
/* 命名层 */
@layer layerName {
  .container { /* ... */ }
  div { /* ... */ }
  /* ... */
}

/* 导入为命名层 */
@import './xxx.css' layer(layerName);

/* 导入为匿名层 */
@import './xxx.css' layer;

/* 命名层，但不指定样式 */
@layer layerName;

/* 命名层，同时定义多个，按顺序来指定优先级：低（左） --> 高（右），必须先写才会生效 */
@layer layerName1, layerName2, layerName3;

/* 匿名层，创建时不指定名字 */
@layer {
  /* ... */
}

/* 嵌套层，允许嵌套，使用 "." 来引用内层，优先级：低（内） --> 高（外） */
@layer layerOuter {
  /* 优先级更高 */
  /* ... */
  @layer layerInner {
    /* 优先级更低 */
    /* ... */
  }
}

/* 级联写法 */
@layer layerOuter.layerInner {
  div { /* ... */ }
}
```

```html
<!-- 未正式支持 -->

<!-- zxx-lib.css的样式属于名为 lib 的级联层 -->
<link rel="stylesheet" href="./xxx.css" layer="layerName">

<!-- 样式引入到一个匿名级联层中 -->
<link rel="stylesheet" href="./xxx.css" layer>

<!-- 扩展 support，支持 media 查询 -->
<link rel="stylesheet" href="./xxx.css" layer="layerName" media="supports(at-rule(@layer))">
```
## 规则
- 默认情况下，同一层内的属性和同一级的层的优先级是按照前后顺序来的，即：低（前） --> 高（后）
- 类似 z-index，同级的多个嵌套层，其内层的优先级由同级外层的优先级控制，即：若优先级 A > B，则 A > A.* > B > B.*
- 在已经声明层叠层的名字后，它们的顺序随即被确立
- 可以重复声明某层叠层的名字来向其添加 CSS 规则，这些样式将被附加到该层的末尾，且层叠层之间的顺序不会改变。
- 其他不属于任何一层叠层的样式将被集中到同一匿名层，并置于所有层的后部，任何在层外声明的样式都会覆盖在层内声明的样式