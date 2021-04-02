## Vue2

### 渲染函数
```js
// @returns {VNode}
createElement(
  // {String | Object | Function}
  // 一个 HTML 标签名、组件选项对象，或者
  // resolve 了上述任何一种的一个 async 函数。必填项。
  'div',

  // {Object}
  // 一个与模板中属性对应的数据对象。可选。
  {
    // 与 `v-bind:class` 的 API 相同，
    // 接受一个字符串、对象或字符串和对象组成的数组
    'class': {
      foo: true,
      bar: false
    },
    // 与 `v-bind:style` 的 API 相同，
    // 接受一个字符串、对象，或对象组成的数组
    style: {
      color: 'red',
      fontSize: '14px'
    },
    // 普通的 HTML 特性
    attrs: {
      id: 'foo'
    },
    // 组件 prop
    props: {
      myProp: 'bar'
    },
    // DOM 属性
    domProps: {
      innerHTML: 'baz'
    },
    // 事件监听器在 `on` 属性内，
    // 但不再支持如 `v-on:keyup.enter` 这样的修饰器。
    // 需要在处理函数中手动检查 keyCode。
    on: {
      click: this.clickHandler
    },
    // 仅用于组件，用于监听原生事件，而不是组件内部使用
    // `vm.$emit` 触发的事件。
    nativeOn: {
      click: this.nativeClickHandler
    },
    // 自定义指令。注意，你无法对 `binding` 中的 `oldValue`
    // 赋值，因为 Vue 已经自动为你进行了同步。
    directives: [
      {
        name: 'my-custom-directive',
        value: '2',
        expression: '1 + 1',
        arg: 'foo',
        modifiers: {
          bar: true
        }
      }
    ],
    // 作用域插槽的格式为
    // { name: props => VNode | Array<VNode> }
    scopedSlots: {
      default: props => createElement('span', props.text)
    },
    // 如果组件是其它组件的子组件，需为插槽指定名称
    slot: 'name-of-slot',
    // 其它特殊顶层属性
    key: 'myKey',
    ref: 'myRef',
    // 如果你在渲染函数中给多个元素都应用了相同的 ref 名，
    // 那么 `$refs.myRef` 会变成一个数组。
    refInFor: true
  },

  // {String | Array}
  // 子级虚拟节点 (VNodes)，由 `createElement()` 构建而成，
  // 也可以使用字符串来生成“文本虚拟节点”。可选。
  [
    '先写一些文字',
    createElement('h1', '一则头条'),
    createElement(MyComponent, {
      props: {
        someProp: 'foobar'
      }
    })
  ]
)
```

### diff 算法
一个DOM节点主要包含三个部分：
1. 自身的标签名
2. 自身的属性
3. 子节点
```js
const vnode = {
  tag:'div',
  attrs:{id:'app'},
  children:[{ tag:'span',attrs:{id:'child'},children:['1']}]
}
```
diff算法的本质是找出两个对象之间的差异，目的是尽可能复用节点。
```js
// 那么 diff 算法可以抽象为 两部分
function diff(vnode,newVnode) {
  diffAttr(vnode.attr,newVnode.attr)
  diffChildren(vnode.children,newVnode.children)
}

// diff 和 patch 合并，即在 diff 的同时进行 patch
function patchVnode(oldVnode, vnode, parentElm){
  /*
   * 1. 遍历 oldVnode 看 newTreeAttr 是否还有对应的属性，
   *    如果有并且不相等的，修改对应的属性，
   *    没有的话，直接删除对应的属性
   * 
   * 2. 遍历 newVnode，看 oldVnode 是否有对应的属性，没有就新增
   */
  patchAttr(oldVnode.attr, vnode.attr, parentElm)

  // 本质是找出两个数组的差异
  patchChildren(parentElm, oldVnode.children, vnode.children)
}
```

### patch
```js
export default class VNode {
constructor (
  tag?: string,
  data?: VNodeData,
  children?: ?Array<VNode>,
  text?: string,
  elm?: Node,
  context?: Component,
  componentOptions?: VNodeComponentOptions,
  asyncFactory?: Function
) {
  this.tag = tag    // 元素标签
  this.data = data    // 属性
  this.children = children    // 子元素列表
  this.text = text
  this.elm = elm    //  对应的真实 DOM 元素
  this.ns = undefined
  this.context = context
  this.functionalContext = undefined
  this.key = data && data.key
  this.componentOptions = componentOptions
  this.componentInstance = undefined
  this.parent = undefined
  this.raw = false
  this.isStatic = false     // 是否被标记为静态节点
  this.isRootInsert = true
  this.isComment = false
  this.isCloned = false
  this.isOnce = false
  this.asyncFactory = asyncFactory
  this.asyncMeta = undefined
  this.isAsyncPlaceholder = false
}}
```

```js
/*
 * oldVnode: 旧的VNode或旧的真实DOM节点
 * vnode: 新的VNode
 * hydrating: 是否要和真实DOM混合
 * removeOnly: 特殊的flag，用于<transition-group>
 * parentElm: 父节点
 * refElm: 新节点将插入到refElm之前
 */
function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
  // ...
}
```
**流程**
<style>
  li { list-style: none; }
  ol { counter-reset: index1 0; }
  ol>li::before { content: counter(index1); counter-increment: index1; }
  ol ol { counter-reset: index2 0; }
  ol ol>li::before { content: counter(index1)"."counter(index2); counter-increment: index2; }
  ol ol ol { counter-reset: index3 0; }
  ol ol ol>li::before { content: counter(index1)"."counter(index2)"."counter(index3); counter-increment: index3; }
</style>
<ol>
  <li>
    如果vnode不存在，但是oldVnode存在，说明是需要销毁旧节点，则调用invokeDestroyHook(oldVnode)来销毁oldVnode。
  </li>
  <li>
    如果vnode存在，但是oldVnode不存在，说明是需要创建新节点，则调用createElm来创建新节点。
  </li>
  <li>
    当vnode和oldVnode都存在时
    <ol>
      <li>
        如果oldVnode不是真实节点，并且vnode和oldVnode是同一节点时，说明是需要比较新旧节点，则调用patchVnode进行patch。
      </li>
      <li>
        如果oldVnode是真实节点时
        <ol>
          <li>
            如果oldVnode是元素节点，且含有data-server-rendered属性时，移除该属性，并设置hydrating为true。
          </li>
          <li>
            如果hydrating为true时，调用hydrate方法，将Virtural DOM与真实DOM进行映射，然后将oldVnode设置为对应的Virtual DOM。
          </li>
        </ol>
      </li>
      <li>
         如果oldVnode是真实节点时或vnode和oldVnode不是同一节点时，找到oldVnode.elm的父节点，根据vnode创建一个真实的DOM节点，并插入到该父节点中的oldVnode.elm位置。如果组件根节点被替换，遍历更新父节点element。然后移除旧节点。
      </li>
    </ol>
  </li>
</ol>