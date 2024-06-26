/**
 * 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。
 * 请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。
 *
 * 示例 1：
 * 输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
 * 输出：[[1,6],[8,10],[15,18]]
 * 解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
 *
 * 示例 2：
 * 输入：intervals = [[1,4],[4,5]]
 * 输出：[[1,5]]
 * 解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。
 *
 * 提示：
 * 1 <= intervals.length <= 10^4
 * intervals[i].length == 2
 * 0 <= starti <= endi <= 10^4
 */

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
const merge = function (intervals) {
  // 按第一位、第二位进行排序
  intervals.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));
  const res = [];
  let start = null;
  let end = null;
  for (const item of intervals) {
    if (start === null) {
      start = item[0];
      end = item[1];
    } else if (end >= item[0]) {
      end = Math.max(item[1], end);
    } else {
      res.push([start, end]);
      start = item[0];
      end = item[1];
    }
  }
  res.push([start, end]);
  return res;
};

const { log, logAssert, logAssertDisorder } = require('../tools/LogTools.js');
logAssert(
  merge,
  [
    [1, 3],
    [2, 6],
    [8, 10],
    [15, 18],
  ],
  [
    [1, 6],
    [8, 10],
    [15, 18],
  ]
);

logAssert(
  merge,
  [
    [1, 4],
    [2, 3],
  ],
  [[1, 4]]
);
