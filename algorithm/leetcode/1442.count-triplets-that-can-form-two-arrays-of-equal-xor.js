/**
 * 给你一个整数数组 arr 。
 * 现需要从数组中取三个下标 i、j 和 k ，其中 (0 <= i < j <= k < arr.length) 。
 * a 和 b 定义如下：
 * a = arr[i] ^ arr[i + 1] ^ ... ^ arr[j - 1]
 * b = arr[j] ^ arr[j + 1] ^ ... ^ arr[k]
 * 注意：^ 表示 按位异或 操作。
 * 请返回能够令 a == b 成立的三元组 (i, j , k) 的数目。
 *  
 * 示例 1：
 * 输入：arr = [2,3,1,6,7]
 * 输出：4
 * 解释：满足题意的三元组分别是 (0,1,2), (0,2,2), (2,3,4) 以及 (2,4,4)
 * 
 * 示例 2：
 * 输入：arr = [1,1,1,1,1]
 * 输出：10
 * 
 * 示例 3：
 * 输入：arr = [2,3]
 * 输出：0
 * 
 * 示例 4：
 * 输入：arr = [1,3,5,7,9]
 * 输出：3
 * 
 * 示例 5：
 * 输入：arr = [7,11,12,9,5,2,7,17,22]
 * 输出：8
 * 
 * 提示：
 * 1 <= arr.length <= 300
 * 1 <= arr[i] <= 10^8
 * 
 * @param {number[]} arr
 * @return {number}
 */

// 1. 暴力
var countTripletsI = function(arr) {
  let res = 0;
  for(let i = 0; i < arr.length; i++) {
    let a = 0;
    for(let j = i + 1; j < arr.length; j++) {
      a ^= arr[j - 1];
      let b = 0;
      for(let k = j; k < arr.length; k++) {
        b ^= arr[k];
        if(a === b) {
          res++;
        }
      }
    }
  }
  return res;
};

// 2. 前缀异或
var countTripletsII = function(arr) {
  // 0 ~ n 的值异或
  const prefix = [];
  prefix[-1] = 0;
  for(let i = 0; i <= arr.length; i++) {
    prefix[i] = prefix[prefix.length - 1] ^ arr[i];
  }
  let res = 0;
  for(let i = 0; i < arr.length; i++) {
    for(let j = i + 1; j < arr.length; j++) {
      for(let k = j; k < arr.length; k++) {
        if(prefix[i - 1] === prefix[k]) {
          res++;
        }
      }
    }
  }
  return res;
};

// 3. O(n^2)
var countTripletsIII = function(arr) {
  const prefix = [0];
  for(let i = 0; i <= arr.length; i++) {
    prefix[i] = prefix[prefix.length - 1] ^ arr[i - 1];
  }
  let res = 0;
  for(let i = 0; i < arr.length; i++) {
    for(let k = i + 1; k < arr.length; k++) {
      if(prefix[i] === prefix[k + 1]) {
        res += k - i;
      }
    }
  }
  return res;
};

// 4. hash: O(n)
// res = (k - i1) + (k - i2) + ... + (k - im) = m * k - (i1 + i2 + ... + im)
var countTriplets = function(arr) {
  const cnt = new Map();
  const tot = new Map();
  let ans = 0, s = 0;
  for (const [k, val] of arr.entries()) {
    const t = s ^ val;
    if (cnt.has(t)) {
      ans += cnt.get(t) * k - tot.get(t);
    }
    cnt.set(s, (cnt.get(s) || 0) + 1);
    tot.set(s, (tot.get(s) || 0) + k);
    s = t;
  }
  return ans;
};

const { logAssert } = require('./tools/LogTools.js');
logAssert(countTriplets, [2,3,1,6,7], 4);
// logAssert(countTriplets, [1,1,1,1,1], 10);