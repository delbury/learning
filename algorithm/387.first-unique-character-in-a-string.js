/**
 * 给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。
 * 
 * 示例：
 * s = "leetcode"
 * 返回 0
 * 
 * s = "loveleetcode"
 * 返回 2
 * 
 * @param {string} s
 * @return {number}
 */
// 1. hash 保存索引
var firstUniqChar = function(s) {
  const map = new Map();
  for(let i = 0; i < s.length; i++) {
    const it = map.get(s[i]);
    if(it !== undefined) {
      // 重复存在则设置为 -1
      if(it !== -1) map.set(s[i], -1);
    } else {
      // 不存在就设置为下标
      map.set(s[i], i);
    }
  }
  for(const val of map.values()) {
    if(val > -1) return val;
  }
  return -1;
};

const { logAssert } = require('./tools/LogTools.js');
logAssert(firstUniqChar, 'aadadaad', -1);