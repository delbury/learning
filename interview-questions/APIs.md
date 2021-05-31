# 接口
## 事件（Events） 相关 API
```js
/**
 * listener: 必须是一个实现了 EventListener 接口的对象，或者是一个函数
 *   EventListener: { handleEvent: (event) => any }
 * 
 * options?: 一个指定有关 listener 属性的可选参数对象
 *   capture: boolean = false 表示 listener 会在该类型的事件捕获阶段传播到该 EventTarget 时触发
 *   once: boolean = false 表示 listener 在添加之后最多只调用一次，然后移除
 *   passive: boolean = false 设置为 true 时，表示 listener 永远不会调用 preventDefault()
 *   signal?: AbortSignal 该 AbortSignal 的 abort() 方法被调用时，监听器会被移除
 *     const ac = new AbortController();
 *     ac.signal.onabort = ev => console.log(ev)
 *     ac.abort()
 * useCapture: boolean = false
 */
// 绑定事件
target.addEventListener(type, listener, options);
target.addEventListener(type, listener, useCapture);


/**
 * element.addEventListener("mousedown", handleMouseDown, true);
 * 
 * element.removeEventListener("mousedown", handleMouseDown, false);     // 失败
 * element.removeEventListener("mousedown", handleMouseDown, true);      // 成功
 * element.removeEventListener("mousedown", handleMouseDown, { capture: true });      // 成功
 * 
 ********************************************************************************
 *
 * element.addEventListener("mousedown", handleMouseDown, { passive: true });
 *
 * element.removeEventListener("mousedown", handleMouseDown, { passive: true });     // Succeeds
 * element.removeEventListener("mousedown", handleMouseDown, { capture: false });    // Succeeds
 * element.removeEventListener("mousedown", handleMouseDown, { capture: true });     // Fails
 * element.removeEventListener("mousedown", handleMouseDown, { passive: false });    // Succeeds
 * element.removeEventListener("mousedown", handleMouseDown, false);                 // Succeeds
 * element.removeEventListener("mousedown", handleMouseDown, true);                  // Fails
 */
// 解绑事件
target.removeEventListener(type, listener, options);
target.removeEventListener(type, listener, useCapture);


/**
 * 返回值：当该事件是可取消的(cancelable为true)并且至少一个该事件的 事件处理方法 调用了Event.preventDefault()，则返回值为false；否则返回true。
 * 与浏览器原生事件不同，原生事件是由DOM派发的，并通过event loop异步调用事件处理程序，而dispatchEvent()则是同步调用事件处理程序。
 * 在调用dispatchEvent()后，所有监听该事件的事件处理程序将在代码继续前执行并返回。
 */
// 派发事件
cancelled = !target.dispatchEvent(event)


// 创建事件
// CompositionEvent
// Event
// FocusEvent
// InputEvent
// KeyboardEvent
// MouseEvent
// ProgressEvent
// UIEvent
// WheelEvent
// CustomEvent

/**
 * typeArg: string
 * customEventInit?:
 *   detail: any = null
 *   bubbles: boolean = false
 *   cancelable: boolean = false
 */
event = new CustomEvent(typeArg, customEventInit);
```


## 通信相关 API
Transferable: ArrayBuffer、MessagePort 和 ImageBitmap 实现了此接口。
### top 与 iframe/worker 通信
```js
// iframe 页面
topWindow.postMessage(msg, targetOrigin, [transfer]);

// top 页面
selfWinodw.onmessage = function({ data, origin, source }) {};
```

### 使用 Channel Messaging API 通信
```js
// top 页面
const channel = new MessageChannel();
iframeWindow.postMessage(msg, targetOrigin, [channel.port2]);
channel.port1.onmessage = function(ev) {};

// iframe 页面
self.onmessage = function({ ports }) {
  ports[0].onmessage = function(ev) {};
  ports[0].postMessage(msg, transferList);
}
```

### 使用 Broadcast Channel API （同源，任意的 browsing context 订阅）
```js
// 创建或加入某个频道
const bc = new BroadcastChannel(channelKey);

// 发送消息
bc.postMessage(msg);

// 关闭
bc.close();

// 事件
bc.onmessage = function(ev) {};
bc.onmessageerror = function(ev) {};
```


## 如何中断ajax请求？
  > HMLHttpRequest： HMLHttpRequest.abort() 

  > Fetch：new AbortController() | fetch(url, { signal: ac.signal })


## 编码/解码
```js
const url = 'https://www.baidu.com/serch?kw=百度&time=now#hash';
// 将所有字符进行 URI 编码
encodeURIComponent(url); // 'https%3A%2F%2Fwww.baidu.com%2Fserch%3Fkw%3D%E7%99%BE%E5%BA%A6%26time%3Dnow%23hash'

// 将所有非保留字符和转义字符进行 URI 编码
encodeURI(url); // 'https://www.baidu.com/serch?kw=%E7%99%BE%E5%BA%A6&time=now#hash'

decodeURIComponent(encodeURIComponent(url)); // url

decodeURI(encodeURI(url)); // url

// 将字符串编码为 base-64
btoa(url);

// 对经过 base-64 编码的字符串进行解码
atob(btoa(url));
```


## Animation API
```js
/**
 * keyframes: keyframe[]
 *   offset: number [0.0, 1.0];
 *   cssFloat: string;
 *   cssOffset: string;
 * 
 ****** 可以为一个对象，对象的每一个属性值为数组 *******
 *  | {
 *   [key]: value[]
 *  }
 * 
 * options: option[]
 *   id?: string;
 *   delay?: number;
 *   direction?: string;
 *   duration?: number;
 *   easing?: string;
 *   endDelay?: number;
 *   fill?: string;
 *   iterationStart?: number;
 *   iterations?: number;
 ***********************************
 *   composite?: 'add' | 'accumulate' | 'replace';
 *   iterationComposite?: 'add' | 'accumulate' | 'replace';
 *   spacing?: 'distribute' | 'paced';
 */
Element.animate(keyframes, options);
```