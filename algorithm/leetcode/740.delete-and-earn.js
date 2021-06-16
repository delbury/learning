/**
 * 给你一个整数数组 nums ，你可以对它进行一些操作。
 * 每次操作中，选择任意一个 nums[i] ，删除它并获得 nums[i] 的点数。之后，你必须删除每个等于 nums[i] - 1 或 nums[i] + 1 的元素。
 * 开始你拥有 0 个点数。返回你能通过这些操作获得的最大点数。
 *  
 * 示例 1：
 * 输入：nums = [3,4,2]
 * 输出：6
 * 解释：
 * 删除 4 获得 4 个点数，因此 3 也被删除。
 * 之后，删除 2 获得 2 个点数。总共获得 6 个点数。
 * 
 * 示例 2：
 * 输入：nums = [2,2,3,3,3,4]
 * 输出：9
 * 解释：
 * 删除 3 获得 3 个点数，接着要删除两个 2 和 4 。
 * 之后，再次删除 3 获得 3 个点数，再次删除 3 获得 3 个点数。
 * 总共获得 9 个点数。
 *  
 * 提示：
 * 1 <= nums.length <= 2 * 10^4
 * 1 <= nums[i] <= 10^4
 * 
 * 思路：同 198.house-robber
 * 
 * @param {number[]} nums
 * @return {number}
 */

// 1. 计数 + DP
var deleteAndEarnII = function(nums) {
  if(nums.length === 1) return nums[0];
  const counts = Array(Math.max.apply(null, nums) + 1).fill(0);
  for(const num of nums) {
    counts[num]++;
  }
  const dp = [0, counts[1], Math.max(counts[1], counts[2] * 2)];
  for(let i = 3; i < counts.length; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + counts[i] * i);
  }
  return dp[dp.length - 1];
};

// 2. 优化空间
var deleteAndEarnIII = function(nums) {
  if(nums.length === 1) return nums[0];
  const counts = Array(Math.max.apply(null, nums) + 1).fill(0);
  for(const num of nums) {
    counts[num]++;
  }

  let dp1 = counts[1], dp2 = Math.max(counts[1], counts[2] * 2);
  for(let i = 3; i < counts.length; i++) {
    const t = Math.max(dp2, dp1 + counts[i] * i);
    dp1 = dp2;
    dp2 = t;
  }
  return dp2;
};

// 3. 排序分段 dp
var deleteAndEarn = function(nums) {
  const rob = (nums) => {
    if(nums.length === 1) return nums[0];
    let dp1 = nums[0], dp2 = Math.max(nums[0], nums[1]);
    for(let i = 2; i < nums.length; i++) {
      [dp1, dp2] = [dp2, Math.max(dp2, dp1 + nums[i])];
    }
    return dp2;
  };
  nums.sort((a, b) => a - b);
  let res = 0;
  const sub = [nums[0]];
  for(let i = 1; i < nums.length; i++) {
    if(nums[i] === nums[i - 1]) {
      // 相同则累加
      sub[sub.length - 1] += nums[i];

    } else if(nums[i] - 1 === nums[i - 1]) {
      // 相差 1 则 push
      sub.push(nums[i]);

    } else {
      // 否则为不连续
      res += rob(sub);
      sub.length = 0;
      sub[0] = nums[i];
    }
  }
  res += rob(sub);
  return res;
};

const { logAssert } = require('./tools/LogTools.js');
logAssert(deleteAndEarn, [3,4,2], 6);
logAssert(deleteAndEarn, [2,2,3,3,3,4], 9);
logAssert(deleteAndEarn, [1], 1);