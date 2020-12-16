/**
 * 给定一个整数，写一个函数来判断它是否是 4 的幂次方。如果是，返回 true ；否则，返回 false 。
 * 整数 n 是 4 的幂次方需满足：存在整数 x 使得 n == 4x
 * 
 * 提示：
 * -2^31 <= n <= 2^31 - 1
 * 
 * 
 * @param {number} n
 * @return {boolean}
 */

// 1. log
var isPowerOfFour = function (n) {
  return Number.isInteger(Math.log(n) / Math.log(4));
};

// 2. 位运算
var isPowerOfFourII = function (n) {
  return (n > 0) && ((n & (n - 1)) == 0) && ((n & 0xaaaaaaaa) == 0);
};

// 3. 位运算 + 数学
/**
 * 工作原理：mod 的计算过程
 * 我们通过计算 x = 2 ^ 2k mod 3 来理解：
 *  1. 首先 2 ^ 2k = 4 ^ k
 *  2. 则 x 可以写成 x = (3 + 1) ^ k mod 3
 *  3. 进行分解 (3 + 1) ^ k = (3 + 1) * (3 + 1) ^ (k - 1) = 3 * (3 + 1) ^ (k - 1) + (3 + 1) ^ (k - 1)
 *  4. 且 3 * (3 + 1) ^ (k - 1) mod 3 = 0, 则 x = (3 + 1) ^ (k - 1)
 *  5. 综上, x = (3 + 1) ^ 1 mod 3 = 1
 */
var isPowerOfFourIII = function (n) {
  return (n > 0) && ((n & (n - 1)) == 0) && (n % 3 == 1);
};