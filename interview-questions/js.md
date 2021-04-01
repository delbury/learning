## 题目

### 一道Promise 面试题
[从一道让我失眠的 Promise 面试题开始，深入分析 Promise 实现细节](https://juejin.cn/post/6945319439772434469)

```js
Promise.resolve().then(() => {
  console.log(0); // mt1
  return Promise.resolve(4); // mt8
}).then((res) => {
  console.log(res); // mt2
})

Promise.resolve().then(() => {
  console.log(1); // mt3
}).then(() => {
  console.log(2); // mt4
}).then(() => {
  console.log(3); // mt5
}).then(() => {
  console.log(5); // mt6
}).then(() =>{
  console.log(6); // mt7
})

// output: 0、1、2、3、4、5、6 (chrome)
```

```js
function mutationCallback(mutationRecords, observer) {
  console.log('mt1')
}

const observer = new MutationObserver(mutationCallback)
observer.observe(document.body, { attributes: true })

Promise.resolve().then(() => {
  console.log('mt2')
  setTimeout(() => {
    console.log('t1')
  }, 0)
  document.body.setAttribute('test', "a")
}).then(() => {
  console.log('mt3')
})

setTimeout(() => {
  console.log('t2')
}, 0)

// output: mt2, mt1, mt3, t2, t1
```


### 事件循环 (Event Loop)
  [我以为我很懂Promise，直到我开始实现Promise/A+规范 | 技术点评](https://juejin.cn/post/6937076967283884040)
  - 宏任务 (Task)
    - setTimeout
    - setInterval
    - MessageChannel
    - I/0（文件，网络）相关API
    - DOM事件监听：浏览器环境
    - setImmediate：Node环境，IE好像也支持（见caniuse数据）

  - 微任务 (Microtask)
    - requestAnimationFrame：浏览器环境
    - MutationObserver：浏览器环境
    - Promise.prototype.then, Promise.prototype.catch, Promise.prototype.finally
    - process.nextTick：Node环境
    - queueMicrotask

  对于Task而言，任务注册时就会进入队列，只是任务的状态还不是runnable，不具备被Event Loop捞起的条件。

  Promise的微任务在 `.then / .catch` 时被注册。
  Promise状态发生转移的时候变成 runnable。

