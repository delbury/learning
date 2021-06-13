# Node
## 异步
异步任务可以分成两种。
1. 追加在本轮循环的异步任务
2. 追加在次轮循环的异步任务

> Node 规定，process.nextTick和Promise的回调函数，追加在本轮循环，即同步任务一旦执行完成，就开始执行它们。而setTimeout、setInterval、setImmediate的回调函数，追加在次轮循环。
>
> Node 执行完所有同步任务，接下来就会执行process.nextTick的任务队列。所以，下面这行代码是第二个输出结果。
> 
> 微任务队列追加在process.nextTick队列的后面，也属于本轮循环。
> 
> 由于setTimeout在 timers 阶段执行，而setImmediate在 check 阶段执行。所以，setTimeout会早于setImmediate完成。

异步方法：
- setTimeout()
- setInterval()
- setImmediate()
- process.nextTick() 它是在本轮循环执行的，而且是所有异步任务里面最快执行的。
- promise

```js
setTimeout(() => console.log(1));
setImmediate(() => console.log(2));
// 上面代码应该先输出1，再输出2，
// 但是实际执行的时候，结果却是不确定，有时还会先输出2，再输出1。
// 这是因为setTimeout的第二个参数默认为0。
// 但是实际上，Node 做不到0毫秒，最少也需要1毫秒，
// 根据官方文档，第二个参数的取值范围在1毫秒到2147483647毫秒之间。
// 也就是说，setTimeout(f, 0)等同于setTimeout(f, 1)。
```

件循环的六个阶段：
1. timers：
   这个是定时器阶段，处理setTimeout()和setInterval()的回调函数。进入这个阶段后，主线程会检查一下当前时间，是否满足定时器的条件。如果满足就执行回调函数，否则就离开这个阶段。
2. I/O callbacks：
   除了以下操作的回调函数，其他的回调函数都在这个阶段执行：
    setTimeout()和setInterval()的回调函数、
    setImmediate()的回调函数、
    用于关闭请求的回调函数，比如socket.on('close', ...)
3. idle, prepare：
   该阶段只供 libuv 内部调用，这里可以忽略。
4. poll：
   这个阶段是轮询时间，用于等待还未返回的 I/O 事件，比如服务器的回应、用户移动鼠标等等。
   这个阶段的时间会比较长。如果没有其他异步任务要处理（比如到期的定时器），会一直停留在这个阶段，等待 I/O 请求返回结果。
5. check：
   该阶段执行setImmediate()的回调函数。
6. close callbacks：
   该阶段执行关闭请求的回调函数，比如socket.on('close', ...)。
   
> 每个阶段都有一个先进先出的回调函数队列。只有一个阶段的回调函数队列清空了，该执行的回调函数都执行了，事件循环才会进入下一个阶段。