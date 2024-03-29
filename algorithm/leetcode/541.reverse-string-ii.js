/**
 * 给定一个字符串 s 和一个整数 k，你需要对从字符串开头算起的每隔 2k 个字符的前 k 个字符进行反转。
 * 如果剩余字符少于 k 个，则将剩余字符全部反转。
 * 如果剩余字符小于 2k 但大于或等于 k 个，则反转前 k 个字符，其余字符保持原样。
 *  
 * 示例:
 * 输入: s = "abcdefg", k = 2
 * 输出: "bacdfeg"
 *  
 * 提示：
 * 该字符串只包含小写英文字母。
 * 给定字符串的长度和 k 在 [1, 10000] 范围内。
 * 
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
// 1.
const reverse = (arr, l, r) => {
  while(l < r) {
    [arr[l], arr[r]] = [arr[r], arr[l]];
    r--;
    l++;
  }
};
var reverseStr = function(s, k) {
  s = s.split('');
  let p = 0;
  while(p < s.length) {
    // 翻转前 k 个
    reverse(s, p, Math.min(p + k - 1, s.length - 1));
    p += k * 2;
  }
  return s.join('');
};

const { logAssert } = require('../tools/LogTools.js');
logAssert(reverseStr, '01234567', 3, '21034576');