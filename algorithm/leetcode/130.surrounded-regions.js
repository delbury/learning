/**
 * 给你一个 m x n 的矩阵 board ，由若干字符 'X' 和 'O' ，找到所有被 'X' 围绕的区域，并将这些区域里所有的 'O' 用 'X' 填充。
 *
 * 示例 1：
 * 输入：board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
 * 输出：[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
 * 解释：被围绕的区间不会存在于边界上，换句话说，任何边界上的 'O' 都不会被填充为 'X'。
 * 任何不在边界上，或不与边界上的 'O' 相连的 'O' 最终都会被填充为 'X'。
 * 如果两个元素在水平或垂直方向相邻，则称它们是"相连"的。
 *
 * 示例 2：
 * 输入：board = [["X"]]
 * 输出：[["X"]]
 *
 * 提示：
 * m == board.length
 * n == board[i].length
 * 1 <= m, n <= 200
 * board[i][j] 为 'X' 或 'O'
 */

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
const solve = function (board) {
  const m = board.length;
  const n = board[0].length;

  const zeroSet = new Set();

  const search = (r, c) => {
    if (r < 0 || r >= m || c < 0 || c >= n) return;
    if (board[r][c] === 'X') return;
    const hash = `${r},${c}`;
    if (zeroSet.has(hash)) return;

    zeroSet.add(hash);

    search(r - 1, c);
    search(r, c - 1);
    search(r + 1, c);
    search(r, c + 1);
  };
  for (let c = 0; c < n; c++) {
    search(0, c);
    search(m - 1, c);
  }
  for (let r = 1; r < m - 1; r++) {
    search(r, 0);
    search(r, n - 1);
  }

  for (let r = 1; r < m - 1; r++) {
    for (let c = 1; c < n - 1; c++) {
      if (board[r][c] === 'O' && !zeroSet.has(`${r},${c}`)) {
        board[r][c] = 'X';
      }
    }
  }

  return board;
};

// no set
const solve2 = function (board) {
  const m = board.length;
  const n = board[0].length;

  const search = (r, c) => {
    if (r < 0 || r >= m || c < 0 || c >= n) return;
    if (board[r][c] !== 'O') return;

    // 将不需要改变的 O 先标记一下
    board[r][c] = '';

    search(r - 1, c);
    search(r, c - 1);
    search(r + 1, c);
    search(r, c + 1);
  };
  for (let c = 0; c < n; c++) {
    search(0, c);
    search(m - 1, c);
  }
  for (let r = 1; r < m - 1; r++) {
    search(r, 0);
    search(r, n - 1);
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (board[r][c] === '') {
        // 标记的 O 变回来
        board[r][c] = 'O';
      } else if (board[r][c] === 'O') {
        board[r][c] = 'X';
      }
    }
  }

  return board;
};

const { log, logAssert, logAssertDisorder } = require('../tools/LogTools.js');
log(solve2, [
  ['X', 'X', 'X', 'X'],
  ['X', 'O', 'O', 'X'],
  ['X', 'X', 'O', 'X'],
  ['X', 'O', 'X', 'X'],
]);
