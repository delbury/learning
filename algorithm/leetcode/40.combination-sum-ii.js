/**
 * 给定一个候选人编号的集合 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
 * candidates 中的每个数字在每个组合中只能使用 一次 。
 *
 * 注意：解集不能包含重复的组合。
 *
 * 示例 1:
 * 输入: candidates = [10,1,2,7,6,1,5], target = 8,
 * 输出:
 * [
 * [1,1,6],
 * [1,2,5],
 * [1,7],
 * [2,6]
 * ]
 *
 * 示例 2:
 * 输入: candidates = [2,5,2,1,2], target = 5,
 * 输出:
 * [
 * [1,2,2],
 * [5]
 * ]
 *
 * 提示:
 * 1 <= candidates.length <= 100
 * 1 <= candidates[i] <= 50
 * 1 <= target <= 30
 */

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
const combinationSum2 = function (candidates, target) {
  // 排序，剪枝
  candidates.sort((a, b) => a - b);
  const res = [];

  const fn = (arr, sum, index) => {
    if (index >= candidates.length) return;
    sum += candidates[index];
    if (sum > target) return;
    if (sum === target) {
      arr.push(candidates[index]);
      res.push(arr);
      return;
    }
    for (let i = index + 1; i < candidates.length; i++) {
      if (i === index + 1 || candidates[i] !== candidates[i - 1]) {
        fn([...arr, candidates[index]], sum, i);
      }
    }
  };
  for (let i = 0; i < candidates.length; i++) {
    if (i === 0 || candidates[i] !== candidates[i - 1]) {
      fn([], 0, i);
    }
  }
  return res;
};

const { log, logAssert, logAssertDisorder } = require('../tools/LogTools.js');
logAssertDisorder(combinationSum2, [10, 1, 2, 7, 6, 1, 5], 8, [
  [1, 1, 6],
  [1, 2, 5],
  [1, 7],
  [2, 6],
]);
logAssertDisorder(combinationSum2, [2, 5, 2, 1, 2], 5, [[1, 2, 2], [5]]);
