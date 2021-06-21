/**
 * 给定一个 n * m 的矩阵 a，从左上角开始每次只能向右或者向下走，
 * 最后到达右下角的位置，路径上所有的数字累加起来就是路径和，输出所有的路径中最小的路径和。
 * 
 * @param matrix int整型二维数组 the matrix
 * @return int整型
 */
function minPathSum( matrix ) {
  // write code here
  const dp = Array.from(
    { length: matrix.length },
    () => Array(matrix[0].length),
  );
  dp[0][0] = matrix[0][0];
  for(let i = 1; i < dp.length; i++) dp[i][0] = dp[i - 1][0] + matrix[i][0];
  for(let j = 1; j < dp[0].length; j++) dp[0][j] = dp[0][j - 1] + matrix[0][j];

  for(let i = 1; i < matrix.length; i++) {
    for(let j = 1; j < matrix[0].length; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + matrix[i][j];
    }
  }
  return dp[matrix.length - 1][matrix[0].length - 1];
}
module.exports = {
  minPathSum : minPathSum
};

const { logAssert, logAssertDisorder } = require('../tools/LogTools.js');
logAssert(minPathSum, [[1,3,5,9],[8,1,3,4],[5,0,6,1]], 12);