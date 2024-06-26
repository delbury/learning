# 面试
## 华为
### 机考
牛客网：两道一星题，一道二星题

二星题：给定一个正整数数字 n 和保留位数 k，从 n 中选择出 k 位数字，保持相对顺序，组成最小的新正整数
```js
const main = (n, k) => {
  let res = '';
  let l = 0;
  let r = n.length - k;

  while (r < n.length) {
    if (l === r) {
      res += n.substring(l);
      break;
    }
    let min = n[l];
    let minIndex = l;
    while (l <= r) {
      if (min > n[l]) {
        min = n[l];
        minIndex = l;
      }
      l++;
    }
    l = minIndex + 1;
    res += min;
    r++;
  }
  console.log(res);
  return +res;
};

console.log(main('7861342', 3)); // 132
console.log(main('7861342', 4)); // 1342
console.log(main('786166342', 4)); // 1342, length: 9
console.log(main('781912481293262132316611233342', 8)); // 1342, length: 9
```

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
```js
const fn = (str) => {
  const gen = function* () {
    let a = 0;
    let b = 1;
    while (true) {
      [a, b] = [b, a + b];
      yield a;
    }
  };
  const g = gen();
  let res = '';
  for (let i = 0; i < str.length; i++) {
    const fi = g.next().value;
    const charCode = str.charCodeAt(i);
    const codeBase = charCode >= 97 ? 97 : 65;
    const offset = (charCode - codeBase + fi) % 26;
    res += String.fromCharCode(codeBase + offset);
  }
  return res;
};
```

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
    <div id="app">{{ msg }}</div>
  */
  const vm = new Vue({
    el: '#app',
    data: {
      msg: '123'
    },
  });
  vm.$el.textContent === '123'; // true
  vm.msg = 'new message';
  vm.$el.textContent === 'new message'; // false
  vm.$nextTick(() => vm.$el.textContent === 'new message'); // true
  // true or false ? 怎么改可以 true ?
  // 使用 vm.$nextTick() 是否可以实现？
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


### HR面
  - 自我介绍
  - 离职原因
  - 其他公司的 Offer ？
    - 华为，为何选择华为
  - 当前薪资，期望薪资
  - 职业规划
  - 是否适应字节的工作强度
  - 项目成就，产出

### 额外面



## 字节跳动
### 一面
- ES6 的新特性，箭头函数与普通函数的区别
- react 的生命周期
- react 的 useCallback() / useMemo() 区别
- 了解 vue3 么，与 vue2 区别
- 了解 typescript 么，ts 是如何定义类型的，type / interface 的区别
- 用过 Promise.all() 么，手写一个
- 算法题：求 str1 和 str2 的最长公共子串

### 二面
- 在项目中负责的相关工作，组件封装，性能优化等
- 为何，CSS 文件放在 head，JS 文件放在 body
- CSS 三栏布局的实现，左 20%，中自适应，右 100px
- 第一次面试二面中的 Vue 题目渲染问题，`vm.msg === 'new message'; vm.$el.textContent === 'new message; // true or false ?`
- 题目：两有序数组合并成一个有序数组，优化：剩余数字直接拼接
- 题目：括号的正确匹配，优化：维护一个左右括号 map

### 三面
- 前端工程化相关的经验
- Webpack 的 Loader 和 Plugin 的实现
- 说一下 PWA
- 说一下 Service Worker 相关的 API
- 离职原因
- 反问

### HR面


## 美团
### 一面
- 页面性能调试，指标，如何查看帧率 // PerformanceObserver
- webpack4/5 的区别
- vue3 为何使用 Proxy
- 最近学习的东西，出于何种考虑 // WebGL
- 项目难点 // 动态 tab、全局弹框容器
- 说一下 html 文件的渲染过程
- 单个元素内，对角线布局的实现方式
- 说一下项目中用过的性能优化
- 说一下 css、js 阻塞页面
- ES6 Map 和 Object 的区别
- vue/react 与 jquery 的区别
- vue3 与 vue2 的区别，虚拟 DOM 的作用，说一下 diff 算法
- promise.catch(onReject).then(onResolve) .then 会不会执行 // 会
- promise 优缺点
- 题目：promise 打印顺序题
- 题目：写一个可重复尝试的 promise 请求方法
- 题目：二叉树的层序遍历，BFS
- 有何没有问到的优势 // 技术预研 node + ffmpeg
- 反问 // 部门情况，具体业务

### 二面
- 项目相关
- requestAnimationFrame、requestIdleCallback 属于哪些任务队列
- react 相关，hooks 原理，class组件和函数组件的区别
  - ```jsx
    class A {
      constructor() {
        this.state = {
          count: 0,
        };
      }
      componentDidUpdate() {
        setTimeout(() => console.log(this.state.count), 3000);
      }
      render() {
        return <button onClick={() => this.setState({
          count: this.state.count + 1,
        })}>click</button>
      }
    }
    // 快速点击按钮 5 次，会打印什么值？
    ```
- 迭代器如何挂起，并继续执行 // 状态保存在堆中
- 浏览器的垃圾回收机制
- 设计模式，AOP
- 浏览器有哪些进程
- 进程、线程、协程区别
- CDN 原理，如何回源
- 反问

# 准备
## 自我介绍

## 反问：
  - 部门具体的业务，工作内容和方向

## HR面
  - 自我介绍
    - 你好，我叫，17年，西南交大毕业，毕业后在上海工作了一年，然后回到成都工作至今。
    - 现就职于四川科瑞（四川九洲旗下的子公司），主要负责数字商业事业部前端相关的工作。
    - 在工作中，主动承担新功能、复杂组件的任务，针对新业务、新需求提出自己的建议；平时也乐于与同事之间进行学习交流。
    - 除了工作中主要使用的相关技术内容外，工作之余也乐于学习新知识、新技能，拓展自身的知识面。
    - 平时也在维护自己的 github，会在上面更新自己的学习成果、笔记等内容。
    - 最后，非常感谢有机会参加这一次的面试。
  - 职业规划
    - 互联网行业是一个高速发展的行业，前端开发作为互联网行业必不可少的一部分，存在大量的机遇与挑战
    - 积极完成工作中的任务，在平时的工作中积累更多经验，完善自身的不足之处
    - 在公司的大平台环境下学习实践更多的新技术，获得更多的新技能，努力开发拓展当前知识与技术能力的广度和深度，创造自身的价值
  - 离职原因
    - 当前公司属于国企下的子公司，平台所限，工作中不会有太多挑战，也就不会有太多机遇
    - 字节拥有庞大的发展平台，正在高速发展中，有更大的机遇，对身为一个互联网行业相关的工作者的我有很大的吸引力
  - 本部门该职位的了解
    - 对接字节全线产品的统一智能客服资讯平台
    - IM 即时通讯软件
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
    - 缺点：有时候过于钻牛角尖，后端相关的还需要好好提升，全局架构能力还有待提升等
  - 何时入职