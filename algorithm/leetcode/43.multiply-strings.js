/**
 * 给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。
 * 注意：不能使用任何内置的 BigInteger 库或直接将输入转换为整数。
 *
 * 示例 1:
 * 输入: num1 = "2", num2 = "3"
 * 输出: "6"
 *
 * 示例 2:
 * 输入: num1 = "123", num2 = "456"
 * 输出: "56088"
 *
 * 提示：
 * 1 <= num1.length, num2.length <= 200
 * num1 和 num2 只能由数字组成。
 * num1 和 num2 都不包含任何前导零，除了数字0本身。
 */

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
const add = function (num1, num2) {
  let p1 = num1.length - 1;
  let p2 = num2.length - 1;
  let res = '';
  let carry = 0;
  while (p1 >= 0 || p2 >= 0) {
    let temp = 0;
    if (p1 < 0) {
      temp = num2[p2].charCodeAt(0) - 48 + carry;
      p2--;
    } else if (p2 < 0) {
      temp = num1[p1].charCodeAt(0) - 48 + carry;
      p1--;
    } else {
      temp = num1[p1].charCodeAt(0) - 48 + num2[p2].charCodeAt(0) - 48 + carry;
      p1--;
      p2--;
    }
    if (temp > 9) {
      temp %= 10;
      carry = 1;
    } else {
      carry = 0;
    }
    res = temp + res;
  }
  if (carry) res = carry + res;
  return res;
};

// 一个数乘以小于 10 的数字
const multi = function (num1, count) {
  let res = '';
  let carry = 0;
  count = count.charCodeAt(0) - 48;
  if (count === 1) return num1;
  for (let i = num1.length - 1; i >= 0; i--) {
    let temp = (num1.charCodeAt(i) - 48) * count + carry;
    if (temp > 9) {
      carry = Math.floor(temp / 10);
      temp %= 10;
    } else {
      carry = 0;
    }
    res = temp + res;
  }
  if (carry) res = carry + res;
  return res;
};

const multiply = function (num1, num2) {
  // '0' code 48
  let res = '0';
  if (num1 === '0' || num2 === '0') return res;
  let end = num2.length - 1;
  for (let i = end; i >= 0; i--) {
    const temp = multi(num1, num2[i]) + '0'.repeat(end - i);
    res = add(res, temp);
  }
  return res;
};

const { log, logAssert, logAssertDisorder } = require('../tools/LogTools.js');
logAssert(multiply, '1234', '116', (1234 * 116).toString());
logAssert(multiply, '1234', '2', (1234 * 2).toString());
