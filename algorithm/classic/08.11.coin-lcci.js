/**
 * 硬币。
 * 给定数量不限的硬币，币值为25分、10分、5分和1分，编写代码计算n分有几种表示法。
 * (结果可能会很大，你需要将结果模上1000000007)
 *
 * 示例1:
 *  输入: n = 5
 *  输出：2
 *  解释: 有两种方式可以凑成总金额:
 * 5=5
 * 5=1+1+1+1+1
 *
 * 示例2:
 *  输入: n = 10
 *  输出：4
 *  解释: 有四种方式可以凑成总金额:
 * 10=10
 * 10=5+5
 * 10=5+1+1+1+1+1
 * 10=1+1+1+1+1+1+1+1+1+1
 *
 * 说明：
 * 注意:
 * 你可以假设：
 * 0 <= n (总金额) <= 1000000
 */

/**
 * @param {number} n
 * @return {number}
 */

// f(n) = f(n - 25) + f(n - 10) + f(n - 5) + f(n - 1)
// 思路：先按面值只有一种开始计算dp数组，然后引入更大的一个面值，重新计算dp数据，直到引入所有面值
const waysToChange = function (n) {
  const dp = [];
  dp[0] = 1;

  const coins = [1, 5, 10, 25];

  // 1, 5, 10, 25
  for (const coin of coins) {
    for (let i = coin; i <= n; i++) {
      dp[i] = ((dp[i] ?? 0) + dp[i - coin]) % 1000000007;
    }
  }

  return dp[n];
};

const { log, logAssert, logAssertDisorder } = require('../tools/LogTools.js');
logAssert(waysToChange, 5, 2);
logAssert(waysToChange, 10, 4);
