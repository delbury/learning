/**
 * 给定一个字符串，编写一个函数判定其是否为某个回文串的排列之一。
 * 回文串是指正反两个方向都一样的单词或短语。排列是指字母的重新排列。
 * 回文串不一定是字典当中的单词。
 *
 * 示例1：
 * 输入："tactcoa"
 * 输出：true（排列有"tacocat"、"atcocta"，等等）
 */

const { logAssert } = require('../tools/LogTools');

// 只有一个或者零个字符为奇数个，其他字符全部为偶数个
const canPermutePalindrome = function (s) {
  const map = {};
  for (let i = 0; i < s.length; i++) {
    map[s[i]] = map[s[i]] ? map[s[i]] + 1 : 1;
  }
  let hasOdd = false;
  for (const num of Object.values(map)) {
    if (num % 2 === 0) continue;
    if (hasOdd) return false;
    hasOdd = true;
  }
  return true;
};

logAssert(canPermutePalindrome, 'tactcoa', true);
logAssert(canPermutePalindrome, 'code', false);
