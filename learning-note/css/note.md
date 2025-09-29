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
它可以应用于任何 CSS 属性

# 数值单位

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

# container 容器
