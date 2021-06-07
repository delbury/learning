# 坑
  - 父元素设置 transform 和 will-change 影响子元素的 position: fixed，变为 absolute 定位
  
  - Element-ui 按需引入 `import { Message } from 'element-ui'` 和 `import Message from 'element-ui/packages/message'` 会引入两个不同的 Popup，造成不同引入方式、使用 Popup 的组件的层级计算变量 zIndex 变为非全局唯一。
  
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

  - vite esbuild 报错
    ```
    // 手动运行
    node node_modules/esbuild/install.js
    ```