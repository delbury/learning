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


## JavaScript 数组
  - JSArray 继承自 JSObject，所以在 JavaScript 中，数组可以是一个特殊的对象，内部也是以 key-value 形式存储数据，所以 JavaScript 中的数组可以存放不同类型的值
  - JSArray 有两种存储方式：
    > fast：存储结构是 FixedArray ，并且数组长度 <= elements.length() ，push 或 pop 时可能会伴随着动态扩容或减容
    >
    > slow：存储结构是 HashTable（哈希表），并且数组下标作为 key
  - 数组类型
    - 快数组（FastElements）
      > FixedArray 是 V8 实现的一个类似于数组的类，它表示一段连续的内存，可以使用索引直接定位。新创建的空数组默认就是快数组。当数组满（数组的长度达到数组在内存中申请的内存容量最大值）的时候，继续 push 时， JSArray 会进行动态的扩容，以存储更多的元素
    - 慢数组（SlowElements）
      > 慢数组以哈希表的形式存储在内存空间里，它不需要开辟连续的存储空间，但需要额外维护一个哈希表，与快数组相比，性能相对较差
  - 数组类型转换
    - fast 转换为 slow
      > 当加入的索引值 index 比当前容量 capacity 差值大于等于 1024 时（index - capacity >= 1024）
      >
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


## cookie 操作
>- Name: cookie名
>- Value: cookie值
>- Domain: cookie的域，可设置为当前域名的上级域名
>- Path: cookie的路径，可设置为当前路径的上级路径
>- Expires/Max-Age: cookie过期时间（绝对时间/相对时间）。不设置，则为Session会话期，关闭页面，cookie失效
>- HttpOnly: 设置为true，则js读取不到cookie
>- Secure: 标记为Secure的cookie，只能通过https请求发送
>- SameSite: 限制第三方cookie。有3个值：Strict/Lax/None。chrome51新增，chrome80+强制执行
  >>- Strict: 仅允许发送同站点请求的的cookie
  >>- Lax: 允许部分第三方请求携带cookie，即导航到目标网址的get请求。包括超链接`<a href='...' />`，预加载`<link rel="prerender" />`和get表单`<form method="GET" />`三种形式发送cookie
  >>- None: 任意发送cookie，设置为None，需要同时设置Secure，意味着网站必须采用https，若同时支持http和https，可以将http用307跳转到https
>- Priority：优先级，chrome的提案，定义了三种优先级，Low/Medium/High，当cookie数量超出时，低优先级的cookie会被优先清除

```js
document.cookie = 'key=value;path=path;domain=domain;max-age=max-age-in-seconds;expires=date-in-GMTString-format;secure;samesite=samesite;priority=priority;';

// 限制第三方 cookie
// Strict最为严格，完全禁止第三方 Cookie，跨站点时，任何情况下都不会发送 Cookie。换言之，只有当前网页的 URL 与请求目标一致，才会带上 Cookie。
// Lax规则稍稍放宽，大多数情况也是不发送第三方 Cookie，但是导航到目标网址的 Get 请求除。
// Chrome 计划将Lax变为默认设置。这时，网站可以选择显式关闭SameSite属性，将其设为None。不过，前提是必须同时设置Secure属性（Cookie 只能通过 HTTPS 协议发送），否则无效。
SameSite = 'strict' | 'lax' | 'none';

// 优先级，chrome的提案，定义了三种优先级，Low/Medium/High，当cookie数量超出时，低优先级的cookie会被优先清除
Priority = 'low' | 'medium' | 'high';

```

## cookie、sessionStorage、localStorage区别
  >- cookie 始终在同源的http请求中携带(即使不需要)，即cookie在浏览器和服务器间来回传递
  >- 浏览器的 cookie 不区分相同域名下的不同端口，即同一个域名下的不同端口号是的 cookie 共享的
  >- cookie数据还有路径（path）的概念，可以限制。cookie只属于某个路径下
  >- 存储大小限制也不同，cookie数据不能超过4K，同时因为每次http请求都会携带cookie，所以cookie只适合保存很小的数据，如session id。webStorage虽然也有存储大小的限制，但是比cookie大得多，可以达到5M或更大
  >- 数据的有效期不同sessionStorage：仅在当前的浏览器窗口关闭有效；localStorage：始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据；cookie：只在设置的cookie过期时间之前一直有效，即使窗口和浏览器关闭
  >- 作用域不同sessionStorage：不在不同的浏览器窗口中共享，即使是同一个页面；localStorage：在所有同源窗口都是共享的；cookie：也是在所有同源窗口中共享的


