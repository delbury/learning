/**
 * 给定一个长度为 n 的 0 索引整数数组 nums。初始位置为 nums[0]。
 * 每个元素 nums[i] 表示从索引 i 向前跳转的最大长度。
 * 换句话说，如果你在 nums[i] 处，你可以跳转到任意 nums[i + j] 处:
 *
 * 0 <= j <= nums[i]
 * i + j < n
 * 返回到达 nums[n - 1] 的最小跳跃次数。生成的测试用例可以到达 nums[n - 1]。
 *
 * 示例 1:
 * 输入: nums = [2,3,1,1,4]
 * 输出: 2
 * 解释: 跳到最后一个位置的最小跳跃数是 2。
 *      从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。
 *
 * 示例 2:
 * 输入: nums = [2,3,0,1,4]
 * 输出: 2
 *
 * 提示:
 * 1 <= nums.length <= 104
 * 0 <= nums[i] <= 1000
 * 题目保证可以到达 nums[n-1]
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
const jump = function (nums) {
  let res = 0;
  let max = 0;
  let end = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    max = Math.max(max, nums[i] + i);
    if (end === i) {
      end = max;
      res++;
    }
  }
  return res;
};

const { cpSync } = require('fs');
const { log, logAssert, logAssertDisorder } = require('../tools/LogTools.js');
logAssert(jump, [2, 3, 1, 1, 4], 2);
logAssert(jump, [2, 3, 0, 1, 4], 2);
logAssert(jump, [0], 0);
logAssert(jump, [1, 3, 2], 2);
