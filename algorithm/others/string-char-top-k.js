/**
 * 给定一个字符串数组，再给定整数k，请返回出现次数前k名的字符串和对应的次数。
 * 返回的答案应该按字符串出现频率由高到低排序。如果不同的字符串有相同出现频率，按字典序排序。
 * 对于两个字符串，大小关系取决于两个字符串从左到右第一个不同字符的 ASCII 值的大小关系。
 * 比如"ah1x"小于"ahb"，"231"<”32“
 * 字符仅包含数字和字母
 * 
 * return topK string
 * @param strings string字符串一维数组 strings
 * @param k int整型 the k
 * @return string字符串二维数组
 */
// 1.
function topKstrings( strings ,  k ) {
  // write code here
  const map = new Map();
  const set = new Set(strings); // 保存顺序
  let max = 0;
  for(const s of strings) {
    const count = (map.get(s) || 0) + 1;
    map.set(s, count);
    if(count >= max) {
      max = count;
      set.delete(s);
      set.add(s);
    }
  }
  const arr = Array.from(set);
  arr.sort((a, b) => {
    const diff = map.get(b) - map.get(a);
    if(diff === 0) return a < b ? -1 : 1;
    return diff;
  });
  const res = [];
  for(let i = 0; i < k; i++) {
    res.push([arr[i], map.get(arr[i])]);
  }
  return res;
}
module.exports = {
  topKstrings : topKstrings
};

const { logAssert, logAssertDisorder } = require('../tools/LogTools.js');
// logAssert(topKstrings, ['a', 'b', 'ac', 'b', 'ac', 'b', 'a', 'd', 'e', 'f'], 2, []);
logAssert(topKstrings, ['1', '1', '2', '3'], 2, []);