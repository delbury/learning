/**
 * 给定一个字符串，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。
 * 
 * 示例：
 * 输入："Let's take LeetCode contest"
 * 输出："s'teL ekat edoCteeL tsetnoc"
 *  
 * 提示：
 * 在字符串中，每个单词由单个空格分隔，并且字符串中不会有任何额外的空格。
 * 
 * @param {string} s
 * @return {string}
 */

// 1. 数组反转
const reverse = (arr, l, r) => {
  while(l < r) {
    [arr[l], arr[r]] = [arr[r], arr[l]];
    l++;
    r--;
  }
};
var reverseWordsI = function(s) {
  if(s.length <= 1) return s;

  s = s.split('');
  let r = 1, l = 0;
  while(r < s.length) {
    if(s[r] === ' ') {
      reverse(s, l, r - 1);
      while(s[r] === ' ') {
        r++;
      }
      l = r;
    } else {
      r++;
    }
  }
  if(r > l) reverse(s, l, r);
  return s.join('');
};

// 2. 字符串拼接
var reverseWords = function(s) {
  let res = '';
  let temp = '';
  for(let i = 0; i < s.length; i++) {
    if(s[i] === ' ') {
      res += temp + ' ';
      temp = '';
    } else {
      temp = s[i] + temp;
    }
  }
  res += temp;
  return res;
};

const { logAssert } = require('../tools/LogTools.js');
logAssert(reverseWords, "Let's take LeetCode contest", "s'teL ekat edoCteeL tsetnoc");