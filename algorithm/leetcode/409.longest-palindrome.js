/**
 * 给定一个包含大写字母和小写字母的字符串，找到通过这些字母构造成的最长的回文串。
 * 在构造过程中，请注意区分大小写。比如 "Aa" 不能当做一个回文字符串。
 * 
 * 注意:
 * 假设字符串的长度不会超过 1010。
 * 
 * 示例 1:
 * 输入:
 * "abccccdd"
 * 输出:
 * 7
 * 解释:
 * 我们可以构造的最长的回文串是"dccaccd", 它的长度是 7。
 * 
 * @param {string} s
 * @return {number}
 */

// 1. hash
var longestPalindrome = function(s) {
  const set = new Set();
  let count = 0;
  for(let i = 0; i < s.length; i++) {
    if(!set.has(s[i])) {
      set.add(s[i]);
    } else {
      set.delete(s[i]);
      count++;
    }
  }
  return count * 2 === s.length ? count * 2 : count * 2 + 1;
};

const { logAssert } = require('./tools/LogTools.js');
logAssert(longestPalindrome, 'abccccdd', 7);