<link href="./style/index.css" rel="stylesheet">

# Vue2

## 渲染函数
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

## diff 算法
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

## patch
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
<ol class="levels">
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


## 构建文件分类
|   | UMD | CommonJS | ES Module |
|---|---|---|---|
|Full|vue.js|vue.common.js|vue.esm.js|
|Runtime-only|vue.runtime.js|vue.runtime.common.js|vue.runtime.esm.js|
|Full(production)|vue.min.js|vue.common.prod.js||
|Runtime-only(production)|vue.runtime.js|vue.runtime.common.prod.js||

### *名词解释*
**Full**：这是一个全量的包，包含编译器（compiler）和运行时（runtime）。

**Compiler**：编译器，负责将模版字符串（即你编写的类 html 语法的模版代码）编译为 JavaScript 语法的 render 函数。

**Runtime**：负责创建 Vue 实例、渲染函数、patch 虚拟 DOM 等代码，基本上除了编译器之外的代码都属于运行时代码。

**UMD**：兼容 CommonJS 和 AMD 规范，通过 CDN 引入的 vue.js 就是 UMD 规范的代码，包含编译器和运行时。

**CommonJS**：典型的应用比如 nodeJS，CommonsJS 规范的包是为了给 browserify 和 webpack 1 这样旧的打包器使用的。他们默认的入口文件为 vue.runtime.common.js。

**ES Module**：现代 JavaScript 规范，ES Module 规范的包是给像 webpack 2 和 rollup 这样的现代打包器使用的。这些打包器默认使用仅包含运行时的 vue.runtime.esm.js 文件。

### *运行时（Runtime）+ 编译器（Compiler） vs. 只包含运行时（Runtime-only）*
如果你需要动态编译模版（比如：将字符串模版传递给 template 选项，或者通过提供一个挂载元素的方式编写 html 模版），你将需要编译器，因此需要一个完整的构建包。

当你使用 vue-loader 或者 vueify 时，*.vue 文件中的模版在构建时会被编译为 JavaScript 的渲染函数。因此你不需要包含编译器的全量包，只需使用只包含运行时的包即可。

只包含运行时的包体积要比全量包的体积小 30%。因此尽量使用只包含运行时的包，如果你需要使用全量包，那么你需要进行如下配置：
```js
// webpack
module.exports = {
  // ...
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
}

// rollup
const alias = require('rollup-plugin-alias')
rollup({
  // ...
  plugins: [
    alias({
      'vue': 'vue/dist/vue.esm.js'
    })
  ]
})
```


## 源码目录结构
```
├── benchmarks                  性能、基准测试
├── dist                        构建打包的输出目录
├── examples                    案例目录
├── flow                        flow 语法的类型声明
├── packages                    一些额外的包，比如：负责服务端渲染的包 vue-server-renderer、配合 vue-loader 使用的的 vue-template-compiler，还有 weex 相关的
│   ├── vue-server-renderer
│   ├── vue-template-compiler
│   ├── weex-template-compiler
│   └── weex-vue-framework
├── scripts                     所有的配置文件的存放位置，比如 rollup 的配置文件
├── src                         vue 源码目录
│   ├── compiler                编译器
│   ├── core                    运行时的核心包
│   │   ├── components          全局组件，比如 keep-alive
│   │   ├── config.js           一些默认配置项
│   │   ├── global-api          全局 API，比如熟悉的：Vue.use()、Vue.component() 等
│   │   ├── instance            Vue 实例相关的，比如 Vue 构造函数就在这个目录下
│   │   ├── observer            响应式原理
│   │   ├── util                工具方法
│   │   └── vdom                虚拟 DOM 相关，比如熟悉的 patch 算法就在这儿
│   ├── platforms               平台相关的编译器代码
│   │   ├── web
│   │   └── weex
│   ├── server                  服务端渲染相关
├── test                        测试目录
├── types                       TS 类型声明
```

## 初始化过程 Vue.protetotype._init
Vue 的初始化过程（new Vue(options)）都做了什么？
- 处理组件配置项
  - 初始化根组件时进行了选项合并操作，将全局配置合并到根组件的局部配置上
  - 初始化每个子组件时做了一些性能优化，将组件配置对象上的一些深层次属性放到 vm.$options 选项中，以提高代码的执行效率

