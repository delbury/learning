/**
 * 给定两个由小写字母组成的字符串 s1 和 s2，请编写一个程序，确定其中一个字符串的字符重新排列后，能否变成另一个字符串。
 *
 * 示例 1：
 * 输入: s1 = "abc", s2 = "bca"
 * 输出: true
 *
 * 示例 2：
 * 输入: s1 = "abc", s2 = "bad"
 * 输出: false
 *
 * 说明：
 * 0 <= len(s1) <= 100
 * 0 <= len(s2) <= 100
 */

const tools = require('../tools/LogTools');

const CheckPermutation = function (s1, s2) {
  if (s1.length !== s2.length) return false;
  const map = {};
  for (let i = 0; i < s1.length; i++) {
    map[s1[i]] = map[s1[i]] ? map[s1[i]] + 1 : 1;
  }
  for (let i = 0; i < s2.length; i++) {
    if (!map[s2[i]]) return false;
    map[s2[i]]--;
  }
  return true;
};

tools.logAssert(CheckPermutation, 'abc', 'bca', true);
tools.logAssert(CheckPermutation, 'abc', 'bad', false);
