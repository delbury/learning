/**
 * 将一个给定字符串 s 根据给定的行数 numRows ，以从上往下、从左到右进行 Z 字形排列。
 * 比如输入字符串为 "PAYPALISHIRING" 行数为 3 时，排列如下：
 * P   A   H   N
 * A P L S I I G
 * Y   I   R
 * 之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："PAHNAPLSIIGYIR"。
 *
 * 请你实现这个将字符串进行指定行数变换的函数：
 *
 * string convert(string s, int numRows);
 *
 * 示例 1：
 * 输入：s = "PAYPALISHIRING", numRows = 3
 * 输出："PAHNAPLSIIGYIR"
 *
 * 示例 2：
 * 输入：s = "PAYPALISHIRING", numRows = 4
 * 输出："PINALSIGYAHRPI"
 * 解释：
 * P     I     N
 * A   L S   I G
 * Y A   H R
 * P     I
 *
 * 示例 3：
 * 输入：s = "A", numRows = 1
 * 输出："A"
 *
 * 提示：
 *
 * 1 <= s.length <= 1000
 * s 由英文字母（小写和大写）、',' 和 '.' 组成
 * 1 <= numRows <= 1000
 */

const tools = require('../tools/LogTools');

// 思路1
// 按Z型顺序构造数组，然后顺序读出

// 思路2
// 找每行的规则
// PAYPALISHIRING
// P     I     N
// A   L S   I G
// Y A   H R
// P     I
//
// 2 * (rows - 1) 为一组循环
// 第一行，每个循环的第一个字符
// 第二行，每个循环的第二个字符和最后一个字符
// 第三行，每个循环的第三个字符和最后第二个字符
const zigzag = function (str, rows) {
  if (rows <= 1) return str;
  let rowStr = '';
  const step = 2 * (rows - 1);
  for (let i = 0; i < rows; i++) {
    // 当前行，从第几个字符开始
    let curIndex = i;
    while (curIndex < str.length) {
      rowStr += str[curIndex];

      // 除了首尾行外每个循环内有两个字母
      if (i > 0 && i < rows - 1) {
        const t = str[curIndex + 2 * (rows - i - 1)];
        t && (rowStr += t);
      }
      curIndex += step;
    }
  }
  return rowStr;
};

tools.logAssert(zigzag, 'PAYPALISHIRING', 3, 'PAHNAPLSIIGYIR');
tools.logAssert(zigzag, 'PAYPALISHIRING', 4, 'PINALSIGYAHRPI');
tools.logAssert(zigzag, 'A', 1, 'A');
