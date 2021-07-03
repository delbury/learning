# Framework
## MVC (Model View Controller)
> 一句话描述就是 Controller 负责将 Model 的数据用 View 显示出来，换句话说就是在Controller里面把Model的数据赋值给View

模型(model)－视图(view)－控制器(controller)

Model（模型）：是应用程序中用于处理应用程序数据逻辑的部分。通常模型对象负责在数据库中存取数据。

View（视图）：是应用程序中处理数据显示的部分。通常视图是依据模型数据创建的。

Controller（控制器）：是应用程序中处理用户交互的部分。通常控制器负责从视图读取数据，控制用户输入，并向模型发送数据。

View和Controller的交互：View 产生 action 目标为 Controller

Model和Controller的交互：关注 Model 中的数据变化

## MVVM (Model View ViewModel)
双向绑定：数据的变动自动反映在视图上，反之亦然


# Webpack
## Webpack 核心概念
- Entry <br>
  入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。<br>
  进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。<br>
  每个依赖项随即被处理，最后输出到称之为 bundles 的文件中。<br>

- Output <br>
  output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist。<br>
  基本上，整个应用程序结构，都会被编译到你指定的输出路径的文件夹中。<br>

- Module <br>
  模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。<br>

- Chunk <br>
  代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。<br>

- Loader <br>
  loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript 和 JSON）。<br>
  loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。<br>
  本质上，webpack loader 将所有类型的文件，转换为应用程序的依赖图（和最终的 bundle）可以直接引用的模块。<br>

- Plugin <br>
  loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。<br>
  插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。<br>


## 打包流程
  1. 初始化参数：从配置文件和 shell 命令中读取与合并参数，得出最终参数
  2. 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译
  3. 确定入口：根据配置中的 entry 找出所有入口文件
  4. 编译模块：从入口文件出发，调用所有配置的 Loader （从右往左解析）对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理，最后得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
  5. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
  6. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统
  
  整个过程中webpack会通过发布订阅模式，向外抛出一些hooks，而webpack的插件即可通过监听这些关键的事件节点，执行插件任务进而达到干预输出结果的目的


## 多入口文件如何开发
> 生成多个html-webpack-plugin实例来解决这个问题
```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode:'development', // 开发模式
  entry: {
    main:path.resolve(__dirname,'../src/main.js'),
    header:path.resolve(__dirname,'../src/header.js')
  }, 
  output: {
    filename: '[name].[hash:8].js',      // 打包后的文件名称
    path: path.resolve(__dirname,'../dist')  // 打包后的目录
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname,'../public/index.html'),
      filename:'index.html',
      chunks:['main'] // 与入口文件对应的模块名
    }),
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname,'../public/header.html'),
      filename:'header.html',
      chunks:['header'] // 与入口文件对应的模块名
    }),
  ]
}
```


## source map是什么？生产环境怎么用？
source map 是将编译、打包、压缩后的代码映射回源代码的过程。打包压缩后的代码不具备良好的可读性，想要调试源码就需要 soucre map。

map文件只要不打开开发者工具，浏览器是不会加载的。


## 文件监听
在发现源码发生变化时，自动重新构建出新的输出文件。

原理：轮询判断文件的最后编辑时间是否变化，如果某个文件发生了变化，并不会立刻告诉监听者，而是先缓存起来，等 aggregateTimeout 后再执行。

```js
module.export = {    
  // 默认false,也就是不开启    w
  atch: true,    
  // 只有开启监听模式时，watchOptions才有意义    
  watchOptions: {        
    // 默认为空，不监听的文件或者文件夹，支持正则匹配        
    ignored: /node_modules/,        
    // 监听到变化发生后会等300ms再去执行，默认300ms        
    aggregateTimeout: 300,        
    // 判断文件是否发生变化是通过不停询问系统指定文件有没有变化实现的，默认每秒问1000次 
    // 如果监听没生效，试试这个选项吧。Watch 在 NFS 和 VirtualBox 机器上不适用。
    poll: 1000    
  }
}
```


## 说一下 Webpack 的热更新原理吧
Webpack 的热更新又称热替换（Hot Module Replacement），缩写为 HMR。 这个机制可以做到不用刷新浏览器而将新变更的模块替换掉旧的模块。

