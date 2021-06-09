/**
 * Object.defineProperty(obj, key, descriptor) 的数据监听
 *   descriptor: 
 *     enumerable = false: 是否可以枚举
 *     configurable = false: 是否可以删除
 *     writable = false: value 是否可以赋值
 *     value = undefined
 *     set = undefined
 *     get = undefined
 * 
 * 描述符类型，可以拥有的键值：
 *              configurable  enumerable  value  writable  get  set   
 *   数据描述符；     yes          yes      yes     yes     no   no
 *   存取描述符：     yes          yes      no      no      yes  yes
 * 
 * Reflect.definePropety() 失败时返回 false
 */

const setListeners = [];
const getListeners = [];
const reactive = (obj, path = '') => {
  for(let k in obj) {
    if(Object.prototype.hasOwnProperty.call(obj, k)) {
        const curPath = path ? `${path}.${k}` : k;
        if(typeof obj[k] === 'object') {
        obj[k] = reactive(obj[k], curPath);
      } else {
        try {
          Object.defineProperties(obj, {
            // 数据描述符
            [`_${k}`]: {
              configurable: true,
              enumerable: false,
              value: obj[k],
              writable: true,
            },
            // 存取描述符
            [k]: {
              configurable: true,
              enumerable: true,
              // value: obj[k],
              // writable: true,
              get() {
                console.log(`get ${curPath}: => ${this[`_${k}`]}`);
                getListeners.forEach(listener => listener.path === curPath && listener.cb(this[`_${k}`]));
                return this[`_${k}`];
              },
              set(val) {
                console.log(`set ${curPath}: ${this[`_${k}`]} => ${val}`);
                setListeners.forEach(listener => listener.path === curPath && listener.cb(val, this[`_${k}`]));
                this[`_${k}`] = val;
              }
            }
          })
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  return obj;
};

const reactivedObj = reactive({ name: 'hohoho', age: 17, info: { msg: 'hello' }, list: [1, 2, 3, 4, 5, 6] });
reactivedObj.name = 'hehehe';
const age = reactivedObj.age;
reactivedObj.info.other = 'nothing';
reactivedObj.info.msg = 'something';
reactivedObj.list[0] = 233;
reactivedObj.list[3] = 666;
reactivedObj.list[6] = 777;
console.log('before shift *****************');
reactivedObj.list.shift();
console.log('after shift *****************');
console.log(reactivedObj);
// console.log(reactivedObj.name);
// console.log(reactivedObj.age);
// console.log(reactivedObj.info);
// console.log(reactivedObj.info.msg);
// console.log(reactivedObj.info.other);
const watch = (path, { setCb, getCb }) => {
  setListeners.push({ path, cb: setCb });
  getListeners.push({ path, cb: getCb });
};
watch('name', {
  setCb: (newVal, oldVal) => console.log(newVal, oldVal),
  getCb: (val) => console.log(val),
});
reactivedObj.name = 'hihihi';