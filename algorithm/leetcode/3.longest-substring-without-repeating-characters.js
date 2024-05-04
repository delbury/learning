/**
 * 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
 *
 * 示例 1:
 * 输入: "abcabcbb"
 * 输出: 3
 * 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
 *
 * 示例 2:
 * 输入: "bbbbb"
 * 输出: 1
 * 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
 *
 * 示例 3:
 * 输入: "pwwkew"
 * 输出: 3
 * 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
 *      请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
 *
 * 思路：滑动窗口
 *
 * @param {string} s
 * @return {number}
 */
const lengthOfLongestSubstring = function (s) {
  const arr = [];
  let max = 0;
  for (let i = 0; i < s.length; i++) {
    const ind = arr.indexOf(s.charAt(i));
    if (ind > -1) {
      arr.splice(0, ind + 1);
    }
    arr.push(s.charAt(i));
    max = Math.max(max, arr.length);
  }

  return max;
};

// map
const lengthOfLongestSubstring2 = (str) => {
  let res = 0;
  let map = new Map();
  let l = 0;
  for (let i = 0; i < str.length; i++) {
    if (map.has(str[i])) {
      const start = l;
      l = map.get(str[i]) + 1;
      for (let j = start; j < l; j++) map.delete(str[j]);
    }
    map.set(str[i], i);
    res = Math.max(i - l + 1, res);
  }
  return res;
};

console.log(lengthOfLongestSubstring('abcabcbb'));
console.log(lengthOfLongestSubstring('bbbbb'));
console.log(lengthOfLongestSubstring('pwwkew'));
