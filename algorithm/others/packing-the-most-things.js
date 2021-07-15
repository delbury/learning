/**
 * 已知一个背包最多能容纳物体的体积为 V
 * 现有n个物品第i个物品的体积为 vi
 * 第i个物品的重量为 wi
 * 求当前背包最多能装多大重量的物品
 * 
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 * 计算01背包问题的结果
 * @param V int整型 背包的体积
 * @param n int整型 物品的个数
 * @param vw int整型二维数组 第一维度为n,第二维度为2的二维数组,vw[i][0],vw[i][1]分别描述i+1个物品的vi,wi
 * @return int整型
 */
function knapsack( V ,  n ,  vw ) {
  // write code here
  // dp[i][j]: 前 i 个物品，体积为 j 时，最大的重量
  const dp = Array.from({ length: n + 1 }, () => Array(V + 1).fill(0));
  for(let i = 1; i <= n; i++) {
    for(let j = 1; j <= V; j++) {
      if(vw[i - 1][0] > j) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - vw[i - 1][0]] + vw[i - 1][1]);
      }
    }
  }
  return dp[n][V];
}
module.exports = {
  knapsack : knapsack
};

console.log(knapsack(10,2,[[1,3],[10,4]]));