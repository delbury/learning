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
            - 内存分代（64位/32位）：新生代（32MB/16MB）、老生代（1400MB/700MB）
            - Scavenge算法，具体实现主要采用Cheney算法，内存一分为二（From/To）；多次复制后，新生代晋升（条件：1. 经历过Scavenge回收；2. To空间内存占用比超过限制）到老生代
            - Mark-Sweep（标记清除） & Mark-Compact（标记整理）
            - Incremental Marking（增量标记） & Lazy Sweeping（延迟清理）

- 高效使用内存
    1. 作用域(scope)：函数调用、with、全局作用域
        1. 标识符查找
        2. 作用域链
        3. 变量的主动释放
    2. 闭包

- 内存指标
    1. 查看内存的使用情况
        1. 查看进程的内存占用
            - process.memoryUsage() （rss: resident set size 常驻内存）
        2. 查看系统的内存占用
            - os.totalmen() & os.freemem()
    2. 堆外内存
        - 堆内存的用量用量总小于进程常驻内存用量，不是通过V8分配的内存称为堆外内存
        - Buffer对象不经V8的内存分配机制，不在堆内存中

- 内存泄漏
    1. 缓存
        - 慎将内存当做缓存，缓存限制，进程外的缓存
    2. 队列消费不及时
        - 生产速度大于消费速度
    3. 作用域未释放

- 内存泄漏排查
    1. node-heapdump
    2. node-memwatch

- 大内存应用
    - ```js
        const reader = fs.createReadStream('in.txt');
        const writer = fs.createWriteStream('out.txt');
        reader.pipe(writer);
      ```

---
## 理解Buffer
- Buffer结构
    - javascript与C++结合
    - 堆外内存

- Buffer对象
    - Buffer.from()
    - Buffer.alloc()

- Buffer内存分配
    - C++ 层面申请内存，JS中分配内存
    - Node采用slab分配机制
        1. full，完全分配状态
        2. partial，部分分配状态
        3. empty， 没有被分配状态

- Buffer的转换
    - 类型：ASCII | UTF-8 | UTF-16LE/UCS-2 | Base64 | Binary | Hex
    - 转字符串：buffer.toString()

- Buffer的拼接
    1. 字符串形式拼接
        - buffer1 + buffer2 => buffer1.toString() + buffer2.toString() 宽字符可能产生乱码
        - readble.setEncoding(encoding)
        - fs.createReadStream(path, { encoding })
    2. Buffer拼接
        - Buffer.concat(chunks, size)

- Buffer与性能
    - 文件读取
        - 字符串转换有性能损耗
        - highWaterMark 过大或过小都会影响性能

---
## 网络编程
- TCP (net)
    - 传输层协议
    - 套接字 scoket = IP:PORT
    - net.createServer()
    - TCP服务事件
        1. 服务器事件
            1. listening
            2. connection
            3. close
            4. error
        2. 连接事件
            1. data
            2. end
            3. connect
            4. drain
            5. error
            6. close
            7. timeout
    - Nagle小数据包优化算法，禁止：socket.setNoDelay(Boolean)

- UDP (dgram)
    - 无连接协议
    - dgram.createSocket()
    - UDP套接字事件
        1. message
        2. listening
        3. close
        4. error

- HTTP (http / http2)
    - 应用层协议
    - 服务端
        - http.createServer()
        - HTTP服务事件
            1. connection
            2. request
            3. close
            4. checkContinue
            5. connect
            6. upgrade
            7. clientError
    - 客户端
        - http.request()
        - HTTP客户端事件
            1. response
            2. socket
            3. connect
            4. upgrade
            5. continue

- HTTPS (https)

- WebSocket
    - 优点
        1. 客户端与服务端只建立一个TCP连接，使用更少的连接
        2. 服务端可以推送数据到客户端
        3. 更轻量级的协议头
    - WebSocket握手
        - 客户端建立连接时，通过HTTP发起请求报文
        - 握手完成后，不再进行HTTP交互，开始WebSocket数据帧协议

- 网络服务与安全
    1. TLS/SSL
        1. 密钥
            - TLS/SSL是一个公钥/私钥的结构，是一个非对称的结构，每个服务端都有自己的公私钥
            - 公钥用来加密要传输的数据，私钥用来解密接收到的数据
            - 公钥和私钥是配对的，建立安全传输之前，客户端和服务端要互换公钥
            - Node在底层采用openssl实现TLS/SSL
        2. 数字证书
            - 数据传输过程中还需要对得到的公钥进行认证
            - 数字证书中包含了服务器的名称和主机名、服务器的公钥、签名颁发机构的名称、来自签名颁发机构的签名
            - 引入第三方 CA （Certificate Authority，数字证书认证中心），CA作用是为站点颁发证书，证书中有CA通过自己的公钥私钥实现的签名
            - 为了得到签名证书，服务器端需要通过自己的私钥生成CSR（Certificate Signing Request，证书签名请求）文件；CA机构通过该文件颁发属于该服务器端的签名证书
            - 自签名证书，自己扮演CA机构，给自己的服务器端颁发签名证书
    2. TLS服务
        1. TLS服务端
            - tls.createServer()
        2. TLS客户端
    3. HTTPS服务
        1. 准备证书
        2. 创建HTTPS服务
        3. HTTPS客户端

