/**
 * 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。
 * 
 * 示例 1:
 * 输入: s = "anagram", t = "nagaram"
 * 输出: true
 * 
 * 示例 2:
 * 输入: s = "rat", t = "car"
 * 输出: false
 * 
 * 说明:
 * 你可以假设字符串只包含小写字母。
 * 
 * 进阶:
 * 如果输入字符串包含 unicode 字符怎么办？你能否调整你的解法来应对这种情况？
 * 
 * 
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */

// 1. hash
var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;
  if (s === t) return true;
  const obj = {};
  for (let i = 0; i < s.length; i++) {
    if (s[i] in obj) {
      obj[s[i]]++;
    } else {
      obj[s[i]] = 1;
    }

    if (t[i] in obj) {
      obj[t[i]]--;
    } else {
      obj[t[i]] = -1;
    }
  }

  for (let key in obj) {
    if (obj[key] !== 0) return false;
  }
  return true;
};

// 2. 排序
var isAnagram = function (s, t) {
  return s.split('').sort().join('') === t.split('').sort().join('');
};

const { logAssert } = require('./tools/LogTools.js');
logAssert(isAnagram, 'anagram', 'nagaram', true);
logAssert(isAnagram, 'rat', 'car', false);
