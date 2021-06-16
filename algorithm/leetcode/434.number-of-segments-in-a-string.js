/**
 * 统计字符串中的单词个数，这里的单词指的是连续的不是空格的字符。
 * 请注意，你可以假定字符串里不包括任何不可打印的字符。
 * 
 * 示例:
 * 输入: "Hello, my name is John"
 * 输出: 5
 * 解释: 这里的单词是指连续的不是空格的字符，所以 "Hello," 算作 1 个单词。
 * 
 * @param {string} s
 * @return {number}
 */

// 1. 遍历
var countSegmentsII = function(s) {
  let count = 0;
  let hasStr = false;
  for(let i = s.length - 1; i >= 0; i--) {
    if(s[i] === ' ') {
      if(hasStr) {
        count++;
        hasStr = false;
      }
    } else {
      hasStr = true;
    }
  }
  return count + (hasStr ? 1 : 0);
};

// 2. api
var countSegments = function(s) {
  s = s.trim();
  return s ? s.split(/\s+/).length : 0;
};

const { logAssert } = require('./tools/LogTools.js');
logAssert(countSegments, 'Hello, my name is John', 5);
logAssert(countSegments, ' Hello, my name is John ', 5);
logAssert(countSegments, '     ', 0);
