/**
 * 给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。
 *
 * 实例：
 * 1, 2, 3,
 * 4, 5, 6,
 * 7, 8, 9
 * ==> 1, 2, 3, 6, 9, 8, 7, 4, 5
 */

const spiralMatrix = (matrix) => {
  let l = 0;
  let r = matrix[0].length - 1;
  let t = 1;
  let b = matrix.length - 1;
  const res = [];
  let row = 0;
  let col = 0;

  while (true) {
    // 右
    if (col < r) {
      while (col < r) {
        res.push(matrix[row][col++]);
      }
      r--;
    } else {
      break;
    }

    // 下
    if (row < b) {
      while (row < b) {
        res.push(matrix[row++][col]);
      }
      b--;
    } else {
      break;
    }

    // 左
    if (col > l) {
      while (col > l) {
        res.push(matrix[row][col--]);
      }
      l++;
    } else {
      break;
    }

    // 上
    if (row > t) {
      while (row > t) {
        res.push(matrix[row--][col]);
      }
      t++;
    } else {
      break;
    }
  }
  res.push(matrix[row][col]);
  return res;
};

const tools = require("../tools/LogTools");
const matrix = tools.create2dArray(3, 3);
tools.log2dArray(matrix);
const res = spiralMatrix(matrix);
tools.logDivider();
console.log(res.length, "res: ", res.join(", "));
