/**
 * 下一个数。
 * 给定一个正整数，找出与其二进制表达式中1的个数相同且大小最接近的那两个数（一个略大，一个略小）。
 *
 * 示例1:
 *  输入：num = 2（或者0b10）
 *  输出：[4, 1] 或者（[0b100, 0b1]）
 *
 * 示例2:
 *  输入：num = 1
 *  输出：[2, -1]
 *
 * 提示:
 * num的范围在[1, 2147483647]之间；
 * 如果找不到前一个或者后一个满足条件的正数，那么输出 -1。
 */

const findClosedNumbers = function (num) {
  if (num >= 2147483647) return [-1, -1];
  const res = [];
  const str = num.toString(2).split('');
  let p = str.length - 1;
  // 略小，从右往左，存在 10，变成 01，然后右边的 1 全部移到 [01] 的右边
  let count1 = 0;
  while (p > 0) {
    if (str[p] === '0' && str[p - 1] === '1') break;
    if (str[p] === '1') count1++;
    p--;
  }
  if (p > 0) {
    const temp = [...str];
    temp[p] = '1';
    temp[p - 1] = '0';
    for (let i = p + 1; i < temp.length; i++) {
      temp[i] = count1-- > 0 ? '1' : '0';
    }
    res[1] = +`0b${temp.join('')}`;
  } else {
    res[1] = -1;
  }

  // 略大，从右往左，存在 01，变成 10；不存在，则最左边加一个 1；然后所有后边的 1 移到最右边
  p = str.length - 1;
  count1 = 0;
  while (p > 0) {
    if (str[p] === '1' && str[p - 1] === '0') break;
    if (str[p] === '1') count1++;
    p--;
  }
  if (p > 0) {
    const temp = [...str];
    temp[p] = '0';
    temp[p - 1] = '1';
    for (let i = temp.length - 1; i > p; i--) {
      temp[i] = count1-- > 0 ? '1' : '0';
    }
    res[0] = +`0b${temp.join('')}`;
  } else {
    const temp = [...str];
    temp[p] = '0';
    for (let i = temp.length - 1; i > p; i--) {
      temp[i] = count1-- > 0 ? '1' : '0';
    }
    temp.unshift('1');
    res[0] = +`0b${temp.join('')}`;
  }

  return res;
};

const { log, logAssert, logAssertDisorder } = require('../tools/LogTools.js');
// logAssert(findClosedNumbers, 2, [4, 1]);
// logAssert(findClosedNumbers, 34, [36, 33]);
// logAssert(findClosedNumbers, 67, [69, 56]);
// logAssert(findClosedNumbers, 124, [143, 122]);
// logAssert(findClosedNumbers, 1156403390, [1156403407, 1156403389]);
logAssert(findClosedNumbers, 2147483647, [-1, -1]);
