/**
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
 * 有效字符串需满足：
 * 左括号必须用相同类型的右括号闭合。
 * 左括号必须以正确的顺序闭合。
 *
 * 示例 1：
 * 输入：s = "()"
 * 输出：true
 *
 * 示例 2：
 * 输入：s = "()[]{}"
 * 输出：true
 *
 * 示例 3：
 * 输入：s = "(]"
 * 输出：false
 *
 * 示例 4：
 * 输入：s = "([)]"
 * 输出：false
 *
 * 示例 5：
 * 输入：s = "{[]}"
 * 输出：true
 *
 * 提示：
 * 1 <= s.length <= 104
 * s 仅由括号 '()[]{}' 组成
 *
 * @param {string} s
 * @return {boolean}
 */

// 1. 栈
const isValid = function (s) {
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(' || s[i] === '{' || s[i] === '[') {
      stack.unshift(s[i]);
    } else {
      if (
        !stack.length ||
        (s[i] === ')' && stack[0] !== '(') ||
        (s[i] === '}' && stack[0] !== '{') ||
        (s[i] === ']' && stack[0] !== '[')
      ) {
        return false;
      }
      stack.shift();
    }
  }
  return !stack.length;
};

var isValid2 = function (s) {
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(' || s[i] === '{' || s[i] === '[') {
      stack.push(s[i]);
    } else {
      const item = stack.pop();
      if (!item || (s[i] === ')' && item !== '(') || (s[i] === '}' && item !== '{') || (s[i] === ']' && item !== '[')) {
        return false;
      }
    }
  }
  return !stack.length;
};

const { log, logAssert, logAssertDisorder } = require('../tools/LogTools.js');
logAssert(isValid2, '()[]{}', true);
logAssert(isValid2, '(}', false);
logAssert(isValid2, '([)]', false);
