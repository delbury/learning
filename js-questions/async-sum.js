/**
 * 异步求和函数
 * 提供一个异步 asyncAdd 方法，需要实现一个 await sum(...args) 函数
 */

const asyncAdd = (a, b, cb) => {
  setTimeout(() => {
    cb(null, a + b);
  }, 1000);
};

// Promise 两数之和
const sum = async (a, b) => {
  return new Promise((resolve, reject) => {
    asyncAdd(a, b, (err, res) => {
      if(err) {
        reject(err);
      } else {
        resolve(res);
      }
    })
  })
};

// 多数之和，两两相加，Promise.all
const sums = async (...args) => {
  if(args.length <= 1) return args[0];
  const promises = [];
  for(let i = 0; i < args.length; i += 2) {
    promises.push(sum(args[i], args[i + 1] || 0));
  }
  return sums(...await Promise.all(promises));
};


// 测试
(async function() {
  console.log(await sum(2, 9));
}());
(async function() {
  console.log(await sums(1, 2, 3));
}());
(async function() {
  console.log(await sums(1, 2, 3, 4));
}());
(async function() {
  console.time();
  console.log(await sums(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));
  console.timeEnd();
}());
