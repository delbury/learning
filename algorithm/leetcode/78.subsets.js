/**
 * 给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集幂集）。
 * 解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。
 *
 * 示例 1：
 * 输入：nums = [1,2,3]
 * 输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
 *
 * 示例 2：
 * 输入：nums = [0]
 * 输出：[[],[0]]
 *
 * 提示：
 * 1 <= nums.length <= 10
 * -10 <= nums[i] <= 10
 * nums 中的所有元素 互不相同
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const subsets = function (nums) {
  // 位运算
  const res = [];
  for (let i = 2 ** nums.length - 1; i >= 0; i--) {
    const item = [];
    let t = i;
    let index = 0;
    while (t) {
      const need = 1 & t;
      t >>= 1;
      if (need) item.push(nums[index]);
      index++;
    }
    res.push(item);
  }
  return res;
};

const { log, logAssert, logAssertDisorder } = require('../tools/LogTools.js');
logAssertDisorder(subsets, [1, 2, 3], [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]);
