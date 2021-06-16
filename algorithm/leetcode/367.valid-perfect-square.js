/**
 * 给定一个正整数 num，编写一个函数，如果 num 是一个完全平方数，则返回 True，否则返回 False。
 * 说明：不要使用任何内置的库函数，如  sqrt。
 * 
 * 示例 1：
 * 输入：16
 * 输出：True
 * 
 * 示例 2：
 * 输入：14
 * 输出：False
 * 
 * 
 * @param {number} num
 * @return {boolean}
 */

// 1. 二分查找
var isPerfectSquare = function (num, start = 2, end = num) {
  if (num === 1) return true;

  const half = (start + end) % 2 === 0 ? (start + end) / 2 : (start + end - 1) / 2;
  const square = half * half;

  if (square === num) {
    return true;
  } else if (start >= end) {
    return false;
  } else {
    return square > num ? isPerfectSquare(num, start, half - 1) : isPerfectSquare(num, half + 1, end);
  }
};

// 2. 完全平方数性质：n * n = 1 + 3 + 5 + 7 + ... + 2 * n - 1
var isPerfectSquareII = function (num) {
  let count = 1;
  let sum = 0;
  while (sum < num) sum += 2 * count++ - 1;

  return num === sum;
};

// 3. 牛顿迭代法
var isPerfectSquareIII = function (num) {
  if (num === 1) return true;
  let x = parseInt(num / 2);
  while (x * x > num) {
    x = parseInt((x + num / x) / 2);
  }

  return x * x === num;
};

const { logAssert } = require('./tools/LogTools.js');
// logAssert(isPerfectSquareIII, 16, true);
// logAssert(isPerfectSquareIII, 1, true);
// logAssert(isPerfectSquareIII, 2, false);
// logAssert(isPerfectSquareIII, 4, true);
logAssert(isPerfectSquareIII, 965, false);