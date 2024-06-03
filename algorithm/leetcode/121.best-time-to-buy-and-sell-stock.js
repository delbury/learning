/**
 * 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
 * 如果你最多只允许完成一笔交易（即买入和卖出一支股票一次），设计一个算法来计算你所能获取的最大利润。
 * 注意：你不能在买入股票前卖出股票。
 *
 * 示例 1:
 * 输入: [7,1,5,3,6,4]
 * 输出: 5
 * 解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
 *     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
 *
 * 示例 2:
 * 输入: [7,6,4,3,1]
 * 输出: 0
 * 解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
 *
 *
 * @param {number[]} prices
 * @return {number}
 */

// 1. 遍历
const maxProfitI = function (prices) {
  let res = 0;
  for (let i = 0; i < prices.length; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      if (prices[j] - prices[i] > res) {
        res = prices[j] - prices[i];
      }
    }
  }

  return res;
};

// 2. 一次遍历
const maxProfitII = function (prices) {
  let minPurcse = prices[0];
  let res = 0;

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] - minPurcse > res) {
      res = prices[i] - minPurcse;
    }

    if (prices[i] < minPurcse) {
      minPurcse = prices[i];
    }
  }

  return res;
};

// 3. dp
// dp[i][0] 第 i 天买入的最小价格
// dp[i][1] 第 i 天卖出的最大价格
const maxProfitIII = function (prices) {
  const dp = Array.from({ length: prices.length }, () => []);
  dp[0][0] = prices[0];
  dp[0][1] = 0;
  for (let i = 1; i < prices.length; i++) {
    dp[i][0] = Math.min(dp[i - 1][0], prices[i]);
    dp[i][1] = Math.max(dp[i - 1][1], prices[i] - dp[i - 1][0]);
  }
  return dp[prices.length - 1][1];
};

// 4. 优化
const maxProfitIV = function (prices) {
  let min = prices[0];
  let res = 0;
  for (let i = 0; i < prices.length; i++) {
    if (prices[i] - min > res) {
      // 更小的买入价
      res = prices[i] - min;
    }

    if (prices[i] < min) {
      min = prices[i];
    }
  }
  return res;
};

// 5. 双指针
const maxProfit = function (prices) {
  let i = 0,
    j = 1;
  let res = 0;
  while (j < prices.length) {
    if (prices[j] - prices[i] > res) {
      res = prices[j] - prices[i];
    }
    if (prices[j] < prices[i]) {
      i = j;
    }
    j++;
  }
  return res;
};

// 2024.6.3
const maxProfit6 = function (prices) {
  let min = prices[0];
  let res = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] >= min) res = Math.max(res, prices[i] - min);
    else min = prices[i];
  }
  return res;
};

console.log(maxProfit([7, 1, 5, 3, 6, 4]));
console.log(maxProfit([7, 6, 4, 3, 1]));
