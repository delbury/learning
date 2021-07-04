# 面试
## 华为
### 机考
牛客网：两道一星题，一道二星题

二星题：给定一个正整数数字 n 和保留位数 k，从 n 中选择出 k 位数字，保持相对顺序，组成最小的新正整数

### 性格测试

### 一面
- 性能优化的经验：
  
- 算法题：给定一个数组，从中找出出现次数最多的数和出现的次数 k

### 二面
- 自我介绍：
  
- 介绍一下项目：
  - 具体负责的模块
  - 谈谈审批流程的实现，业务流程

- 前端性能优化的经验：
  - 动画渲染优化
  - 资源 的 preload / prefetch
  - js 的 defer / async

- 谈谈页面渲染：
  - 分层在哪个环节？

- 你了解 CSRF 么？

- 说一说动态规划：

- 说一下 MVVM

- 算法题：字符串对应下标上的字符`s[i]`（区分大小写）根据斐波那契数列向后偏移`f[i]`个字符，遇到z/Z返回开头字符a/A

- 反问：


## 字节跳动
### 一面
- XSS 和 CSRF
- 说一说事件循环
- requestAnimationFrame 执行时机
- 性能优化相关
- Node 如何开启多进程
- Node 热更新
- PM2 原理
- Webpack loader 和 pulgin 的区别
- HTTP1.1 / HTTP2.0 为什么单个连接的 TCP 前一个 HTTP 请求会阻塞/不阻塞下一个 HTTP 请求的发送
- Vue data -> computed -> view 的过程
- Vue（双向绑定） 和 React（setState）的区别
- 手写一个发布/订阅模式 (once 使用包装函数，自解除绑定的方式)

### 二面
- 项目中使用的图片资源(jpg/png)，了解 webp 么？
- 具体说一下 webpack 加载 css 文件的过程
- 遇到的项目难点
- 介绍一下项目
- 说一下工作中的交流学习，对于工作的帮助及体现
- CDN 原理，缓存更新如何实现
- 除了 http 头，浏览器的缓存策略等，还有什么方式更新缓存（文件名）
- 如何更新 CDN 上 index.html 文件
- Node http监控的另一种方式（socket）
- Node 监听多个相同端口的实现方式
- Node Cluster 的主从节点通信，主节点挂掉了，子节点会怎样
- Node 进程间如何通信
- Vue 相关
  ```js
  /*
    <div id="app">{{ textContent }}</div>
  */
  const vm = new Vue({
    el: '#app',
    data: {
      textContent: 'new message'
    },
  });
  vm.$el.textContent === 'new message';
  // true or false ? 怎么改可以 true ?
  // 使用 vm.$nextTick() 是否可以实现？

  // 为 true，在 mounted 及之后就已经挂载
  // textContent 获取的是元素的文本内容
  ```
- 题目：双向链表的指定位置插入和指定位置删除
- 题目：一个无重复元素数组，一个目标 target，找出所有可以使数字和为 target 的组合（数字可以无限制重复选取）
- Node require() 缓存问题（a.js / b.js）
  ```js
  // a.js
  let count = 1;

  setTimeout(() => {
    console.log('a', count);
  }, 1000);

  const setTime = () => {
    count++;
  };

  module.exports = {
    count,
    setTime
  }

  // b.js
  const obj = require('./a.js');

  obj.setTime();
  console.log('b', obj.count);

  setTimeout(() => {
    console.log('b next', obj.count);
  }, 2000);
  ```


### 三面
  - 自我介绍
  - 大学计算机相关的课程
  - 对未来的规划
  - 之前公司的离职原因
  - 项目上遇到的难点
    - 动态tabs组件，弹框容器，ffmpeg 的调用
  - 介绍一下项目
  - 题目：一个数组，找出两个和为 target 的数，有重复的情况？
  - 题目：两个有序数组的合并

# 准备
## 自我介绍

## 反问：
  - 部门具体的业务，工作内容和方向

## HR面
  - 本部门该职位的了解
  - 之前项目中学到的认为重要的东西
    - 沟通能力
    - 确认需求
  - 加入公司，最想学习的是什么
    - 公司所拥有的技术
    - 公司项目上的管理经验
    - 产品的思维，如何做并做好一款产品
  - 独立解决项目问题
    - 查工具文档、百度、谷歌、stackoverflow
    - 写测试 demo，调研不同的工具插件
    - 查看工具的源码，找问题原因和解决思路
  - 是否有其他公司的Offer，为什么选择字节
    - 字节公司是一个大平台的公司，发展前景大
    - 技术氛围浓厚，对我自身的提升有很大帮助
  - 优缺点
    - 优点：善于思考解决问题，尽最大努力做到最好，乐于学习新知识新技术
    - 缺点：有时候过于钻牛角尖，后端相关的还需要好好提升等
  - 何时入职