/**
 * 给定两个整型数字 N 与 M，以及表示比特位置的 i 与 j（i <= j，且从 0 位开始计算）。
 * 编写一种方法，使 M 对应的二进制数字插入 N 对应的二进制数字的第 i ~ j 位区域，不足之处用 0 补齐。
 *
 * 具体插入过程如图所示。
 *
 * 题目保证从 i 位到 j 位足以容纳 M， 例如： M = 10011，则 i～j 区域至少可容纳 5 位。
 *
 * 示例1:
 *  输入：N = 1024(10000000000), M = 19(10011), i = 2, j = 6
 *  输出：N = 1100(10001001100)
 *
 * 示例2:
 *  输入： N = 0, M = 31(11111), i = 0, j = 4
 *  输出：N = 31(11111)
 */

/**
 * @param {number} N
 * @param {number} M
 * @param {number} i
 * @param {number} j
 * @return {number}
 */
const insertBits = function (N, M, i, j) {
  const str1 = N.toString(2);
  const str2 = M.toString(2).padStart(j - i + 1, '0');

  const res = str1.substring(0, str1.length - j - 1) + str2 + str1.substring(str1.length - i);
  return +`0b${res}`;
};

const { log, logAssert, logAssertDisorder } = require('../tools/LogTools.js');
logAssert(insertBits, 1024, 19, 2, 6, 1100);
