/**
 * 给定一个 m x n 的矩阵，如果一个元素为 0 ，则将其所在行和列的所有元素都设为 0 。
 * 请使用 原地 算法。
 *
 * 示例 1：
 * 输入：matrix = [[1,1,1],[1,0,1],[1,1,1]]
 * 输出：[[1,0,1],[0,0,0],[1,0,1]]
 *
 * 示例 2：
 * 输入：matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
 * 输出：[[0,0,0,0],[0,4,5,0],[0,3,1,0]]
 *
 * 提示：
 * m == matrix.length
 * n == matrix[0].length
 * 1 <= m, n <= 200
 * -2^31 <= matrix[i][j] <= 2^31 - 1
 *
 * 进阶：
 *
 * 一个直观的解决方案是使用  O(mn) 的额外空间，但这并不是一个好的解决方案。
 * 一个简单的改进方案是使用 O(m + n) 的额外空间，但这仍然不是最好的解决方案。
 * 你能想出一个仅使用常量空间的解决方案吗？
 */

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
const setZeroes = function (matrix) {
  // 辅助数组
  let rows = new Set();
  let cols = new Set();
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[0].length; c++) {
      if (!matrix[r][c]) {
        rows.add(r);
        cols.add(c);
      }
    }
  }
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[0].length; c++) {
      if (rows.has(r) || cols.has(c)) {
        matrix[r][c] = 0;
      }
    }
  }
  return matrix;
};

const setZeroes2 = function (matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  let firstColHas0 = false;
  for (let r = 0; r < m; r++) {
    if (matrix[r][0] === 0) {
      firstColHas0 = true;
    }
    for (let c = 1; c < n; c++) {
      if (!matrix[r][c]) {
        matrix[r][0] = matrix[0][c] = 0;
      }
    }
  }

  for (let r = m - 1; r >= 0; r--) {
    for (let c = n - 1; c > 0; c--) {
      if (!matrix[r][0] || !matrix[0][c]) {
        matrix[r][c] = 0;
      }
    }
    if (firstColHas0) {
      matrix[r][0] = 0;
    }
  }
  return matrix;
};

const { log, logAssert, logAssertDisorder } = require('../tools/LogTools.js');
logAssert(
  setZeroes2,
  [
    [0, 1, 2, 0],
    [3, 4, 5, 2],
    [1, 3, 1, 5],
  ],
  [
    [0, 0, 0, 0],
    [0, 4, 5, 0],
    [0, 3, 1, 0],
  ]
);
logAssert(
  setZeroes2,
  [
    [1, 2, 3, 4],
    [5, 0, 7, 8],
    [0, 10, 11, 12],
    [13, 14, 15, 0],
  ],
  [
    [0, 0, 3, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]
);
