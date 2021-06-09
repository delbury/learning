# 遇到过的问题
- ## CSS fixed 定位问题
  父元素设置 transform 和 will-change 影响子元素的 position: fixed，变为 absolute 定位
  
- ## element-ui 按需引入和手动引入混用问题
  Element-ui 按需引入 `import { Message } from 'element-ui'` 和 `import Message from 'element-ui/packages/message'` 会引入两个不同的 Popup，造成不同引入方式、使用 Popup 的组件的层级计算变量 zIndex 变为非全局唯一。
  
  ```js
  // babel-plugin-component element-ui 实现按需引入的 babel 插件

  // libraryName 字段
  // Converts
  import { Message } from 'element-ui';

  // To
  var Message = require('element-ui/lib/message');
  require('element-ui/lib/message/style.css');


  // styleLibraryName 字段
  // Converts
  import Components from 'components'
  import { Button } from 'components'

  // To
  require('components/lib/styleLibraryName/index.css')
  var button = require('components/lib/styleLibraryName/button.css')

  // Webpack 会将以 ~ 符号作为前缀的路径视作依赖模块而去解析
  ```

- ## vite esbuild 报错
  ```
  // 手动运行
  node node_modules/esbuild/install.js
  ```

- ## Vue2 <keep-alive> 刷新问题
  需要实现 `<keep-alive>` 缓存的组件手动刷新的功能。

  原本实现的方式是给 `<router-view>` 组件添加 `key="$route.fullPath"`，`fullPath` 通过给页面 location 设置随机不同的查询参数 `?_=xxxxxxx` 来实现动态更新 `key` 值，实现手动刷新。

  上述方式存在一个问题，就是随着 `key` 更新生成新的组件，被 `<keep-alive>` 缓存的旧组件并没有被销毁释放掉，会造成内存泄漏。需要找到一种移除不需要缓存的方法。

  通过查阅资料、源码、数据对象等，找到了一种解决方式：
  ```js
  // 获取到 keep-alive 的 vnode
  const vnode = vm.$root.__routerView.$vnode.parent;

  // 可以获取到当前页面 router-view 的实例缓存的 keys
  vnode.componentInstance.keys;

  // 可以获取到当前页面 router-view 的实例缓存的 key-map
  vnode.componentInstance.cache;
  ```
  在刷新的时候获取当前的 key，然后在缓存中手动移除并销毁旧组件。再通过更新 key 值生成新的可缓存组件实例