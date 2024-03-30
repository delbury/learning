/**
 * 与 48.rotate-image 相同
 */

// 先沿 左-右 反转
// 再沿对角线 左上-右下 反转

const rotate = function (matrix) {
  matrix.reverse();
  for (let i = 0; i < matrix.length; i++) {
    for (let j = i + 1; j < matrix[i].length; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
  return matrix;
};
