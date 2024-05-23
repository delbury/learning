/**
 * 给你一个整数数组 nums ，其中可能包含重复元素，请你返回该数组所有可能的子集（幂集）。
 * 解集 不能 包含重复的子集。
 * 返回的解集中，子集可以按 任意顺序 排列。
 *
 * 示例 1：
 * 输入：nums = [1,2,2]
 * 输出：[[],[1],[1,2],[1,2,2],[2],[2,2]]
 *
 * 示例 2：
 * 输入：nums = [0]
 * 输出：[[],[0]]
 *
 * 提示：
 * 1 <= nums.length <= 10
 * -10 <= nums[i] <= 10
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const subsetsWithDup = function (nums) {
  nums.sort((a, b) => a - b);
  const res = [[]];
  const fn = (arr, index) => {
    if (index >= nums.length) {
      res.push(arr);
      return;
    }

    const set = new Set();
    for (let i = index; i < nums.length; i++) {
      if (set.has(nums[i + 1])) continue;

      set.add(nums[i + 1]);
      fn([...arr, nums[index]], i + 1);
    }
  };
  const set = new Set();
  for (let i = 0; i < nums.length; i++) {
    if (set.has(nums[i])) continue;

    set.add(nums[i]);
    fn([], i);
  }
  return res;
};

const { log, logAssert, logAssertDisorder } = require('../tools/LogTools.js');
logAssertDisorder(subsetsWithDup, [1, 2, 2], [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]]);
