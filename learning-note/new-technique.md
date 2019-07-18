# Language
## Font-end
+ Javascript
  - ES6/ES7/...
+ HTML
+ HTML5
  - 语法
    - 指定字符编码
        1. HTML4中：`<meta http-equiv="content-type" content="text/html;charset=utf-8">`
        2. HTML5中（兼容HTML4）：`<meta charset="utf-8>`
    - Boolean 类型的属性，存在属性名即为 true，不存在即为 false
    - 属性值可以单引号、双引号包裹，当属性值不包括空字符串、"<"、">"、"="、单引号、双引号等字符时，可以省略引号
  - 新增的元素
    - 结构元素
        1. section: 表示页面中的内容区块，通常由内容及其标题组成，section的作用是对页面上的内容进行分块，或者说对文章进行分段
            - 当一个容器需要被直接定义样式或通过脚本定义行为时，使用 div
            - 不要为没有标题的内容区块使用 section
            - 强调分段或分块
            - ```html
              <artical>
                <h1>一级标题</h1>
                <p>内容</p>
                <section>
                  <h2>二级标题</h2>
                  <p>内容</p>
                </section>
                <section>
                  <h2>二级标题</h2>
                  <p>内容</p>
                </section>
              </artical>
              ```
        2. article: 表示文档、页面或应用程序中独立的、完整的、可以独自被外部引用的内容，也可以用来表示插件
            - 强调独立性
            - ```html
              <artical>
                <header>
                  <h1>标题</h1>
                  <p>时间</p>
                </header>
                <section>
                  <h2>子标题</h2>
                  <artical>
                    <!-- more... -->
                  </artical>
                  <artical>
                    <!-- more... -->
                  </artical>
                </section>
                <object>
                  <embed src="#">
                </object>
                <footer>页脚</footer>
              </artical>
              ```
        3. aside: 表示 artical 元素的内容之外，与其内容相关的辅助信息
            - 当前页面或文章的附属信息，可以包括与当前页面或主要内容相关的引用、侧边栏、广告、导航条，以及其他类似的有别于主要内容的部分
            - ```html
                <body>
                  <artical>
                    <h1>标题</h1>
                    <p>内容</p>
                    <aside>
                      <nav>导航</nav>
                    </aside>
                  </artical>
                  <aside>
                    <nav>广告</nav>
                  </aside>
                </body>
              ```
        4. header: 表示整个页面或一个内容区块的标题
            - 通常用来放置整个页面或页面内的一个内容区块的标题，也可以包含其他内容
            - 一个页面内可以有多个，可以为每一个个内容区块添加一个 header
            - 通常至少包括一个 ( h1 ~ h6 )
            - ```html
              <header>
                <hgroup>
                  <h1>标题</h1>
                  <a>链接</a>
                </hgroup>
                <nav>
                  <ul>
                    <li>1</li>
                    <li>2</li>
                  </ul>
                </nav>
              </header>
              ```
        5. hgroup(已删除): 用于对整个页面或一个内容区块的标题进行组合
            - 主标题和子标题进行分组
            - ```html
              <hgroup>
                <h1>标题</h1>
                <h2>子标题</h2>
              </hgroup>
              ```
        6. footer: 表示整个页面或一个内容区块的注脚
            - 通常包括其相关区域的注脚信息，如作者、相关链接、版权信息等
            - 一个页面内可以有多个，可以为每一个个内容区块添加一个 footer
            - ```html
              <footer>
                内容
              </footer>
              ```
        7. nav: 表示页面中导航链接的部分
            - 主要的、基本的链接组放入 nav 元素
            - 一个页面中可以有多个 nav 元素
            - 传统导航条、侧边栏导航、页内导航、翻页导航
            - 不要用 menu 代替 nav 元素
            - ```html
              <nav>
                <h2>导航</h2>
                <ul>
                  <li><a href="#1">1</a></li>
                  <li><a href="#2">2</a></li>
                  <li><a href="#3">3</a></li>
                </ul>
              </nav>
              ```
        8. figure: 表示一段独立的流内容
            - 表示网页上一块独立的内容，将其从网页上移除后不会对页面上的其他内容产生任何影响
            - 内容可以是图片、统计图、代码示例等
            - 一个 figure 内最多只允许一个 figcaption
            - ```html
              <figure>
                <img>图片</img>
                <figcaption>标题</figcaption>
              </figure>
              ```
        9. figcaption: figure 的标题
        10. address: 呈现联系信息
            - 包括文档作者或维护者的名字、网站链接、邮箱、真实地址、电话号码等
            - 不只是用来呈现电子邮箱或真实地址，还用来展示跟文档相关的联系人的所有信息
            - ```html
              <footer>
                <address>
                  <a>作者链接</a>
                  <a>维护者链接</a>
                </address>
              </footer>
              ```
        11. main
    - 其他元素
        1. video: 视频
        2. audio: 音频
        3. embed: 插入各种多媒体，如 Midi/Wav/AIFF/AU/MP3等
        4. mark: 高亮文本
        5. progress: 进度条
        6. meter: 计量条
        7. time: 表示日期或时间或日期和时间
            - 日期与时间用 "T" 分隔
            - "Z" 表示UTC标准时间
            - "+" 时差
            - 表示 pubdate 发布时间
            - ```html
                <time datetime="2019-06-20T20:00Z+09:00" pubdate>当前时间</time>
              ```
        8. ruby: 表示 ruby 注解
        9. rt: 表示字符的解释或发音
        10. rp: 在 ruby 注释中使用，以定义不支持 ruby 元素的浏览器显示的内容
        11. wbr: 表示软换行，当宽度不够时可以在此处换行
        12. canvas: 画布
        13. command: 表示命令按钮
        14. details: 表示用户要求得到的细节信息，与 summary 配合使用；summary 应该是其第一个子元素，提供标题或图例，标题可见，点击标题时，显示细节信息
            - ```html
              <details>
                <summary>描述</summary>
                <p>详情</p>
              </details>
              ```
        15. datalist: 表示可选数据的列表，与 input 配合
        16. datagrid: 表示可选数据的列表，以树形列表的形式来显示
        17. keygen: 表示生成密钥
        18. output: 表示不同类型的输出
        19. source: 为媒体元素(video/audio)定义媒体资源
        20. menu: 表示菜单列表，command 为菜单项
        21. dialog: 对话框
        22. legend: 为 fieldset/figure/details 定义标题
        23. cite: 表示作品的标题，该作品可以在页面中被详细引用，也可只提一下
        24. small: 小字印刷体，诸如免责声明、注意事项、法律规定、版权信息等，不允许出现在页面主内容中
        25. picture
    - 新增或改良的 input 类型
        1. email: 表示必须输入email地址的文本输入框
        2. url: 表示必须输入URL地址的文本输入框
        3. number: 表示必须输入数值的文本输入框
        4. range: 表示必须输入一定范围内数字值的文本输入框
        5. date: 年月日选择器
        5. month: 年月选择器
        6. week: 年周选择器
        7. time: 时分选择器
        8. datetime: 年月日时间选择器(UTC)
        9. datetime-local: 年月日时间选择器(local)
        10. search: 表示搜索的文本框
        11. tel: 表示输入电话号码
        12. color:　颜色选择器
        13. file: 选取文件
  - 废除的元素
    1. 能使用CSS替代的元素：basefont/big/center/font/s(del替代)/strike(del替代)/tt/u
    2. 不再使用 frame/noframes/frameset，只支持 iframe
    3. 只有部分浏览器支持的元素：applet(embed,object替代)/bgsound(audio替代)/blink/marquee(js编程替代)
    4. rb: ruby替代
    5. acronym: abbr替代
    6. dir: ul替代
    7. isindex: form与input相结合替代
    8. listing: pre替代
    9. xmp: code替代
    10. nextid: GUIDs替代
    11. plaintext: text/plain MIME类型替代
  - 新增的属性
    - img
        1. srcset
        2. sizes
    - 表单相关的属性
        1. autofocus: input(type=text)/select/textarea/button 画面打开时自动获得焦点
        2. placeholder: input(type=text)/textarea 输入提示
        3. form: input/output/select/textarea/button/fieldset 声明属于哪个表单，以放在页面上的仍和位置，为表单元素指定 id 为其值的 form 元素
        4. required: input(type=text)/textarea 提交校验时，必须有输入内容
        5. autocomplete: 自动完成
        6. min: input(type=number) 最小值
        7. max: input(type=number) 最大值
        8. multiple: input(type=file | email) 上传文件时，上传多个文件；多个邮箱
        9. pattern: 校验正则
        10. step: input(type=number) 间隔
        11. formaction: input(type=submit|image)/button(type=submit) 重置form的action
        12. formenctype: input(type=submit|image)/button(type=submit) 重置form的enctype
        13. formmethod: input(type=submit|image)/button(type=submit) 重置form的method
        14. formnovalidate: input/button 重置form的novalidate
        15. formtarget: input(type=submit|image)/button(type=submit) 重置form的target
        16. list: input(type=text) 值为datalist的id，类似与select，允许自行输入
    - 链接相关属性
        1. media: a/area 规定目标URL是对什么类型的媒体/设备进行优化的，href存在时使用
        2. rel/hreflang: area 与 a/link 保持一致
        3. sizes: link(rel=icon)
        4. target: base 保持与 a 元素一致
    - 其他属性
        1. reversed: ol 倒序
        2. charset: meta 字符编码
        3. type/label: menu lable为可见标注，type有上下文菜单、工具条、列表菜单三种形式
        4. scoped: style 规定样式的作用范围
        5. async: script 脚本是否异步执行
        6. mnifest: html 开发离线Web应用时与API结合使用，定义一个URL，指向缓存信息的文档
        7. sandbox/seamless/sredoc: iframe 提高页面安全性
  - 废除的属性
    - 移除多余属性
    - 移除可用CSS替代的属性
  - 全局属性
    1. contentEditable: true | false
        - 允许用户编辑元素中的内容
        - 元素必须是可以获得鼠标焦点的元素，在鼠标点击之后向用户提供一个插入符号
        - 默认 inherit
    2. designMode: on | off
        - 整个页面不可编辑
        - document.designMode = "on";
        - 内嵌 iframe 使其可编辑
    3. hidden
        - 不渲染该元素，使该元素不可见
        - 可由js获取
    4. spellcheck: true | false (必须)
        - 对 input(type=text)/textarea 的文本内容进行拼写和语法检查
        - 若 readonly/disabled，则不进行拼写检查
    5. tabindex
        - 不断敲击Tab键，让窗口或页面中的控件获得焦点，按其值的大小顺序
        - 设置为 -1 即按Tab获取不到焦点，但可编程式的获取
  - 结构大纲
      1. 显式编排
          - 明确使用section等元素创建文档结构，在每个内容区块使用标题
      2. 隐式编排
          - 不明确使用section等元素，根据页面中的各级标题等把内容区块自动创建出来
          - 规则：
              1. 若新出现的标题比上一个标题级别低，生成下级内容区块
              2. 若新出现的标题比上一个标题级别高或相等，生成新的内容区块
      3. 不同的内容区块可以使用相同级别的标题
          - 如，父内容区块与子内容区块可以使用相同的标题 h1
  - 表单
    - 自动校验
        1. 某些 type 类型会有默认的校验规则
        2. required 必须有输入
        3. pattern 检验的正则表达式字符串，已包括首尾
        4. min/max 数值或日期类型的最小值和最大值
        5. step 数值类型的步进
    - 显式验证
      - (form | input).checkValidity() 函数式验证表单或表单字段
      - input.validity
    - 取消验证
      - form 元素的novalidate，取消整个表单的验证
      - input 元素的formnovalidate，取消单个元素的验证
      - submit 按钮的formnovalidate，取消整个表单的验证
    - 自定义错误信息
      - input.setCustomValidity("message")
  - 列表
    - ol
        1. start 属性
        2. reversed 属性
    - dl
      - ```html
          <dl>
            <dt>名词1</dt>
            <dd>条目</dd>
            <dd>条目</dd>
            <dt>名词2</dt>
            <dd>条目</dd>
            <dd>条目</dd>
          </dl>
        ```
  - 文件
    - FileList & File
    - Blob ( { size: bytes, type: MIME } )
      - slice(start, end)
    - FileReader
      - 方法：
          1. abort() 中止读取
          2. readAsArrayBuffer()
          3. readAsBinaryString() 非标准
          4. readAsDataURL()
          5. readAsText()
      - 事件：
          1. onabort
          2. onerror
          3. onload
          4. onloadstart
          5. onloadend
          6. onprogress
  - 拖放
    - 条件：draggable="true"；`<img>` 与 `<a>` （指定href）则默认允许拖放
    - DataTransfer，event.dataTransfer
      - 属性：
          1. dropEffect
              - 实际拖放时的视觉效果，一般在 dragstart 中设置
              - 值：copy | move | link | none
          2. effectAllowed
              - 表示当一个元素被拖动时所允许的视觉效果，一般在 dragover 中设置
              - 值：none | copy | copyLink | copyMove | link | linkMove | move | all | uninitalized
          3. types
      - 方法：
          1. setData(MIME, dara)
          2. getData(MIME)
          3. clearData()
          4. setDragImage(img, xOffset, yOffset)
    - 事件
        1. dragstart 被拖放元素，开始拖放
            - 拖动的数据存入 DataTransfer 对象，event.dataTransfer
            - dataTransfer.setData(MIME, data)
        2. drag 被拖放元素，拖放过程中
        3. dragenter  拖放中鼠标进过的元素，被拖放元素开始进入本元素范围
        4. dragover 拖放中鼠标经过的元素，被拖放的元素在本元素范围内移动
        5. dragleave 拖放中鼠标经过的元素，被拖放的元素在离开本元素范围
        6. drop 拖放的目标元素，其他元素被拖放到了本元素中
            - 默认下，拖动的目标不允许接收元素，必须在 dragover 内调用 event.preventDefault()
            - 执行 dataTransfer.getData(MiME) 获得数据
        7. dragend 拖放的对象元素，拖放结束
        8. dragexit （暂未实现）当一个元素不再是拖动操作的直接选择目标时
  - Canvas
    - 默认情况下，Canvas 画布的最左上角对应坐标原点 ( 0, 0 )
    - image: CanvasImageSource | CSSImageValue | HTMLImageElement | SVGImageElement | HTMLVideoElement | HTMLCanvasElement | ImageBitmap | OffscreenCanvas
    - ImageData
      - 属性：data / height / width
    - TextMetrics
      - 属性：width
    - Canvas方法：
        1. canvas.getContext("2d")
            - 参数："2d" | "webgl" | "webgl2"
        2. canvas.toDataURL(MIME, encoderOptions)
            - 参数 0 ~ 1，默认 0.92，image/png、image/png
        3. canvas.toBlob(callback, type, encoderOptions)
    - Context方法：
        1. ctx.fillRext(x, y, width, height)
        2. ctx.strokeRect(x, y, width, height)
        3. ctx.clearRect(x, y, width, height)
        4. ctx.beginPath()
        5. ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise)
        6. ctx.closePath()
        7. ctx.fill()
        8. ctx.stroke()
        9. ctx.moveTo(x, y)
        10. ctx.lineTo(x, y)
        11. ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
        12. ctx.quadraticCurveTo(cpx, cpy, x, y)
        13. ctx.createLinearGradient(xStart, yStart, xEnd, yEnd)
        14. ctx.createRadialGradient(xStart, yStart, radiusStart, xEnd, yEnd, radiusEnd)
        15. gradient.addColorStop(offset, color)
        16. ctx.translate(x, y)
        17. ctx.scale(x ,y)
        18. ctx.rotate(angle)
        19. ctx.transform(m11, m12, m21, m22, dx, dy)
        20. ctx.setTransform(m11, m12, m21, m22, dx, dy) | ()
        21. ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh) | (image, x, y, w, h) | (image, x, y)
        22. ctx.createPattern(image, type)
            - type: no-repeat | repeat-x | repeat-y | repeat
        23. ctx.clip()
        24. ctx.getImageData(sx, sy, sw, sh)
        25. ctx.putImageData(imagedata, dx, dy) | (imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight)
        26. ctx.fillText(text, x, y [, maxWidth])
        27. ctx.strokeText(text, x, y [, maxWidth])
        28. ctx.measureText(text)
        29. ctx.save()
        30. ctx.restore()
    - context属性：
        1. ctx.fillStyle = color | pattern
            - color: #fff | white | rgb(255, 255, 255) | rgba(255, 255, 255, 1)
        2. ctx.strokeStyle = color
        3. ctx.lineWidth = number
        4. ctx.globalCompositeOperation = types 
            - types: source-over | source-in | source-out | source-atop | destination-over | destination-in | destination-out | destination-atop | lighter | copy | xor | multiply | screen | overlay | darken | lighten | color-dodge | color-burn | hard-light | soft-light | difference | exclusion | hue | saturation | color | luminosity
        5. ctx.shadowOffsetX
        6. ctx.shadowOffsetY
        7. ctx.shadowColor
        8. ctx.shadowBlur
        9. ctx.font
        10. ctx.textAlign = start | end | left | right | center
        11. ctx.textBaseline = top | hanging | middle | alphabetic | ideographic | bottom
        12. ctx.globalAlpha
        13. ctx.lineCap
        14. ctx.lineJoin
        15. ctx.miterLimit
        16. ctx.imageSmoothingEnabled
  - 多媒体
    - video
    - audio
    - source
      - ```html
        <source src="xxx.ogv" type="video/ogg; codecs='theora, vorbis'">
        ```
    - 属性：
        1. src
        2. autoplay
        3. preload: none | metadata | auto
        4. poster (video)
        5. controls
        6. width/height (video)
        7. error: MEDIA_ERR_ABORTED(1) / MEDIA_ERR_NETWORK(2) / MEDIA_ERR_DECODE(3) / MEDIA_ERR_SRC_NOT_SUPPORTED(4)
        8. networkState: NETWORK_EMPTY(0) / NETWORK_IDLE(1) / NETWORK_LOADING(2) / NETWORK_NO_SOURCE(3)
        9. currentSrc
        10. buffered
        11. readyState: HAVE_NOTHING(0) / HAVE_METADATA(1) / HAVE_CURRENT_DATA(2) / HAVE_FUTURE_DATA(3) / HAVE_ENOUGH_DATA(4)
        12. seeking
        13. seekable
        14. currentTime
        15. startTime
        16. duration
        17. played
        18. paused
        19. ended
        20. defaultPlaybackRate
        21. playbackRate
        22. volume
        23. muted
    - 方法：
        1. play()
        2. pause()
        3. load()
        4. canPlayType(type) return "" | maybe | probably
    - 事件：
        1. loadstart
        2. progress
        3. suspend
        4. abort
        5. error
        6. emptied
        7. stalled
        8. play
        9. pause
        10. loadedmetadata
        11. loadeddata
        12. waiting
        13. playing
        14. canplay
        15. canplaythrough
        16. seeking
        17. seeked
        18. timeupdate
        19. ended
        20. ratechange
        21. durationchange
        22. volumechange
  - 本地存储
    - Cookies
      - 大小限制较小，条数限制
      - 随http请求一起发送
      - 操作复杂性
    - WebStorage
      - sessionStorage
        - 临时保存：打开网页，直到关闭网页（不包括刷新）的时间范围内
      - localStorage
        - 永久保存：直到手动清除
      - 方法：
          1. storage.setItem(key, value)
          2. storage.getItem(key) | storage['key']
          3. storage.clear()
          4. storage.key(inex)
          5. storage.removeItem(key)
      - 属性：
          1. storage.length
    - Database
      - Web SQL
        - window.openDatrabase()
        - db.transaction()
        - transaction.executeSql()
      - IndexedDB
  - 离线应用
    - 本地缓存和浏览器网页缓存的区别：
        1. 本地缓存是为整个Web应用服务，浏览器缓存只服务于单个网页
        2. 任何网页都具有网页缓存，本地缓存是指定缓存的页面
    - manifest 文件
      - Web应用程序的本地缓冲是通过每个页面的manifest文件来管理的
      - manifest文件是一个简单文本文件，在该文件中以清单的形式列举了需要被缓存或不需要被缓存的资源文件的文件名称，以及这些资源文件的访问路径
      - 可以为每个页面单独指定一个manifest文件，也可以为整个Web应用指定一个总的manifest文件
      - 必须同源
      - MIME: text/cache-manifest
      - 规则：
          1. 第一行必须是 "CACHE MANIFEST" 文字
          2. 注释以 "#" 开头，通配符 "*"
          3. 最好加上一个版本号 "version xxx"
          4. 指定资源文件可以是相对路径，也可以是绝对路径，每个资源为单独一行
          5. 资源文件分为三类：
              - CACHE：指定需要被缓存在本地的文件，若一个页面具有manifest文件，浏览器会自动对这个页面进行缓存
              - NETWORK：显示指定不进行本地缓存的文件
              - FALLBACK：每行中指定两个资源文件，第一个为能够在线访问时使用的资源文件，第二个是不能在线访问时使用的资源文件
          6. 每个类别都是可选，若文件开头未指定资源类别，浏览器会识别为CACHE类别，直到第一个显式写出的类别
          7. 允许在同一个manifest文件中重复书写同一个类别
      - ```html
        <html manifest="global.manifest">
        <html manifest="global.appcache">
      - ```text
        CACHE MANIFEST
        # 文件的开头必须要书写 CACHE MANIFEST
        # version 1.0
        CACHE:
        /index.js
        NETWORK:
        https://www.baidu.com
        FALLBACK:
        /index.html /404.html
        ```
    - applicationCache
      - 属性：
      - 方法：
          1. swapCache() 只能在updateready触发时调用，立刻更新本地缓存，图片和JS等在重新打开页面时才生效
          2. update() 检查服务器上的manifest文件是否有更新
      - 事件：
          1. updateready 只在服务器上的manifest文件被更新，且把manifest文件中要求的资源文件下载到本地之后触发
          2. checking
          3. error
          4. downloading
          5. progress
          6. cached
          7. noupdate
          8. obsolete
  - 通信
    - 跨文档消息传输
      - 方法：window.postMessage(message, targetOrigin)
      - 事件：window.onmessage
    - WebSockets
      - 方法：
          1. const ws = new WebSocket('ws://127.0.0.1:80/xxx') // 协议：ws, wss
          2. ws.send(data)
          3. ws.close()
      - 事件：
          1. close
          2. error
          3. message
          4. open
      - ws.readyState
          1. WebSocket.CONNECTING (0)
          2. WebSocket.OPEN	(1)
          3. WebSocket.CLOSING	(2)
          4. WebSocket.CLOSED (3)
  - Web Workers
    - Worker
      - new Worker('./worker.js')
      - 可用变量、函数、类
          1. self
          2. postMessage(msg)
          3. onmessage
          4. importScript(url1, url2, ...)
          5. navigator
          6. sessionStorage/localStorage
          7. XMLHttpRequest
          8. Web Workers
          9. setTimeout()/setInterval()
          10. close
          11. WebSockets
          12. eval()/isNaN()/escape()/unescape()...
    - SharedWorker
    - ServiceWorker
  - 地理位置信息
    - window.navigator.geolocation
    - 方法：
        1. getCurrentPosition(onSuccess, onError, options)
            - options: enableHighAccuracy, timeout, maximumAge
        2. watchPosition(onSuccess, onError, options)
        3. clearWatch(watchId)
    - position对象
        1. latitude 纬度
        2. longitude 经度
        3. altitude 海拔
        4. accuracy 经纬度精度（米）
        5. altitudeAccuracy 海拔高度精度（米）
        6. heading 设备的前进方向
        7. speed 前进速度（米/秒）
        8. timestamp 获取地理位置信息的时间
---   
+ CSS
  - Selector:
    - 选择器
    - 伪类
      - :root ( html， 优先级大于 html )
    - 伪元素
      - ::first-letter
        - 生效条件
            1. display 计算值必须是 block | inline-block | list-item | table-cell | table-caption
            2. 不是所有的字符都能单独作为 ::first-letter 伪元素存在的，包括 `·@#%&*()（）[]【】{}:："“”;；'‘’》《,，.。？?!！…*、/\`
            3. 字符前面不能有图片或者 inline-block/inline-table 之类的元素存在
        - 生效属性
            1. 所有字体相关属性
            2. 所有背景相关属性
            3. 所有 margin 相关属性
            4. 所有 padding 相关属性
            5. 所有 border 相关属性
            6. color 属性
            7. text-decoration、text-transform、letter-spacing、word-spacing（合适情境下）、line-height、float 和 vertical-align（只有当 float 为 none的时候）等属性
            8. visibility: hidden ?
        - ::before 也参与 ::first-letter 伪元素
        - 支持部分 display 属性值标签嵌套。::first-letter 伪元素获取可以跨标签，也就是不仅能选择匿名内联盒子，还能透过层层标签进行选择。display 值如果是 inline、block、table、table-row、table-caption、table-cell、list-item 都是可以的，但是不能是 inline-block 和 inline-table，否则::first-letter 伪元素会直接无效；而 display:flex 则改变了规则，直接选择了下一行的字符内容
        - 继承属性的权重总是多了一层
      - ::first-line
        - 只能作用在块级元素上，也就是 display 为 block、inline-block、list-item、table-cell 或者 table-caption 的元素设置:first-line 才有效，table、flex 之类都是无效的
        - 支持属性与 ::first-letter 类似
        - 继承属性的权重总是多了一层
        - ::first-letter 级别比 ::first-line 高
        - 支持标签嵌套，但是具体细则和 ::first-letter 出入较大
  - 布局:
      1. flex
      2. grid
      3. column
  - 变量:
    1. currentColor: 当前元素的 color 颜色值
  - 用户界面样式
    - outline ( 无法指定方位 )
      - 蒙层镂空效果
      - 填充剩余区域
    - cursor
      - 关键字
          1. auto: 默认值，浏览器自动处理
          2. default: 系统默认光标形状
          3. none: 隐藏
          4. pointer
          5. help
          6. progress
          7. wait
          8. context-menu
          9. text
          10. vertical-text
          11. crosshair
          12. cell
          13. move
          14. copy
          15. alias
          16. no-drop
          17. not-allowed
          18. all-scroll
          19. col-resize / row-resize
          20. ( n/e/s/w/ne/nw/se/sw/ew/ns/nesw/nwse )-resize
          21. zoom-in / zoom-out
          22. grab / grabbing
      - 自定义光标
        - cursor: url();
  - 元素隐藏：
    - 方式：
      - 如果希望元素不可见，同时不占据空间，辅助设备无法访问，同时不渲染，可以使用 `<script>` 标签隐藏
      - 如果希望元素不可见，同时不占据空间，辅助设备无法访问，但资源有加载，DOM 可访问，则可以直接使用 display: none; 隐藏
      - 如果希望元素不可见，同时不占据空间，辅助设备无法访问，但显隐的时候可以有 transition 淡入淡出效果，则可以使用 visibility: hidden; position: absolute;
      - 如果希望元素不可见，不能点击，辅助设备无法访问，但占据空间保留，则可以使用visibility: hidden; 隐藏
      - 如果希望元素不可见，不能点击，不占据空间，但键盘可访问，则可以使用 clip 剪裁隐藏
      - 如果希望元素不可见，不能点击，但占据空间，且键盘可访问，则可以试试 relative隐藏
      - 如果希望元素不可见，但可以点击，而且不占据空间，则可以使用透明度
      - 如果单纯希望元素看不见，但位置保留，依然可以点可以选，则直接让透明度为 0
    - display: none
      - 在 Firefox 浏览器下，display:none 的元素的 background-image 图片是不加载的，包括父元素 display:none 也是如此；如果是 Chrome 和 Safari 浏览器，则要分情况，若父元素 display:none，图片不加载，若本身背景图所在元素隐藏，则图片依旧会去加载；对 IE浏览器而言，无论怎样都会请求图片资源
      - 如果不是 background-image 图片，而是<img>元素，则设置 display:none 在所有浏览器下依旧都会请求图片资源
      - display:none 显隐控制并不会影响 CSS3 animation 动画的实现，但是会影响 CSS3 transition 过渡效果执行，因此 transition 往往和 visibility 属性走得比较近
    - visibility: hidden
      - 元素隐藏后占据空间
      - 继承性
      - visibility: collapse
  - 颜色
    - 值：
        1. 十六进制 #ffffff | #fff
        2. rgb() | rgba() 支持百分比，且必须全为百分比值 rgb(100%, 50%, 0%) | rgba(100%, 50%, 0%, .5)
        3. hsl() | hsla()
        4. 颜色关键字
        5. 系统关键字
    - X11 (X Window System) 颜色名
    - 如果浏览器无法识别颜色关键字，那么HTML中对颜色关键字的解析和CSS中的会不一样
    - background-color:transparent 包括 IE6 浏览器都支持，border-color:transparent 从 IE7 浏览器开始支持，但是 color:transparent 却从 IE9 浏览器才开始支持
  - background
    - multiple backgrounds
    - background-image
      - 个元素如果 display 计算值为 none，在 IE 浏览器下（IE8～IE11，更高版本不确定）依然会发送图片请求，Firefox 浏览器不会，至于 Chrome 和 Safari 浏览器则似乎更加智能一点：如果隐藏元素同时又设置了 background-image，则图片依然会去加载；如果是父元素的 display 计算值为 none，则背景图不会请求
    - background-position
      - 值支持 1～4 个值，可以是具体数值，也可以是百分比值，还可以是 left、top、right、center 和 bottom 等关键字
      - IE8 浏览器最多只支持同时出现 2 个值，从 IE9 开始支持同时出现 3 个值或 4 个值，作用是指定定位的偏移计算从哪个方位算起，如 background-position: right 40px bottom 20px;
      - 百分比值有着特殊的计算公式
          1. positionX = (容器的宽度 - 图片的宽度) * percentX;
          2. positionY = (容器的高度 - 图片的高度) * percentY;
    - background-repeat
      - 值：
          1. repeat
          2. repaet-x
          3. repeat-y
          4. no-repeat
          5. round
          6. space
    - background-attachment
      - 值：
          1. fixed
          2. local
          3. scroll
    - background-color
      -  background 无论是单背景图还是多背景图，背景色一定是在最底下的位置
    - background-size
    - background-origin
    - background-clip
    - background-break
  - width : fit-content | min-content | max-content
    - 宽度分离自适应
  - height
    - height: 100% 生效，1. 显示高度值; 2. 绝对定位
  - max-width/min-width/max-height/min-height
    - min-* : 初始为 auto
    - max-* : 初始为 none
    - width 覆盖 max-width; min-width 覆盖 max-width
  - strut (幽灵空白节点)
  - box-sizing : border-box | content-box
  - object-fit/object-position (替换元素)
    - object-fit : fill | none | contain | scale-down | cover
    - object-position : [ left right ] | [ 50% 50% ]
  - content
    - ::after/::before (chrome 所有元素都有)
    - 文本无法被选中，图片无法被右键，不能改变 :empty
    - 动态生成值无法获取
    - 配合 @font-face 实现图标字体
    - '\A': LF 换行; '\D': CR 回车
    - 各种 content 内容生成语法可以混合使用
    - url("./xx/xx")
    - open-quote/close-quote
      - css属性: quote : [ 'a' 'b' 'c' 'd' ] 引用符号，'a'一级'b'  'c'二级'd'
    - attr 获取属性值，属性名不加引号
    - counter : counter(name, style) 计数器(名字, 值类型: list-style-type)
      - css属性: counter-reset: [ name1 0 name2 0 name3 111 ... ] 默认数字为: 0; 可以为负数
      - css属性: counter-increment: [ name1 1 name2 2 ... ] 默认数字为: 1; 可以为负数
    - counters : counter(name, string, style)
  - padding
    - 内联元素的 padding 在垂直方向上有效，但不影响上下元素的布局，(产生叠层效果)
    - 水平和垂直方向的百分比相对于宽度计算
  - margin
    - 水平和垂直方向的百分比相对于宽度计算
    - margin + padding 等高布局
    - margin 合并，块级元素 (margin-top / margin-bottom) 有时会合并为单个外边距
      - 条件: 
        1. 块级元素，不包括浮动和绝对定位元素
        2. 只发生在垂直方向，不考虑 writing-mode
      - 场景: 
        1. 相邻兄弟
        2. 父级和第一个/最后一个子元素
        3. 空块级元素
      - 规则: 
        1. 正正取大
        2. 正负相加
        3. 负负最小
    - auto
      - 规则: 
        1. 一侧定值, 一侧auto，则auto为剩余空间大小
        2. 两侧均为auto，平分剩余空间
      - 可以用来实现块级元素的 左/中/右 对齐
      - 垂直居中，使用绝对定位元素 (top: 0; right: 0; bottom: 0; left: 0;) 并限定宽高，此时剩余的空间可以被 margin: auto 计算
    - margin-(block/inline)-(start/end): 与 writing-mode 和 direction 有关
  - border
    - 不支持百分比值
    - 等高布局
    - border-width 关键词
      1. thin: 1px
      2. medium: 3px (默认)
      3. thick: 4px
    - border-style 关键词
      1. none (默认)
      2. solid
      3. dashed (不同浏览器存在差异)
      4. dotted (不同浏览器存在差异) (IE8 下实现圆角)
      5. double (双线宽度永远相等，中间间隔 ±1) (实现三道杠)
      6. inset / outset / groove / ridge (基本不用)
    - border-color
      - 默认为 color 色值 (currentColor)
      - outline / box-shadow / text-shadow 类似
      - transparent 技巧
        1. CSS3 之前, 右下方background定位技巧
        2. 增加点击区域大小
        3. 绘制图形 (三角型等)
    - border-image
      - border-image: url(xxx) top/width right bottom left topbottom leftright;
      - 边框平铺方式
          1. repeat
          2. stretch
          3. round
  - font-size
    - line-height 的数值属性和百分比属性都是相对于 font-size 计算的
    - vertical-align 百分比属性相对于 line-height 计算得
    - 数值
      - 相对单位
          1. ex: 字符 x 的高度
          2. em: 
              - 一个字模的高度，一般由 M 的宽度决定(宽高相同)，一个汉字的高度
              - 1em 的计算值等同于当前元素所在的 font-size 计算值
          3. rem: 相对于根元素的 em 大小
          4. ch: 相当于字符 0 的宽度
      - 百分比：基于父元素
      - 关键字属性值：
          - 相对，相对于当前元素 font-size 计算
              1. larger: 大一点，是 `<big>` 元素的默认 font-size 属性值，1.2 倍
              2. smaller: 小一点，是 `<small> `元素的默认 font-size 属性值，1.2 倍
          - 绝对，与当前元素 font-size 无关，受浏览器设置的字号影响
              1. xx-large: 和 `<h1>` 元素计算值一样
              2. x-large: 和 `<h2>` 元素计算值一样
              3. large: 和 `<h3>` 元素计算值近似
              4. medium: 和 `<h4>` 元素计算值一样，是 font-size 的初始值
              5. small: 和 `<h5>` 元素计算值近似
              6. x-small: 和 `<h6>` 元素计算值近似
              7. xx-small: 无对应 HTML 元素
    - 文本隐藏 font-size: 0
      - PC端 Chrome浏览器下有 12px 字号限制，即文字的 font-size 计算值不能小于 12px ( html { font-size: 625%; } )
      - 若设置为 font-szie: 0，且只能为 0，则文字会被隐藏
  - font-size-adjust
    - 修改字体种类而保持文字大小不变 
  - font-family
    - 默认值由操作系统和浏览器共同决定
    - 支持两类属性值
        1. 字体名
            - 名字包含空格，则需用引号包裹
            - 不区分大小写
            - 若设定多个字体，从左往右依次寻找本地是否有对应字体
        2. 字体族
            1. serif: 衬线字体
                - 所谓衬线字体，通俗讲就是笔画开始、结束的地方有额外装饰而且笔画的粗细会有所不同的字体
                - 网页中常用中文衬线字体是“宋体”，常用英文衬线字体有 Times New Roman、Georgia 等
            2. sans-serif: 无衬线字体
                - 无衬线字体没有这些额外的装饰，而且笔画的粗细差不多，如中文的“雅黑”字体，英文包括 Arial、Verdana、Tahoma、Helivetica、Calibri 等
            3. monospace: 等宽字体
                - 英文字符同等宽度
            4. cursive: 手写字体
            5. fantasy: 奇幻字体
            6. system-ui: 系统 UI 字体
    - 所有英文名称大小写都经过一定的考量，并不是随便设定的，虽然说 CSS font-family对名称的大小写不怎么敏感，但是最好至少首字母要大写，否则在使用 CSS unicode-range 的时候可能会遇到一些麻烦
  - font-weight
    - 属性值
        - 相对值 ( 父元素 ) ( 字重临界: 100, 400, 700, 900 )
            1. lighter
            2. bolder
        - 绝对值
            1. normal ( 400 )
            2. bold ( 700 )
            3. 100 ~ 900 ( step: 100 )
    - 不同字重需要有该字体的不同字重的文件支持
  - font-style
    - 属性值
        1. normal
        2. italic ( 斜体，当前字体的斜体字体，若当前字体没有斜体，则解析为 oblique )
        3. oblique ( 斜体，文字倾斜 )
  - font-variant
    - 属性值: normal | small-caps
    - 英文字符表现为小体型大写字母
  - font
    - 属性值
        1. 缩写属性
            - 语法：
              - [ [ font-style || font-variant || font-weight ]? font-size [ / line-height ]? font-family ]
              - || 表示或，? 和正则表达式中的 ? 的含义一致，表示 0 个或 1 个
        2. 关键字值
            1. caption：活动窗口标题栏使用的字体。
            2. icon：包含图标内容所使用的字体，如所有文件夹名称、文件名称、磁盘名称，甚至浏览器窗口标题所使用的字体
            3. menu：菜单使用的字体，如文件夹菜单。
            4. message-box：消息盒里面使用的字体。
            5. small-caption：调色板标题所使用的字体。
            6. status-bar：窗体状态栏使用的字体
            7. 不同浏览器的私有关键词
    - 使用系统字体：html { font: menu | small-caption | status-bar; } body { font-size: 16px; }
  - @font-face
    - 本质是一个变量，定义字体或字体集的变量：自定义字体、字体重命名、默认字体样式设置等
    - 支持规则：
        1. font-family
            - 可以看成一个字体变量，用稀奇古怪的字符时要加引号
            - 若设置为系统已存在字体，则会覆盖原字体
        2. src
            - 字体格式
                1. svg 格式是为了兼容 iOS 4.1 及其之前的版本，考虑到现如今 iOS 的版本数已经翻了一番，所以 svg 格式的兼容代码大可舍弃
                2. eot 格式是 IE 私有的。注意，目前所有版本的 IE 浏览器都支持 eot 格式，并不是只有 IE6～IE8 支持。只是，IE6～IE8 仅支持 eot 这一种字体格式
                3. woff 是 web open font format 几个词的首字母简写，是专门为 Web 开发而设计的字体格式，显然是优先使用的字体格式，其字体尺寸更小，加载更快。Android 4.4 开始全面支持
                4. woff2 是比 woff 尺寸更小的字体，小得非常明显。因此，Web 开发第一首选字体就是 woff2，只是此字体目前仅 Chrome 和 Firefox 支持得比较好
                5. ttf 格式作为系统安装字体比较多，Web 开发也能用，就是尺寸大了点儿，优点在于老版本 Android 也支持
            - 可以使用系统字体 local() ( IE9+ 支持 )
            - 可以使用外链字体 url()
                1. svg 格式果断舍弃
                2. 如果无须兼容 IE8 浏览器，eot 格式果断舍弃
                3. 如果无须兼容 Android 4.3 之前版本手机，ttf 格式果断舍弃
            - src: url('icon.eot') format('eot'); src: url('icon.eot?#iefix') format('embedded-opentype'), url(), ...; 
              - #iefix 是没什么用的，有用的是前面的问号
              - IE9 之前的版本解析有一个严重的问题，当 src属性包含多个 url()时，会把长长的字符当作一个地址解析而返回 404 错误。因此把 eot格式放在第一位，然后在字体文件 url 地址后加上问号，这样 IE9 之前的版本会把问号之后的内容当作 url 的参数
              - 原生的 IE7 和 IE8 浏览器，第一个src 实际上是多余的，测试工程师测试低版本的 IE 浏览器喜欢使用兼容模式，兼容模式的 IE 和原生同版本的 IE 的解析是有区别的，其中区别之一就是兼容模式的 IE7 和 IE8 不认识问号(?)解决方案，导致第二个 src 无法识别，不得已才多了第一行的 src
              - font-weight:normal 和 font-style:normal 是不是多余的？我的回答是，如果没有同字体名的多字体设置，则它就是多余的
              - format()功能符的作用是让浏览器提前知道字体的格式，以决定是否需要加载这个字体
        3. font-style
          - 对应字体样式下该用什么字体
        4. font-weight
          - 对应字体字重下该用什么字体
        5. unicode-range
          - 让特定的字符或者特定范围的字符使用指定的字体
          - 值：( 初始值 U+0 - 10FFFF )
              1. U+26 单个字符编码
              2. U+0-7F | U+0025-00FF 字符编码区间
              3. U+4?? 通配符区间
              4. U+0025-00FF, U+4?? 多个值
        6. font-variant
        7. font-stretch
          - 定义是否横向拉伸变形字体
        8. font-feature-settings
  - text-indent
    - 与 overflow: hidden，负值隐藏文字
    - text-indent 负值缩进在部分浏览器下会影响元素的 outline 区域，通常需要再设置 overflow:hidden
    - 百分比相对于当前包含块计算 ( Chrome 72改变了百分比计算策略 )
    - text-indent 仅对第一行内联盒子内容有效
    - 非替换元素以外的 display 计算值为 inline 的内联元素设置 text-indent 值无效，如果计算值是 inline-block/inline-table 则会生效
    - `<input>` 标签按钮 text-indent 值无效
    - `<button>` 标签按钮 text-indent 值有效，但是存在兼容性差异，IE 浏览器理解为单标签，百分比值按照容器计算，而 Chrome 和 Firefox 浏览器标签内还有其他 Shadow DOM 元素，因此百分比值是按照自身的尺寸计算的
    - `<input>` 和 `<textarea>` 输入框的 text-indent 在低版本 IE 浏览器下有兼容问题
  - letter-spacing
    - 用来控制所有字符之间的间距，这里说的“字符”包括英文字母、汉字以及空格等
    - 特性：
        1. 继承性
        2. 默认值为 normal，不是 0，正常情况下，normal 的计算值就是 0，某些场景下，letter-spacing 会调整 normal 的计算值以实现更好的版面布局
        3. 支持负值，且值足够大的时候，会让字符形成重叠，甚至反向排列 ( 非 IE 浏览器 )，letter-spacing 负值仅能让字符重叠，但是不能让替换元素或者 inline-block/inline-table 元素发生重叠
        4. 和 text-indent 属性一样，无论值多大或多小，第一行一定会保留至少一个字符
        5. 支持小数值，即使 0.1px 也是支持的，但并不总能看到效果，这与屏幕的密度有关。对普通的桌面显示器，设备像素比是 1，最小渲染单位是 1px，因此，需要至少连续 10 个字符
        6. 暂不支持百分比值
  - word-spacing
    - 作用于空格字符，word-spacing 的作用就是增加空格的间隙宽度，有空格就有效。间隙就是原本的空格宽度+ word-spacing 的设置值
    - 特性：
        1. 继承性
        2. 默认值为 normal 而不是 0，通常两者表现无差异
        3. 支持负值，可以让字符重叠，但是对于 inline-block 和 inline-table 元素却存在兼容性差异，Chrome 浏览器下可以重叠，IE 和 Firefox 浏览器下则再大的负值也不会重叠，因此不适合使用 word-spacing 来清除空白间隙
        4. 支持小数
        5. CSS2.1中不支持百分比
        6. 间隔算法会受到 teext-align: justify 两端对齐的影响
  - word-break
    - 值：
        1. normal: 默认换行规则
        2. break-all: 允许任意非 CJK ( Chinese/Japanese/Korean ) 文本间的单词断行
        3. keep-all: 不允许 CJK 文本中的单词换行，只能在半角空格或连字符处换行。非 CJK 文本的行为和 normal 一致 ( 移动端? )
  - word-wrap ( CSS3: overflow-wrap )
    - 值：
        1. normal: 默认
        2. break-word: 一行单词中是在没有其他靠谱的换行点的时候换行
  - white-space
    - 如何处理元素内的空白字符，包括 Space(空格)键、Enter(回车)、Tab(制表符)键产生的空白
    - 分三个维度：是否合并空白字符，是否合并换行符，文本是否自动换行
    - 合并空格，会让多个空格变成 1 个，合并换行，会把多个连续换行合并成 1 个，文本环绕，一行文字内容超出容器宽度时，会自动从下一行开始显示
    - 值：
        1. normal: 默认，合并空白字符和换行符
        2. pre: 空白字符不合并，且内容只有在有换行符的地方换行
        3. nowrap: 该值和 normal 一样会合并空白字符，但不允许文本环绕
        4. pre-wrap: 空白字符不合并，并且内容只在有换行符的地方换行，同时允许文本环绕
        5. pre-line: 合并空白字符，但只在有换行符的地方换行，允许文本环绕
    - 用途：
        1. “包含块”尺寸过小
        2. 单行文字溢出 ... 效果
        3. 水平列表切换效果
  - text-align
    - 值：
        1. left
        2. right
        3. justify
            - 默认设置下，要出现两段对齐效果需要有分隔点，内容超过一行，非最后一行会两端对齐
            - 文本两端对齐，两段对齐布局
            - 空标签占位，个数与列数一致
    - text-align-last
      - 最后一行的对齐方式
      - Safari 不支持 ?
    - text-justify
  - text-decoration
    - 值：
        1. underline: 使用 border 模拟
        2. overline
        3. line-through
    - 支持同时多个属性
    - CSS3 ( 缩写：text-decoration: underline wavy blue; )
        1. text-decoration-style: solid | double | dotted | dashed | wavy
        2. text-decoration-color
        3. text-decoration-skip
  - text-underline-position
    - 设置 text-decoration: underline 时，定义下划线的位置
  - text-transform
    - 值：
        1. uppercase
        2. lowercase
  - text-emphasis
    - 重点文本样式
  - text-shadow
  - vertical-align
    - 属性值: 
      1. 线类:
          1. baseline: 
            - (默认) 文本类的内联元素是字符 x 的下边缘
            - 替换元素是元素的下边缘
            - inline-block 元素，若里面没有内联元素，或 overflow != visible 则该元素的基线是其 margin 底边缘，否则其基线为元素里面最后一行内联元素的基线
          2. middle: 基线往上 (1/2 * x-height) 的高度
          3. top / bottom: 垂直上/下边缘对齐
      2. 文本类:
          1. text-top: 盒子的顶部和父级内容区域的顶部对齐
          2. text-bottom: 盒子的底部和父级内容区域的顶部对齐
      3. 上下标类:
          1. sub: 降低盒子的基线到父级合适的下标基线位置
          2. super:　提高盒子的基线到父级合适的上标基线位置
      4. 数值百分比类:
          1. 正值相对于基线往上偏移
          2. 负值相对于基线往下偏移
          3. 百分比为相对于 line-height 的值
    - 影响高度, 使高度大于 line-height 设置的高度
    - 只能应用于内联元素以及 display: table-cell 的元素，即 display:  inline | inline-block | inline-table | table-cell
    - 浮动和绝对定位会让元素块状化，使 vertical-align 失效
    - 字体大小不同，造成基线位置错位，造成竖直方向上的排列错位，导致父元素高度异常
  - line-height
    - 决定内联元素的高度
    - 一行上方 / 一行下方, 半行距
    - 行距 = 行高 - em-box : 行距 = line-height - font-size
    - 值: 
      1. normal (大小和字体有关)
      2. 长度值，如 15px (固定)
      3. 数值，如 1.5 (直接继承给子元素), 相对于 font-size 计算
      4. 百分比，如 150% (计算后的值继承给子元素)，相对于 font-size 计算
    - 单行居中: line-height: xxx;
    - 多行近似居中
    - 内联元素的大值特性
  - 字母 x (小写)
    - 基线: 字母 x 的下边沿
    - x-height: 小写字母 x 的高度
    - 长度单位 ex，x-height 的大小 (对齐内联文字中的图标，不受字体字号的影响)
  - float
    - 包裹性
    - 自适应性
    - 块状化 block / table
    - 父元素的高度塌陷
    - 行框盒子和浮动元素的不可重叠性
    - 浮动锚点: 浮动锚点是 float 元素所在的“流”中的一个点，这个点本身并不浮动，就表现而言更像一个没有 margin、border 和 padding 的空的内联元素
    - 浮动参考: 浮动参考指的是浮动元素对齐参考的实体 (行框盒子)
  - clear:
    - 属性: left | right | both | none
    - 只有块级元素才有效，::after/::before 等伪元素默认为 inline
    - clear:both 只能在一定程度上消除浮动的影响
  - BFC (block formatting context) (块级格式化上下文)
    - 内部元素不会影响外部元素，不会发生 margin 重叠，清除浮动
    - 触发条件
        1. `<html>` 根元素
        2. float != none
        3. overflow == auto | scroll | hiiden
        4. display == table-cell | table-caption | inline-block
        5. position != relative & static
  - overflow:
    - 属性值:
        1. visible
        2. hidden
        3. scroll
        4. auto
    - overflow-x / overflow-y: 永远不可能实现一个方向溢出剪裁或滚动，另一方向内容溢出显示的效果
    - 滚动条
        1. HTML 中有两个标签是默认可以产生滚动条的，一个是根元素 `<html>`，另一个是文本域 `<textarea>`
        2. PC端，默认滚动条来自 `<html>`，而不是 `<body>`，移动端则不一定适用
        3. PC端，滚动条会占用容器的可用宽度或高度，移动端则不会(悬浮模式)
        4. 自定义样式，-webkit- 浏览器 ( `*` 一般只用 )
            - `*` 整体部分，::-webkit-scrollbar
            - 两端按钮，::-webkit-scrollbar-button
            - `*` 外层轨道，::-webkit-scrollbar-track
            - 内层轨道，::-webkit-scrollbar-track-piece
            - `*` 滚动滑块，::-webkit-scrollbar-thumb
            - 边角，::-webkit-scrollbar-corner
    - 自定义滚动条
        1. 传统实现都是父容器设置 overflow:hidden，然后子元素使用一个大的 `<div>` 包起来，设置绝对定位，然后通过改变 top 值，或者使用 transform 进行偏移
        2. 基于父容器自身的 scrollTop 值改变来实现自定义滚动条效果
    - 文字溢出 ... 效果
      - 条件
          1. text-overflow: ellipsis
          2. white-space: nowrap
          3. overflow: hidden
      - 多行(2行)文字，需要 -webkit-
          1. display: -webkit-box
          2. -webkit-box-orient: vertical
          3. -webkiit-line-clamp: 2
    - 锚点定位
      - 触发条件: `<a href="#name | #id | #(回到顶部)"></a>`
          1. URL地址中的锚链与锚点元素对应并有交互行为，且元素是非隐藏状态 (元素定位在浏览器窗体的上边缘)
          2. 可 focus 的锚点元素处于 focus 状态 (元素在浏览器窗体范围内显示即可，不一定是在上边缘)
      - 本质
          1. 锚点定位也可以发生在普通的容器元素上，而且定位行为的发生是由内而外的
          2. overflow: hidden 也是可以滚动的
  - position
    - absolute
      - 与 float 同时存在时，float 无效
      - 块状化
      - 包含块 (绝对定位元素的宽度是相对于第一个 position != static 的祖先元素计算的)
          1. 根元素(很多场景下可以看成是 `<html>`)被称为“初始包含块”，其尺寸等同于浏览器可视窗口的大小
          2. 对于其他元素，如果该元素的 position == relative || static，则“包含块”由其最近的块容器祖先盒的 content box 边界形成
          3. 如果元素 position:fixed，则“包含块”是“初始包含块”
          4. 如果元素 position:absolute，则“包含块”由最近的 position != static 的祖先元素建立
      - height: 100% (第一个具有定位属性值的祖先元素的高度) | inherit (单纯的父元素的高度继承)
      - 无依赖绝对定位：一个绝对定位元素，没有任何 left/top/right/bottom 属性设置，并且其祖先元素全部都是非定位元素，其位置在当前位置
      - text-align 影响内联元素的无依赖绝对定位
      - overflow 如果overflow 不是定位元素，同时绝对定位元素和 overflow 容器之间也没有定位元素，则 overflow 无法对 absolute 元素进行剪裁
      - 流体特性，对立方向同时发生定位的时候，且该方向上没有 width | height
    - relative
      - 特性
          1. 相对自身
          2. 无侵入
      - left / top / right / bottom: 数值相对于自身，百分比相对于包含块
      - top/bottom 和 left/right同时使用的时候，其表现和绝对定位差异很大；默认的文档流是自上而下、从左往右，因此 top/bottom 同时使用的时候，bottom 无效；left/right 同时使用的时候，right 无效
      - 使用原则
          1. 尽量不使用 relative，如果想定位某些元素，看看能否使用“无依赖的绝对定位”
          2. 如果场景受限，一定要使用 relative，则该 relative 务必最小化
    - fixed
      - 无依赖固定定位
      - 蒙层锁定，隐藏滚动条：根元素 overflow: hidden, border-right: 17px solid transparent
    - sticky
  - clip
    - position == absolute || fixed
    - clip: rect(top, right, bottom, left) | clip: rect(top right bottom left)
    - bottom 为从 top 到底边缘的距离；right 为从 left 到右边缘的距离
    - clip 隐藏仅仅是决定了哪部分是可见的，非可见部分无法响应点击事件等
    - 虽然视觉上隐藏，但是元素的尺寸依然是原本的尺寸，在 IE 浏览器和 Firefox 浏览器下抹掉了不可见区域尺寸对布局的影响，Chrome 浏览器却保留了
  - z-index
    - 对于非浮层元素，避免设置 z-index 值，z-index 值没有任何道理需要超过 2
    - 定位元素一旦设置了 z-index 值，就从普通定位元素变成了层叠上下文元素，相互间的层叠顺序就发生了根本的变化，很容易出现设置了巨大的 z-index 值也无法覆盖其他元素的问题
    - 避免 z-index “一山比一山高”的样式混乱问题
  - 层叠规则
    - 层叠上下文 (stacking context)
      - 特性
          1. 层叠上下文的层叠水平比普通元素要高
          2. 层叠上下文可以阻断元素的混合模式
          3. 层叠上下文可以嵌套，内部层叠上下文及其所有子元素均受制于外部的层叠上下文
          4. 每个层叠上下文和兄弟元素独立，即当进行层叠变化或渲染的时候，只需要考虑后代元素
          5. 每个层叠上下文是自成体系的，当元素发生层叠时，整个元素被认为是在父层叠上下文的层叠顺序中
      - 创建
          1. 天生派：页面根元素天生具有层叠上下文，称为根层叠上下文
              - 根层叠上下文指的是页面根元素，可以看成是 `<html>` 元素。因此，页面中所有的元素一定处于至少一个“层叠结界”中
          2. 正统派：z-index 值为数值的定位元素的传统“层叠上下文”
              - 对于 position 值为 relative/absolute 以及 Firefox/IE 浏览器( 不包括 Chrome 浏览器 )下含有 position:fixed 声明的定位元素，当其 z-index 值不是 auto 的时候，会创建层叠上下文
          3. 扩招派：其他 CSS3 属性
      - CSS3 新属性对层叠上下文的影响    
          1. 元素为 flex 布局元素( 父元素 display:flex|inline-flex )，同时 z-index值不是 auto
          2. 元素的 opacity 值不是 1
          3. 元素的 transform 值不是 none
          4. 元素 mix-blend-mode 值不是 normal
          5. 元素的 filter 值不是 none
          6. 元素的 isolation 值是 isolate
          7. 元素的 will-change 属性值为上面 2～6 的任意一个
    - 层叠水平 (stacking level)
    - 层叠顺序 (stacking order)
      - 准则
          1. 谁大谁上，同一个叠层上下文领域中，层叠水平值大的覆盖小的
          2. 后来居上，层叠水平一致，层叠顺序相同，DOM流后面的覆盖前面的
      - CSS2.1 层叠顺序 ( 序号从小到大 ) ( 装饰 < 布局 < 内容 )
          1. 层叠上下文 background/border
          2. 负 z-index
          3. block 块状水平盒子
          4. float 浮动盒子
          5. inline 水平盒子
          6. z-index: auto 或看成 z-index: 0，不依赖 z-index 的层叠上下文
          7. 正 z-index
  - direction
    - 值：
        1. ltr
        2. rtl
    - 可以改变替换元素或者 inline-block/inline-table 元素的水平呈现顺序
    - 配合 rtl 可以实现单行文字溢出，左侧显示 ...
  - unicode-bidi
    - 作用就是明确字符出现“双向性”时应当有的表现
    - 值：
        1. normal: 默认，假设设置了 direction:rtl，则图片、按钮以及问号、加号之类的字符会从右往左显示，但是中文、英文字符还是从左往右显示
        2. embed: embed 属性值要想起作用，只能作用在内联元素上。在通常情况下，embed属性值的表现和 normal 是一样的。它们的区别，embed 属性值的字符排序是独立内嵌的，不受外部影响
        3. bidi-override: 通常样式表现为所有的字符都按照统一的 direction 顺序排列
  - writing-mode
    - 值：
      1. horizontal-tb ( 默认 ) ( 水平：top-bottom )
      2. vertical-rl ( 垂直：right-left )
      3. vertical-lr ( 垂直：left-right )
    - 实现效果：单个文字下沉
  - display
    - flex
    - grid
    - contents
