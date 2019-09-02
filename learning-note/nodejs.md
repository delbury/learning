# Node

## CommonJS
- 规范
  1. 模块引用： require()
  2. 模块定义： module.exports | exports
  3. 模块标识： require()的参数
 
- 实现
  - 步骤
    1. 路径分析
    2. 文件定位
    3. 编译执行
  
  - 模块
    1. 核心模块，在Node源代码的编译过程中编译进了二进制执行文件。在Node启动时，部分核心模块就被直接加载进内存，这部分核心模块引入时，文件定位和编译执行两个步骤可以省略，并在路径分析中优先判断，因此加载速度是最快的。
	  2. 文件模块，运行时动态加载，需要完整的路径分析、文件定位、编译执行过程，速度较核心模块慢。

  - 机制
    1. 优先从缓存加载，require() 二次加载相同模块，缓存优先
    2. 路径分析和文件定位
        1. 模块标识符分析
            - 核心模块，如 http、fs 等
            - "./" 或 "../" 开始的相对路径文件模块
            - "/" 开始的绝对路径文件模块
            - 非路径形式的文件模块
        2. 文件定位
            - 文件扩展名分析，按 ".js"、 ".json"、 ".node" 依次尝试
            - 目录分析和包，在当前目录下查找 package.json，通过JSON.parse()解析出包描述对象，取出 main 属性指定的文件名进行定位，若缺少扩展名，则进入扩展名分析；若指定错误或无package.json文件，则默认指定 index 文件，进行扩展名分析
    3. 编译模块
        1. ".js" 文件，通过 fs 模块同步读取文件后编译执行
            - ```js
              (function (exports, require, module, __filename, __dirname) {
                // code...
              };
              ```
        2. ".node" 文件，C/C++编写的扩展文件，通过 dlopen() 方法加载最后编辑生成的文件
            - Node 调用 process.dlopen() 方法进行加载和执行，通过 libuv 兼容层进行分装
        3. ".json" 文件，通过 fs 模块同步读取后，用 JSON.parse() 解析内容
        4. 其余扩展名文件，都被当作 ".js" 文件载入

  - 核心模块（分为 C/C++ 和 JavaScript 编写的两个部分）
      1. JavaScript核心模块的编译过程
          1. 转存为 C/C++ 代码
              - Node 采用 V8 附带的 js2c.py 工具转换js
          2. 编译 JavaScript 核心模块
      2. C/C++ 核心模块的编译过程
          1. 内建模块（纯C/C++编写）的组织形式
          2. 内建模块的导出
              - 内建模块(C/C++) --> 核心模块(JavaScript) --> 文件模块
              - process.binding() 加载内建模块
      3. 核心模块的引入流程
          - NODE_MODULE(node_os, reg_func) --> get_builtin_module --> process.binding("os") --> NativeModule.require("os") --> require("os")
      4. 编写核心模块
          1. 编写头文件
          2. 编写 C/C++ 文件
      5. C/C++ 扩展模块
          1. 前提条件
          2. 编写
          3. 编译
          4. 加载
  
  - 模块调用栈
      - C/C++内建模块属于最底层模块，属于核心模块，主要提供API给js核心模块个第三方js文件模块调用
      - js核心模块主要有两类职责：作为C/C++内建模块的封装层和桥接层，供文件模块调用；纯粹的功能模块，不需要和底层打交道又十分重要
      - 文件模块通常由第三番编写，包括普通js模块和C/C++扩展模块，主要调用方向为普通js模块调用扩展模块

  - 包与NPM
      1. 包结构
          - 实际上是一个存档文件，一个目录直接打包为 .zip 或 .tar.gz 格式的文件，完全符合 CommonJS 规范的包目录应包含以下文件：
              1. package.json 包描述文件
              2. bin 存放可执行二进制文件的目录
              3. lib 存放 js 代码的目录
              4. doc 存放文档的目录
              5. test 存放单元测试用例的代码目录
      2. 包描述文件与NPM
          - 必须字段
              1. name 包名，必须唯一
              2. description 包简介
              3. version: major.minor.revision 版本号
              4. keywords 关键词数组
              5. maintainers: [{ name: xxx, email: xxx, web: xxx }] 包维护者列表
              6. contributors: [{ name: xxx, email: xxx, web: xxx }] 贡献者列表
              7. bugs: url | email 反馈bug的网址或邮箱
              8. licenses: [{ type: xxx, url: xxx }] 许可证列表
              9. repositories 托管源代码的位置列表
              10. dependencies 当前包所需要依赖的包列表
              11. homepage 当前包网址
              12. os 操作系统支持列表
              13. cpu 支持的CPU架构列表
              14. engine 支持的js引擎列表
              15. builtin 标志当前包是否是内建在底层系统的标准组件
              16. directories 包目录说明
              17. implements 实现规范的列表
              18. scripts: { xxx: xxx } 脚本说明名对象
              20. author 包作者
              21. bin 命令行工具
              22. main 模块入口
              23. devDependencies 开发时的依赖
      3. NPM常用功能
          1. npm -v 查看帮助
          2. npm install(i) package 安装包
              - npm i xxx -g 全局
              - npm i `<tarbal file> | <tarball url> | <folder>` 从本地安装
              - npm i xxx --registry=url 从非官方源安装
              - npm config set registry url 设置镜像默认源
          3. NPM钩子命令
              - ```json
                {
                  "script": {
                    "preinstall": "preinstall.js",
                    "install": "install.js",
                    "uninstall": "uninstall.js",
                    "test": "test.js"
                  }
                }
                ```
          4. 发布包
              1. 编写模块
              2. 初始化包描述文件
              3. 注册包仓库帐号
                  - npm adduser
              4. 上传包
                  - npm publish `<folder>`
                  - npm publish .
              5. 安装包
              6. 管理包权限
                  - npm owner ls `<package name>`
                  - npm owner add `<user>` `<package name>`
                  - npm owner rm `<user>` `<package name>`
          5. 分析包
              - npm ls
      4. 局域NPM
          - 混合使用官方NPM仓库和企业局域NPM仓库
      5. NPM潜在问题
          - 包质量和安全问题
  
  - 前后端共用模块
      1. 模块的侧重点
          - 前端在于带宽
          - 后端在于CPU和内存等资源
      2. AMD规范
          - CommonJS模块规范的一个延伸，模块定义：`define(id?, dependencies?, factory);`，id 和 依赖可选
          - AMD需要在声明模块的时候指定所有的依赖，通过形参传递依赖到模块内容中
          - ```js
              define(function() {
                const exports = {};
                // code...
                return exports;
              });

              define(['dep1', 'dep2', '...'], function(dep1, dep2) {
                const exports = {};
                // code...
                return exports;
              });
            ```
      3. CMD规范
          - 与AMD规范的区别在于定义模块和依赖引入的部分
          - ```js
              define(function(require, exports, module) {
                // code...
              });
            ```
      4. 兼容多种模块规范
          - ```js
              ;(function(name, definition) {
                // 监测上下文环境是否为 AMD 或 CMD
                const hasDefine = typeof define === 'function';
                // 监测上下文环境是否为 Node
                const hasExports = typeof module !== 'undefined' && module.exports;

                if(hasDefine) {
                  // AMD 或 CMD
                  define(definition);
                } else if(hasExports) {
                  // 普通 Node 模块
                  module.exports = definition();
                } else {
                  // 挂载在 window 中
                  this[name] = definition();
                }
              })('msg', function() {
                return 'Hello World';
              });
            ```

