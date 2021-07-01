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


## Text、Node、Element 关系
![关系图](./reference/object-relation.png)

> Element 继承于 Node，具有Node的方法，同时又拓展了很多自己的特有方法。
> 
> Node的一些方法，返回值为Node，比如说文本节点，注释节点之类的，而Element的一些方法，返回值则一定是Element。
> 
> 所以我们平时使用的html上的元素，即Element，是类型为ELEMENT_NODE的Node。

### nodeType
  1. Node.ELEMENT_NODE	
  1. Node.TEXT_NODE
  1. Node.CDATA_SECTION_NODE
  1. Node.PROCESSING_INSTRUCTION_NODE
  1. Node.COMMENT_NODE
  1. Node.DOCUMENT_NODE
  1. Node.DOCUMENT_TYPE_NODE
  1. Node.DOCUMENT_FRAGMENT_NODE
   
### 废弃的 nodeType
  1. Node.ATTRIBUTE_NODE
  2. Node.ENTITY_REFERENCE_NODE
  3. Node.ENTITY_NODE
  4. Node.NOTATION_NODE


## Node.textContent、HTMLElement.innerText 区别
- textContent 会获取所有元素的内容，包括 `<script>` 和 `<style>` 元素，然而 innerText 只展示给人看的元素。

- textContent 会返回节点中的每一个元素。相反，innerText 受 CSS 样式的影响，并且不会返回隐藏元素的文本，
  - 此外，由于 innerText 受 CSS 样式的影响，它会触发回流（ reflow ）去确保是最新的计算样式。（回流在计算上可能会非常昂贵，因此应尽可能避免。）

- 与 textContent 不同的是, 在 Internet Explorer (小于和等于 11 的版本) 中对 innerText 进行修改， 不仅会移除当前元素的子节点，而且还会永久性地破坏所有后代文本节点。在之后不可能再次将节点再次插入到任何其他元素或同一元素中。


## NodeList 和 HTMLCollection
> 就像NodeList是Node的集合一样，ElementCollection也是Element的集合。
>
> 但需要特别注意的是：NodeList和ElementCollcetion都不是真正的数组。

> HTML DOM 中的 HTMLCollection 是即时更新的（live）；当其所包含的文档结构发生改变时，它会自动更新。例如，document.forms、document.images 等

> 在一些情况下，NodeList 是一个实时集合，也就是说，如果文档中的节点树发生变化，NodeList 也会随之变化。例如，Node.childNodes 是实时的
>
> 在其他情况下，NodeList 是一个静态集合，也就意味着随后对文档对象模型的任何改动都不会影响集合的内容。比如  document.querySelectorAll 就会返回一个静态 NodeList。

HTMLElement.childNodes -> NodeList

HTMLElement.children -> HTMLCollection