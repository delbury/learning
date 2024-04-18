/**
 * 设想有个机器人坐在一个网格的左上角，网格 r 行 c 列。
 * 机器人只能向下或向右移动，但不能走到一些被禁止的网格（有障碍物）。
 * 设计一种算法，寻找机器人从左上角移动到右下角的路径。
 * 网格中的障碍物和空位置分别用 1 和 0 来表示。
 * 返回一条可行的路径，路径由经过的网格的行号和列号组成。左上角为 0 行 0 列。如果没有可行的路径，返回空数组。
 *
 * 示例 1:
 * 输入:
 * [
 *   [0,0,0],
 *   [0,1,0],
 *   [0,0,0]
 * ]
 * 输出: [[0,0],[0,1],[0,2],[1,2],[2,2]]
 * 解释:
 * 输入中标粗的位置即为输出表示的路径，即
 * 0行0列（左上角） -> 0行1列 -> 0行2列 -> 1行2列 -> 2行2列（右下角）
 * 说明：r 和 c 的值均不超过 100。
 */

/**
 * @param {number[][]} obstacleGrid
 * @return {number[][]}
 */

const { log, logAssert, log2dArray } = require('../tools/LogTools.js');

const pathWithObstacles = function (obstacleGrid) {
  const rows = obstacleGrid.length;
  const cols = obstacleGrid[0].length;

  const dp = Array.from({ length: rows }, () => Array.from({ length: cols }).fill(null));
  dp[0][0] = !obstacleGrid[0][0];
  if (!dp[0][0]) return [];
  if (cols > 1) dp[0][1] = dp[0][0] && !obstacleGrid[0][1];
  if (rows > 1) dp[1][0] = dp[0][0] && !obstacleGrid[1][0];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (dp[r][c] !== null) continue;
      dp[r][c] = !obstacleGrid[r][c] && ((r > 0 && dp[r - 1][c]) || (c > 0 && dp[r][c - 1]));
    }
  }
  const res = [];
  if (!dp[rows - 1][cols - 1]) return res;
  let r = rows - 1;
  let c = cols - 1;
  while (r > 0 || c > 0) {
    res.unshift([r, c]);
    if (r > 0 && dp[r - 1][c]) {
      r--;
    } else if (c > 0 && dp[r][c - 1]) {
      c--;
    }
  }
  res.unshift([0, 0]);
  return res;
};

// logAssert(pathWithObstacles, [[0]], [[0, 0]]);
// logAssert(pathWithObstacles, [[1]], []);
// logAssert(pathWithObstacles, [[1, 0]], []);
logAssert(
  pathWithObstacles,
  [
    [0, 1],
    [1, 0],
  ],
  []
);
logAssert(
  pathWithObstacles,
  [
    [1, 0],
    [0, 0],
  ],
  []
);
// logAssert(
//   pathWithObstacles,
//   [
//     [0, 1],
//     [0, 0],
//   ],
//   [
//     [0, 0],
//     [1, 0],
//     [1, 1],
//   ]
// );

// logAssert(
//   pathWithObstacles,
//   [
//     [0, 0, 0],
//     [0, 1, 0],
//     [0, 0, 0],
//   ],
//   [
//     [0, 0],
//     [0, 1],
//     [0, 2],
//     [1, 2],
//     [2, 2],
//   ]
// );
