## 题目

### 微信扫码登录原理分析
  [微信扫码登录原理分析](http://blog.alanwu.website/2020/03/03/scanCodeToLogin/)
  ![二维码登录流程](./reference/qr-code-login.png)
  - 原理实现
    1. 二维码与网页服务器：当我们打开微信的网页版的时候，查看控制台发现发送了一个请求登录的请求，然后网页服务器就随机产生了一个uuid返回给浏览器，而且这个uuid是和二维码绑定在一起的。服务器会把uuid作为key存进redis缓存服务器里面，类似 uuid：xxxx 的形式。浏览器利用这一个uuid的值，每隔25s左右就发送一个请求。这个过程也是一个轮询的操作，目的就是为了判断用户是否已经扫码了，如果你已经扫码后确认登录轮询的停止。如果没有会一直持续几分钟，然后就二维码就过期了，页面刷新重新生成二维码。

    2. 二维码与手机服务器
    手机进行扫描二维码，然后手机携带uuid和用户信息向手机的服务器发送请求，手机服务器收到之后携带uuid去redis服务器查询用户，并把uuid与用户信息绑定在一起。查询用户成功之后返回一个Token给网页服务器，通过解析这个Token可以拿出用户的信息，然后浏览器就成功登录微信了。值得注意的是，这里的手机服务器和浏览器服务器不是同一台服务器，存储的信息也可能不一样。

### TCP的可靠性传输是如何保证的
  [TCP的可靠性传输是如何保证的](http://blog.alanwu.website/2020/03/07/howToEnsureTcp/)
  > 保证数据安全的方法：TCP主要提供了检验和、序列号/确认应答、超时重传、最大消息长度、滑动窗口控制等方法实现了可靠性传输。

### Web前端安全知多少
  [Web前端安全知多少](http://blog.alanwu.website/2020/03/18/webSecurity/)
  > 浏览器安全 <br>
  浏览器的同源策略，限制来自不同源的脚本对当前域的调用和访问。

  > 跨站脚本攻击(XSS) <br>
  XSS攻击，通常是通过“HTML”注入修改网页，当浏览器执行恶意脚本时可能会被他人控制。XSS攻击危害极大，如果网页开发者不注意防范XSS攻击，可能会对用户产生危害。<br>
  **XSS攻击可以分为两种：**<br>
  持久型：代码被写进数据库，比如在评论界面的输入框注入恶意代码，那么每一个用户访问帖子的时候都会执行恶意代码。这种类型的攻击影响最大，特别是对于那种日访问量以千万计算的网站。<br>
  非持久型：一般是通过修改URL的参数方式加入攻击代码，利用某种方式诱导用户进行点击，从而实施攻击。比如以下的代码不加过滤处理就会发生攻击。谷歌浏览器是可以防御此类攻击的。<br>
  **防范：**<br>
  转义字符 <br>
  [CSP(Content Security Policy)](http://www.ruanyifeng.com/blog/2016/09/csp.html)：建立白名单，Content-Security-Policy | meta <br>
  HtppOnly <br>
  浏览器将禁止页面的JavaScript访问带有HttpOnly属性的Cookie。实际上HttpOnly并非是为了防御XSS攻击，而是XSS攻击之后的Cookie劫持。

  > 跨站请求伪造(CSRF) <br>
  CSRF 中文名为跨站请求伪造。原理就是攻击者构造出一个后端请求地址，诱导用户点击或者通过某些途径自动发起请求。如果用户是在登录状态下的话，后端就以为是用户在操作，从而进行相应的逻辑。<br>
  **防御：**<br>
  同源检测：在HTTP协议中，每一个异步请求都会携带两个Header，用于标记来源域名：Origin Header | Referer Header <br>
  Samesite Cookie：HTTP响应头中有Set-Cookie属性，属性有两个值，Strict 和 Lax。当设置为Strict的时候，伪造的请求是不会带上本地的cookie进行请求，所以这时候CSRF攻击不会生效。当设置为Lax的时候，在同源内发送请求是可以带上的 <br>
  CSRF Token：用户打开页面的时候服务器下发一个Token，值为通过加密算法进行加密。每次请求都要加上这个Token值，服务端验证是否有效，无效则拒绝 <br>
  双重cookie验证：用户在发送请求的时候生成一个Cookie值，内容为随机字符串，前端向后端发送请求时取出Cookie值与服务端进行比较，若一致则有效，不一致则拒绝 <br>

  > 点击劫持(ClickJacking) <br> 
  点击劫持是一种视觉欺骗的攻击手段。攻击者将需要攻击的网站通过 iframe 嵌套的方式嵌入自己的网页中，并将 iframe 设置为透明，在页面中透出一个按钮诱导用户点击。
  **防御：**<br>
  X-FRAME-OPTIONS：X-FRAME-OPTIONS 是一个 HTTP 响应头，在现代浏览器有一个很好的支持。这个 HTTP 响应头 就是为了防御用 iframe 嵌套的点击劫持攻击。
  JS防御：self !== top 时，隐藏页面


### 单点登录 (single sign on)
  [淘宝/天猫的SSO](https://blog.csdn.net/weixin_34055910/article/details/85846159)
  > 用户首次登录过程：<br>
  用户第一次访问，未登录则重定向认证中心 <br>
  登录成功，颁发Token给用户 <br>
  重定向系统A，带上Token访问系统A <br>
  系统A拿到Token与认证中心比较，正确则创建session局部会话 <br>
  
  > 用户非首次登录过程：<br>
  用户带上Token访问系统B <br>
  系统B拿到Token与认证中心比较，正确则创建session局部会话 <br>

  > 跨域问题 <br>
  我们请求系统A/B的时候，会带上Token，一般来说我们可以把Token存储到客户端的浏览器中，以cookie的形式保存。我们可以把cookie写到浏览器的时候设置Cookie的domain，domain是可以设置二级域名跨域的。也可以把Token保存在 SessionStorage | LocalStorage 中

  > 淘宝(www.taobao.com)/天猫(www.tmall.com) 单点登录：
  > 1. 登录淘宝，获取 token，设置到 .taobao.com 域名下的 cookie
  > 1. 打开天猫，请求淘宝域名的接口，并将**步骤1** 中设置的 cookie 带上，后端返回 location字段，重定向至天猫域名的接口，并拼接请求中带上的 cookie 至重定向接口的 query 参数
  > 1. 请求 **步骤2** 中重定向的天猫地址，后端解析 query 参数，并设置至 set-cookie 头中，至此天猫(.tmall.com) 域名下也设置了相同的 cookie，实现单点登录。
  > 1. 同理，登出操作也是如此
  

### 前后端鉴权
  [关于前后端鉴权的几种方式](http://blog.alanwu.website/2020/03/04/Authorization/)
  > HTTP Basic Authentication：<br>
  在HTTP中，基本认证是允许http用户代理（浏览器）在请求时，提供用户名和密码的一种方式。是一种十分简单的技术，使用的是HTTP头部字段强制用户访问网络资源，而不是通过cookie、sessionId、登陆页面等非获取访问控制的手段。

  > session-cookie机制：<br>
  利用服务端的session和浏览器的cookie来实现前后端鉴权，我们知道http是一种无状态的请求，用户请求完成就会关闭。如果要维持状态就需要浏览器第一次请求的时候在服务端创建一个session，session有一个唯一的标识就是sessionId。一般生产sessionId之后经过加密（可不用加密）返回给客户端，以cookie的形式保存在浏览器中。当下一次请求时就会在请求头中加入cookie信息，服务器取出sessionId与之前生成的sessionId比对是否一致，来判断请求是否合法。

  > Token验证：<br>
  Token又称为一个令牌，比如我们熟悉的QQ都有一个令牌，而且这个令牌隔一段时间是会变化的，上一种利用cookie的形式是不会变的。所以Token的鉴权方式更为安全也用的比较多。<br>
  session和cookie机制是在客户端与服务端之间保持一个状态，服务端创建session对象也是需要开辟一定的内存空间来保存登陆状态的，但是利用Token的话就不会保持状态，只需比对令牌是否有效即可。

  > OAuth开放授权：[OAuth 2.0 的四种方式](http://www.ruanyifeng.com/blog/2019/04/oauth-grant-types.html)<br>
  > 步骤：<br>
  > 1. 向用户请求授权
  > 1. 用户授权，返回凭证code给第三方（CSDN/掘金）
  > 1. 利用code向授权服务器请求Access Token
  > 1. 返回Access Token
  > 1. 利用Access Token向资源服务器请求用户资源
  > 1. 获取用户资源，登陆成功