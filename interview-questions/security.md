# 安全
## Web前端安全知多少
  [Web前端安全知多少](http://blog.alanwu.website/2020/03/18/webSecurity/)
  > 浏览器安全 
  浏览器的同源策略，限制来自不同源的脚本对当前域的调用和访问。

  > 跨站脚本攻击(XSS)(Cross Site Scripting) 
  XSS攻击，通常是通过“HTML”注入修改网页，当浏览器执行恶意脚本时可能会被他人控制。XSS攻击危害极大，如果网页开发者不注意防范XSS攻击，可能会对用户产生危害。

  **XSS攻击可以分为两种：**
  持久型：代码被写进数据库，比如在评论界面的输入框注入恶意代码，那么每一个用户访问帖子的时候都会执行恶意代码。这种类型的攻击影响最大，特别是对于那种日访问量以千万计算的网站。
  非持久型：一般是通过修改URL的参数方式加入攻击代码，利用某种方式诱导用户进行点击，从而实施攻击。比如以下的代码不加过滤处理就会发生攻击。谷歌浏览器是可以防御此类攻击的。

  **防范：**
  转义字符 
  [CSP(Content Security Policy)](http://www.ruanyifeng.com/blog/2016/09/csp.html)：建立白名单，Content-Security-Policy | meta 
  HttpOnly 
  浏览器将禁止页面的JavaScript访问带有HttpOnly属性的Cookie。实际上HttpOnly并非是为了防御XSS攻击，而是XSS攻击之后的Cookie劫持。

  > 跨站请求伪造(CSRF)(Cross-site request forgery) 
  CSRF 中文名为跨站请求伪造。原理就是攻击者构造出一个后端请求地址，诱导用户点击或者通过某些途径自动发起请求。如果用户是在登录状态下的话，后端就以为是用户在操作，从而进行相应的逻辑。

  **防御：**
  同源检测：在HTTP协议中，每一个异步请求都会携带两个Header，用于标记来源域名：Origin Header | Referer Header 
  Samesite Cookie：HTTP响应头中有Set-Cookie属性，属性有两个值，Strict 和 Lax。当设置为Strict的时候，伪造的请求是不会带上本地的cookie进行请求，所以这时候CSRF攻击不会生效。当设置为Lax的时候，在同源内发送请求是可以带上的 
  CSRF Token：用户打开页面的时候服务器下发一个Token，值为通过加密算法进行加密。每次请求都要加上这个Token值，服务端验证是否有效，无效则拒绝 
  双重cookie验证：用户在发送请求的时候生成一个Cookie值，内容为随机字符串，前端向后端发送请求时取出Cookie值与服务端进行比较，若一致则有效，不一致则拒绝 

  > 点击劫持(ClickJacking)  
  点击劫持是一种视觉欺骗的攻击手段。攻击者将需要攻击的网站通过 iframe 嵌套的方式嵌入自己的网页中，并将 iframe 设置为透明，在页面中透出一个按钮诱导用户点击。
  
  **防御：**
  X-FRAME-OPTIONS：X-FRAME-OPTIONS 是一个 HTTP 响应头，在现代浏览器有一个很好的支持。这个 HTTP 响应头 就是为了防御用 iframe 嵌套的点击劫持攻击。
  JS防御：self !== top 时，隐藏页面


## Cookie如何防范XSS攻击
  > `set-cookie: <value>; httpOnly; secure`