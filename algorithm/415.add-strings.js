/**
 * 给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和。
 * 
 * 提示：
 * um1 和num2 的长度都小于 5100
 * um1 和num2 都只包含数字 0-9
 * um1 和num2 都不包含任何前导零
 * 你不能使用任何內建 BigInteger 库， 也不能直接将输入的字符串转换为整数形式

 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */

// 1.
var addStringsII = function(num1, num2) {
  // num1 的长度大于等于 num2
  if(num2.length > num1.length) [num1, num2] = [num2, num1];
  let carry = 0;
  let res = '';
  for(let i = num1.length - 1; i >= 0; i--) {
    const j = i - num1.length + num2.length;
    const t = num1.charCodeAt(i) - 48 + (j < 0 ? 0 : (num2.charCodeAt(j) - 48)) + carry;
    carry = t >= 10 ? 1 : 0;
    res = (t % 10) + res;
  }
  if(carry) {
    res = carry + res;
  }
  return res;
};

// 2. 双指针
var addStrings = function(num1, num2) {
  let p1 = num1.length - 1;
  let p2 = num2.length - 1;
  let res = '';
  let carry = 0;
  while(p1 >= 0 || p2 >= 0) {
    const n1 = p1 >= 0 ? num1.charCodeAt(p1) - 48 : 0;
    const n2 = p2 >= 0 ? num2.charCodeAt(p2) - 48 : 0;
    const t = n1 + n2 + carry;
    carry = t < 10 ? 0 : 1;
    res = (t % 10) + res;
    p1--;
    p2--;
  }
  if(carry) {
    res = carry + res;
  }
  return res;
};

const { logAssert } = require('./tools/LogTools.js');
logAssert(addStrings, '56', '77', (56 + 77).toString());
logAssert(addStrings, '456', '77', '533');
logAssert(addStrings, '18582506933032752', '366213329703', '18582873146362455');
logAssert(addStrings, '1', '9', '10');