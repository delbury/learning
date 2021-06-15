/**
  * 假设你有一个数组，其中第 i 个元素是股票在第 i 天的价格。
  * 你有一次买入和卖出的机会。（只有买入了股票以后才能卖出）。
  * 请你设计一个算法来计算可以获得的最大收益。
  * 
  * @param prices int整型一维数组 
  * @return int整型
  */

// dp[i][0] 第 i 天卖出股票的最大受益
// dp[i][1] 第 i 天买入股票的最小价格
function maxProfit( prices ) {
  // write code here
  let dp0 = 0, dp1 = prices[0];
  for(let i = 1; i < prices.length; i++) {
    [
      dp0,
      dp1,
    ] = [
      Math.max(dp0, prices[i] - dp1),
      Math.min(dp1, prices[i]),
    ];
  }
  return dp0;
}
module.exports = {
  maxProfit : maxProfit
};

console.log(maxProfit([1,9,6,9,1,7,1,1,5,9,9,9]));