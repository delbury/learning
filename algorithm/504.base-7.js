/**
 * 给定一个整数，将其转化为7进制，并以字符串形式输出。
 * 示例 1:
 * 输入: 100
 * 输出: "202"
 * 
 * 示例 2:
 * 输入: -7
 * 输出: "-10"
 * 注意: 输入范围是 [-1e7, 1e7] 。
 * 
 * @param {number} num
 * @return {string}
 */

// 1. api
var convertToBase7I = function(num) {
  return num.toString(7);
};

// 2.
var convertToBase7 = function(num) {
  const sym = num < 0 ? '-' : '';
  let res = '';
  num = Math.abs(num);
  while(num) {
    res = num % 7 + res;
    num = Math.floor(num / 7);
  }
  return sym + res || '0';
};

const { logAssert } = require('./tools/LogTools.js');
logAssert(convertToBase7, 100, '202');
logAssert(convertToBase7, -7, '-10');
logAssert(convertToBase7, 0, '0');
