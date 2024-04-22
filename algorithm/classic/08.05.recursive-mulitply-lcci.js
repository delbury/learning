/**
 * 递归乘法。
 * 写一个递归函数，不使用 * 运算符，实现两个正整数的相乘。
 * 可以使用加号、减号、位移，但要吝啬一些。
 *
 * 示例1:
 *  输入：A = 1, B = 10
 *  输出：10
 *
 * 示例2:
 *  输入：A = 3, B = 4
 *  输出：12
 *
 * 提示:
 * 保证乘法范围不会溢出
 */

const multiply = function (a, b) {
  let sum = 0;
  let t = b;
  let count = 0;
  while (t) {
    const bit = t & 1;
    if (bit) {
      sum += a << count;
    }
    t >>= 1;
    count++;
  }
  return sum;
};

const { log, logAssert, logAssertDisorder } = require('../tools/LogTools.js');
logAssert(multiply, 1, 10, 10);
logAssert(multiply, 3, 4, 12);
