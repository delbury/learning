/**
 * 给定无序数组arr，返回其中最长的连续序列的长度(要求值连续，
 * 位置可以不连续,例如 3,4,5,6为连续的自然数）
 * 
 * max increasing subsequence
 * @param arr int整型一维数组 the array
 * @return int整型
 */
// 1. 排序
function MLSI( arr ) {
  // write code here
  arr.sort((a, b) => a - b);
  let max = 1, count = 1;
  let l = 0, r = 1;
  while(l < arr.length && r < arr.length) {
    if(arr[r] === arr[l]) {
      r++;
    } else if(arr[r] - arr[l] === 1) {
      l = r;
      r++;
      count++;
      max = Math.max(max, count);
    } else {
      l = r;
      r = r + 1;
      count = 1;
    }
  }
  return max;
}

// 2. hash
function MLSII(arr) {
  const set = new Set();
  arr.forEach(n => set.add(n));
  let max = 0;
  for(const n of arr) {
    if(!set.has(n - 1)) {
      // 边界数字
      let count = 1;
      let t = n;
      while(set.has(++t)) {
        count++;
      }
      max = Math.max(max, count);
    }
  }
  return max;
}

// 3. map
function MLS(arr) {
  const map = new Map();
  let max = 0;
  for(const n of arr) {
    if(!map.has(n)) {
      const left = map.get(n - 1) || 0;
      const right = map.get(n + 1) || 0;
      const self = left + right + 1;
      max = Math.max(self, max);
      map.set(n, self);
      map.set(n - left, self);
      map.set(n + right, self);
    }
  }
  return max;
}

module.exports = {
  MLS : MLS
};

const { logAssert, logAssertDisorder } = require('../tools/LogTools.js');
logAssert(MLS, [2,5,7,1,3,7,2,4,7], 5);
// 1,2,3,5,6,7,4,0