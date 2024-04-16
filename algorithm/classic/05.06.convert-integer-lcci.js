/**
 * 整数转换。编写一个函数，确定需要改变几个位才能将整数A转成整数B。
 *
 * 示例1:
 *  输入：A = 29 （或者0b11101）, B = 15（或者0b01111）
 *  输出：2
 *
 * 示例2:
 *  输入：A = 1，B = 2
 *  输出：2
 *
 * 提示:
 * A，B范围在[-2147483648, 2147483647]之间
 */

const convertInteger = function (A, B) {
  let diff = A ^ B;
  let count = 0;
  while (diff) {
    count += diff & 1;
    diff >>>= 1;
  }
  return count;
};

const { log, logAssert, logAssertDisorder } = require('../tools/LogTools.js');
// logAssert(convertInteger, 29, 15, 3);
logAssert(convertInteger, 826966453, -729934991, 14);
