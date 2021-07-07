/**
 * 给定数组arr，arr中所有的值都为正整数且不重复。
 * 每个值代表一种面值的货币，每种面值的货币可以使用任意张，再给定一个aim，代表要找的钱数，求组成aim的最少货币数。
 * 如果无解，请返回-1.
 * 
 * 【要求】
 * 时间复杂度O(n \times aim)O(n×aim)，空间复杂度On。
 *
 * 最少货币数
 * @param arr int整型一维数组 the array
 * @param aim int整型 the target
 * @return int整型
 */
 function minMoney( arr ,  aim ) {
  // write code here
  if(!aim) return 0;
  const dp = Array(aim + 1).fill(Infinity);
  dp[0] = 0;
  for(const coin of arr) {
    for(let i = coin; i <= aim; i++) {
      dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
  }
  return dp[aim] === Infinity ? -1 : dp[aim];
}
module.exports = {
  minMoney : minMoney
};

console.log(minMoney([2, 4], 8))