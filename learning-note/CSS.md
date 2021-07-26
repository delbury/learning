# CSS
## CSS 新属性
### 平滑滚动：scroll-behavior
```css
/* 滚动框立即滚动 */
scroll-behavior: auto;

/* 滚动框通过一个用户代理预定义的时长、使用预定义的时间函数，来实现平稳的滚动，用户代理应遵循其平台的约定，如果有的话 */
scroll-behavior: smooth;
```

### 滚动捕捉：scroll-snap-* / scroll-*
CSS Scroll Snap是CSS中一个独立的模块，可以让网页容器滚动停止的时候，自动平滑定位到指定元素的指定位置，包含 `scroll-*` 以及 `scroll-snap-*` 等诸多CSS属性。
```css
/* 作用于容器 */
/* 确定水平还是垂直方向 */
scroll-snap-type: x mandatory;

scroll-padding: 0 20px 0 0;
scroll-padding-left: 20px;

/* 作用于子项 */
/* 吸附位置 */
scroll-snap-align: start;
scroll-snap-align: center;
scroll-snap-align: end;

/* 是否允许忽略捕获位置，防止快速滚动时跳过该项 */
scroll-snap-stop: normal;
scroll-snap-stop: always;

scroll-margin: 0 20px 0 0;
scroll-margin-left: 20px;
```