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


## Node 开启多进程
  - spawn和fork都是返回一个基于流的子进程对象

  - exec和execFile可以在回调中拿到返回的buffer的内容（执行成功或失败的输出）

  - exec是创建子shell去执行命令，用来直接执行shell命令。execFile是去创建任意你指定的文件的进程

  - fork是一种特殊的spawn，可以理解为spawn增强版，返回的子进程对象可以和父进程对象进行通信，通过send和on方法。
  
```js
// exec() 方法返回最大的缓冲区，并等待进程结束，一次性返回缓冲区的内容。
child_process.exec(command[, options], callback)

child_process.execFile(file[, args][, options][, callback])

child_process.spawn(command[, args][, options])

child_process.fork(modulePath[, args][, options])
```

```js
if(cluster.isMaster) {
   cluster.fork(); // -> child_process.fork()
   cluster.fork();
   cluster.fork();
   console.log('主进程', process.pid);
} else {
   const app = http.createServer((req, res) => {
      res.write('pid: ' + process.pid);
      res.end();
   });
   app.listen(3000, () => {
      console.log('子进程', process.pid);
   });
}
```


## Node 热更新原理
```
// 依赖底层操作系统对于文件更改的通知
fs.watch(filename[, options][, listener])

// 轮询的方式监听文件
fs.watchFile(filename[, options], listener)
```
### nodemon
可在检测到目录中的文件更改时自动重新启动节点应用程序

npm package: chokidar --> fs.watch() api



## PM2 原理
### 核心功能
- 多进程管理：
  使用了 Node 的 child_process / cluster 模块功能

- 系统信息监控
- 日志管理


## http 模块

### Socket （套接字）
socket，用来表示一个端点，可以与网络中其他的socket进行连接，然后进行数据的传输。

我们都知道在网络上中可以通过IP地址确定唯一的一台主机，然后主机和主机之间进行通讯。但是准确来说：网络通讯中的双方并不是主机，而是主机中的进程。这就需要确定主机中那个进程进行的网络通讯，因此还需要一个端口号来确定主机中的唯一进程。

IP+PORT的组合就构成了网络中唯一标识符“套接字”。

- 端口号的范围是0-65535：
  - 公认端口（Well Known Ports）：从0到1023，它们紧密绑定（binding）于一些服务。通常这些端口的通讯明确表明了某种服务的协议，例如：80端口实际上总是HTTP通讯。
  - 注册端口（Registered Ports）：从1024到49151。它们松散地绑定于一些服务。也就是说有许多服务绑定于这些端口，这些端口同样用于许多其它目的。例如：许多系统处理动态端口从1024左右开始。
  - 动态和/或私有端口（Dynamic and/or Private Ports）：从49152到65535。理论上，不应为服务分配这些端口。实际上，机器通常从1024起分配动态端口。但也有例外：SUN的RPC端口从32768开始。

- 套接字分类：
  - 流式套接字：提供了面向连接、可靠的数据传输服务，可以非常准确的实现按照顺序接收数据；使用的是TCP进行数据传输，能够保证数据的安全性
  - 数据报套接字：提供无连接的服务，你不需要像流式套接字那样建立一个连接，而只需要将地址信息一同打包然后发出去；使用的是UDP进行传输，延迟小，效率高但是不能保证数据传输的准确性

- Unix 域套接字：
  - 域套接字是一种高级的进程间通信的方法
  - Unix域套接字可以用于同一机器进程间通信
  - 套接字(socket)原是网络通信中使用的术语
  - Unix系统提供的域套接字提供了网络套接字类似的功能
  - Unix 域套接字是一个文件，通过 ls 命令可以看到
  - 两个进程通过读写这个文件就实现了进程间的信息传递。文件的拥有者和权限决定了谁可以读写这个套接字

### server.listen()
```js
server.listen(handle[, backlog][, callback])
server.listen(options[, callback])
server.listen(path[, backlog][, callback]) // 用于 IPC 服务器

// net 模块在 Windows 上使用命名管道支持 IPC，在其他操作系统上则使用 Unix 域套接字。
// 在 Windows 上，本地域是使用命名管道实现的。 路径必须引用 \\?\pipe\ 或 \\.\pipe\ 中的条目。
server.listen([port[, host[, backlog]]][, callback]) // 用于 TCP 服务器
```


## cluster 模块

### 采用了哪种集群模式？
1 个 Node 实例开启多个进程监听同一个端口，通过负载均衡技术分配请求（Master->Worker）

### 多个进程为什么可以监听同一个端口？
一个端口不是被所有的进程全部的监听，仅受到 Master 进程的监听

Master 进程创建一个 Socket 并绑定监听到该目标端口，通过与子进程之间建立 IPC 通道之后，通过调用子进程的 send 方法，将 Socket（链接句柄）传递过去

端口只会被主进程绑定监听一次，但是主进程和子进程在建立 IPC 通信之后，发送 Socket 到子进程实现端口共享，在之后 Master 接收到新的客户端链接之后，通过负载均衡技术再转发到各 Worker 进程

## 多个进程之间如何通信？
进程间通信方式：pipe（管道）、消息队列、信号量、Domain Socket

在 Nodejs 中是通过 pipe（管道）实现的，pipe 作用于之间有血缘关系的进程，通过 fork 传递，其本身也是一个进程，将一个进程的输出做为另外一个进程的输入


## 如何对多个 Worker 进行请求分发
Nodejs 是如何对多个 Worker 进程进行请求分发呢？在 Nodejs 中使用了 RoundRobin 负载均衡策略，简称 RR，它的实现原理是一种无状态的轮询策略，假定每台服务器的硬件资源、处理性能都是相同的，根据进程数量，依次分配，直到所有进程都处理完了，在开始重新计算分配

```js
const cluster = require('cluster');
 
// 策略一：一种轮询的策略，默认值
cluster.schedulingPolicy = cluster.SCHED_RR;
 
// 策略二：由操作系统调度的策略
cluster.schedulingPolicy = cluster.SCHED_NONE;

// 或者通过环境变量 NODE_CLUSTER_SCHED_POLICY 设置：
// env NODE_CLUSTER_SCHED_POLICY="none" node app.js // 有效值包括 rr、none
```

## Master 进程意外退出，Worker 进程会退出吗？
Master 进程退出之后，Worker 进程会自动退出，因为 Cluster 模块自己内部有处理。