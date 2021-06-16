/**
 * 编写一个程序判断给定的数是否为丑数。
 * 丑数就是只包含质因数 2, 3, 5 的正整数。

 * 示例 1:
 * 输入: 6
 * 输出: true
 * 解释: 6 = 2 × 3
 * 
 * 示例 2:
 * 输入: 8
 * 输出: true
 * 解释: 8 = 2 × 2 × 2
 * 
 * 示例 3:
 * 输入: 14
 * 输出: false 
 * 解释: 14 不是丑数，因为它包含了另外一个质因数 7。
 * 
 * 说明：
 * 1 是丑数。
 * 输入不会超过 32 位有符号整数的范围: [−231,  231 − 1]。
 * 
 * @param {number} num
 * @return {boolean}
 */

// 1.
var isUgly = function (num) {
  if (num < 1) return false;
  // const set = new Set([2, 3, 5]);
  while (num > 1) {
    let flag = false;
    for (let n of [2, 3, 5]) {
      if (num % n === 0) {
        flag = true;
        num /= n;
      }
    }
    if (!flag) return false;
  }

  return true;
};

// 2. 包含所有质因数
var isUglyAll = function (num) {
  if (num < 1) return false;
  // 生成质数
  const set = new Set(Array.from({ length: num - 1 }, (v, k) => k + 2));
  const values = set.values();
  let min = values.next().value;
  while (min) {
    for (let n of set) {
      if (n > min && n % min === 0) {
        set.delete(n);
      }
    }
    min = values.next().value;
  }

  while (num > 1) {
    let flag = false;
    for (let n of set) {
      if (num % n === 0) {
        flag = true;
        num /= n;
      }
    }
    if (!flag) return false;
  }

  return true;
};

const { logAssert } = require('./tools/LogTools.js');
logAssert(isUgly, 6, true);
logAssert(isUgly, 8, true);
logAssert(isUgly, 14, false);
logAssert(isUgly, -2147483648, false);

