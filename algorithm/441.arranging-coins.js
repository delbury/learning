/**
 * 你总共有 n 枚硬币，你需要将它们摆成一个阶梯形状，第 k 行就必须正好有 k 枚硬币。
 * 给定一个数字 n，找出可形成完整阶梯行的总行数。
 * n 是一个非负整数，并且在32位有符号整型的范围内。
 * 
 * 示例 1:
 * n = 5
 * 硬币可排列成以下几行:
 * ¤
 * ¤ ¤
 * ¤ ¤
 * 因为第三行不完整，所以返回2.
 * 
 * 示例 2:
 * n = 8
 * 硬币可排列成以下几行:
 * ¤
 * ¤ ¤
 * ¤ ¤ ¤
 * ¤ ¤
 * 因为第四行不完整，所以返回3.
 * 
 * @param {number} n
 * @return {number}
 */

// 1. 模拟
var arrangeCoinsII = function(n) {
  let row = 1;
  while(row < n) {
    n -= row;
    row++;
  }
  return n === row ? row : row - 1;
};

// 2. 数学
// 求和公式：x <= sqrt(2 * n + 0.25) - 0.5
var arrangeCoins = function(n) {
  return Math.floor(Math.sqrt(2 * n + 0.25) - 0.5);
};

const { logAssert } = require('./tools/LogTools.js');
logAssert(arrangeCoins, 5, 2);
logAssert(arrangeCoins, 8, 3);
logAssert(arrangeCoins, 10, 4);
