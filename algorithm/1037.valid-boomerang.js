/**
 * 回旋镖定义为一组三个点，这些点各不相同且不在一条直线上。
 * 给出平面上三个点组成的列表，判断这些点是否可以构成回旋镖。
 *  
 * 示例 1：
 * 输入：[[1,1],[2,3],[3,2]]
 * 输出：true
 * 
 * 示例 2：
 * 输入：[[1,1],[2,2],[3,3]]
 * 输出：false
 * 
 * 提示：
 * points.length == 3
 * points[i].length == 2
 * 0 <= points[i][j] <= 100
 * 
 * 
 * @param {number[][]} points
 * @return {boolean}
 */

// 1. 
var isBoomerang = function (points) {
  if (points[0][0] === points[1][0] && (points[0][0] === points[2][0])) return false;
  if (points[0][1] === points[1][1] && (points[0][1] === points[2][1])) return false;
  for (let i = 0; i < 3; i++) {
    for (let j = i + 1; j < 3; j++) {
      if (points[i][0] === points[j][0] && points[i][1] === points[j][1]) return false;
    }
  }

  return (points[0][1] - points[1][1]) / (points[0][0] - points[1][0]) !== (points[0][1] - points[2][1]) / (points[0][0] - points[2][0]);
};

// 2. k1 = k2 交叉相乘
var isBoomerangII = function (points) {
  return !((points[1][1] - points[2][1]) * (points[2][0] - points[0][0]) === (points[2][1] - points[0][1]) * (points[1][0] - points[2][0]));
};

const { logAssert } = require('./tools/LogTools.js');
logAssert(isBoomerangII, [[1, 1], [2, 3], [3, 2]], true);
logAssert(isBoomerangII, [[1, 1], [2, 2], [3, 3]], false);
logAssert(isBoomerangII, [[0, 1], [0, 1], [2, 1]], false);
logAssert(isBoomerangII, [[0, 1], [1, 0], [0, 1]], false);
