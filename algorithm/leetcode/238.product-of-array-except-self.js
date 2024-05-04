/**
 * 给你一个整数数组 nums，返回 数组 answer ，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积 。
 * 题目数据 保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在  32 位 整数范围内。
 *
 * 请不要使用除法，且在 O(n) 时间复杂度内完成此题。
 *
 * 示例 1:
 * 输入: nums = [1,2,3,4]
 * 输出: [24,12,8,6]
 *
 * 示例 2:
 * 输入: nums = [-1,1,0,-3,3]
 * 输出: [0,0,9,0,0]
 *
 * 提示：
 * 2 <= nums.length <= 105
 * -30 <= nums[i] <= 30
 * 保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在  32 位 整数范围内
 *
 * 进阶：你可以在 O(1) 的额外空间复杂度内完成这个题目吗？（ 出于对空间复杂度分析的目的，输出数组 不被视为 额外空间。）
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
const productExceptSelf = function (nums) {
  const res = [];
  res[nums.length - 1] = 1;
  // 先算每位数字所有右侧的数字乘积
  for (let i = nums.length - 2; i >= 0; i--) {
    res[i] = res[i + 1] * nums[i + 1];
  }
  // 再算每位数字所有左侧的数字的乘积
  // 再乘上右侧的即为最终结果
  let l = 1;
  for (let i = 0; i < nums.length; i++) {
    l = l * (i ? nums[i - 1] : 1);
    res[i] = res[i] * l;
  }
  return res;
};

const { log, logAssert, logAssertDisorder } = require('../tools/LogTools.js');
logAssert(productExceptSelf, [1, 2, 3, 4], [24, 12, 8, 6]);