HMR的核心就是客户端从服务端拉去更新后的文件，准确的说是 chunk diff (chunk 需要更新的部分)，实际上 WDS 与浏览器之间维护了一个 Websocket，当本地资源发生变化时，WDS 会向浏览器推送更新，并带上构建时的 hash，让客户端与上一次资源进行对比。客户端对比出差异后会向 WDS 发起 Ajax 请求来获取更改内容(文件列表、hash)，这样客户端就可以再借助这些信息继续向 WDS 发起 jsonp 请求获取该chunk的增量更新。

后续的部分(拿到增量更新之后如何处理？哪些状态该保留？哪些又需要更新？)由 HotModulePlugin 来完成，提供了相关 API 以供开发者针对自身场景进行处理，像react-hot-loader 和 vue-loader 都是借助这些 API 实现 HMR。

### 流程
  1. webpack 对文件系统进行 watch 打包到内存中
  2. devServer 通知（websocket）浏览器端文件发生改变
  3. webpack-dev-server/client 接收到服务端消息做出响应
  4. webpack 接收到最新 hash 值验证并请求模块代码
  5. HotModuleReplacement.runtime 对模块进行热更新


## 文件指纹是什么？怎么用？
hash：和整个项目的构建相关，只要项目文件有修改，整个项目构建的 hash 值就会更改

chunkhash：和 Webpack 打包的 chunk 有关，不同的 entry 会生出不同的 chunkhash

contenthash：根据文件内容来定义 hash，文件内容不变，则 contenthash 不变

```js
module.exports = {    
  entry: {        
    app: './scr/app.js',        
    search: './src/search.js'    
  },    
  output: {        
    filename: '[name][chunkhash:8].js',        
    path:__dirname + '/dist'    
  },    
  plugins:[        
    new MiniCssExtractPlugin({            
      filename: `[name][contenthash:8].css`        
    })    
  ]
}
```

## 在实际工程中，配置文件上百行乃是常事，如何保证各个loader按照预想方式工作？
执行顺序：loader 从右到左（或从下到上）地取值(evaluate)/执行(execute)

### 所有一个接一个地进入的 loader，都有两个阶段：
  - Pitching 阶段: loader 上的 pitch 方法，按照 后置(post)、行内(inline)、普通(normal)、前置(pre) 的顺序调用。
  - Normal 阶段: loader 上的 常规方法，按照 前置(pre)、普通(normal)、行内(inline)、后置(post) 的顺序调用。模块源码的转换， 发生在这个阶段。
```
对于以下 use 配置：
module.exports = {
  //...
  module: {
    rules: [
      {
        //...
        use: ['a-loader', 'b-loader', 'c-loader'],
      },
    ],
  },
};

将会发生这些步骤：
|- a-loader `pitch`
  |- b-loader `pitch`
    |- c-loader `pitch`
      |- requested module is picked up as a dependency
    |- c-loader normal execution
  |- b-loader normal execution
|- a-loader normal execution
```

- 可以使用 Rule.enforce 强制执行 loader 的作用顺序，pre 代表在所有正常 loader 之前执行，post 是所有 loader 之后执行。

