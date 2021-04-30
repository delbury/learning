/**
 * 给定一个整数，编写一个算法将这个数转换为十六进制数。对于负整数，我们通常使用 补码运算 方法。
 * 
 * 注意:
 * 十六进制中所有字母(a-f)都必须是小写。
 * 十六进制字符串中不能包含多余的前导零。如果要转化的数为0，那么以单个字符'0'来表示；对于其他情况，十六进制字符串中的第一个字符将不会是0字符。 
 * 给定的数确保在32位有符号整数范围内。
 * 不能使用任何由库提供的将数字直接转换或格式化为十六进制的方法。
 * 
 * 示例 1：
 * 输入:
 * 26
 * 输出:
 * "1a"
 * 
 * 示例 2：
 * 输入:
 * -1
 * 输出:
 * "ffffffff"
 * 
 * @param {number} num
 * @return {string}
 */

// 1.
var toHex = function(num) {
  if(num === 0) return '0';
  if(num < 0) {
    // 取补码
    num = new Uint32Array([num])[0];
  }
  let res = '';
  while(num > 0) {
    let n = num % 16;
    num = Math.floor(num / 16);
    if(n >= 10) {
      n = String.fromCharCode(n + 87);
    }
    res = n + res;
  }
  return res;
};

const { logAssert } = require('./tools/LogTools.js');
logAssert(toHex, 26, '1a');
logAssert(toHex, -1, 'ffffffff');
logAssert(toHex, 0, '0');
