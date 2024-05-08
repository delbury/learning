/**
 * 给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。
 *
 * 示例 1：
 * 输入：nums = [1,1,2]
 * 输出：
 * [[1,1,2],
 *  [1,2,1],
 *  [2,1,1]]
 *
 * 示例 2：
 * 输入：nums = [1,2,3]
 * 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 *
 * 提示：
 * 1 <= nums.length <= 8
 * -10 <= nums[i] <= 10
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// hash
const permuteUnique = function (nums) {
  const res = [];
  const resSet = new Set();
  const fn = (set, index) => {
    if (set.has(index)) return;
    set.add(index);
    if (set.size === nums.length) {
      const r = [...set].map((i) => nums[i]);
      const hash = r.join(',');
      if (!resSet.has(hash)) {
        res.push(r);
        resSet.add(hash);
      }
      return;
    }
    nums.forEach((_, i) => fn(new Set(set), i));
  };
  nums.forEach((_, i) => fn(new Set(), i));
  return res;
};

// 剪枝
const permuteUnique2 = function (nums) {
  const res = [];

  return res;
};

const { log, logAssert, logAssertDisorder } = require('../tools/LogTools.js');
// logAssert(
//   permuteUnique,
//   [1, 2, 3],
//   [
//     [1, 2, 3],
//     [1, 3, 2],
//     [2, 1, 3],
//     [2, 3, 1],
//     [3, 1, 2],
//     [3, 2, 1],
//   ]
// );
logAssert(
  permuteUnique2,
  [1, 1, 2],
  [
    [1, 1, 2],
    [1, 2, 1],
    [2, 1, 1],
  ]
);
