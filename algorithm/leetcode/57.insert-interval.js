/**
 * 给你一个 无重叠的 ，按照区间起始端点排序的区间列表 intervals，
 * 其中 intervals[i] = [starti, endi] 表示第 i 个区间的开始和结束，
 * 并且 intervals 按照 starti 升序排列。
 * 同样给定一个区间 newInterval = [start, end] 表示另一个区间的开始和结束。
 * 在 intervals 中插入区间 newInterval，使得 intervals 依然按照 starti 升序排列，且区间之间不重叠（如果有必要的话，可以合并区间）。
 *
 * 返回插入之后的 intervals。
 *
 * 注意 你不需要原地修改 intervals。你可以创建一个新数组然后返回它。
 *
 * 示例 1：
 * 输入：intervals = [[1,3],[6,9]], newInterval = [2,5]
 * 输出：[[1,5],[6,9]]
 *
 * 示例 2：
 * 输入：intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
 * 输出：[[1,2],[3,10],[12,16]]
 * 解释：这是因为新的区间 [4,8] 与 [3,5],[6,7],[8,10] 重叠。
 *
 * 提示：
 * 0 <= intervals.length <= 10^4
 * intervals[i].length == 2
 * 0 <= starti <= endi <= 10^5
 * intervals 根据 starti 按 升序 排列
 * newInterval.length == 2
 * 0 <= start <= end <= 10^5
 */

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
// 复杂的边界判断
const insert = function (intervals, newInterval) {
  if (!intervals.length) return [newInterval];
  const res = [];
  let start = null;
  let end = null;
  for (let p = 0; p < intervals.length; p++) {
    if (start !== null) {
      if (end < intervals[p][0]) {
        res.push([start, end]);
        res.push(intervals[p]);
        start = null;
        newInterval = null;
      } else {
        end = Math.max(end, intervals[p][1]);
      }
      continue;
    }

    if (!newInterval || intervals[p][1] < newInterval[0]) {
      res.push(intervals[p]);
    } else if (intervals[p][0] <= newInterval[0] && intervals[p][1] >= newInterval[1]) {
      res.push(intervals[p]);
      newInterval = null;
    } else if (intervals[p][0] > newInterval[1]) {
      res.push(newInterval);
      res.push(intervals[p]);
      newInterval = null;
    } else if (start === null) {
      start = Math.min(newInterval[0], intervals[p][0]);
      end = Math.max(newInterval[1], intervals[p][1]);
    }
  }
  if (start !== null) res.push([start, end]);
  else if (newInterval) res.push(newInterval);
  return res;
};

const { log, logAssert, logAssertDisorder } = require('../tools/LogTools.js');
logAssert(
  insert,
  [
    [1, 3],
    [6, 9],
  ],
  [2, 5],
  [
    [1, 5],
    [6, 9],
  ]
);
logAssert(
  insert,
  [
    [3, 5],
    [12, 15],
  ],
  [6, 6],
  [
    [3, 5],
    [6, 6],
    [12, 15],
  ]
);
logAssert(
  insert,
  [
    [1, 3],
    [6, 9],
  ],
  [2, 5],
  [
    [1, 5],
    [6, 9],
  ]
);
logAssert(
  insert,
  [
    [1, 2],
    [3, 5],
    [6, 7],
    [8, 10],
    [12, 16],
  ],
  [4, 8],
  [
    [1, 2],
    [3, 10],
    [12, 16],
  ]
);
logAssert(
  insert,
  [[1, 5]],
  [6, 8],
  [
    [1, 5],
    [6, 8],
  ]
);
logAssert(
  insert,
  [
    [2, 4],
    [5, 7],
    [8, 10],
    [11, 13],
  ],
  [3, 6],
  [
    [2, 7],
    [8, 10],
    [11, 13],
  ]
);
logAssert(
  insert,
  [
    [0, 5],
    [8, 9],
  ],
  [3, 4],
  [
    [0, 5],
    [8, 9],
  ]
);
logAssert(
  insert,
  [
    [1, 2],
    [3, 5],
    [6, 7],
    [8, 10],
    [12, 16],
  ],
  [4, 8],
  [
    [1, 2],
    [3, 10],
    [12, 16],
  ]
);