---
## 构建Web应用
- 缓存
    1. 添加Expires（过期日期） 或 Cache-Control（max-age：过期剩余时间） 到 Header
    2. 配置ETags
    3. 让Ajax可缓存
    4. If-Modified-Since/Last-Modified
    5. If-None-Math/ETag

- Basic认证
    - 请求头中的 Authorization 字段内容

- 数据上传
    - 数据格式
        1. content-type: application/x-www-form-urlencoded
        2. content-type: application/json; charset=utf-8
        3. content-type: application/xml
        4. content-type: multipart/form-data; boundary=xxxxxxxx
    - 数据上传与安全
        1. 内存限制
        2. CSRF

- 路径解析
    1. 文件路径型
        1. 静态文件
        2. 动态文件
    2. MVC
        1. 手工映射
            - 正则匹配
            - 参数解析
        2. 自然映射
        3. RESTful

- 中间件
    1. 异常处理
    2. 中间件与性能
        1. 编写高效的中间件
        2. 合理利用路由

- 页面渲染
    1. 内容响应
        - ```text
            Content-Encoding: gzip
            Content-Length: 21170
            Content-Type: text/javascript; charset=utf-8

            Content-Disposition: inline
            Content-Disposition: attachment; filename="xxxx.xx"
            Content-Disposition: form-data; name="yyyy"; filename="xxxx.xx"
          ```
        1. MIME (Multipurpose Internet Mail Extensions)
            - 浏览器通过 Content-Type 的 MIME 值来决定采用不同的渲染方式
            - mime 包
        2. 附件下载
            - 通过设置 Content-Disposition
        3. 响应JSON
        4. 响应跳转
            - Status: 302
            - Location: url
    2. 视图渲染
        - 视图由模板和数据共同生成出来
    3. 模板
        - 服务端动态网页技术：ASP、PHP、JSP
        - 动态语言通过特殊的标签（ASP和JSP：`<% %>`，PHP：`<? ?>`）包含起来
        - 要素
            1. 模板语言
            2. 包含模板语言的模板文件
            3. 拥有动态数据的数据对象
            4. 模板引擎
        - 模板引擎步骤
            1. 语法分解
            2. 处理表达式
            3. 生成待执行语句
            4. 与数据一起执行，生成最终字符串
- Bagpipe
    1. 页面布局框架
    2. 后端持续性的数据输出
    3. 前端渲染

---
## 进程
- 服务模型的变迁
    - 同步 --> 复制进程 --> 多线程 --> 事件驱动

- 多进程架构
    - ```js
        const os = require('os');
        const child_process = require('child_process');
        const cpus = os.cpus();
        child_process.fork('xxx.js');
      ```
    1. 创建子进程
        - ```js
            // 执行 node worker.js
            const cp = require('child_process');
            cp.spawn('node', ['worker.js']);
            cp.exec('node worker.js', function(err, stdout, stderr) {
                // code...
            });
            cp.execFile('worker.js', function(err, stout, stderr) {
                // code...
            });
            cp.fork('./worker.js');
          ```
        1. spawn() 启动一个子进程来执行命令
        2. exec() 启动一个子进程来执行命令，回调函数获取子进程状况
        3. execFile() 启动一个子进程来执行可执行文件
        4. fork() 指定要执行的js文件即可创建子进程
    2. 进程间通信(IPC: Inter-Process Communication)
        - 事件：message
        - 方法：send(message, sendHandle)
        - 进程间通信原理
    3. 句柄（标识资源的引用）传递
        1. 句柄发送与还原
            - 可发送的句柄类型
                1. net.Socket TCP套接字
                2. net.Server TCP服务器
                3. net.Native C++层面的TCP套接字或IPC管道
                4. dgram.Socket UDP套接字
                5. dgram.Native C++层面的UPD套接字
            - send() 在将消息发送到 IPC 管道之前，将消息组装成两个对象，一个参数是 handle，另一个是 message，如下
                - ```js
                    {
                        cmd: 'NODE_HANDLE',
                        type: 'net.Server',
                        msg: message
                    }
                  ```
        2. 端口共同监听
            - SO_REUSEADDR，不同进程可以就相同的网卡和端口进行监听，这个服务端套接字可以被不同的进程复用
            - 多个应用监听相同端口时，文件描述符同一时间只能被某个进程所用

