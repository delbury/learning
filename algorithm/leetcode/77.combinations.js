/**
 * 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。
 * 你可以按 任何顺序 返回答案。
 *
 * 示例 1：
 * 输入：n = 4, k = 2
 * 输出：
 * [
 *   [2,4],
 *   [3,4],
 *   [2,3],
 *   [1,2],
 *   [1,3],
 *   [1,4],
 * ]
 *
 * 示例 2：
 * 输入：n = 1, k = 1
 * 输出：[[1]]
 *
 * 提示：
 * 1 <= n <= 20
 * 1 <= k <= n
 */

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
const combine = function (n, k) {
  const res = [];
  const fn = (arr, start) => {
    if (arr.length === k) {
      res.push(arr);
      return;
    }
    for (let i = start + 1; i <= n; i++) {
      fn([...arr, i], i);
    }
  };
  fn([], 0);
  return res;
};

const { log, logAssert, logAssertDisorder } = require('../tools/LogTools.js');
logAssertDisorder(combine, 4, 2, [
  [2, 4],
  [3, 4],
  [2, 3],
  [1, 2],
  [1, 3],
  [1, 4],
]);
logAssert(combine, 1, 1, [[1]]);
logAssert(combine, 4, 3, []);
