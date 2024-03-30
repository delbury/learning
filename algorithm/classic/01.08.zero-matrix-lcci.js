/**
 * 编写一种算法，若M × N矩阵中某个元素为0，则将其所在的行与列清零。
 *
 * 示例 1：
 * 输入：
 * [
 *   [1,1,1],
 *   [1,0,1],
 *   [1,1,1]
 * ]
 * 输出：
 * [
 *   [1,0,1],
 *   [0,0,0],
 *   [1,0,1]
 * ]
 *
 * 示例 2：
 * 输入：
 * [
 *   [0,1,2,0],
 *   [3,4,5,2],
 *   [1,3,1,5]
 * ]
 * 输出：
 * [
 *   [0,0,0,0],
 *   [0,4,5,0],
 *   [0,3,1,0]
 * ]
 */

const setZeroes = function (matrix) {
  const rows = new Set();
  const cols = new Set();
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      if (!matrix[r][c]) {
        rows.add(r);
        cols.add(c);
      }
    }
  }
  for (const r of rows) {
    matrix[r].fill(0);
  }
  for (const c of cols) {
    for (let r = 0; r < matrix.length; r++) {
      matrix[r][c] = 0;
    }
  }
  return matrix;
};

const { logAssert, logAssertDisorder } = require('../tools/LogTools.js');
logAssert(
  setZeroes,
  [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  [
    [1, 0, 1],
    [0, 0, 0],
    [1, 0, 1],
  ]
);