- 集群稳定
    1. 进程事件
        - 事件
            1. error
            2. exit
            3. close
            4. disconnect 父进程或子进程中调用 disconnect() 方法时触发，关闭监听IPC通道
            5. message
        - 信号事件
        - 关闭进程
            - child.kill([signal])，默认为 SIGTERM
            - process.kill(pid, [signal])，默认为 SIGTERM
    2. 自动重启
        1. 自杀信号
            - 等待所有连接断开前，先向主进程发送一个自杀信号，通知主进程创建新的子进程
            - 设置超时时间，记录日志
        2. 限量重启
    3. 负载均衡
        - 多个处理单元工作量公平的策略
        - Node 默认提供的机制采用操作系统的抢占式策略，空闲的进程对到来的请求进行争抢，谁抢到谁服务
    4. 状态共享
        1. 第三方数据存储
        2. 主动通知

- Cluster模块
    1. 工作原理
        - child_process和net模块的组合应用
    2. Cluster事件
        1. fork
        2. online
        3. listening
        4. disconnect
        5. exit
        6. setup

---
## 测试
- 单元测试
    1. 意义
        - 单一职责
        - 接口抽象
        - 层次分离
    2. 介绍
        1. 断言 (assert)
            - 单元测试中保证最小单元是否正常的检测方法
            - 没有对输出结果做任何断言检查的代码都不是测试代码，没有测试代码的代码都是不可信赖的代码
            - 断言规范，assert模块
                1. ok() 判断结果是否为真
                2. equal() 判断实际值与期望值是否相等
                3. notEqual() 判断实际值与期望值是否不相等
                4. deepEqual() 判断实际值与期望值是否深度相等
                5. notDeepEqual()
                6. strictEqual() 是否严格相等
                7. notStrictEqual()
                8. throws() 判断代码是否抛出异常
                9. doesNotThrows()
                10. isError() 是否为假值
        2. 测试框架
            - 测试风格
                1. TDD（测试驱动开发）
                    - 关注所有功能是否被正确实现，每一个功能都具备对应的测试用例；表达方式偏向于功能说明书风格
                    - 主要采用 suite 和 test 完成
                    - 提供 setup、teardown 钩子函数
                2. BDD（行为驱动开发）
                    - 关注整体行为是否符合预期，适合自顶向下的设计方式；接近于自然语言的习惯
                    - 主要采用 describe 和 it 进行组织
                    - 提供 before、after、beforeEach、afterEach 钩子函数，用于协助 describe 中测试用例的准备、安装、卸载、回收等工作
            - 测试报告
        3. 测试用例
            - 一个测试用例至少包含一个断言
            - 测试用例最少需要通过正向测试和反向测试来保证测试对功能的覆盖
            - 异步测试
            - 超时设置
        4. 测试覆盖率
            - jscover
            - blanket
        5. mock
            - before()/after()、beforeEach()/afterEach() 构造异常
            - 模拟异步方法时，调用 process.nextTick() 使得回调方法能够异步执行即可
        6. 持续集成
        7. 异步代码测试
        8. 私有方法测试
            - rewire模块，`__set__()`、`__get__()` 利用闭包，eval() 实现对模块内局部变量的访问
    3. 工程化与自动化
        1. 工程化
        2. 持续集成

- 性能测试
    1. 基准测试
    2. 压力测试
        - 指标
            1. 吞吐率
            2. 响应时间
            3. 并发数
    3. 基准测试驱动开发
    4. 测试数据与业务数据的转换

---
## 产品化
- 项目工程化
    1. 目录结构
    2. 构建工具
    3. 编码规范
    4. 代码审查

- 部署流程
    1. 部署环境
    2. 部署操作
    3. 性能
        1. 动静分离
        2. 启用缓存
            - Redis
            - Memcached
        3. 多进程架构
        4. 读写分离

- 日志
    1. 访问日志
    2. 异常日志
    3. 日志与数据库
    4. 分隔日志

- 监控告警
    1. 监控
        1. 日志监控
        2. 响应时间
        3. 进程监控
        4. 磁盘监控
        5. 内存监控
        6. CPU占用监控
        7. CPU load监控
        8. I/O负载
        9. 网络监控
        10. 应用状态监控
        11. DNS监控
    2. 报警的实现
        1. 邮件报警
        2. 短信或电话报警
    3. 监控系统的稳定性

- 稳定性
    - 多机器
    - 多机房
    - 容灾备份

- 异构共存