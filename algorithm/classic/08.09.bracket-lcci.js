/**
 * 括号。设计一种算法，打印n对括号的所有合法的（例如，开闭一一对应）组合。
 *
 * 说明：解集不能包含重复的子集。
 *
 * 例如，给出 n = 3，生成结果为：
 *
 * [
 *   "((()))",
 *   "(()())",
 *   "(())()",
 *   "()(())",
 *   "()()()"
 * ]
 */

/**
 * @param {number} n
 * @return {string[]}
 */
const generateParenthesis = function (n) {
  const res = [];
  const fn = (str, l, r) => {
    if (r === n) {
      res.push(str);
    } else if (l === n) {
      fn(str + ')', l, r + 1);
    } else if (l === r) {
      fn(str + '(', l + 1, r);
    } else {
      fn(str + ')', l, r + 1);
      fn(str + '(', l + 1, r);
    }
  };
  fn('', 0, 0);
  return res;
};

const { log, logAssert, logAssertDisorder } = require('../tools/LogTools.js');
logAssertDisorder(generateParenthesis, 3, ['((()))', '(()())', '(())()', '()(())', '()()()']);
