/**
 * 使用 ES6 Proxy / Reflect 实现数据监听，13种方法
 * new Proxy(target, handler)
 * 
 *   receiver: 最初被调用的对象。通常是 proxy 本身，但 handler 的 set 方法也有可能在原型链上，或以其他方式被间接地调用（因此不一定是 proxy 本身）。
 * 
 * ProxyHandler:
 *   get(target, propKey, receiver)
 *     ：拦截对象属性的读取，比如proxy.foo和proxy['foo']。
 *   set(target, propKey, value, receiver)
 *     ：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
 *   has(target, propKey)
 *     ：拦截propKey in proxy的操作，返回一个布尔值。
 *   deleteProperty(target, propKey)
 *     ：拦截delete proxy[propKey]的操作，返回一个布尔值。
 *   ownKeys(target)
 *     ：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，
 *       返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
 *   getOwnPropertyDescriptor(target, propKey)
 *     ：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
 *   defineProperty(target, propKey, propDesc)
 *     ：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
 *   preventExtensions(target)
 *     ：拦截Object.preventExtensions(proxy)，返回一个布尔值。
 *   getPrototypeOf(target)
 *     ：拦截Object.getPrototypeOf(proxy)，返回一个对象。
 *   isExtensible(target)
 *     ：拦截Object.isExtensible(proxy)，返回一个布尔值。
 *   setPrototypeOf(target, proto)
 *     ：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
 *   apply(target, object, args)
 *     ：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
 *   construct(target, args)
 *     ：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。
 * 
 * Reflect:
 *   Reflect.apply(target, thisArg, args)
 *   Reflect.construct(target, args)
 *   Reflect.get(target, name, receiver)
 *   Reflect.set(target, name, value, receiver)
 *   Reflect.defineProperty(target, name, desc)
 *   Reflect.deleteProperty(target, name)
 *   Reflect.has(target, name)
 *   Reflect.ownKeys(target)
 *   Reflect.isExtensible(target)
 *   Reflect.preventExtensions(target)
 *   Reflect.getOwnPropertyDescriptor(target, name)
 *   Reflect.getPrototypeOf(target)
 *   Reflect.setPrototypeOf(target, prototype)
 * 
 */

// 响应式化
const reactive = (obj) => {
  // 递归对象子属性
  // for(let k in obj) {
  //   if(Object.prototype.hasOwnProperty.call(obj, k) && typeof obj[k] === 'object') {
  //     obj[k] = reactive(obj[k]);
  //   }
  // }
  return new Proxy(obj, {
    set(target, key, value, receiver) {
      console.log(`set ${key}: ${target[key]} => ${value}`);
      Reflect.set(target, key, value, receiver);
    },
    get(target, key, receiver) {
      console.log(`get ${key}: => ${target[key]}`);
      const sub = Reflect.get(target, key, receiver);
      return typeof sub === 'object' ? reactive(sub) : sub;
    },
    has(target, key) {
      const res = Reflect.has(target, key);
      console.log(`has ${key}: => ${res}`);
      return res;
    },
    deleteProperty(target, key) {
      const res = Reflect.deleteProperty(target, key);
      console.log(`delete ${key}: => ${res}`);
      return res;
    },
    ownKeys(target) {
      const res = Reflect.ownKeys(target);
      console.log(`ownKeys: => ${res}`);
      return res;
    },
    // ...
  });
};

const obj = { name: 'huhuhu', age: 18, info: { msg: 'something' }, list: [1, 2, 3, { data: 'ok' }] }
const reactiveObj = reactive(obj);
reactiveObj.age++;
reactiveObj.weight = 150;
'age' in reactiveObj;
Reflect.has(reactiveObj, 'ages');
delete reactive.nothing;
Reflect.deleteProperty(reactiveObj, 'age');
for(let k in reactiveObj) {}
Object.keys(reactiveObj);

// reactiveObj.info.msg = 'changed';
// console.log(reactiveObj);

// const obj2 = {}
// Reflect.setPrototypeOf(obj2, reactiveObj)
// obj2.age++;