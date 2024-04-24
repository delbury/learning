/**
 * 稀疏数组搜索。
 * 有个排好序的字符串数组，其中散布着一些空字符串，编写一种方法，找出给定字符串的位置。
 *
 * 示例1:
 *  输入: words = ["at", "", "", "", "ball", "", "", "car", "", "","dad", "", ""], s = "ta"
 *  输出：-1
 *  说明: 不存在返回-1。
 *
 * 示例2:
 *  输入：words = ["at", "", "", "", "ball", "", "", "car", "", "","dad", "", ""], s = "ball"
 *  输出：4
 *
 * 提示:
 * words的长度在[1, 1000000]之间
 */

/**
 * @param {string[]} words
 * @param {string} s
 * @return {number}
 */
const findString = function (words, s) {
  let l = 0;
  let r = words.length;
  while (l < r) {
    const c = (l + r) >> 1;
    let t = c;
    while (t >= l && words[t] === '') {
      t--;
    }
    if (t < l || words[t] < s) {
      l = c + 1;
    } else if (words[t] > s) {
      r = t;
    } else {
      return t;
    }
  }
  return -1;
};

const { log, logAssert, logAssertDisorder } = require('../tools/LogTools.js');
logAssert(findString, ['at', '', '', '', 'ball', '', '', 'car', '', '', 'dad', '', ''], 'ta', -1);
logAssert(findString, ['at', '', '', '', 'ball', '', '', 'car', '', '', 'dad', '', ''], 'ball', 4);
logAssert(findString, ['CitZMIXZKoFbxvOlaza', 'hBlKXdKJfBD'], 'hBlKXdKJfBD', 1);
