# HTML 相关
## 说一下`<label>`标签的用法
  > for="id" 用于关联元素，扩大可点击范围

## 遍历A节点的父节点下的所有子节点
 > el.parentNode.children

## Doctype作用?严格模式与混杂模式如何区分？它们有何意义?
  > Doctype声明于文档最前面，告诉浏览器以何种方式来渲染页面，这里有两种模式：<br>
  严格模式的排版和JS 运作模式是 以该浏览器支持的最高标准运行。<br>
  混杂模式，向后兼容，模拟老式浏览器，防止浏览器无法兼容页面。

  ```html
  <!-## 内部的DOCTYPE声明 -->
  <!DOCTYPE 根元素 [元素声明]>

  <!-## 外部的DOCTYPE声明 -->
  <!DOCTYPE 根元素 SYSTEM ‘文件名’>

  <!-## html5，没有 DTD -->
  <!DOCTYPE html>

  <!-## html4.01 -->
  <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">

  <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

  <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">

  <!-## xhtml1.0 -->
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">

  <!-## xhtml1.1 -->
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
  ```

## `<sciprt>` 的加载
![script加载模式](./reference/script-mode.jpg)
三种方式：
  1. 正常模式：`<script src="script.js"></script>`<br>
  没有 defer 或 async，浏览器会立即加载并执行指定的脚本，“立即”指的是在渲染该 script 标签之下的文档元素之前，也就是说不等待后续载入的文档元素，读到就加载并执行。

  2. async模式：`<script async src="script.js"></script>`<br>
  有 async，script.js会被异步加载，即加载和渲染后续文档元素的过程将和 script.js 的加载并行进行（异步）。当 script.js加载完整立即执行script.js。执行script.js时，html解析暂停。从加载完成立即执行来看，async模式 执行顺序与写的顺序无关，不保证执行顺序。

  3. defer 模式：`<script defer src="index.js"></script>`<br>
  有 defer，script.js会被异步加载，即加载和渲染后续文档元素的过程将和 script.js 的加载并行进行（异步）。这一点与async模式一致。
  不同的是当 script.js加载完成并不会立即执行，而是在所有元素解析完成之后，DOMContentLoaded 事件触发之前完成。因此它会按照写的顺序执行。