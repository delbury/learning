/**
 * 给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。
 * 如果 word 存在于网格中，返回 true ；否则，返回 false 。
 * 单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。
 * 同一个单元格内的字母不允许被重复使用。
 *
 * 示例 1：
 * 输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
 * 输出：true
 *
 * 示例 2：
 * 输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
 * 输出：true
 *
 * 示例 3：
 * 输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
 * 输出：false
 *
 * 提示：
 * m == board.length
 * n = board[i].length
 * 1 <= m, n <= 6
 * 1 <= word.length <= 15
 * board 和 word 仅由大小写英文字母组成
 *
 * 进阶：你可以使用搜索剪枝的技术来优化解决方案，使其在 board 更大的情况下可以更快解决问题？
 */

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
const existSelf = function (board, word) {
  const dirs = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];

  const fn = (index, row, col) => {
    if (!board[row][col] || word.charAt(index) !== board[row][col]) return false;
    if (index === word.length - 1) return true;

    // 上下左右
    board[row][col] = '';
    for (const [rd, rc] of dirs) {
      const nr = row + rd;
      const nc = col + rc;
      if (nr < 0 || nr >= board.length || nc < 0 || nc >= board[0].length) continue;

      const res = fn(index + 1, row + rd, col + rc);
      if (res) return true;
    }
    board[row][col] = word[index];
  };
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[0].length; c++) {
      const res = fn(0, r, c);
      if (res) return res;
    }
  }
  return false;
};

const existTemplate = function (board, word) {
  const h = board.length,
    w = board[0].length;
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const visited = new Array(h);
  for (let i = 0; i < visited.length; ++i) {
    visited[i] = new Array(w).fill(false);
  }
  const check = (i, j, s, k) => {
    if (board[i][j] != s.charAt(k)) {
      return false;
    } else if (k == s.length - 1) {
      return true;
    }
    visited[i][j] = true;
    let result = false;
    for (const [dx, dy] of directions) {
      let newi = i + dx,
        newj = j + dy;
      if (newi >= 0 && newi < h && newj >= 0 && newj < w) {
        if (!visited[newi][newj]) {
          const flag = check(newi, newj, s, k + 1);
          if (flag) {
            result = true;
            break;
          }
        }
      }
    }
    visited[i][j] = false;
    return result;
  };

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      const flag = check(i, j, word, 0);
      if (flag) {
        return true;
      }
    }
  }
  return false;
};

const exist = existSelf;
// const exist = existTemplate;

const { log, logAssert, logAssertDisorder } = require('../tools/LogTools.js');
logAssert(
  exist,
  [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E'],
  ],
  'ABCCED',
  true
);
logAssert(
  exist,
  [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E'],
  ],
  'ABCB',
  false
);
logAssert(
  exist,
  [
    ['A', 'A', 'A', 'A', 'A', 'A'],
    ['A', 'A', 'A', 'A', 'A', 'A'],
    ['A', 'A', 'A', 'A', 'A', 'A'],
    ['A', 'A', 'A', 'A', 'A', 'A'],
    ['A', 'A', 'A', 'A', 'A', 'A'],
    ['A', 'A', 'A', 'A', 'A', 'A'],
  ],
  'AAAAAAAAAAAAAAB',
  false
);
logAssert(
  exist,
  [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'E', 'S'],
    ['A', 'D', 'E', 'E'],
  ],
  'ABCESEEEFS',
  true
);
logAssert(
  exist,
  [
    ['a', 'a', 'a', 'a'],
    ['a', 'a', 'a', 'a'],
    ['a', 'a', 'a', 'a'],
  ],
  'aaaaaaaaaaaaa',
  false
);
