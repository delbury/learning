/**
 * 给你一个长度为 n 的整数数组，请你判断在 最多 改变 1 个元素的情况下，该数组能否变成一个非递减数列。
 * 我们是这样定义一个非递减数列的： 对于数组中任意的 i (0 <= i <= n-2)，总满足 nums[i] <= nums[i + 1]。
 *  
 * 示例 1:
 * 输入: nums = [4,2,3]
 * 输出: true
 * 解释: 你可以通过把第一个4变成1来使得它成为一个非递减数列。
 * 
 * 示例 2:
 * 输入: nums = [4,2,1]
 * 输出: false
 * 解释: 你不能在只改变一个元素的情况下将其变为非递减数列。
 *  
 * 提示：
 * 1 <= n <= 10 ^ 4
 * - 10 ^ 5 <= nums[i] <= 10 ^ 5
 * 
 * @param {number[]} nums
 * @return {boolean}
 */

// 1.
// [a, b, c, d]
// 成立条件：(c >= a && d >= c) || (b >= a && d >= b) 
var checkPossibility = function(nums) {
  let changed = false; // 是否已经用过一次改变的机会
  for(let i = 1; i < nums.length; i++) {
    if(nums[i] >= nums[i - 1]) continue;
    if(!changed) {
      changed = true;
      if(
        (i - 2 >= 0) && (i + 1 < nums.length) && 
        (nums[i] < nums[i - 2] || nums[i + 1] < nums[i]) && (nums[i - 1] < nums[i - 2] || nums[i + 1] < nums[i - 1])
      ) {
        return false;
      }
    } else {
      return false;
    }
  }
  return true;
};


const { logAssert } = require('./tools/LogTools.js');
logAssert(checkPossibility, [3,4,2,3], false);
logAssert(checkPossibility, [4,2,3], true);
logAssert(checkPossibility, [4,2,1], false);
logAssert(checkPossibility, [5, 7, 1, 8], true);
logAssert(checkPossibility, [-1, 4, 2, 3], true);