/**
 * 给定一个包含非负整数的 m x n 网格 grid ，
 * 请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
 * 说明：每次只能向下或者向右移动一步。
 *
 * 示例 1：
 * 输入：grid = [[1,3,1],[1,5,1],[4,2,1]]
 * 输出：7
 * 解释：因为路径 1→3→1→1→1 的总和最小。
 *
 * 示例 2：
 * 输入：grid = [[1,2,3],[4,5,6]]
 * 输出：12
 *
 * 提示：
 * m == grid.length
 * n == grid[i].length
 * 1 <= m, n <= 200
 * 0 <= grid[i][j] <= 200
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
const minPathSum = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const dp = Array.from({ length: m }, () => Array(n).fill(0));
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (!r && !c) dp[r][c] = grid[r][c];
      else if (!r) dp[r][c] = dp[r][c - 1] + grid[r][c];
      else if (!c) dp[r][c] = dp[r - 1][c] + grid[r][c];
      else dp[r][c] = Math.min(dp[r - 1][c], dp[r][c - 1]) + grid[r][c];
    }
  }
  return dp[m - 1][n - 1];
};

const { log, logAssert, logAssertDisorder } = require('../tools/LogTools.js');
// logAssert(
//   minPathSum,
//   [
//     [1, 3, 1],
//     [1, 5, 1],
//     [4, 2, 1],
//   ],
//   7
// );
logAssert(
  minPathSum,
  [
    [1, 2, 3],
    [4, 5, 6],
  ],
  12
);
