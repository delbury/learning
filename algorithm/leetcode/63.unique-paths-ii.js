/**
 * 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。
 * 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish”）。
 * 现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？
 * 网格中的障碍物和空位置分别用 1 和 0 来表示。
 *
 * 示例 1：
 * 输入：obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
 * 输出：2
 * 解释：3x3 网格的正中间有一个障碍物。
 * 从左上角到右下角一共有 2 条不同的路径：
 * 1. 向右 -> 向右 -> 向下 -> 向下
 * 2. 向下 -> 向下 -> 向右 -> 向右
 *
 * 示例 2：
 * 输入：obstacleGrid = [[0,1],[0,0]]
 * 输出：1
 *
 * 提示：
 * m == obstacleGrid.length
 * n == obstacleGrid[i].length
 * 1 <= m, n <= 100
 * obstacleGrid[i][j] 为 0 或 1
 */

/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
const uniquePathsWithObstacles = function (obstacleGrid) {
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;
  const dp = Array.from({ length: m }, () => Array(n).fill(0));
  dp[0][0] = 1 - obstacleGrid[0][0];
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if ((r === 0 && c === 0) || obstacleGrid[r][c]) continue;
      dp[r][c] =
        (r - 1 < 0 || obstacleGrid[r - 1][c] === 1 ? 0 : dp[r - 1][c]) +
        (c - 1 < 0 || obstacleGrid[r][c - 1] === 1 ? 0 : dp[r][c - 1]);
    }
  }
  return dp[m - 1][n - 1];
};

const { log, logAssert, logAssertDisorder } = require('../tools/LogTools.js');
logAssert(
  uniquePathsWithObstacles,
  [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ],
  2
);