---
+ CSS3
  - @
      1. @keyframes
      2. @import
      3. @media
      4. @supports
  - 选择器
    - 普通
        1. #id
        2. .class
        3. tagname
        4. *
        5. " " (空格)
        6. ,
        7. `>`
        8. +
        9. ~
    - 属性选择器
        1. [att="val"]
        2. [att*="val"] 包含，存在即可
        3. [att^="val"] 开头，存在即可
        4. [att$="val"] 结尾，存在即可
        5. [att~="val"] 包含，独立的单词
        6. [att|="val"] 开头，完整的或 "-" 分隔
    - 结构性伪类选择器
        1. :root
        2. :not
        3. :empty
        4. :target
        5. :first-child
        6. :last-child
        7. :nth-child(odd | even | an | an+b)
        8. :nth-last-child
        9. :nth-of-type
        10. :nth-last-of-type
        11. :only-child
    - 元素状态伪类选择器
        1. :hover
        2. :active
        3. :focus
        4. :enabled
        5. :disabled
        6. :read-only
        7. :read-write
        8. :checked
        9. :default
        10. :indeterminate
    - 伪元素
        1. ::before
        2. ::after
        3. ::first-line
        4. ::first-letter
        5. ::selection
        6. ::cue
        7. ::backdrop
        8. ::placeholder
        9. ::marker
        10. ::spelling-error
        11. ::grammar-error
  - 共用属性值
      1. initial
      2. inherit
      3. auto
      4. unset
  - 属性
    - transform
      - 值：
          1. rotate() // rotate(60deg)
              - rotate3d() / rotateX() / rotateY() / rotateZ()
          2. skew() // skew(30deg, -45deg)
              - skewX() / skewY()
          3. translate() // translate(200px, -100px)
              - translate3d() / translateX() / translateY() / translateZ()
          4. scale() // scale(0.5, 1.5)
              - scale3d() / scaleX() / scaleY() / scaleZ()
          5. matrix()
              - matrix3d()
          6. perspective()
              - 如果transform：perspective设置在子级元素中，对每个子级进行单独的视角设置，注意要复合写属性，且注意顺序
      - transform-origin 变形原点
        - 值：transform-origin: xPosition yPosition
      - perspective 景深
        - 父元素设置，以父元素的 perspective-origin 查看所有子元素
      - perspective-origin 父级属性，视角原点
        - 值：perspective-origin: xPosition yPosition
      - transform-style 父级属性，其子元素位于 2d 空间 / 3d 平面中
        - 值：preserve-3d | flat
      - backface-visibility: visible | hidden
      - transform-box
    - transition
      - 缩写：transition: property duration timing-function delay, ... ... ... ..., ......;
      - transition-property
      - transition-duration
      - transition-timing-function
      - transition-delay
    - animation
      - 缩写：animation: name duration timing-function delay iteration-count direction fill-mode play-state;
      - animation-name
      - animation-duration
      - animation-timing-function
      - animation-delay
      - animation-iteration-count
      - animation-direction: normal | reverse | alternate | alternate-reverse
      - animation-fill-mode
      - animation-play-state
      - @keyframes
    - opacity
      - 整个元素的透明度
    - outline
      - outline-color
      - outline-style
      - outline-width
      - outline-offset
    - resize
      - 需要设置 overflow: hidden | auto | scroll
      - 值：
          1. none
          2. both
          3. horizontal
          4. vertical
          5. inherit
    - box-shadow
      - 内阴影，box-shadow: inset ........
  - Media Queries
    - @media 设备类型 and (设备特性) { 样式 }
    - 设备类型：
        1. all
        2. screen
        3. print
        4. speech
    - 设备特性：
        1. max/min-height/width
        2. device-width/height
        3. max/min-resolution (dppx：设备像素与CSS像素比)
  - 其他属性
    - text-outline
    - hanging-punctuation
    - punctuaction-trim
    - white-space-collapse
    - nav-index
    - nav-up
    - nav-right
    - nav-down
    - nav-left
    - filter
      - 值：
          1. grayscale(): 灰度
          2. sepia(): 褐色滤镜
          3. saturate(): 饱和度
          4. hue-rotate(): 色相
          5. invert(): 反色
          6. opacity(): 透明度
          7. brightness(): 亮度
          8. contrast(): 对比度
          9. blur(): 模糊
          10. drop-shadow(): 给元素或图片非透明区域添加投影
          11. url(): SVG滤镜
    - mask
  - SVG
    - 插入方式：
        1. 通过 img
        2. 通过 object
        3. 设置为背景
        4. 内联
