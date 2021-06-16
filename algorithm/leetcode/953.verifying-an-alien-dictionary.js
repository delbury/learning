/**
 * 某种外星语也使用英文小写字母，但可能顺序 order 不同。字母表的顺序（order）是一些小写字母的排列。
 * 给定一组用外星语书写的单词 words，以及其字母表的顺序 order，
 * 只有当给定的单词在这种外星语中按字典序排列时，返回 true；否则，返回 false。
 *  
 * 示例 1：
 * 输入：words = ["hello","leetcode"], order = "hlabcdefgijkmnopqrstuvwxyz"
 * 输出：true
 * 解释：在该语言的字母表中，'h' 位于 'l' 之前，所以单词序列是按字典序排列的。
 * 
 * 示例 2：
 * 输入：words = ["word","world","row"], order = "worldabcefghijkmnpqstuvxyz"
 * 输出：false
 * 解释：在该语言的字母表中，'d' 位于 'l' 之后，那么 words[0] > words[1]，因此单词序列不是按字典序排列的。
 * 
 * 示例 3：
 * 输入：words = ["apple","app"], order = "abcdefghijklmnopqrstuvwxyz"
 * 输出：false
 * 解释：当前三个字符 "app" 匹配时，第二个字符串相对短一些，
 * 然后根据词典编纂规则 "apple" > "app"，
 * 因为 'l' > '∅'，其中 '∅' 是空白字符，定义为比任何其他字符都小（更多信息）。
 *  
 * 提示：
 * 1 <= words.length <= 100
 * 1 <= words[i].length <= 20
 * order.length == 26
 * 在 words[i] 和 order 中的所有字符都是英文小写字母。
 * 
 * 
 * @param {string[]} words
 * @param {string} order
 * @return {boolean}
 */

// 1. hash
const ascend = function (map, ws1, ws2) {
  for (let i = 0; i < ws1.length; i++) {
    if (ws1[i] && !ws2[i]) return false;

    if (map.get(ws1[i]) > map.get(ws2[i])) return false;

    if (map.get(ws1[i]) < map.get(ws2[i])) return true;

  }

  return true;
};

var isAlienSorted = function (words, order) {
  const map = new Map();
  for (let i = 0; i < order.length; i++) {
    map.set(order[i], i);
  }

  for (let i = 0; i < words.length - 1; i++) {
    if (!ascend(map, words[i], words[i + 1])) return false;
  }

  return true;
};

// 2.
var isAlienSortedII = function (words, order) {
  for (let i = 0; i < words.length - 1; i++) {
    for (let j = 0; j < words[i].length; j++) {
      if (words[i][j] && !words[i + 1][j]) return false;

      const index1 = order.indexOf(words[i][j]);
      const index2 = order.indexOf(words[i + 1][j]);
      if (index1 > index2) return false;
      if (index1 < index2) break;
    }
  }
  return true;
};

const { logAssert } = require('./tools/LogTools.js');
logAssert(isAlienSortedII, ["hello", "leetcode"], "hlabcdefgijkmnopqrstuvwxyz", true);
logAssert(isAlienSortedII, ["word", "world", "row"], "worldabcefghijkmnpqstuvxyz", false);
logAssert(isAlienSortedII, ["apple", "app"], "abcdefghijklmnopqrstuvwxyz", false);

