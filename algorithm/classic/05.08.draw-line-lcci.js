/**
 * 已知一个由像素点组成的单色屏幕，每行均有 w 个像素点，所有像素点初始为 0，左上角位置为 (0,0)。
 * 现将每行的像素点按照「每 32 个像素点」为一组存放在一个 int 中，再依次存入长度为 length 的一维数组中。
 * 我们将在屏幕上绘制一条从点 (x1,y) 到点 (x2,y) 的直线（即像素点修改为 1），请返回绘制过后的数组。
 *
 * 注意：
 * 用例保证屏幕宽度 w 可被 32 整除（即一个 int 不会分布在两行上）
 *
 * 示例1:
 *  输入：length = 1, w = 32, x1 = 30, x2 = 31, y = 0
 *  输出：[3]
 *  解释：在第 0 行的第 30 位到第 31 位画一条直线，屏幕二进制形式表示为 [00000000000000000000000000000011]，因此返回 [3]
 *
 * 示例2:
 *  输入：length = 3, w = 96, x1 = 0, x2 = 95, y = 0
 *  输出：[-1, -1, -1]
 *  解释：由于二进制 11111111111111111111111111111111 的 int 类型代表 -1，因此返回 [-1,-1,-1]
 *
 * 提示：
 * 1 <= length <= 10^5
 * 1 <= w <= 3 * 10^5
 * 0 <= x1 <= x2 < w
 * 0 <= y <= 10
 */

/**
 * @param {number} length
 * @param {number} w
 * @param {number} x1
 * @param {number} x2
 * @param {number} y
 * @return {number[]}
 */
const drawLine = function (length, w, x1, x2, y) {
  const res = Array(length).fill(0);
  // 一行共几个
  const rowCounts = w / 32;
  let p = x1;
  while (p <= x2) {
    // 某一行的第 index 个 int
    const rowIndex = Math.floor(p / 32);

    // 实际在一维数组中的 index
    const index = y * rowCounts + rowIndex;

    // 在每一个 int 中 x1 的偏移量
    const rowOffset = p % 32;

    // 尾部不需要改变的偏移量
    let noChangeCounts = 31 - Math.min(x2 - p + rowOffset, 31);
    let changeCounts = 32 - rowOffset - noChangeCounts;

    let val = 0;
    while (changeCounts--) {
      val <<= 1;
      val |= 1;
    }
    while (noChangeCounts--) {
      val <<= 1;
    }

    res[index] = val;

    // 移动到下一段
    p = (rowIndex + 1) * 32;
  }
  return res;
};

const { log, logAssert, logAssertDisorder } = require('../tools/LogTools.js');
logAssert(drawLine, 3, 96, 0, 95, 0, [-1, -1, -1]);
logAssert(drawLine, 1, 32, 30, 31, 0, [3]);
logAssert(drawLine, 9, 32, 29, 29, 5, [0, 0, 0, 0, 0, 4, 0, 0, 0]);
