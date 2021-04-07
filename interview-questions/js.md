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

// 在原生 Promise 中 return Promise.reolve(4) 会多创建 2 次微任务进入队列
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


### 设计模式
- 工厂模式
- 单例模式
- 适配器模式
- 代理模式
- 发布/订阅模式
- 策略模式
- 迭代器模式


### 函数柯里化
函数柯里化的是一个为多参函数实现递归降解的方式。其实现的核心是:

1. 要思考如何缓存每一次传入的参数
2. 传入的参数和目标函数的入参做比较
```js
// 利用闭包实现
const curry = (fn) => {
  const params = [];
  const next = (...args) => {
    params.push(...args);
    if(params.length < fn.length ) {
      return next;
    } else {
      return fn.apply(fn, params);
    }
  };
  return next;
};
```

### 数组
forEach
```js
Array.prototype.forEach = function(fn) {
  for(let i = 0; i < this.length; i++>) {
    if(this.hasOwnProperty(i)) {
      fn(this[i], i, this);
    }
  }
};
```
---
map
```js
Array.prototype.map = function(fn) {
  const result = [];
  for(let i = 0; i < this.length; i++>) {
    if(this.hasOwnProperty(i)) {
      result.push(fn(this[i], i, this));
    }
  }
  return result;
};
```
---
filter
```js
Array.prototype.filter = function(fn) {
  const result = [];
  for(let i = 0; i < this.length; i++>) {
    if(this.hasOwnProperty(i) && fn(this[i], i, this))) {
      result.push(this[i]);
    }
  }
  return result;
};
```
---
reduce
```js
Array.prototype.reduce = function(fn, initValue) {
  let result = initValue ? initValue : this[0];
  for(let i = initValue ? 0 : 1; i < this.length; i++) {
    if(this.hasOwnProperty(i)) {
      result = fn(result, this[i], i, this);
    }
  }
  return result;
};
```
---
every
```js
Array.prototype.every = function(fn) {
  for(let i = 0; i < this.length; i++>) {
    if(this.hasOwnProperty(i)) {
      if(!fn(this[i], i, this)) return false;
    }
  }
  return true;
};
```
---
some
```js
Array.prototype.some = function(fn) {
  for(let i = 0; i < this.length; i++>) {
    if(this.hasOwnProperty(i)) {
      if(fn(this[i], i, this)) return true;
    }
  }
  return false;
};
```
---
find
```js
Array.prototype.find = function(fn) {
  for(let i = 0; i < this.length; i++>) {
    if(this.hasOwnProperty(i)) {
      if(fn(this[i], i, this)) return this[i];
    }
  }
  return undefined;
};
```
---
flat
```js
Array.prototype.flat = function(n = 1) {
  n = Math.floor(n);
  const stack = [];
  for(let i = 0; i < this.length; i++) {
    if(this.hasOwnProperty(i)) {
      stack.push(this[i]);
    }
  }
  if(n <= 0) return stack;
  const result = [];
  while(stack.length) {
    const it = stack.shift();
    if(Array.isArray(it)) {
      result.push(...Array.prototype.flat.call(it, n - 1));
    } else {
      result.push(it);
    }
  }
  return result;
};
```

### 图片懒加载 / 惰性函数
实现图片懒加载其核心的思想就是将img的src属性先使用一张本地占位符，或者为空。然后真实的图片路径再定义一个data-set属性存起来，待达到一定条件的时将data-img的属性值赋给src。可以使用 `scroll` 事件或 `IntersectionObserver` API 监听。


### 实现 new 关键字
```js
const customNew = (...args) => {
  const [fn, ...rest] = args;
  const target = Object.create(fn.prototype);
  const res = fn.apply(target, rest);
  if(res && (typeof res === 'object' || typeof res === 'function')) {
    return res;
  }
  return target;
};
```

### 实现 instanceof
instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
```js
const customInstanceof = (left, right) => {
  if(!left || !right) return;
  const rp = right.prototype;
  while(left = Reflect.getPrototypeOf(left)) {
    if(left === rp) return true;
  }
  return false;
};
```


### 原型和原型链
首先，我们需要牢记两点：①__proto__和constructor属性是对象所独有的；② prototype属性是函数所独有的。但是由于JS中函数也是一种对象，所以函数也拥有__proto__和constructor属性，这点是致使我们产生困惑的很大原因之一。

__proto__属性是对象所独有的，都是由一个对象指向一个对象，即指向它们的原型对象（也可以理解为父对象），由这种通过__proto__属性来连接对象直到null的一条链即为我们所谓的原型链。