---
+ CSS4
  - 选择器
      1. :has
---
+ WebAssembly
 - asm.js
 - C/C++/...

## Back-end
+ Java
+ Python
+ Go
+ PHP
+ C/C++

# Mobile Web
## Layout
  + 与 PC 端的区别
    - 硬件配置相对有限
    - 屏幕大小有限
  + Media Queries
    - 语法：
        - ```css
          @media [media_query] media_type and media feature {}
          ```
        - media_query: only | not
    - ```html
      <link
        rel="stylesheet"
        type="text/css"
        media="only screen and (max-width: 480px), only screen and (max-device-width: 480px)"
        href="xxx/xxx/xxx.xxx/css"
      >
      ```
  + viewport
    - ```html
      <!-- 虚拟窗口宽度为设备宽度，初始缩放倍数为 1，不允许用户手动缩放 -->
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,userscalable=0"
      >
      ```
    - content 值：
        1. width
        2. height
        3. initial-scale
        4. maximum-scale
        5. minimum-scale
        6. user-scalable

# Web Front-end
## Browsers
+ 内核
    1. Trident: IE
      - 排版引擎：Trident
      - JS引擎：JScript(3~8), Chakra(9~10+)
    2. Gecko: FireFox
      - 排版引擎：Gecko
      - JS引擎：SpiderMonkey(1.0~3.0), TraceMonkey(3.5~3.6), JagerMonkey(4.0+)
    3. Presto: ( 已废弃 )
    4. Webkit: Safari
      - 排版引擎：KHTML(早期), WebCore
      - JS引擎：KJS(早期), JavaScriptCore, Nitro
    5. Blick: Chrome, Opera
      - JS引擎：V8
