/**
 * 字符串轮转。给定两个字符串s1和s2，请编写代码检查s2是否为s1旋转而成
 * （比如，waterbottle是erbottlewat旋转后的字符串）。
 *
 * 示例1:
 * 输入：s1 = "waterbottle", s2 = "erbottlewat"
 * 输出：True
 *
 * 示例2:
 * 输入：s1 = "aa", s2 = "aba"
 * 输出：False
 *
 * 提示：
 * 字符串长度在[0, 100000]范围内。
 *
 * 说明:
 * 你能只调用一次检查子串的方法吗？
 */

const isFlipedString = function (s1, s2) {
  if (s1.length !== s2.length) return false;
  if (!s1) return true;

  let count = 0;
  while (count < s1.length) {
    let p = 0;
    while (p < s1.length) {
      if (s1[p] !== s2[(p + count) % s1.length]) {
        count++;
        break;
      }
      p++;
    }
    if (p === s1.length) return true;
  }
  return false;
};

const { logAssert, logAssertDisorder } = require('../tools/LogTools.js');
logAssert(isFlipedString, 'waterbottle', 'erbottlewat', true);
logAssert(isFlipedString, 'aa', 'aba', false);
logAssert(isFlipedString, 'abcd', 'acdb', false);
