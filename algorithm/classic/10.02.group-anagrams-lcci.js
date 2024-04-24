/**
 * 编写一种方法，对字符串数组进行排序，将所有变位词组合在一起。
 * 变位词是指字母相同，但排列不同的字符串。
 *
 * 注意：本题相对原题稍作修改
 *
 * 示例:
 * 输入: ["eat", "tea", "tan", "ate", "nat", "bat"],
 * 输出:
 * [
 *   ["ate","eat","tea"],
 *   ["nat","tan"],
 *   ["bat"]
 * ]
 *
 * 说明：
 * 所有输入均为小写字母。
 * 不考虑答案输出的顺序。
 */

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
const groupAnagrams = function (strs) {
  const map = new Map();
  for (const s of strs) {
    const arr = Array(25).fill('');
    for (let i = 0; i < s.length; i++) {
      const index = s.charCodeAt(i) - 97;
      arr[index] = +arr[index] + 1;
    }
    const hash = arr.join(',');
    const item = map.get(hash);
    if (item) {
      item.push(s);
    } else {
      map.set(hash, [s]);
    }
  }
  return [...map.values()];
};

const { log, logAssert, logAssertDisorder } = require('../tools/LogTools.js');
// logAssertDisorder(
//   groupAnagrams,
//   ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'],
//   [['ate', 'eat', 'tea'], ['nat', 'tan'], ['bat']]
// );
const input = [
  'hos',
  'boo',
  'nay',
  'deb',
  'wow',
  'bop',
  'bob',
  'brr',
  'hey',
  'rye',
  'eve',
  'elf',
  'pup',
  'bum',
  'iva',
  'lyx',
  'yap',
  'ugh',
  'hem',
  'rod',
  'aha',
  'nam',
  'gap',
  'yea',
  'doc',
  'pen',
  'job',
  'dis',
  'max',
  'oho',
  'jed',
  'lye',
  'ram',
  'pup',
  'qua',
  'ugh',
  'mir',
  'nap',
  'deb',
  'hog',
  'let',
  'gym',
  'bye',
  'lon',
  'aft',
  'eel',
  'sol',
  'jab',
];
const expect = [
  ['eel'],
  ['aft'],
  ['lon'],
  ['bye'],
  ['gym'],
  ['let'],
  ['hog'],
  ['mir'],
  ['iva'],
  ['brr'],
  ['eve'],
  ['nay'],
  ['sol'],
  ['pup', 'pup'],
  ['max'],
  ['bum'],
  ['lye'],
  ['gap'],
  ['hey'],
  ['boo'],
  ['aha'],
  ['elf'],
  ['bob'],
  ['hem'],
  ['doc'],
  ['oho'],
  ['wow'],
  ['deb', 'deb'],
  ['hos'],
  ['rye'],
  ['bop'],
  ['yap'],
  ['ugh', 'ugh'],
  ['ram'],
  ['rod'],
  ['nam'],
  ['yea'],
  ['nap'],
  ['pen'],
  ['job'],
  ['lyx'],
  ['dis'],
  ['jed'],
  ['jab'],
  ['qua'],
];
console.log('input', input.length, 'expect', expect.length);
logAssertDisorder(groupAnagrams, input, expect);
// logAssertDisorder(groupAnagrams, ['boo', 'bob'], []);
