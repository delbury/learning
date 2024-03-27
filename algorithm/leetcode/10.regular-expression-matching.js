/**
 * 给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。
 * '.' 匹配任意单个字符
 * '*' 匹配零个或多个前面的那一个元素
 * 所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。
 *
 * 示例 1：
 * 输入：s = "aa", p = "a"
 * 输出：false
 * 解释："a" 无法匹配 "aa" 整个字符串。
 *
 * 示例 2:
 * 输入：s = "aa", p = "a*"
 * 输出：true
 * 解释：因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。
 * 因此，字符串 "aa" 可被视为 'a' 重复了一次。
 *
 * 示例 3：
 * 输入：s = "ab", p = ".*"
 * 输出：true
 * 解释：".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。
 *
 * 提示：
 * 1 <= s.length <= 20
 * 1 <= p.length <= 20
 * s 只包含从 a-z 的小写字母。
 * p 只包含从 a-z 的小写字母，以及字符 . 和 *。
 * 保证每次出现字符 * 时，前面都匹配到有效的字符
 */

const tools = require('../tools/LogTools');

// 暴力回溯
const match = function (s, p) {
  const arr = [];
  for (let i = 0; i < p.length; i++) {
    if (p[i] === '*') {
      arr.push(arr.pop() + '*');
    } else {
      arr.push(p[i]);
    }
  }
  const compare = (arrIndex, sIndex) => {
    while (arrIndex < arr.length) {
      if (arr[arrIndex].length === 1) {
        // 'a' or '.'
        if (arr[arrIndex] === '.' || s[sIndex] === arr[arrIndex]) {
          sIndex++;
          arrIndex++;
        } else {
          return false;
        }
      } else if (arr[arrIndex] === '.*') {
        // '.*' 匹配 0 ~ 最多个
        let ts = sIndex;
        while (ts <= s.length) {
          if (compare(arrIndex + 1, ts++)) {
            return true;
          }
        }
      } else {
        // 'a*'
        let ts = sIndex;
        if (compare(arrIndex + 1, ts)) {
          return true;
        }
        // 匹配尽可能多个
        const char = arr[arrIndex][0];
        while (ts < s.length && s[ts] === char) {
          if (compare(arrIndex + 1, ++ts)) {
            return true;
          }
        }
        // 匹配 0 个
        if (compare(arrIndex + 1, sIndex)) {
          return true;
        }
        // 未匹配到
        arrIndex++;
      }
    }
    // 完成匹配
    return sIndex === s.length && arrIndex >= arr.length;
  };
  return compare(0, 0);
};

// 动态规划

tools.logAssert(match, 'aa', 'a', false);
tools.logAssert(match, 'abcdef', 'abcde', false);
tools.logAssert(match, 'abc', '.*', true);
tools.logAssert(match, 'abcd', 'ab.*cd', true);
tools.logAssert(match, 'abcdefgh', 'ab.*', true);
tools.logAssert(match, 'abcdefgh', 'ab.*gh', true);
tools.logAssert(match, 'abcdefgh', 'a.*de.*gh', true);
tools.logAssert(match, 'aaa', 'a*', true);
tools.logAssert(match, 'aabbbbef', 'aab*ef', true);
tools.logAssert(match, 'aabbbbef', 'aabb*ef', true);
tools.logAssert(match, 'aabbbbef', 'aabb*f', false);
