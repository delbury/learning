# 题目
## 微信扫码登录原理分析
  [微信扫码登录原理分析](http://blog.alanwu.website/2020/03/03/scanCodeToLogin/)
  ![二维码登录流程](./reference/qr-code-login.png)
  - 原理实现
    1. 二维码与网页服务器：当我们打开微信的网页版的时候，查看控制台发现发送了一个请求登录的请求，然后网页服务器就随机产生了一个uuid返回给浏览器，而且这个uuid是和二维码绑定在一起的。服务器会把uuid作为key存进redis缓存服务器里面，类似 uuid：xxxx 的形式。浏览器利用这一个uuid的值，每隔25s左右就发送一个请求。这个过程也是一个轮询的操作，目的就是为了判断用户是否已经扫码了，如果你已经扫码后确认登录轮询的停止。如果没有会一直持续几分钟，然后就二维码就过期了，页面刷新重新生成二维码。

    2. 二维码与手机服务器
    手机进行扫描二维码，然后手机携带uuid和用户信息向手机的服务器发送请求，手机服务器收到之后携带uuid去redis服务器查询用户，并把uuid与用户信息绑定在一起。查询用户成功之后返回一个Token给网页服务器，通过解析这个Token可以拿出用户的信息，然后浏览器就成功登录微信了。值得注意的是，这里的手机服务器和浏览器服务器不是同一台服务器，存储的信息也可能不一样。


## 单点登录 (single sign on)
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
  

## 前后端鉴权
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


## CDN的优化原理
[CDN是什么](https://www.zhihu.com/question/36514327?rf=37353035)
> CDN的全称是(Content Delivery Network)，即内容分发网络。

> 其目的是通过在现有的Internet中增加一层新的CACHE(缓存)层，将网站的内容发布到最接近用户的网络“边缘”的节点，使用户可以就近取得所需的内容，提高用户访问网站的响应速度。