/**
 * 三步问题。有个小孩正在上楼梯，楼梯有n阶台阶，小孩一次可以上1阶、2阶或3阶。
 * 实现一种方法，计算小孩有多少种上楼梯的方式。
 * 结果可能很大，你需要对结果模1000000007。
 *
 * 示例1:
 *  输入：n = 3
 *  输出：4
 *  说明: 有四种走法
 *
 * 示例2:
 *  输入：n = 5
 *  输出：13
 *
 * 提示:
 * n范围在[1, 1000000]之间
 */

/**
 * @param {number} n
 * @return {number}
 */

// f(n) = f(n - 1) + f(n - 2) + f(n - 3)
const waysToStep = function (n) {
  const dp = [];
  dp[0] = null;
  dp[1] = 1;
  dp[2] = 2;
  dp[3] = 4;
  for (let i = 4; i <= n; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2] + dp[i - 3]) % 1000000007;
  }
  return dp[n];
};

const { log, logAssert, logAssertDisorder } = require('../tools/LogTools.js');
// logAssert(waysToStep, 3, 4);
// logAssert(waysToStep, 5, 13);
// logAssert(waysToStep, 61, 2);
logAssert(waysToStep, 61, 8607945812375585);
logAssert(waysToStep, 76, 176653584);
