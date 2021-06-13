/**
 * 实现数组中所有负数后移(负数顺序可不用保证)，并保持非负数顺序
 */

// 1. 双循环
const fn1 = (arr) => {
  let c = 1;
  for(let i = arr.length - 1; i >= 0; i--) {
    if(arr[i] < 0) {
      for(let j = i; j < arr.length - c; j++) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
};

// 2. 一次遍历
const fn = (arr) => {
  let p = 0;
  let len = arr.length;
  for(let i = 0; i < len; i++) {
    if(arr[i] >= 0) {
      arr[p] = arr[i];
      p++;
    } else {
      arr.push(arr[i]);
    }
  }
  arr.splice(len, arr.length - len);
  return arr;
};

console.log(fn([1, 2, 3, -5, -8, 4, -2, 5, -9, -2]));