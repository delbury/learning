/**
 * 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
 * 设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。
 * 
 * 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
 *  
 * 示例 1:
 * 输入: [7,1,5,3,6,4]
 * 输出: 7
 * 解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
 *      随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。
 * 
 * 示例 2:
 * 输入: [1,2,3,4,5]
 * 输出: 4
 * 解释: 在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
 *      注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。
 *      因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
 * 
 * 示例 3:
 * 输入: [7,6,4,3,1]
 * 输出: 0
 * 解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
 *  
 * 提示：
 * 1 <= prices.length <= 3 * 10 ^ 4
 * 0 <= prices[i] <= 10 ^ 4
 * 
 * 
 * @param {number[]} prices
 * @return {number}
 */
var maxProfitII = function (prices) {
  let left = 0;
  let right = 1;
  let sum = 0;

  while (right < prices.length) {
    if (prices[right] >= prices[right - 1]) {
      right++;

      if (right === prices.length) {
        return sum += prices[right - 1] - prices[left];
      }
    } else {
      sum += prices[right - 1] - prices[left];

      left = right;
      right = left + 1;
    }
  }

  return sum;
};

// 优化
var maxProfitIII = function(prices) {
  let res = 0;
  let pl = 0, pr = 1;
  while(pr < prices.length) {
    if(prices[pr] > prices[pr - 1]) {
      pr++;
      if(pr !== prices.length) continue;
    } 
    res += prices[pr - 1] - prices[pl];
    pl = pr;
    pr = pl + 1;
  }
  return res;
};

// dp
// dp[i][0] 第 i + 1 天后未持有股票的最大利润
// dp[i][1] 第 i + 1 天后持有股票的最大利润
// dp[i][0] = max(dp[i - 1][0], dp[i - 1][1] + prices[i])
// dp[i][1] = max(dp[i - 1][1], dp[i - 1][0] - prices[i])
// dp[0][0] = 0
// dp[0][1] = -price[0]
var maxProfit = function(prices) {
  if(prices.length < 2) return 0;
  const dp = Array.from({ length: prices.length }, () => []);
  dp[0][0] = 0;
  dp[0][1] = -prices[0];
  for(let i = 1; i < prices.length; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
  }
  return Math.max(dp[dp.length - 1][0], dp[dp.length - 1][1]);
};

console.log(maxProfit([7, 1, 5, 3, 6, 4]));
console.log(maxProfit([1, 2, 3, 4, 5]));
console.log(maxProfit([7, 6, 4, 3, 1]));
