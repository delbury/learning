/**
 * 给定一个整数，编写一个函数来判断它是否是 2 的幂次方。
 * 
 * 示例 1:
 * 输入: 1
 * 输出: true
 * 解释: 20 = 1
 * 
 * 示例 2:
 * 输入: 16
 * 输出: true
 * 解释: 24 = 16
 * 
 * 示例 3:
 * 输入: 218
 * 输出: false
 * 
 * 
 * @param {number} n
 * @return {boolean}
 */

// 1. 数值运算
var isPowerOfTwo = function (n) {
  while (true) {
    if (n === 1) return true;
    if (n < 1) return false;
    if (n / 2 !== n >> 1) return false;

    n >>= 1;
  }
};

// 2. 位运算
var isPowerOfTwoII = function (n) {
  return n <= 0 ? false : !(n & (n - 1));
};

// 3. 位运算2
var isPowerOfTwoIII = function (n) {
  return n <= 0 ? false : n === (n & -n);
};

console.log(isPowerOfTwoIII(1));
console.log(isPowerOfTwoIII(16));
console.log(isPowerOfTwoIII(218));
console.log(isPowerOfTwoIII(0));
console.log(isPowerOfTwoIII(-16));
