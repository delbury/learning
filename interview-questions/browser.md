# 浏览器
## 浏览器缓存
  [系统总结浏览器缓存](http://blog.alanwu.website/2020/01/31/navigatorCache/)
  > 前端对于任一个网络请求来说，可以将请求分为三个阶段。网络请求，后端处理，浏览器响应。缓存可以优化我们的第一步和第三步，一个网络请求做到性能最优，就必须提升三者各自的性能，避免短板效应。

  - 缓存归类：
    1. Memory Cache <br>
       Memory Cacha是指内存中的缓存。它是浏览器优先去命中的一种缓存，也是响应速度最快的一种缓存。但是它的缺点是缓存时间短，关闭tab页面缓存将不复存在，它与浏览器渲染进程紧密联系。
    2. Service Worker Cache <br>
       Service Worker 是一种独立于主线程之外的javascript线程。它脱离于浏览器窗体，因此无法直接访问DOM元素。所以这一个独立的线程能够在不干扰主线程的情况下来提升性能。Service Worker 的缓存与浏览器内建的其他缓存机制不一样，它可以让我们自由缓存哪一些文件、如何匹配缓存等，且缓存具有持续性。<br>
       实现该缓存一般分为3个步骤：首先注册Service Worker ，然后监听install事件就可以缓存我们想要的文件。用户下次访问可以通过拦截请求的方式来获取缓存数据。若没有则会重新获取数据，然后再进行缓存。 <br>
       Service Worker 必须使用 https 或者本地 localhost 调试使用
    3. Disk Cache <br>
       Disk Cache也就是硬盘缓存。这种缓存的缓存位置在电脑硬盘上，什么文件都可以缓存，就是读取速度慢。所有缓存中，它的覆盖面是最广的，会根据HTTP Header中的字段判断哪一些资源需要缓存，哪些可以不请求直接使用，哪一些已过期需要重新请求。
    4. Push Cache <br>
       Push Cache又名推送缓存，是HTTP/2中的内容，只有以上三种缓存未正确命中，它才会使用。仅存在于会话阶段（session），结束就会释放，缓存时间短。

## 缓存策略
  ### 提升数据交换的性能，缓解服务器的压力
  ![缓存策略](./reference/cache-strategy.webp)
  - 缓存大致可归为两类：私有缓存（只能用于单独用户）、共享缓存（能否被多个用户使用）
  - Pragma：是http/1.1之前版本的历史遗留字段，仅作为与http的向后兼容而定义
  - 强缓存
    - 直接从缓存数据库中取出资源，无需再发送到服务器上
    - http中相关header为 Expires / Cache-Control，Cache-Control优先级高于 Expires
    - Expires 是 HTTP1.0 的产物，值为绝对时间，表示资源的过期时间
    - Cache-Control 分缓存请求指令、缓存响应指令
      >- `public 响应可被任何对象缓存`
      >- `private 响应只能被单个用户缓存，不能作为共享缓存`
      >- `no-cache 在发布缓存副本之前，强制要求缓存把请求提交给原始服务器进行验证(协商缓存验证)`
      >- `no-store 不使用任何缓存`
      >- `max-age=\<seconds\> 缓存的最大周期，相对时间`
      >- `s-max-age=\<seconds\> 覆盖max-age或者Expires头，但是仅适用于共享缓存(比如各个代理)，私有缓存会忽略它`
    - 强制缓存状态码为 200
      >- (from memory cache) 缓存资源在内存中，浏览器（或页面标签）关闭后内存中的缓存就会被释放，重新打开页面取不到该缓存
      >- (from disk cache) 缓存资源在硬盘中，浏览器（或页面标签）关闭后硬盘中的缓存不会消失，下次进入页面还能从硬盘中获取

      ```sequence
        客户端 -> 缓存仓库: 请求数据

        缓存仓库 -> 客户端: 没有缓存，或缓存过期

        客户端 -> 服务器: 客户端继续请求服务器获取数据

        服务器 -> 客户端: 数据从服务器给到客户端

        客户端 -> 缓存仓库: 将数据写入缓存仓库
      ```
  ---
  - 对比缓存（协商缓存）
    - 经过服务器确认是否使用缓存的机制，状态码为 304 (not modified)
    - HTTP相关header为 Last-Modified / If-Modified-Since, Etag / If-None-Match，Etag 的优先级高于 Last-Modified
    - Last-Modified / If-Modified-Since / If-Unmodified-Since
      >- 由于精确度比  ETag 要低，所以这是一个备用机制
      >- 包含有  If-Modified-Since 或 If-Unmodified-Since 首部的条件请求会使用这个字段
      >- If-Modified-Since：文件修改了返回 200，否则返回 304 （缓存）
      >- If-Unmodified-Since：文件没修改返回 200.否则返回 412 （断点续传）
      >- 浏览器第一次访问一个资源时，服务器会在response header中返回一个Last-Modified，代表这个资源最后的修改时间，当浏览器再次访问这个资源的时候，会在request header中带上 If-Modified-Since，值为上次请求时服务器返回的 Last-Modified 的值，然后服务器根据资源上次修改的时间确认资源在这段期间内是否更改过，如果没有，则返回304，如果有，则返回200并返回最新的资源。
    - Etag / If-None-Match / If-Match
      >- Etag是通过一个校验码来对比资源是否更改过的，而不是通过资源的修改时间
      >- If-None-Match：文件修改了返回 200，否则返回 304 （缓存）
      >- If-Match：文件没修改返回 200.否则返回 412 （断点续传）
      >- 当一个资源修改时，其校验码也会更改。当浏览器请求资源时，服务器会返回一个Etag字段，然后浏览器下一次请求时，会带上 If-None-Match ，值为上次服务器返回的Etag的值，服务器经过校验码的对比后决定返回200或304
      >- If-None-Match 的值中有个 W/ 前缀，这个其实不用去关心，这个是用来提示应该采用弱比较算法

      ```sequence
      客户端 -> 服务器: 请求数据，带入缓存对比标志

      服务器 -> 客户端: 经过对比客户端提供的标志，确认缓存可用，返回304

      客户端 -> 缓存仓库: 获取缓存资源

      缓存仓库 -> 客户端: 返回缓存资源
      ```

## HTTP 状态码
  - 1xx Informational 消息，临时响应
    - **100** *Continue* 客户端应当继续发送请求
    - **101** *Switching Protocols* 服务器已经理解了客户端请求，并通过Upgrade header通知客户端采用不同的协议完成这个请求，如Websocket
      >- `Connection: Upgrade`
      >- `Upgrade: websocket`
    - **102** *Processing* 由WebDAV(RFC 2518)扩展的状态码，代表处理将被继续执行
  - 2xx Successful 成功，表示请求成功被服务器接收并理解
    - **200** *OK* 请求已成功，请求所希望的响应头或数据体随响应返回
    - **201** *Created* 请求已经被实现，而且有一个新的资源已经依据请求的需要而建立，且其 URI 已经随Location 头信息返回
    - **202** *Accepted* 服务器已接受请求，但尚未处理
    - **203** *Non-Authoritative Information* 服务器已成功处理了请求，但返回的实体头部元信息不是在原始服务器上有效的确定集合，而是来自本地或者第三方的拷贝
    - **204** *No Content* 服务器成功处理了请求，但不需要返回任何实体内容，并且希望返回更新了的元信息
    - **205** *Rest Content* 服务器成功处理了请求，且没有返回任何内容，但是与204响应不同，返回此状态码的响应要求请求者重置文档视图
    - **206** *Partial Content* 服务器已经成功处理了部分 GET 请求，该请求必须包含 Range 头信息来指示客户端希望得到的内容范围，并且可能包含 If-Range 来作为请求条件
      >- `Range: bytes=200-100, 2000-3000, 4500-`
      >- `If-Range: <day-name>, <day> <month> <year> <hour>:<minute>:<second> GMT`
      >- `Content-Range: bytes 200-1000/3000 | bytes 200-1000/*`
      >- `Content-Type: MIME`
      >- `Content-Length`
    - **207** *Multi-Status* 由WebDAV(RFC 2518)扩展的状态码，代表之后的消息体将是一个XML消息，并且可能依照之前子请求数量的不同，包含一系列独立的响应代码
  - 3xx Redirection 重定向
    - **301** *Moved Permanently* 被请求的资源已永久移动到新位置，并且将来任何对此资源的引用都应该使用本响应返回的若干个URI之一，默认会被缓存
      >- `Location: <new-url>`
    - **302** *Move Temporarily* 请求的资源临时从不同的URI响应请求，默认以 GET 重新请求
    - **303** *See Other* 对应当前请求的响应可以在另一个 URL 上被找到，而且客户端应当采用 GET 的方式访问那个资源
    - **304** *Not Modified* 如果客户端发送了一个带条件的 GET 请求且该请求已被允许，而文档的内容（自上次访问以来或者根据请求的条件）并没有改变，则服务器应当返回这个状态码
    - **305** *Use Proxy* 被请求的资源必须通过指定的代理才能被访问
    - **306** *Switch Proxy* 在最新版的规范中，306状态码已经不再被使用
    - **307** *Temporary Redirect* 与302一致，但不允许HTTP方法改变
    - **308** *Permanent Redirect* 与301一致，但不允许HTTP方法改变
  - 4xx Client Error 客户端错误
    - **400** *Bad Request* 当前请求无法被服务器理解
      >- `语义有误`
      >- `请求参数有误`
    - **401** *Unauthorized* 当前请求需要用户验证
      >- `Authorization: <type> <credentials>`
      >- `WWW-Authenticate: <type> realm=<realm>`
    - **402** *Payment Required* 该状态码是为了将来可能的需求而预留的
    - **403** *Forbidden* 服务器已经理解请求，但是拒绝执行它
    - **404** *Not Found* 请求失败，请求所希望得到的资源未被在服务器上发现
    - **405** *Method Not Allowed* 请求行中指定的请求方法不能被用于请求相应的资源
      >- `Allow: <http-methods>`
    - **406** *Not Acceptable* 请求的资源的内容特性无法满足请求头中的条件，因而无法生成响应实体
    - **407** *Proxy Authentication Required* 与401响应类似，只不过客户端必须在代理服务器上进行身份验证
      >- `Proxy-Authorization: <type> <credentials>`
    - **408** *Request Timeout* 请求超时
    - **409** *Conflict* 由于和被请求的资源的当前状态之间存在冲突，请求无法完成
    - **410** *Gone* 被请求的资源在服务器上已经不再可用，而且没有任何已知的转发地址
    - **411** *Length Required* 服务器拒绝在没有定义 Content-Length 头的情况下接受请求
    - **412** *Precondition Failed* 服务器在验证在请求的头字段中给出先决条件时，没能满足其中的一个或多个
    - **413** *Request Entity Too Large* 服务器拒绝处理当前请求，因为该请求提交的实体数据大小超过了服务器愿意或者能够处理的范围
    - **414** *Request-URI Too Long* 请求的URI 长度超过了服务器能够解释的长度，因此服务器拒绝对该请求提供服务
    - **415** *Unsupported Media Type* 对于当前请求的方法和所请求的资源，请求中提交的实体并不是服务器中所支持的格式，因此请求被拒绝
    - **416** *Requested Range Not Satisfiable* 如果请求中包含了 Range 请求头，并且 Range 中指定的任何数据范围都与当前资源的可用范围不重合，同时请求中又没有定义 If-Range 请求头，那么服务器就应当返回416状态码
    - **417** *Expectation Failed* 在请求头 Expect 中指定的预期内容无法被服务器满足，或者这个服务器是一个代理服务器，它有明显的证据证明在当前路由的下一个节点上，Expect 的内容无法被满足
      >- `Expect: 100-continue`
    - **418** *I'm a teapot* 超文本咖啡壶控制协议RFC 2324
    - **421** *Misdirected Request* 请求被指向到无法生成响应的服务器（比如由于连接重复使用）
    - **422** *Unprocessable Entity* 请求格式正确，但是由于含有语义错误，无法响应
    - **423** *Locked* 当前资源被锁定
    - **424** *Failed Dependency* 由于之前的某个请求发生的错误，导致当前请求失败
    - **425** *Too Early* 代表服务器不愿意冒风险来处理该请求，原因是处理该请求可能会被“重放”，从而造成潜在的重放攻击
    - **426** *Upgrade Required* 客户端应当切换到TLS/1.0
    - **449** *Retry With* 由微软扩展，代表请求应当在执行完适当的操作后进行重试
    - **451** *Unavailable For Legal Reasons* 该请求因法律原因不可用
  - 5xx Server Error 服务器错误
    - **500** *Internal Server Error* 服务器遇到了一个未曾预料的状况，导致了它无法完成对请求的处理
    - **501** *Not Implemented* 服务器不支持当前请求所需要的某个功能
    - **502** *Bad Gateway* 作为网关或者代理工作的服务器尝试执行请求时，从上游服务器接收到无效的响应
    - **503** *Service Unavailable* 由于临时的服务器维护或者过载，服务器当前无法处理请求
    - **504** *Gateway Timeout* 作为网关或者代理工作的服务器尝试执行请求时，未能及时从上游服务器（URI标识出的服务器，例如HTTP、FTP、LDAP）或者辅助服务器（例如DNS）收到响应
    - **505** *HTTP Version Not Supported* 服务器不支持，或者拒绝支持在请求中使用的 HTTP 版本
    - **506** *Variant Also Negotiates* 由《透明内容协商协议》（RFC 2295）扩展，代表服务器存在内部配置错误
    - **507** *Insufficient Storage* 服务器无法存储完成请求所必须的内容
    - **509** *Bandwidth Limit Exceeded* 服务器达到带宽限制
    - **510** *Not Extended* 获取资源所需要的策略并没有被满足
  - 6xx 同 5xx
    - **600** *Unparseable Response Headers* 源站没有返回响应头部，只返回实体内容


## HTTPS 加密过程
  - HTTP： 直接通过明文在浏览器和服务器之间传递信息
  - HTTPS： 采用 对称加密 和 非对称加密 结合的方式来保护浏览器和服务端之间的通信安全。对称加密算法加密数据+非对称加密算法交换密钥+数字证书验证身份=安全
    >- 对称加密: 加密和解密的秘钥使用的是同一个
    >- 非对称加密: 与对称加密算法不同，非对称加密算法需要两个密钥：公开密钥（publickey）和私有密钥（privatekey）
  - HTTPS = HTTP + TLS/SSL
  ![HTTPS加密过程](./reference/https-hand-shake.png)


## TCP的可靠性传输是如何保证的
  [TCP的可靠性传输是如何保证的](http://blog.alanwu.website/2020/03/07/howToEnsureTcp/)
  > 保证数据安全的方法：TCP主要提供了检验和、序列号/确认应答、超时重传、最大消息长度、滑动窗口控制等方法实现了可靠性传输。


## JavaScript 数组
  - JSArray 继承自 JSObject，所以在 JavaScript 中，数组可以是一个特殊的对象，内部也是以 key-value 形式存储数据，所以 JavaScript 中的数组可以存放不同类型的值
  - JSArray 有两种存储方式：
    > fast：存储结构是 FixedArray ，并且数组长度 <= elements.length() ，push 或 pop 时可能会伴随着动态扩容或减容
    > slow：存储结构是 HashTable（哈希表），并且数组下标作为 key
  - 数组类型
    - 快数组（FastElements）
      > FixedArray 是 V8 实现的一个类似于数组的类，它表示一段连续的内存，可以使用索引直接定位。新创建的空数组默认就是快数组。当数组满（数组的长度达到数组在内存中申请的内存容量最大值）的时候，继续 push 时， JSArray 会进行动态的扩容，以存储更多的元素
    - 慢数组（SlowElements）
      > 慢数组以哈希表的形式存储在内存空间里，它不需要开辟连续的存储空间，但需要额外维护一个哈希表，与快数组相比，性能相对较差
  - 数组类型转换
    - fast 转换为 slow
      > 当加入的索引值 index 比当前容量 capacity 差值大于等于 1024 时（index - capacity >= 1024）
      > 快数组新容量是扩容后的容量 3 倍之多时
    - slow 转换为 fast
      > 当慢数组的元素可存放在快数组中且长度在 smi 之间且仅节省了50%的空间，则会转变为快数组
  - 数组的动态扩容（FastElements）
    - 在 JavaScript 中，当数组执行 push 操作时，一旦发现数组内存不足，将进行扩容，公式：`new_capacity = old_capacity /2 + old_capacity + 16`
    - 步骤：
      1. push 操作时，发现数组内存不足
      2. 申请 new_capacity = old_capacity /2 + old_capacity + 16 长度的内存空间
      3. 将数组拷贝到新内存中
      4. 把新元素放在当前 length 位置
      5. 数组的 length + 1
      6. 返回 length
  - 数组的动态减容（FastElements）
    - 当数组 pop 后，如果数组容量大于等于 length 的 2 倍，则进行容量调整，使用 RightTrimFixedArray 函数，计算出需要释放的空间大小，做好标记，等待 GC 回收；如果数组容量小于 length 的 2 倍，则用 holes 对象填充
    - 步骤：
      1. pop 操作时，获取数组 length
      2. 获取 length - 1 上的元素（要删除的元素）
      3. 数组 length - 1
      4. 判断数组的总容量是否大于等于 length - 1 的 2 倍
      5. 是的话，使用 RightTrimFixedArray 函数，计算出需要释放的空间大小，并做好标记，等待 GC 回收
      6. 不是的话，用 holes 对象填充
      7. 返回要删除的元素

## 浏览器JS运行机制
  - JavaScript 将任务的执行模式分为两种：同步和异步
  - 同步任务都在主线程（这里的主线程就是 JavaScript 引擎线程）上执行，会形成一个 **调用栈**，又称 **执行栈**
  - 除了主线程外，还有一个 **任务队列** （也称消息队列），用于管理异步任务的 **事件回调**，在 **调用栈** 的任务执行完毕之后，系统会检查任务队列，看是否有可以执行的异步任务
  - 调用栈是 JavaScript 用来管理函数执行上下文的一种数据结构，它记录了当前函数执行的位置，哪个函数正在被执行。如果我们执行一个函数，就会为函数创建执行上下文并放入栈顶。 如果我们从函数返回，就将它的执行上下文从栈顶弹出。 也可以说调用栈是用来管理这种执行上下文的栈，或称执行上下文栈（执行栈）
  - 内存机制，JavaScript 中的内存空间主要分为三种类型：
    - 代码空间：主要用来存放可执行代码
    - 栈空间：调用栈的存储空间就是栈空间。
    - 堆空间：引用数据类型
      - 新生代：用来存放生存周期较短的小对象，一般只支持1～8M的容量
      - 老生代：用来存放生存周期较长的对象或大对象
    - 垃圾回收
      - 回收栈空间：ESP指针、EBP指针
      - 回收堆空间：新生代使用副垃圾回收器，老生代使用主垃圾回收器
        - 副垃圾回收器：采用 Scavenge 算法及对象晋升策略来进行垃圾回收，即把新生代空间对半划分为两个区域，一半是对象区域，一半是空闲区域。流程：1.标记；2.垃圾清理；3.区域翻转；4.晋升存活对象
        - 主垃圾回收器：V8 中主垃圾回收器主要采用标记-清除法进行垃圾回收。流程：1.标记；2.垃圾清理；3.内存整理
    - 垃圾回收器，都采用了同样的流程（三步走）：
      1. 标记： 标记堆空间中的活动对象（正在使用）与非活动对象（可回收）
      2. 垃圾清理： 回收非活动对象所占用的内存空间
      3. 内存整理： 当进行频繁的垃圾回收时，内存中可能存在大量不连续的内存碎片，当需要分配一个需要占用较大连续内存空间的对象时，可能存在内存不足的现象，所以，这时就需要整理这些内存碎片。
    - 增量标志：V8 浏览器会自动执行垃圾回收，但由于 JavaScript 也是运行在主线程上的，一旦执行垃圾回收，就要打断 JavaScript 的运行，可能会或多或少的造成页面的卡顿，影响用户体验，所以 V8 决定采用增量 标记算法回收：即把垃圾回收拆成一个个小任务，穿插在 JavaScript 中执行


## click在ios上有300ms延迟，原因及如何解决？
  - 禁用缩放：`<meta name="viewport" content="width=device-width, user-scalable=no">`
  - FastClick：检测到touchend事件后，立刻出发模拟click事件，并且把浏览器300毫秒之后真正出发的事件给阻断掉