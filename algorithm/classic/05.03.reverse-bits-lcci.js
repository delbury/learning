/**
 * 给定一个32位整数 num，你可以将一个数位从0变为1。
 * 请编写一个程序，找出你能够获得的最长的一串1的长度。
 *
 * 示例 1：
 * 输入: num = 1775(11011101111)
 * 输出: 8
 *
 * 示例 2：
 * 输入: num = 7(0111)
 * 输出: 4
 */

const reverseBits = function (num) {
  let res = 0;

  // 处理未遇到 0
  let prev1 = false;
  let count1 = 0;

  // 已经遇到 0
  let prev2 = false;
  let count2 = 0;

  let temp = num;
  while (temp) {
    const cur = temp & 1;
    temp >>>= 1;

    if (cur) {
      count1++;
      prev1 = true;
      if (prev2) count2++;
    } else {
      if (prev2) {
        res = Math.max(res, count2);
        count2 = 0;
        prev2 = false;
      }
      if (prev1) {
        count1++;
        count2 = count1;
        count1 = 0;
        prev2 = true;
        prev1 = false;
      }
    }
  }
  return Math.min(Math.max(res, count1 + 1, count2), 32);
};

const { log, logAssert, logAssertDisorder } = require('../tools/LogTools.js');
// logAssert(reverseBits, 1775, 8);
// logAssert(reverseBits, 7, 4);
// console.log((2147482622).toString(2));
// logAssert(reverseBits, 2147482622, 30);
// console.log((45725232).toString(2));
// logAssert(reverseBits, 45725232, 5);
logAssert(reverseBits, -1, 32);
