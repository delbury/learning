/**
 * 有一个正整数数组 arr，现给你一个对应的查询数组 queries，其中 queries[i] = [Li, Ri]。
 * 对于每个查询 i，请你计算从 Li 到 Ri 的 XOR 值（即 arr[Li] xor arr[Li+1] xor ... xor arr[Ri]）作为本次查询的结果。
 * 并返回一个包含给定查询 queries 所有结果的数组。
 *  
 * 示例 1：
 * 输入：arr = [1,3,4,8], queries = [[0,1],[1,2],[0,3],[3,3]]
 * 输出：[2,7,14,8] 
 * 解释：
 * 数组中元素的二进制表示形式是：
 * 1 = 0001 
 * 3 = 0011 
 * 4 = 0100 
 * 8 = 1000 
 * 查询的 XOR 值为：
 * [0,1] = 1 xor 3 = 2 
 * [1,2] = 3 xor 4 = 7 
 * [0,3] = 1 xor 3 xor 4 xor 8 = 14 
 * [3,3] = 8
 * 
 * 示例 2：
 * 输入：arr = [4,8,2,10], queries = [[2,3],[1,3],[0,0],[0,3]]
 * 输出：[8,0,4,4]
 *  
 * 提示：
 * 1 <= arr.length <= 3 * 10^4
 * 1 <= arr[i] <= 10^9
 * 1 <= queries.length <= 3 * 10^4
 * queries[i].length == 2
 * 0 <= queries[i][0] <= queries[i][1] < arr.length
 * 
 * @param {number[]} arr
 * @param {number[][]} queries
 * @return {number[]}
 */

// 1. 遍历
var xorQueriesI = function(arr, queries) {
  const res = [];
  for(const q of queries) {
    let t = 0;
    for(let i = q[0]; i <= q[1]; i++) {
      t ^= arr[i];
    }
    res.push(t);
  }
  return res;
};

// 2. 排序 + map
var xorQueriesII = function(arr, queries) {
  const map = new Map();
  queries.forEach((q, i) => q[2] = i);
  queries.sort((a, b) => {
    const d = a[0] - b[0];
    return d === 0 ? a[1] - b[1] : d;
  });
  const res = [];
  for(const q of queries) {
    const m = map.get(q[0]);
    let start = q[0];
    let temp = 0;
    if(m) {
      start = m[0] + 1;
      temp = m[1];
    }
    for(let i = start; i <= q[1]; i++) {
      temp ^= arr[i];
    }
    map.set(q[0], [q[1], temp]);
    res[q[2]] = temp;
  }
  return res;
};

// 3. 计算前缀异或
var xorQueries = function(arr, queries) {
  const prefix = [0];
  for(let i = 0; i < arr.length; i++) {
    prefix.push(prefix[prefix.length - 1] ^ arr[i]);
  }
  const res = [];
  for(const q of queries) {
    res.push(prefix[q[1] + 1] ^ prefix[q[0]]);
  }
  return res;
};

const { logAssert } = require('./tools/LogTools.js');
logAssert(xorQueries, [4,8,2,10], [[2,3],[1,3],[0,0],[0,3]], [8,0,4,4]);