---
## 异步I/O
  - 实现现状
      1. 异步I/O与非阻塞I/O
          - 操作系统内核对于I/O只有阻塞和非阻塞
          - 非阻塞在调用后立即返回，轮询技术：
              1. read
              2. select
              3. poll
              4. epoll
              5. kqueue
      2. 理想的非阻塞异步I/O
      3. 现实的异步I/O

  - Node 的异步I/O
      1. 事件循环 (每一次循环为Tick)，Windows下基于IOCP创建，*nix下基于多线程创建
      2. 观察者
      3. 请求对象
      4. 执行回调

  - 非I/O的异步API
    - APIs
        1. setTimeout()、setInterval()
        2. process.nextTick()
        3. setImmediate()
    - process.nextTick() （属于idle） 的优先级高于 setImmediate() （属于check）
    - 在每一轮循环检查中，idle观察者 先于 I/O观察者 先于 check观察者
    - <del>process.nextTick()的回调保存在一个数组中，在每轮循环中全部执行；setImmediate()的回调结果保存在链表，每轮循环执行其中一个</del>

  - 事件驱动与高性能服务器
    - 服务器模型
        1. 同步式
        2. 每进程/每请求
        3. 每线程/每请求

---
## 异步编程
- 函数式编程
    1. 高阶函数
    2. 偏函数（闭包）

- 优势与难点
    1. 优势
        1. 基于事件驱动的非阻塞I/O模型
    2. 难点
        1. 异常处理
        2. 函数嵌套过深
        3. 阻塞代码
        4. 多线程编程：child_process/cluster
        5. 异步转同步

- 异步编程解决方案
    1. 事件发布/订阅模式
        1. 集成events模块
        2. 利用时间队列解决雪崩问题
        3. 多异步之间的协作方案
    2. Promise/Deferred模式
        1. Promises/A
        2. Promise中的多异步协作
        3. Promise的进阶知识
    3. 流程控制库
        1. 尾触发与Next
        2. async
        3. Step
        4. wind

- 异步并发控制
    1. bagpipe的解决方案
    2. async的解决方案

---
## 内存控制
- V8的垃圾回收机制与内存限制
    1. Node 与 V8
    2. V8的内存限制（64位系统下约1.4GB，32位系统下约0.7GB）
    3. V8的对象分配
        - 所有的js对象通过堆来进行分配，process.memoryUsage()
    4. V8的垃圾回收机制
        1. 主要的垃圾回收算法
            - 内存分代：新生代、老生代

