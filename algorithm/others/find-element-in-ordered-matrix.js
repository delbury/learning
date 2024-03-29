/**
 * 已知int一个有序矩阵mat，同时给定矩阵的大小n和m以及需要查找的元素x，且矩阵的行和列都是从小到大有序的。
 * 设计查找算法返回所查找元素的二元数组，代表该元素的行号和列号(均从零开始)。保证元素互异。
 * 
 * @param mat int整型二维数组 
 * @param n int整型 
 * @param m int整型 
 * @param x int整型 
 * @return int整型一维数组
 */
function findElement( mat ,  n ,  m ,  x ) {
  // write code here
  if(x < mat[0][0] || x > mat[n - 1][m - 1]) return [];

  let row = 0, col = m - 1;
  while(row < n && col >= 0) {
    if(mat[row][col] < x) {
      row++;
    } else if(mat[row][col] > x) {
      col--;
    } else {
      return [row, col];
    }
  }

  return [];
}
module.exports = {
  findElement : findElement
};

const mat = [
  [1, 20, 30, 40, 50],
  [5, 25, 35, 45, 55],
  [10, 50, 70, 90, 110]
];
console.log(findElement(mat, mat.length, mat[0].length, 45));
// for(let i = 0; i < mat.length; i++) {
//   for(let j = 0; j < mat[0].length; j++) {
//     const res = findElement(mat, mat.length, mat[0].length, mat[i][j]);
//     console.log(res, res[0] === i && res[1] === j);
//   }
// }