/**
 * 输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。
 * 
 * 示例 1：
 * 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
 * 输出：[1,2,3,6,9,8,7,4,5]
 * 
 * 示例 2：
 * 输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
 * 输出：[1,2,3,4,8,12,11,10,9,5,6,7]
 *  
 * 限制：
 * 0 <= matrix.length <= 100
 * 0 <= matrix[i].length <= 100
 * 
 * 
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  if (!matrix.length) return [];
  let left = 0;
  let top = 1;
  let right = matrix[0].length - 1;
  let bottom = matrix.length - 1;
  let dir = 'r';
  let i = j = 0;

  const res = [];
  while (true) {
    res.push(matrix[j][i]);

    if (left > right && top > bottom) break;

    if (dir === 'r') {
      if (i + 1 > right) { // 转向下
        if (++j > bottom) break;
        dir = 'b';
        right--;
      } else {
        i++;
      }

    } else if (dir === 'b') {
      if (j + 1 > bottom) { // 转向左
        if (--i < left) break;
        dir = 'l';
        bottom--;
      } else {
        j++;
      }

    } else if (dir === 'l') {
      if (i - 1 < left) { // 转向上
        if (--j < top) break;
        dir = 't';
        left++;
      } else {
        i--;
      }

    } else if (dir === 't') {
      if (j - 1 < top) { // 转向右
        if (++i > right) break;
        dir = 'r';
        top++;
      } else {
        j--;
      }
    }

  }
  return res;
};

const { logAssert } = require('./tools/LogTools.js');
// console.log(spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]])); // [1,2,3,6,9,8,7,4,5]
// console.log(spiralOrder([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]])); // [1,2,3,4,8,12,11,10,9,5,6,7]
// console.log(spiralOrder([])); // [1,2,3,4,8,12,11,10,9,5,6,7]
logAssert(spiralOrder, [[1, 2, 3], [4, 5, 6], [7, 8, 9]], [1, 2, 3, 6, 9, 8, 7, 4, 5]);