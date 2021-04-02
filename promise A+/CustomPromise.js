/**
 * 实现 Promise A+ 规范
 */

// 状态常量
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

// 自定义 Promise
class CustomPromise {
  #status = PENDING; // 初始状态
  #value = null; // 成功之后的值
  #reason = null; // 失败的原因
  #onFulfilledCallbacks = []; // 缓存成功时的回调
  #onRejectedCallbacks = []; // 缓存失败时的回调
  constructor(executor) {
    // executor 执行器
    // 传入 resolve 和 reject 方法
    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      // 错误处理
      this.reject(error);
    }
  }

  // 更改成功后的状态
  resolve = (value) => {
    if(this.#status === PENDING) {
      this.#value = value; // 修改成功后的值
      this.#status = FULFILLED; // 修改为成功后的状态

      // 执行成功回调
      while(this.#onFulfilledCallbacks.length) {
        this.#onFulfilledCallbacks.shift()(value); // 执行成功回调
      }
    }
  }

  // 更改失败后的状态
  reject = (reason) => {
    if(this.#status === PENDING) {
      this.#reason = reason; // 修改失败的原因值
      this.#status = REJECTED; // 修改为失败后的状态

      // 执行失败回调
      while(this.#onRejectedCallbacks.length) {
        this.#onRejectedCallbacks.shift()(reason); // 执行成功回调
      }
    }
  }

  then(onFulfilled, onRejected) {
    // 如果不传，就使用默认函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };

    // 链式调用，返回一个 promise
    const promise = new CustomPromise((resolve, reject) => {
    // 判断状态
      if(this.#status === FULFILLED) {
        queueMicrotask(() => {
          try {
            const t = onFulfilled(this.#value);
            resolvePromise(promise, t, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      } else if(this.#status === REJECTED) {
        queueMicrotask(() => {
          try {
            const t = onRejected(this.#reason);
            resolvePromise(promise, t, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      } else if(this.#status === PENDING) {
        this.#onFulfilledCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              const t = onFulfilled(this.#value);
              resolvePromise(promise, t, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
        this.#onRejectedCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              const t = onRejected(this.#reason);
              resolvePromise(promise, t, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    });

    return promise;
  }

  // 静态方法
  static resolve(param) {
    if(param instanceof CustomPromise) {
      return param;
    }

    return new CustomPromise((resolve) => resolve(param));
  }
  static reject(reason) {
    return new CustomPromise((resolve, reject) => reject(reason));
  }
  static deferred = function() {
    const result = {};
    result.promise = new CustomPromise(function(resolve, reject) {
      result.resolve = resolve;
      result.reject = reject;
    });
    
    return result;
  }
}

function resolvePromise(promise, x, resolve, reject) {
  // 如果相等了，说明return的是自己，抛出类型错误并返回
  if (promise === x) {
    return reject(new TypeError('The promise and the return value are the same'));
  }

  if (typeof x === 'object' || typeof x === 'function') {
    // x 为 null 直接返回，走后面的逻辑会报错
    if (x === null) {
      return resolve(x);
    }

    let then;
    try {
      // 把 x.then 赋值给 then 
      then = x.then;
    } catch (error) {
      // 如果取 x.then 的值时抛出错误 error ，则以 error 为据因拒绝 promise
      return reject(error);
    }

    // 如果 then 是函数
    if (typeof then === 'function') {
      let called = false;
      try {
        then.call(
          x, // this 指向 x
          // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
          y => {
            // 如果 resolvePromise 和 rejectPromise 均被调用，
            // 或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
            // 实现这条需要前面加一个变量 called
            if (called) return;
            called = true;
            resolvePromise(promise, y, resolve, reject);
          },
          // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
          r => {
            if (called) return;
            called = true;
            reject(r);
          });
      } catch (error) {
        // 如果调用 then 方法抛出了异常 error：
        // 如果 resolvePromise 或 rejectPromise 已经被调用，直接返回
        if (called) return;

        // 否则以 error 为据因拒绝 promise
        reject(error);
      }
    } else {
      // 如果 then 不是函数，以 x 为参数执行 promise
      resolve(x);
    }
  } else {
    // 如果 x 不为对象或者函数，以 x 为参数执行 promise
    resolve(x);
  }
}

module.exports = CustomPromise; // 导出