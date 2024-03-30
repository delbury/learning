/**
 * 字符串有三种编辑操作:插入一个英文字符、删除一个英文字符或者替换一个英文字符。
 * 给定两个字符串，编写一个函数判定它们是否只需要一次(或者零次)编辑。
 *
 * 示例 1:
 * 输入:
 * first = "pale"
 * second = "ple"
 * 输出: True
 *
 * 示例 2:
 * 输入:
 * first = "pales"
 * second = "pal"
 * 输出: False
 */

const oneEditAway = function (first, second) {
  const lenDiff = first.length - second.length;
  if (Math.abs(lenDiff) > 1) return false;

  // second.length >= first.length
  if (lenDiff === 1) {
    [first, second] = [second, first];
  }
  let hasChance = true;
  let pf = 0;
  let ps = 0;
  while (ps < second.length) {
    if (first[pf++] === second[ps++]) continue;
    if (!hasChance) return false;
    if (lenDiff) pf--;
    hasChance = false;
  }
  return true;
};

const { logAssert, logAssertDisorder } = require('../tools/LogTools.js');
logAssert(oneEditAway, 'pale', 'ple', true);
logAssert(oneEditAway, 'pales', 'pal', false);
