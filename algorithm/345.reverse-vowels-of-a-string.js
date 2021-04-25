/**
 * 编写一个函数，以字符串作为输入，反转该字符串中的元音字母。
 * 
 * 示例 1：
 * 输入："hello"
 * 输出："holle"
 * 
 * 示例 2：
 * 输入："leetcode"
 * 输出："leotcede"
 *  
 * 提示：
 * a、e、i、o、u
 * 元音字母不包含字母 "y" 。
 * 
 * @param {string} s
 * @return {string}
 */

// 1. 双指针
const set = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
var reverseVowels = function(s) {
  if(!s || s.length < 2) return s;
  const arr = Array.from(s);
  let lp = 0, rp = arr.length - 1;
  while(lp < rp) {
    if(!set.has(arr[lp])) {
      lp++;
      continue;
    }
    if(!set.has(arr[rp])) {
      rp--;
      continue;
    }

    // 交换
    [arr[lp], arr[rp]] = [arr[rp], arr[lp]];
    lp++;
    rp--;
  }
  return arr.join('');
};

// 2. 双指针字符拼接
var reverseVowelsII = function(s) {
  if(!s || s.length < 2) return s;
  let prefix = '', suffix = '';
  let lp = 0, rp = s.length - 1;
  while(lp < rp) {
    if(!'aeiouAEIOU'.includes(s[lp])) {
      prefix = prefix + s[lp];
      lp++;
      continue;
    }
    if(!'aeiouAEIOU'.includes(s[rp])) {
      suffix = s[rp] + suffix;
      rp--;
      continue;
    }

    // 交换
    prefix = prefix + s[rp];
    suffix = s[lp] + suffix;
    lp++;
    rp--;
  }
  return prefix + (lp === rp ? s[lp] : '') + suffix;
};

const { logAssert } = require('./tools/LogTools.js');
logAssert(reverseVowelsII, 'hello', 'holle');
logAssert(reverseVowelsII, 'leetcode', 'leotcede');
logAssert(reverseVowelsII, 'ai', 'ia');