- 初始化组件实例的关系属性，比如 `$parent、$children、$root、$refs` 等

- 处理自定义事件

- 调用 beforeCreate 钩子函数

- 初始化组件的 inject 配置项，得到 `ret[key] = val` 形式的配置对象，然后对该配置对象进行响应式处理，并代理每个 key 到 vm 实例上

- 数据响应式，处理 props、methods、data、computed、watch 等选项

- 解析组件配置项上的 provide 对象，将其挂载到 vm._provided 属性上

- 调用 created 钩子函数

- 如果发现配置项上有 el 选项，则自动调用 $mount 方法，也就是说有了 el 选项，就不需要再手动调用 $mount 方法，反之，没提供 el 选项则必须调用 $mount

- 接下来则进入挂载阶段

```js
/**
 * 定义 Vue.prototype._init 方法 
 * @param {*} Vue Vue 构造函数
 */
export function initMixin (Vue: Class<Component>) {
  // 负责 Vue 的初始化过程
  Vue.prototype._init = function (options?: Object) {
    // vue 实例
    const vm: Component = this
    // 每个 vue 实例都有一个 _uid，并且是依次递增的
    vm._uid = uid++

    // a flag to avoid this being observed
    vm._isVue = true
    // 处理组件配置项
    if (options && options._isComponent) {
      /**
       * 每个子组件初始化时走这里，这里只做了一些性能优化
       * 将组件配置对象上的一些深层次属性放到 vm.$options 选项中，以提高代码的执行效率
       */
      initInternalComponent(vm, options)
    } else {
      /**
       * 初始化根组件时走这里，合并 Vue 的全局配置到根组件的局部配置，比如 Vue.component 注册的全局组件会合并到 根实例的 components 选项中
       * 至于每个子组件的选项合并则发生在两个地方：
       *   1、Vue.component 方法注册的全局组件在注册时做了选项合并
       *   2、{ components: { xx } } 方式注册的局部组件在执行编译器生成的 render 函数时做了选项合并，包括根组件中的 components 配置
       */
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      // 设置代理，将 vm 实例上的属性代理到 vm._renderProxy
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    // expose real self
    vm._self = vm
    // 初始化组件实例关系属性，比如 $parent、$children、$root、$refs 等
    initLifecycle(vm)
    /**
     * 初始化自定义事件，这里需要注意一点，所以我们在 <comp @click="handleClick" /> 上注册的事件，监听者不是父组件，
     * 而是子组件本身，也就是说事件的派发和监听者都是子组件本身，和父组件无关
     */
    initEvents(vm)
    // 解析组件的插槽信息，得到 vm.$slot，处理渲染函数，得到 vm.$createElement 方法，即 h 函数
    initRender(vm)
    // 调用 beforeCreate 钩子函数
    callHook(vm, 'beforeCreate')
    // 初始化组件的 inject 配置项，得到 result[key] = val 形式的配置对象，然后对结果数据进行响应式处理，并代理每个 key 到 vm 实例
    initInjections(vm) // resolve injections before data/props
    // 数据响应式的重点，处理 props、methods、data、computed、watch
    initState(vm)
    // 解析组件配置项上的 provide 对象，将其挂载到 vm._provided 属性上
    initProvide(vm) // resolve provide after data/props
    // 调用 created 钩子函数
    callHook(vm, 'created')

    // 如果发现配置项上有 el 选项，则自动调用 $mount 方法，也就是说有了 el 选项，就不需要再手动调用 $mount，反之，没有 el 则必须手动调用 $mount
    if (vm.$options.el) {
      // 调用 $mount 方法，进入挂载阶段
      vm.$mount(vm.$options.el)
    }
  }
}
```

## HookEvent
```js
export function callHook (vm: Component, hook: string) {
  pushTarget()
  const handlers = vm.$options[hook]
  const info = `${hook} hook`
  if (handlers) {
    for (let i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info)
    }
  }
  if (vm._hasHookEvent) {
    // 外部动态注入生命周期回调 this.$on('hook:eventName')
    vm.$emit('hook:' + hook)
  }
  popTarget()
}
```

## 响应式原理
