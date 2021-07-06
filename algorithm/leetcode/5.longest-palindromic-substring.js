/**
 * 给你一个字符串 s，找到 s 中最长的回文子串。
 * 
 * 示例 1：
 * 输入：s = "babad"
 * 输出："bab"
 * 解释："aba" 同样是符合题意的答案。
 * 
 * 示例 2：
 * 输入：s = "cbbd"
 * 输出："bb"
 * 
 * 示例 3：
 * 输入：s = "a"
 * 输出："a"
 * 
 * 示例 4：
 * 输入：s = "ac"
 * 输出："a"
 * 
 * 提示：
 * 1 <= s.length <= 1000
 * s 仅由数字和英文字母（大写和/或小写）组成
 * 
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  if(s.length <= 1) return s;
  let res = '';
  for(let i = 0; i < s.length; i += 0.5) {
    let l = i - 1, r = i + 1;
    if(Math.floor(i) !== i) {
      // 奇数串
      l = Math.floor(i);
      r = l + 1;
    }
    while(l >= 0 && r < s.length) {
      if(s[l] === s[r]) {
        l--;
        r++;
      } else {
        break;
      }
    }
    if(r - l - 1 > res.length) {
      res = s.substring(l + 1, r);
    }
  }
  return res;
};

const { logAssert, logAssertDisorder } = require('../tools/LogTools.js');
logAssert(longestPalindrome, 'babad', 'bab');