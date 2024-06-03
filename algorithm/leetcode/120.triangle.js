/**
 * 给定一个三角形 triangle ，找出自顶向下的最小路径和。
 *
 * 每一步只能移动到下一行中相邻的结点上。相邻的结点 在这里指的是 下标 与 上一层结点下标 相同或者等于 上一层结点下标 + 1 的两个结点。
 * 也就是说，如果正位于当前行的下标 i ，那么下一步可以移动到下一行的下标 i 或 i + 1 。
 *
 * 示例 1：
 * 输入：triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
 * 输出：11
 * 解释：如下面简图所示：
 *    2
 *   3 4
 *  6 5 7
 * 4 1 8 3
 * 自顶向下的最小路径和为 11（即，2 + 3 + 5 + 1 = 11）。
 *
 * 示例 2：
 * 输入：triangle = [[-10]]
 * 输出：-10
 *
 * 提示：
 * 1 <= triangle.length <= 200
 * triangle[0].length == 1
 * triangle[i].length == triangle[i - 1].length + 1
 * -10^4 <= triangle[i][j] <= 10^4
 */

/**
 * @param {number[][]} triangle
 * @return {number}
 */
const minimumTotal = function (triangle) {
  // f(r, n) = v(n) + min(f(r - 1, n - 1), f(r - 1, n))
  const dp = Array.from({ length: triangle.length }, () => []);
  dp[0][0] = triangle[0][0];
  for (let r = 1; r < triangle.length; r++) {
    for (let c = 0; c <= r; c++) {
      if (c === 0) dp[r][c] = triangle[r][c] + dp[r - 1][c];
      else if (c === r) dp[r][c] = triangle[r][c] + dp[r - 1][c - 1];
      else dp[r][c] = triangle[r][c] + Math.min(dp[r - 1][c], dp[r - 1][c - 1]);
    }
  }
  return Math.min.apply(null, dp.at(-1));
};

const { log, logAssert, logAssertDisorder } = require('../tools/LogTools.js');
logAssert(minimumTotal, [[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]], 11);
