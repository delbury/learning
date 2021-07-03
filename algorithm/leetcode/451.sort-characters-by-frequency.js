/**
 * 给定一个字符串，请将字符串里的字符按照出现的频率降序排列。
 * 
 * 示例 1:
 * 输入:
 * "tree"
 * 输出:
 * "eert"
 * 解释:
 * 'e'出现两次，'r'和't'都只出现一次。
 * 因此'e'必须出现在'r'和't'之前。此外，"eetr"也是一个有效的答案。
 * 
 * 示例 2:
 * 输入:
 * "cccaaa"
 * 输出:
 * "cccaaa"
 * 解释:
 * 'c'和'a'都出现三次。此外，"aaaccc"也是有效的答案。
 * 注意"cacaca"是不正确的，因为相同的字母必须放在一起。
 * 
 * 示例 3:
 * 输入:
 * "Aabb"
 * 输出:
 * "bbAa"
 * 解释:
 * 此外，"bbaA"也是一个有效的答案，但"Aabb"是不正确的。
 * 注意'A'和'a'被认为是两种不同的字符。
 * 
 * @param {string} s
 * @return {string}
 */

// 1. hash 后排序
var frequencySortI = function(s) {
  const map = new Map();
  for(let i = 0; i < s.length; i++) {
    map.set(s[i], (map.has(s[i]) ? map.get(s[i]) : 0) + 1);
  }
  const arr = Array.from(map.entries());
  arr.sort((a, b) => b[1] - a[1]);
  let res = '';
  for(let i = 0; i < arr.length; i++) {
    res += arr[i][0].repeat(arr[i][1]);
  }
  return res;
};

// 2. 桶排序
var frequencySort = function(s) {
  const map = new Map();
  let max = 0;
  for(let i = 0; i < s.length; i++) {
    const count = (map.has(s[i]) ? map.get(s[i]) : 0) + 1
    map.set(s[i], count);
    max = Math.max(max, count);
  }
  const buckets = Array.from({ length: max }, () => []);
  for(let [k, c] of map.entries()) {
    buckets[c - 1].push(k);
  }
  let res = ''
  for(let i = buckets.length - 1; i >= 0; i--) {
    for(let j = 0; j < buckets[i].length; j++) {
      res += buckets[i][j].repeat(i + 1);
    }
  }
  return res;
};