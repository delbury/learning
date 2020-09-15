## 题目
1. ### 对 tree-shaking 的了解
  - 用于移除 js 上下文中的未引用代码，依赖于 ES6 中模块系统中的静态结构特性，如 import / export
  - ES6模块依赖关系是确定的，和运行时的状态无关，可以进行可靠的静态分析，这就是tree-shaking的基础
  - ES6 module 特点：
    >- 只能作为模块顶层的语句出现
    >- import 的模块名只能是字符串常量
    >- import binding 是 immutable的
  - babel默认会把import编译成IIFE形式的函数，无法被Tree-Shaking
  - babel需要配置 { modules: false }, package.json 配置 { "sideEffect": false }
  - webpack偏向于前端工程，rollup偏向于js库

2. ### Common.js 和 es6 module 区别
  - Commonjs的require语法是运行时的，内容是在运行时确定，可以动态加载 / ES6 Module 是静态的，加载和暴露的内容都是确定的，无法动态加载
  - Commonjs输出的是值的浅拷贝 / ES6 Module 输出的是值的引用

3. ### 缓存策略
  ##### 提升数据交换的性能，缓解服务器的压力
  ![缓存策略](./reference/cache-strategy.webp)
  - 缓存大致可归为两类：私有缓存（只能用于单独用户）、共享缓存（能否被多个用户使用）
  - 强缓存
    - 直接从缓存数据库中取出资源，无需再发送到服务器上
    - http中相关header为 Expires / Cache-Control，Cache-Control优先级高于 Expires
    - Expires 是 HTTP1.0 的产物，值为绝对时间，表示资源的过期时间
    - Cache-Control 分缓存请求指令、缓存响应指令
      >- public 响应可被任何对象缓存
      >- private 响应只能被单个用户缓存，不能作为共享缓存
      >- no-cache 在发布缓存副本之前，强制要求缓存把请求提交给原始服务器进行验证(协商缓存验证)
      >- no-store 不使用任何缓存
      >- max-age=\<seconds\> 缓存的最大周期，相对时间
      >- s-max-age=\<seconds\> 覆盖max-age或者Expires头，但是仅适用于共享缓存(比如各个代理)，私有缓存会忽略它
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
    - Last-Modified / If-Modified-Since
      >- 由于精确度比  ETag 要低，所以这是一个备用机制
      >- 包含有  If-Modified-Since 或 If-Unmodified-Since 首部的条件请求会使用这个字段
      >- 浏览器第一次访问一个资源时，服务器会在response header中返回一个Last-Modified，代表这个资源最后的修改时间，当浏览器再次访问这个资源的时候，会在request header中带上 If-Modified-Since，值为上次请求时服务器返回的 Last-Modified 的值，然后服务器根据资源上次修改的时间确认资源在这段期间内是否更改过，如果没有，则返回304，如果有，则返回200并返回最新的资源。
    - Etag / If-None-Match
      >- Etag是通过一个校验码来对比资源是否更改过的，而不是通过资源的修改时间
      >- 当一个资源修改时，其校验码也会更改。当浏览器请求资源时，服务器会返回一个Etag字段，然后浏览器下一次请求时，会带上 If-None-Match ，值为上次服务器返回的Etag的值，服务器经过校验码的对比后决定返回200或304
      >- If-None-Match 的值中有个 W/ 前缀，这个其实不用去关心，这个是用来提示应该采用弱比较算法

      ```sequence
      客户端 -> 服务器: 请求数据，带入缓存对比标志

      服务器 -> 客户端: 经过对比客户端提供的标志，确认缓存可用，返回304

      客户端 -> 缓存仓库: 获取缓存资源

      缓存仓库 -> 客户端: 返回缓存资源
      ```

4. ### HTTP 状态码
  - 1xx
  - 2xx
  - 3xx
  - 4xx
  - 5xx