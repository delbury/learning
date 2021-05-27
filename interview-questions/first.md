## 题目
- ### 对 tree-shaking 的了解
  - 用于移除 js 上下文中的未引用代码，依赖于 ES6 中模块系统中的静态结构特性，如 import / export
  - ES6模块依赖关系是确定的，和运行时的状态无关，可以进行可靠的静态分析，这就是tree-shaking的基础
  - ES6 module 特点：
    >- 只能作为模块顶层的语句出现
    >- import 的模块名只能是字符串常量
    >- import binding 是 immutable的
  - babel默认会把import编译成IIFE形式的函数，无法被Tree-Shaking
  - babel需要配置 { modules: false }, package.json 配置 { "sideEffect": false }
  - webpack偏向于前端工程，rollup偏向于js库


- ### 响应式原理
  - 概念
    - 意思就是在改变数据的时候，视图会跟着更新
  - 模式
    - 观察者模式（Observer），又叫发布-订阅模式（Publish/Subscribe）
  - React
    - React是通过this.setState去改变数据，然后根据新的数据重新渲染出虚拟DOM，最后通过对比虚拟DOM找到需要更新的节点进行更新
  - Vue
    - 2.x 利用了 Object.defineProperty 的方法里面的 setter 与 getter 方法的观察者模式来实现
    - 3.x 使用了 Proxy 实现

