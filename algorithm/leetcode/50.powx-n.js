/**
 * 实现 pow(x, n) ，即计算 x 的整数 n 次幂函数（即，xn ）。
 *
 * 示例 1：
 * 输入：x = 2.00000, n = 10
 * 输出：1024.00000
 *
 * 示例 2：
 * 输入：x = 2.10000, n = 3
 * 输出：9.26100
 *
 * 示例 3：
 * 输入：x = 2.00000, n = -2
 * 输出：0.25000
 * 解释：2-2 = 1/22 = 1/4 = 0.25
 *
 * 提示：
 * -100.0 < x < 100.0
 * -2^31 <= n <= 2^31-1
 * n 是一个整数
 * 要么 x 不为零，要么 n > 0 。
 * -10^4 <= xn <= 10^4
 *  */

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
const myPow = function (x, n) {
  let res = 1;
  if (!n) return res;
  let neg = false;
  if (n < 0) {
    neg = true;
    n = -n;
  }
  const queue = [];
  while (n) {
    if (n % 2 === 1) {
      queue.push(1);
      n -= 1;
    } else {
      queue.push(2);
      n /= 2;
    }
  }
  while (queue.length) {
    const v = queue.pop();
    if (v === 1) res *= x;
    else if (v === 2) res *= res;
  }
  if (neg) {
    res = 1 / res;
  }
  return res;
};

const { log, logAssert, logAssertFloat } = require('../tools/LogTools.js');
logAssert(myPow, 2, 10, 1024);
logAssert(myPow, 2, 11, 2048);
logAssertFloat(myPow, 2.1, 3, 9.261);
logAssert(myPow, 2, -2, 0.25);
