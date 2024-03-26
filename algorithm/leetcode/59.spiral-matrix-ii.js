/**
 * 给你一个正整数 n ，生成一个包含 1 到 n2 所有元素，且元素按顺时针顺序螺旋排列的 n x n 正方形矩阵 matrix 。
 *
 * 实例：
 * n = 3
 * 输出
 * 1, 2, 3,
 * 8, 9, 4,
 * 7, 6, 5
 */

const spiralMatrix = (n) => {
  const matrix = Array.from({ length: n }, () => Array.from({ length: n }));
  let l = 0;
  let r = n - 1;
  let t = 1;
  let b = n - 1;
  let row = 0;
  let col = 0;
  let val = 1;

  while (true) {
    if (col < r) {
      while (col < r) {
        matrix[row][col++] = val++;
      }
      r--;
    } else {
      break;
    }

    if (row < b) {
      while (row < b) {
        matrix[row++][col] = val++;
      }
      b--;
    } else {
      break;
    }

    if (col > l) {
      while (col > l) {
        matrix[row][col--] = val++;
      }
      l++;
    } else {
      break;
    }

    if (row > t) {
      while (row > t) {
        matrix[row--][col] = val++;
      }
      t++;
    } else {
      break;
    }
  }
  matrix[row][col] = val++;
  return matrix;
};

const tools = require("../tools/LogTools");
const res = spiralMatrix(3);
tools.log2dArray(res);
