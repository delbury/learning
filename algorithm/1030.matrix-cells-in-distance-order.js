/**
 * 给出 R 行 C 列的矩阵，其中的单元格的整数坐标为 (r, c)，满足 0 <= r < R 且 0 <= c < C。
 * 另外，我们在该矩阵中给出了一个坐标为 (r0, c0) 的单元格。
 * 返回矩阵中的所有单元格的坐标，并按到 (r0, c0) 的距离从最小到最大的顺序排，
 * 其中，两单元格(r1, c1) 和 (r2, c2) 之间的距离是曼哈顿距离，|r1 - r2| + |c1 - c2|。
 * （你可以按任何满足此条件的顺序返回答案。）
 *  
 * 示例 1：
 * 输入：R = 1, C = 2, r0 = 0, c0 = 0
 * 输出：[[0,0],[0,1]]
 * 解释：从 (r0, c0) 到其他单元格的距离为：[0,1]
 * 
 * 示例 2：
 * 输入：R = 2, C = 2, r0 = 0, c0 = 1
 * 输出：[[0,1],[0,0],[1,1],[1,0]]
 * 解释：从 (r0, c0) 到其他单元格的距离为：[0,1,1,2]
 * [[0,1],[1,1],[0,0],[1,0]] 也会被视作正确答案。
 * 
 * 示例 3：
 * 输入：R = 2, C = 3, r0 = 1, c0 = 2
 * 输出：[[1,2],[0,2],[1,1],[0,1],[1,0],[0,0]]
 * 解释：从 (r0, c0) 到其他单元格的距离为：[0,1,1,2,2,3]
 * 其他满足题目要求的答案也会被视为正确，例如 [[1,2],[1,1],[0,2],[1,0],[0,1],[0,0]]。
 * 
 * 提示：
 * 1 <= R <= 100
 * 1 <= C <= 100
 * 0 <= r0 < R
 * 0 <= c0 < C
 * 
 * 
 * @param {number} R
 * @param {number} C
 * @param {number} r0
 * @param {number} c0
 * @return {number[][]}
 */

// 1. 直接排序
var allCellsDistOrder = function (R, C, r0, c0) {
  const arr = [];
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      arr.push([i, j]);
    }
  }
  return arr.sort((a, b) => (Math.abs(a[0] - r0) + Math.abs(a[1] - c0)) - (Math.abs(b[0] - r0) + Math.abs(b[1] - c0)));
};

// 2. 几何法
// 以 r0, c0 为中心点的斜正方形
var allCellsDistOrderII = function (R, C, r0, c0) {
  const res = [[r0, c0]];
  let dis = 1;
  while (res.length < R * C) {
    let i = r0 - dis;
    let j = c0;
    for (let dir of [[1, -1], [1, 1], [-1, 1], [-1, -1]]) {
      for (let k = 0; k < dis; k++) {
        if (i >= 0 && i < R && j >= 0 && j < C) res.push([i, j]);

        i += dir[0];
        j += dir[1];
      }
    }
    dis++;
  }
  return res;
};

// 3. 桶排序
var allCellsDistOrderIII = function (R, C, r0, c0) {
  const res = [];
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      const dis = Math.abs(r0 - i) + Math.abs(c0 - j);
      if (res[dis]) {
        res[dis].push([i, j]);
      } else {
        res[dis] = [[i, j]];
      }
    }
  }
  return res.flat();
};

// 4. BFS
// var allCellsDistOrderIV = function (R, C, r0, c0) {
//   const res = [[[r0, c0]]];
//   const set = new Set([r0 * 1000 + c0]);
//   const visited = new Set();
//   bfs(r0, c0);
//   return res.flat();

//   function bfs(r0, c0, level = 0) {
//     if (r0 >= 0 && r0 < R && c0 >= 0 && c0 < C && !visited.has(r0 * 1000 + c0)) {
//       visited.add(r0 * 1000 + c0);

//       addItem(r0 - 1, c0, level + 1);
//       addItem(r0, c0 - 1, level + 1);
//       addItem(r0 + 1, c0, level + 1);
//       addItem(r0, c0 + 1, level + 1);

//       bfs(r0 - 1, c0, level + 1);
//       bfs(r0, c0 - 1, level + 1);
//       bfs(r0 + 1, c0, level + 1);
//       bfs(r0, c0 + 1, level + 1);
//     }
//   };

//   function addItem(r0, c0, level) {
//     if (r0 >= 0 && r0 < R && c0 >= 0 && c0 < C && !set.has(r0 * 1000 + c0)) {
//       if (res[level]) {
//         res[level].push([r0, c0])
//       } else {
//         res[level] = [[r0, c0]];
//       }
//       set.add(r0 * 1000 + c0);
//     }
//   };
// };

const { logAssertDisorder } = require('./tools/LogTools.js');
// logAssertDisorder(allCellsDistOrderII, 1, 2, 0, 0, [[0, 0], [0, 1]]);
// logAssertDisorder(allCellsDistOrderII, 2, 2, 0, 1, [[0, 1], [0, 0], [1, 1], [1, 0]]);
// logAssertDisorder(allCellsDistOrderII, 2, 3, 1, 2, [[1, 2], [0, 2], [1, 1], [0, 1], [1, 0], [0, 0]]);
// logAssertDisorder(allCellsDistOrderII, 3, 3, 0, 2, [[0, 2], [0, 1], [1, 2], [0, 0], [1, 1], [2, 2], [1, 0], [2, 1], [2, 0]]);