## cookie、session区别
  >- cookie数据存放在客户的浏览器上，session数据放在服务器上。
  >- cookie不是很安全，别人可以分析存放在本地的COOKIE并进行COOKIE欺骗考虑到安全应当使用session。
  >- session会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能考虑到减轻服务器性能方面，应当使用COOKIE。
  >- 单个cookie保存的数据不能超过4K，很多浏览器都限制一个站点最多保存cookie个数。


## 跨域
  [一次看懂如何解决跨域](http://blog.alanwu.website/2020/03/06/crossOrigin/)
  > 浏览器是可以发起请求，但是结果被浏览器拦截，此谓跨域。

  - 解决方法：
    1. JSONP：利用 script 可跨域请求资源的特性，只能 GET，安全问题，无法判断是否成功； 
    2. CORS：`Access-Control-* | Origin` 相关请求头，简单请求、复杂请求； 
    3. Nginx代理：服务器代理； 
    4. document.domain：只能用于二级域名相同的情况； 
    5. window.name：页面如果设置了window.name，那么在不关闭页面的情况下，即使进行了页面跳转location.href=…，这个window.name还是会保留； 
    6. postMessage+iframe：这种方式通常用于获取嵌入页面中的第三方页面数据。一个页面发送消息，另一个页面判断来源并接收消息

## 说一下CORS？
  [跨域资源共享CORS](http://www.ruanyifeng.com/blog/2016/04/cors.html)
  > 全称：跨域资源共享 (Cross-origin resource sharing) 

  > 允许浏览器向跨源服务器，发出XMLHttpRequest请求，从而克服了AJAX只能同源使用的限制 


## 页面渲染html的过程？
  [浏览器渲染原理与过程](https://www.jianshu.com/p/e6252dc9be32)
  > 1.解析域名为 IP 地址，通过 浏览器缓存 => 系统缓存 => 路由缓存 => 系统hosts文件 => DNS服务器 解析为 ip 地址

  > 2.浏览器根据这个ip地址和端口号创建（复用）TCP连接，发送 http 请求

  > 3.服务器接收到请求，返回 html 文件

  > 4.解析 HTML 代码，创建 DOM 树
  > 
  > 在 DOM 树的构建过程中如果遇到 JS 脚本和外部 JS 连接，则会停止构建 DOM 树来执行和下载相应的代码，这会造成阻塞

  > 5.解析 CSS 代码，计算出样式，构建 CSSOM 树 

  > 6.将 DOM 和 CSSOM 合并为渲染树 Rendering Tree 

  > 7.分层，决定层级关系，生成 Layer 树

  > 8.确定渲染树中的每个元素的确切位置，布局 Layout 

  > 9.将渲染树的各个节点绘制到屏幕上 Painting，若 DOM 或 CSSOM 修改时会重新渲染


## `<sciprt>` 的加载
![script加载模式](./reference/script-mode.jpg)
三种方式：
  1. 正常模式：`<script src="script.js"></script>`<br>
  没有 defer 或 async，浏览器会立即加载并执行指定的脚本，“立即”指的是在渲染该 script 标签之下的文档元素之前，也就是说不等待后续载入的文档元素，读到就加载并执行。

  2. async模式：`<script async src="script.js"></script>`<br>
  有 async，script.js会被异步加载，即加载和渲染后续文档元素的过程将和 script.js 的加载并行进行（异步）。当 script.js加载完整立即执行script.js。执行script.js时，html解析暂停。从加载完成立即执行来看，async模式 执行顺序与写的顺序无关，不保证执行顺序。

  3. defer 模式：`<script defer src="index.js"></script>`<br>
  有 defer，script.js会被异步加载，即加载和渲染后续文档元素的过程将和 script.js 的加载并行进行（异步）。这一点与async模式一致。
  不同的是当 script.js加载完成并不会立即执行，而是在所有元素解析完成之后，DOMContentLoaded 事件触发之前完成。因此它会按照写的顺序执行。

## 资源阻塞
DOM解析器，在解析过程中，有以下几种情况：
- 遇到了内联JS脚本：那么DOM解析器会先执行JavaScript脚本，执行完成之后，再继续往下解析。
- 遇到成js外部文件：这种情况下，当解析到JavaScript的时候，会先暂停DOM解析，并下载js文件，下载完成之后执行该段JS文件，然后再继续往下解析DOM。这就是JavaScript文件为什么会阻塞DOM渲染。
- 外部css（包括内联`<style> @import url(xxx.css)</style>`和外部css`@import`的css资源）不会阻塞dom的解析，但是会阻塞dom渲染
- js在css之后（只要script不为空，哪怕只有一个空格，因为js可能会依赖元素的样式信息），css会阻塞js，从而造成阻塞DOM解析

总结：
> CSS 不会阻塞 DOM 的解析，但会阻塞 DOM 渲染。
> 
> JS 阻塞 DOM 解析，但浏览器会"偷看"DOM，预先下载相关资源。
> 
> 浏览器遇到 `<script>`且没有defer或async属性的 标签时，会触发页面渲染，因而如果前面CSS资源尚未加载完毕时，浏览器会等待它加载完毕在执行脚本。
> 
> 所以，你现在明白为何`<script>`最好放底部，`<link>`最好放头部，如果头部同时有`<script>`与`<link>`的情况下，最好将`<script>`放在`<link>`上面了吗？


## 重排和重绘
> 渲染队列机制：当我们修改了元素的几何属性，导致浏览器触发重排或重绘时。它会把该操作放进渲染队列，等到队列中的操作到了一定的数量或者到了一定的时间间隔时，浏览器就会批量执行这些操作。

重绘（repaint或redraw）：当盒子的位置、大小以及其他属性，例如颜色、字体大小等都确定下来之后，浏览器便把这些原色都按照各自的特性绘制一遍，将内容呈现在页面上。
重绘是指一个元素外观的改变所触发的浏览器行为，浏览器会根据元素的新属性重新绘制，使元素呈现新的外观。

触发重绘的条件：改变元素外观属性。如：color，background-color等。

重排（重构/回流/reflow）：当渲染树中的一部分(或全部)因为元素的规模尺寸，布局，隐藏等改变而需要重新构建, 这就称为回流(reflow)。
每个页面至少需要一次回流，就是在页面第一次加载的时候。

触发重排的条件：
  1. 页面渲染初始化时（这个无法避免）
  2. 浏览器窗口改变尺寸
  3. 元素尺寸改变时
  4. 元素位置改变时
  5. 元素内容改变时
  6. 添加或删除可见的DOM 元素时
  7. 布局信息改变时，查询布局信息，如 offsetTop、scrollTop、clientTop、getComputedStyle() 等

重排优化有如下方法：
  1. 将多次改变样式属性的操作合并成一次操作，减少DOM访问。
  2. 如果要批量添加DOM，可以先让元素脱离文档流，操作完后再带入文档流，这样只会触发一次重排。（`document.createDocumentFragment: DocumentFragment` 的应用）
  3. 将需要多次重排的元素，position属性设为absolute或fixed，这样此元素就脱离了文档流，它的变化不会影响到其他元素。例如有动画效果的元素就最好设置为绝对定位。
  4. 由于display属性为none的元素不在渲染树中，对隐藏的元素操作不会引发其他元素的重排。如果要对一个元素进行复杂的操作时，可以先隐藏它，操作完成后再显示。这样只在隐藏和显示时触发两次重排。
  5. 在内存中多次操作节点，完成后再添加到文档中去。例如要异步获取表格数据，渲染到页面。可以先取得数据后在内存中构建整个表格的html片段，再一次性添加到文档中去，而不是循环添加每一行。

重绘和重排的关系：在回流的时候，浏览器会使渲染树中受到影响的部分失效，并重新构造这部分渲染树，完成回流后，浏览器会重新绘制受影响的部分到屏幕中，该过程称为重绘。
所以，重排必定会引发重绘，但重绘不一定会引发重排。


## 有了解过事件模型吗，DOM0级和DOM2级有什么区别，DOM的分级是什么
JSDOM事件流存在如下三个阶段：
  1. 事件捕获阶段
  2. 处于目标阶段
  3. 事件冒泡阶段

事件模型有三个常用方法：
  1. event.stopPropagation:阻止捕获和冒泡阶段中，当前事件的进一步传播，
  2. event.stopImmediatePropagetion，阻止调用相同事件的其他侦听器，
  3. event.preventDefault，取消该事件（假如事件是可取消的）而不停止事件的进一步传播，

> event.target：指向触发事件的元素，在事件冒泡过程中这个值不变
>
> event.currentTarget = this，时间帮顶的当前元素，只有被点击时目标元素的target才会等于currentTarget

DOM0 事件直接绑定在行内元素上，后绑定的事件会覆盖之前绑定的事件，如 `oneventname = function(ev) {}`

DOM1 一般只有设计规范没有具体实现，所以一般跳过

DOM2 DOM2级事件是通过 `addEventListener` 绑定的事件

DOM3 在DOM2级事件的基础上添加了更多的事件类型