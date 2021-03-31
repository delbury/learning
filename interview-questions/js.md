## 题目

### 一道Promise 面试题
[从一道让我失眠的 Promise 面试题开始，深入分析 Promise 实现细节](https://juejin.cn/post/6945319439772434469)
[我以为我很懂Promise，直到我开始实现Promise/A+规范 | 技术点评](https://juejin.cn/post/6937076967283884040)
```js
Promise.resolve().then(() => {
    console.log(0);
    return Promise.resolve(4);
}).then((res) => {
    console.log(res)
})

Promise.resolve().then(() => {
    console.log(1);
}).then(() => {
    console.log(2);
}).then(() => {
    console.log(3);
}).then(() => {
    console.log(5);
}).then(() =>{
    console.log(6);
})

// output: 0、1、2、3、4、5、6 (chrome)
```