## Technology
+ Service Workers
  - 出于安全原因，必须在 HTTPS 下运行；localhost 也被浏览器认为是安全源
  - ```js
    navigator.serviceWorker.register('./serviceWorker.js', {scope: './'})
      .then()
      .catch();
    ```
+ WebAssembly
  - AssemblyScript
  - Emscript
  - asm.js
+ WebMessaging
+ Flutter
  - Dart
+ indexedDB
  - apis

## Web Object
+ Worker
+ SharedWorker
+ ServiceWorker
+ SharedArrayBuffer
+ ArrayBuffer
+ FileReader
+ FormData
+ Blob
+ MutationObserver
+ Event
+ history APIs
  - pushState(state, title, url) // pushState({name: xxx}, null, url)
  - replaceState(state, title, url) // pushState(null, null, url)
+ Selection/Range
+ postMessage()

## HTML5
### Canvas
  + 2d
  + WebGL
  + WebGL2
### SVG

## Plugins
+ Three.js (WebGL)
+ D3.js (network chart)
+ Cytoscape.js (network chart)
+ SheetJS/js-xlsx (excel/import&export)


# Back-end
## Node.js
+ Third-part Modules
  - mongodb
  - cheerio
  - request
  - express
  - koa
+ Native Modules
  - assert
  - fs
  - path
  - readline

## DataBsae
+ Mysql
+ MongoDB

# Code Manage
## Github
## Git
+ git help
