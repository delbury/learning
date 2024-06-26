/**
 * 给你一个整数数组 nums ，请你找出数组中乘积最大的非空连续子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。
 * 测试用例的答案是一个 32-位 整数。
 * 子数组 是数组的连续子序列。
 *
 * 示例 1:
 * 输入: nums = [2,3,-2,4]
 * 输出: 6
 * 解释: 子数组 [2,3] 有最大乘积 6。
 *
 * 示例 2:
 * 输入: nums = [-2,0,-1]
 * 输出: 0
 * 解释: 结果不能为 2, 因为 [-2,-1] 不是子数组。
 *
 * 提示:
 * 1 <= nums.length <= 2 * 104
 * -10 <= nums[i] <= 10
 * nums 的任何前缀或后缀的乘积都 保证 是一个 32-位 整数
 */
const maxProduct = function (nums) {
  // 以 n 为结尾的子串
  // fmax(n) = max(nums[n] >= 0 ? fmax(n - 1) * n : fmin(n - 1) * n, nums[n])
  // fmin(n) = min(nums[n] >= 0 ? fmin(n - 1) * n : fmax(n - 1) * n, nums[n])
  let res = -Infinity;
  let max = 1;
  let min = 1;
  for (const n of nums) {
    if (n >= 0) {
      max = Math.max(max * n, n);
      min = Math.min(min * n, n);
    } else {
      [max, min] = [Math.max(min * n, n), Math.min(max * n, n)];
    }
    res = Math.max(res, max);
  }
  return res;
};

const { log, logAssert, logAssertDisorder } = require('../tools/LogTools.js');
logAssert(maxProduct, [2, 3, -2, 4], 6);
logAssert(maxProduct, [-4, -3, -2], 12);
