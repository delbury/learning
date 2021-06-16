/**
 * 给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。
 * 你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像。
 * 
 * 提示：
 * matrix.length == n
 * matrix[i].length == n
 * 1 <= n <= 20
 * -1000 <= matrix[i][j] <= 1000
 * 
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */

// 1. 需要旋转四分之一个三角型四次
var rotateI = function(matrix) {
  const n = matrix.length;
  const half = Math.floor(n / 2);

  for(let j = 0; j < half; j++) {
    for(let i = j; i < n - j - 1; i++) {
      let ii = i;
      let jj = j;
      let temp = matrix[ii][jj];
      for(let k = 0; k < 4; k++) {
        const inext = jj;
        const jnext = -ii + n - 1;
        [matrix[inext][jnext], temp] = [temp, matrix[inext][jnext]];
        ii = inext;
        jj = jnext;
      }
    }
  }
  return matrix;
};

// 2. 双重翻转
var rotate = function(matrix) {
  if (!matrix.length) return []
  // 水平翻转
  matrix.reverse()
  // 对角线翻转
  for(let i = 0; i < matrix.length; i ++) {
    for(let j = 0; j < i; j ++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
    }
  }
  return matrix;
};

const { logAssertOrder } = require('./tools/LogTools.js');
logAssertOrder(rotate, [[1,2,3],[4,5,6],[7,8,9]], [[7,4,1],[8,5,2],[9,6,3]]);
logAssertOrder(rotate, [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]], [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]);
