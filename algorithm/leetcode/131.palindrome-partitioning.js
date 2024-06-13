/**
 * 给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是回文串。
 * 返回 s 所有可能的分割方案。
 *
 * 示例 1：
 * 输入：s = "aab"
 * 输出：[["a","a","b"],["aa","b"]]
 *
 * 示例 2：
 * 输入：s = "a"
 * 输出：[["a"]]
 *
 * 提示：
 * 1 <= s.length <= 16
 * s 仅由小写英文字母组成
 */

/**
 * @param {string} s
 * @return {string[][]}
 */
const isP = (s, l, r) => {
  while (l < r) {
    if (s[l] !== s[r]) return false;
    l++;
    r--;
  }
  return true;
};
const fn = (s, res, prev, index) => {
  if (index >= s.length) {
    res.push([...prev]);
    return;
  }
  let end = s.length - 1;
  for (let i = end; i >= index; i--) {
    if (isP(s, index, i)) {
      prev.push(s.substring(index, i + 1));
      fn(s, res, prev, i + 1);
      prev.pop();
    }
  }
};
const partition = function (s) {
  const res = [];
  fn(s, res, [], 0);
  return res;
};

const { log, logAssert, logAssertDisorder } = require('../tools/LogTools.js');
logAssertDisorder(partition, 'aab', [
  ['a', 'a', 'b'],
  ['aa', 'b'],
]);
logAssertDisorder(partition, 'a', [['a']]);
