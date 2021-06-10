// 输出一个数组中出现次数最多的元素和出现的次数
// 一个 for 循环，考虑有多个答案的情况

const fn = (arr) => {
  const map = new Map();
  let max = 0;
  let res = [];
  for(const n of arr) {
    const count = (map.get(n) || 0) + 1;
    if(count > max) {
      res.length = 0;
      res.push(n);
      max = count;
    } else if(max === count) {
      res.push(n);
    }
    map.set(n, count);
  }
  return [res, max];
};

console.log(fn([1, 1, 3, 4, 5, 5]));
console.log(fn([1, 1, 3, 4, 5]));
console.log(fn([1, 1, 3, 3, 5]));
console.log(fn([1, 1, 3, 3, 5]));