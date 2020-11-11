/**
 * 给你两个整数，n 和 start 。
 * 数组 nums 定义为：nums[i] = start + 2*i（下标从 0 开始）且 n == nums.length 。
 * 请返回 nums 中所有元素按位异或（XOR）后得到的结果。
 *  
 * 示例 1：
 * 输入：n = 5, start = 0
 * 输出：8
 * 解释：数组 nums 为 [0, 2, 4, 6, 8]，其中 (0 ^ 2 ^ 4 ^ 6 ^ 8) = 8 。
 *     "^" 为按位异或 XOR 运算符。
 * 
 * 示例 2：
 * 输入：n = 4, start = 3
 * 输出：8
 * 解释：数组 nums 为 [3, 5, 7, 9]，其中 (3 ^ 5 ^ 7 ^ 9) = 8.
 * 
 * 示例 3：
 * 输入：n = 1, start = 7
 * 输出：7
 * 
 * 示例 4：
 * 输入：n = 10, start = 5
 * 输出：2
 *  
 * 提示：
 * 1 <= n <= 1000
 * 0 <= start <= 1000
 * n == nums.length
 * 
 * 
 * @param {number} n
 * @param {number} start
 * @return {number}
 */

// 1. 遍历
var xorOperation = function (n, start) {
  const arr = Array.from({ length: n }, (v, k) => start + 2 * k);
  return arr.reduce((a, b) => a ^ b);
};

// 2. 不使用额外内存遍历
var xorOperationII = function (n, start) {
  let sum = 0;
  while (n--) {
    sum ^= 2 * n + start;
  }
  return sum;
};

// 3. 数学
var xorOperationIII = function (n, start) {
  let ans = 2 * xor(n, Math.floor(start / 2));
  if (n & start & 1) ans++; // 处理最后一位
  return ans;

  function xor(n, start) { // 将公式转换成情况 1
    if (start & 1) return (start - 1) ^ helper(n + 1, start - 1);
    else return helper(n, start);
  }

  function helper(n, start) { // 情况 1
    if (n % 2 === 0) return Math.floor(n / 2) & 1;
    else return Math.floor(n / 2) & 1 ^ (start + n - 1);
  }
};

const { logAssert } = require('./tools/LogTools.js');
logAssert(xorOperationIII, 5, 0, 8);
logAssert(xorOperationIII, 4, 3, 8);
logAssert(xorOperationIII, 1, 7, 7);
logAssert(xorOperationIII, 10, 5, 2);