prototype属性，别忘了一点，就是我们前面提到要牢记的两点中的第二点，它是函数所独有的，它是从一个函数指向一个对象。它的含义是函数的原型对象，也就是这个函数（其实所有函数都可以作为构造函数）所创建的实例的原型对象。

constructor属性也是对象才拥有的，它是从一个对象指向一个函数，含义就是指向该对象的构造函数，每个对象都有构造函数（本身拥有或继承而来）。<br>
Function这个对象比较特殊，它的构造函数就是它自己。<br>
每个对象都可以找到其对应的constructor，因为创建对象的前提是需要有constructor，而这个constructor可能是对象自己本身显式定义的或者通过__proto__在原型链中找到的。而单从constructor这个属性来讲，只有prototype对象才有。<br>
每个函数在创建的时候，JS会同时创建一个该函数对应的prototype对象，`函数创建的对象.__proto__ === 该函数.prototype，该函数.prototype.constructor===该函数本身`。


### call / apply / bind
call
```js
Function.prototype.call = function(...args) {
  const [ctx, ...rest] = args;
  if(!ctx) return this();
  const sy = Symbol();
  ctx[sy] = this;
  const res = ctx[sy](...rest);
  Reflect.deleteProperty(ctx, sy);
  return res;
};
```
---
apply
```js
Function.prototype.apply = function(ctx, rest) {
  const sy = Symbol();
  if(!ctx) return this();
  ctx[sy] = this;
  const res = ctx[sy](...rest);
  Reflect.deleteProperty(ctx, sy);
  return res;
};
```
---
bind
```js
Function.prototype.bind = function(ctx) {
  return (...rest) => {
    if(!ctx) return this();
    const sy = Symbol();
    ctx[sy] = this;
    const res = ctx[sy](...rest);
    Reflect.deleteProperty(ctx, sy);
    return res;
  }
};
```


### 封装数据类型函数
```js
const type = (() => {
  const type = Object.create(null);
  const arr = ['Number, String, Boolean, Object, Array, Symbol, Undefined, Null'];
  for(let text of arr) {
    type[`is${text}`] = function(arg) {
      return Object.prototype.toString.call(arg) === `[object ${text}]`;
    };
  }
  return type;
})();
```


### 自记忆函数
```js
const memory = function(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if(cache[key]) return cache[key];
    cache[key] = fn.apply(fn, args);
  }
}
```


### 是否存在循环引用
```js
const cycle = function(target) {
  const set = new WeakSet(); // 缓存每一个已遍历的对象
  const _cycle = function(obj) {
    if(obj && typeof obj === 'object') {
      if(set.has(obj)) {
        return true;
      } else {
        set.add(obj);
        const keys = Object.keys(obj);
        // 每一个子属性进行递归判断
        return keys.some(key => _cycle(obj[key])); 
      }
    } else {
      return false;
    }
  };
  return _cycle(target);
}
```


### 深拷贝
```js
// 包含处理循环引用
const deepClone = function(obj) {
  const map = new WeakMap(); // 判断是否循环引用的缓存
  const _clone = function(target) {
    let res;
    if(target && typeof target === 'object') {
      // 对象或数组
      if(map.has(target)) {
        // 判断是否循环引用
        return map.get(target);
      } else {
        res = Array.isArray(target) ? [] : {};
        map.set(target, res);
        for(let key in target) {
          res[key] = _clone(target[key]);
        }
      }
    } else if(typeof target === 'function') {
      // 函数
      res = eval(`(${target.toString()})`);
    } else {
      // 基本类型
      res = target;
    }
    return res;
  };
  return _clone(obj);
}
```


### Promise
Promise.finally
```js
Promise.prototype.finally = function(fn) {
  return this.then(
    res => {
      Promise.resolve(fn()).then(r => r);
    },
    err => {
      Promise.reject(fn()).then(e => throw e);
    }
  );
};
```


### async / await
async/await语法糖就是使用Generator函数+自动执行器来运作的。
```js
function customAsync(genFn) {
  return new Promise((resolve, reject) => {
    const gen = genFn(); // 生成迭代器
    const step = (type, args) => {
      let next;
      try {
        next = gen[type](args);
      } catch (e) {
        return reject(e);
      }
      if(next.done) return resolve(next.value);
      Promise.resolve(next.value).then(
        val => step('next', val), 
        err => step('throw', err)
      );
    };
    step('next');
  });
}
```