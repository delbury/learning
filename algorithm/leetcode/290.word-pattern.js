/**
 * 给定一种规律 pattern 和一个字符串 str ，判断 str 是否遵循相同的规律。
 * 这里的 遵循 指完全匹配，例如， pattern 里的每个字母和字符串 str 中的每个非空单词之间存在着双向连接的对应规律。
 * 
 * 示例1:
 * 输入: pattern = "abba", str = "dog cat cat dog"
 * 输出: true
 * 
 * 示例 2:
 * 输入:pattern = "abba", str = "dog cat cat fish"
 * 输出: false
 * 
 * 示例 3:
 * 输入: pattern = "aaaa", str = "dog cat cat dog"
 * 输出: false
 * 
 * 示例 4:
 * 输入: pattern = "abba", str = "dog dog dog dog"
 * 输出: false
 * 说明:
 * 你可以假设 pattern 只包含小写字母， str 包含了由单个空格分隔的小写字母。 
 * 
 * 
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */

// 1. 双 hash
var wordPattern = function (pattern, s) {
  const arr = s.split(' ');
  if (arr.length !== pattern.length) return false;

  const map1 = new Map(); // pattern: s 的映射
  const map2 = new Map(); // s: pattern 的映射

  for (let i = 0; i < arr.length; i++) {
    if (map1.has(pattern[i]) ^ map2.has(arr[i])) return false;

    if (map1.has(pattern[i]) && map1.get(pattern[i]) !== arr[i]) return false;

    if (map2.has(arr[i]) && map2.get(arr[i]) !== pattern[i]) return false;

    map1.set(pattern[i], arr[i]);
    map2.set(arr[i], pattern[i]);
  }

  return true;
};

// 2. 翻译法
var wordPatternII = function (pattern, s) {
  const arr = s.split(' ');
  if (arr.length !== pattern.length) return false;

  const temp1 = {};
  const temp2 = {};

  for (let i = 0; i < arr.length; i++) {
    if (temp1[arr[i]] !== temp2[pattern[i]]) {
      return false;
    } else if (temp1[arr[i]] === undefined) {
      temp1[arr[i]] = i + 1;
      temp2[pattern[i]] = i + 1;
    }
  }

  return true;
};


const { logAssert } = require('./tools/LogTools.js');
logAssert(wordPatternII, 'abba', 'dog cat cat dog', true);
logAssert(wordPatternII, 'abba', 'dog cat cat fish', false);
logAssert(wordPatternII, 'aaaa', 'dog cat cat dog', false);
logAssert(wordPatternII, 'abba', 'dog dog dog dog', false);
