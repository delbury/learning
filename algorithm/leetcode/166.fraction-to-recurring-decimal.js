/**
 * 给定两个整数，分别表示分数的分子numerator和分母denominator，以字符串形式返回小数。
 * 如果小数部分是循环小数，则将循环的部分括在括号内。
 * 如果存在多个答案，返回任意一个。
 * 保证所有输入的答案字符串长度小于10^4。
 *
 * 示例1：
 * 输入：numerator = 1, denominator = 2
 * 输出："0.5"
 *
 * 示例2：
 * 输入：numerator = 2, denominator = 1
 * 输出："2"
 *
 * 示例3：
 * 输入：numerator = 4, denominator = 333
 * 输出："0.(012)"
 *
 * 提示：
 * -2^31 <= numerator, denominator <= 2^31 - 1
 * denominator != 0
 */

/**
 * @param {number} numerator
 * @param {number} denominator
 * @return {string}
 */
const fractionToDecimal = function (numerator, denominator) {
  if (numerator === denominator) return '1';
  if (!numerator) return '0';
  /**
   * 除不尽
   * 整数部分 + 小数部分
   * 小数部分：
   *   循环前的整数个数：n = max(因数2的个数, 因数5的个数, 0)
   *   循环的整数个数：(10 ^ m - 1) % n === 0
   */
  const sym = numerator / denominator < 0 ? '-' : '';
  numerator = Math.abs(numerator);
  denominator = Math.abs(denominator);
  let factorCount2 = 0;
  let factorCount5 = 0;
  let tn = numerator;
  let td = denominator;
  while (true) {
    // 分子
    if (tn % 2 === 0) {
      tn /= 2;
      factorCount2--;
    }
    if (tn % 5 === 0) {
      tn /= 5;
      factorCount5--;
    }

    // 分母
    let flag = true;
    if (td % 2 === 0) {
      td /= 2;
      factorCount2++;
      flag = false;
    }
    if (td % 5 === 0) {
      td /= 5;
      factorCount5++;
      flag = false;
    }
    if (flag) break;
  }
  // 循环前的整数个数
  let prefixCount = Math.max(factorCount2, factorCount5, 0);
  // 整数部分
  const integer = String(Math.trunc(numerator / denominator));
  // 计算小数部分的余数
  let remainder = numerator % denominator;
  let fractionalPrefix = '';
  let fractionalCircle = '';
  const remainderSet = new Set([]);
  while (remainder) {
    remainder *= 10;
    const num = String(Math.trunc(remainder / denominator));
    remainder %= denominator;

    if (prefixCount) {
      fractionalPrefix += num;
      prefixCount--;
    } else if (!remainderSet.has(remainder)) {
      fractionalCircle += num;
      remainderSet.add(remainder);
    } else {
      fractionalCircle = `(${fractionalCircle})`;
      break;
    }
  }
  let res = sym + integer;
  if (fractionalPrefix || fractionalCircle) res += '.' + fractionalPrefix + fractionalCircle;
  return res;
};

const { log, logAssert, logAssertDisorder } = require('../tools/LogTools.js');
logAssert(fractionToDecimal, 4, 333, '0.(012)');
logAssert(fractionToDecimal, 4, 8, '0.5');
logAssert(fractionToDecimal, 1, 6, '0.1(6)');
logAssert(fractionToDecimal, 1, 333, '0.(003)');
logAssert(fractionToDecimal, 1, 17, '0.(0588235294117647)');
logAssert(fractionToDecimal, -50, 8, '-6.25');
logAssert(fractionToDecimal, -1, 1, '-1');
logAssert(fractionToDecimal, -1, -2147483648, '0.0000000004656612873077392578125');
