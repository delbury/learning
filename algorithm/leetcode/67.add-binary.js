/**
 * 给你两个二进制字符串，返回它们的和（用二进制表示）。
 * 输入为 非空 字符串且只包含数字 1 和 0。
 *
 * 提示：
 * 1 <= a.length, b.length <= 10^4
 * a 和 b 仅由字符 '0' 或 '1' 组成
 * 字符串如果不是 "0" ，就不含前导零
 *
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
const addBinary = function (a, b) {
  return (BigInt('0b' + a) + BigInt('0b' + b)).toString(2);
};

// 2024.5.15
const addBinary2 = function (a, b) {
  let pa = a.length - 1;
  let pb = b.length - 1;
  let carry = 0;
  let res = '';
  while (pa >= 0 || pb >= 0) {
    let temp = carry;
    if (pa < 0) {
      temp += +b[pb--];
    } else if (pb < 0) {
      temp += +a[pa--];
    } else {
      temp += +a[pa--] + +b[pb--];
    }
    if (temp > 1) {
      temp %= 2;
      carry = 1;
    } else {
      carry = 0;
    }
    res = temp + res;
  }
  if (carry) res = carry + res;
  return res;
};

const { log, logAssert, logAssertDisorder } = require('../tools/LogTools.js');
logAssert(addBinary2, '1010', '1011', '10101');
