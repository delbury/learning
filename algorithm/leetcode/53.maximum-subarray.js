/**
 * 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 * 子数组
 * 是数组中的一个连续部分。
 *
 * 示例 1：
 * 输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
 * 输出：6
 * 解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
 *
 * 示例 2：
 * 输入：nums = [1]
 * 输出：1
 *
 * 示例 3：
 * 输入：nums = [5,4,-1,7,8]
 * 输出：23
 *
 *
 * 提示：
 * 1 <= nums.length <= 10^5
 * -10^4 <= nums[i] <= 10^4
 *
 * 进阶：如果你已经实现复杂度为 O(n) 的解法，尝试使用更为精妙的 分治法 求解。
 */

/**
 * @param {number[]} nums
 * @return {number}
 */

const maxSubArray = function (nums) {
  let sum, res;
  for (let i = 0, len = nums.length; i < len; i++) {
    for (let j = i; j < len; j++) {
      if (i === j) {
        sum = nums[j];
        if (sum > res || res === undefined) {
          res = sum;
        }
      } else {
        sum += nums[j];
        if (sum > res) {
          res = sum;
        }
      }
    }
  }
  return res;
};

const maxSubArray2 = function (nums) {
  if (!nums.length) {
    return;
  }

  let sum = nums[0];
  let res = nums[0];
  // for(let num of nums) {
  //   sum = Math.max(num, num + sum);
  //   res = Math.max(sum, res);
  // }
  for (let i = 1, len = nums.length; i < len; i++) {
    sum = Math.max(nums[i], sum + nums[i]);
    res = Math.max(sum, res);
  }
  return res;
};

// console.log(maxSubArray2([-2,1,-3,4,-1,2,1,-5,4]));

// 2024.5.10
const maxSubArray3 = function (nums) {
  let res = -Infinity;
  let sum = -Infinity;
  for (let i = 0; i < nums.length; i++) {
    sum = Math.max(nums[i], sum + nums[i]);
    res = Math.max(res, sum);
  }
  return res;
};