- 使用内联的方式
  ```js
  // 可以在 import 语句或任何 与 "import" 方法同等的引用方式 中指定 loader。使用 ! 将资源中的 loader 分开。每个部分都会相对于当前目录解析。
  import Styles from 'style-loader!css-loader?modules!./styles.css';

  // 通过为内联 import 语句添加前缀，可以覆盖 配置 中的所有 loader, preLoader 和 postLoader：
  // 使用 ! 前缀，将禁用所有已配置的 normal loader(普通 loader)
  import Styles from '!style-loader!css-loader?modules!./styles.css';
  // 使用 !! 前缀，将禁用所有已配置的 loader（preLoader, loader, postLoader）
  import Styles from '!!style-loader!css-loader?modules!./styles.css';
  // 使用 -! 前缀，将禁用所有已配置的 preLoader 和 loader，但是不禁用 postLoaders
  import Styles from '-!style-loader!css-loader?modules!./styles.css';
  ```


  ## 如何优化 Webpack 的构建速度？
  - 使用高版本的 Webpack 和 Node.js
  - 多进程/多实例构建
  - 压缩代码
    - 插件开启多进程并行压缩
    - 通过 mini-css-extract-plugin 提取 Chunk 中的 CSS 代码到单独文件，通过 css-loader 的 minimize 选项开启 cssnano 压缩 CSS。
  - 图片压缩
    - 使用基于 Node 库的 imagemin (很多定制选项、可以处理多种图片格式)
    - 配置 image-webpack-loader
  - 缩小打包作用域
    - exclude/include (确定 loader 规则范围)
    - resolve.modules 指明第三方模块的绝对路径 (减少不必要的查找)
    - resolve.mainFields 只采用 main 字段作为入口文件描述字段 (减少搜索步骤，需要考虑到所有运行时依赖的第三方模块的入口文件描述字段)
    - resolve.extensions 尽可能减少后缀尝试的可能性
    - noParse 对完全不需要解析的库进行忽略 (不去解析但仍会打包到 bundle 中，注意被忽略掉的文件里不应该包含 import、require、define 等模块化语句)
    - IgnorePlugin (完全排除模块)
    - 合理使用alias
  - 提取页面公共资源
    - 使用 html-webpack-externals-plugin，将基础包通过 CDN 引入，不打入 bundle 中使用 - SplitChunksPlugin 进行(公共脚本、基础包、页面公共文件)分离(Webpack4内置) ，替代了 CommonsChunkPlugin 插件
  - DLL
    - 使用 DllPlugin 进行分包，使用 DllReferencePlugin(索引链接) 对 manifest.json 引用，让一些基本不会改动的代码先打包成静态资源，避免反复编译浪费时间。
    - HashedModuleIdsPlugin 可以解决模块数字id问题
  - 充分利用缓存提升二次构建速度
    - babel-loader 开启缓存
    - terser-webpack-plugin 开启缓存
    - 使用 cache-loader 或者 hard-source-webpack-plugin
  - Scope hoisting
  - Tree shaking
  - 动态Polyfill


## 代码分割
代码分割的本质其实就是在源代码直接上线和打包成唯一脚本main.bundle.js这两种极端方案之间的一种更适合实际场景的中间状态。


## 聊一聊Babel原理吧
- 解析：将代码转换成 AST
- 转换：访问 AST 的节点进行变换操作生产新的 AST
- 生成：以新的 AST 为基础生成代码


## 有哪些常见的Loader？你用过哪些Loader？
- raw-loader：加载文件原始内容（utf-8）
- file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件 (处理图片和字体)
- url-loader：与 file-loader 类似，区别是用户可以设置一个阈值，大于阈值会交给 file-loader 处理，小于阈值时返回文件 base64 形式编码 (处理图片和字体)
- source-map-loader：加载额外的 Source Map 文件，以方便断点调试
- svg-inline-loader：将压缩后的 SVG 内容注入代码中
- image-loader：加载并且压缩图片文件
- json-loader 加载 JSON 文件（默认包含）
- babel-loader：把 ES6 转换成 ES5
- ts-loader: 将 TypeScript 转换成 JavaScript
- awesome-typescript-loader：将 TypeScript 转换成 JavaScript，性能优于 ts-loader
- sass-loader：将SCSS/SASS代码转换成CSS
- css-loader：加载 CSS，支持模块化、压缩、文件导入等特性
- style-loader：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS
- postcss-loader：扩展 CSS 语法，使用下一代 CSS，可以配合 autoprefixer 插件自动补齐 CSS3 前缀
- eslint-loader：通过 ESLint 检查 JavaScript 代码
- vue-loader：加载 Vue.js 单文件组件
- cache-loader: 可以在一些性能开销较大的 Loader 之前添加，目的是将结果缓存到磁盘里

## 有哪些常见的Plugin？你用过哪些Plugin？
- html-webpack-plugin：简化 HTML 文件创建 (依赖于 html-loader)
- web-webpack-plugin：可方便地为单页应用输出 HTML，比 html-webpack-plugin 好用
- uglifyjs-webpack-plugin：不支持 ES6 压缩 (Webpack4 以前)
- terser-webpack-plugin: 支持压缩 ES6 (Webpack4)
- webpack-parallel-uglify-plugin: 多进程执行代码压缩，提升构建速度
- clean-webpack-plugin: 目录清理
- speed-measure-webpack-plugin: 可以看到每个 Loader 和 Plugin 执行耗时 (整个打包耗时、每个 Plugin 和 Loader 耗时)
- webpack-bundle-analyzer: 可视化 Webpack 输出文件的体积 (业务组件、依赖第三方模块)
