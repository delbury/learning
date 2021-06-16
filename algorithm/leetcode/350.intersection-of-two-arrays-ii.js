/**
 * 给定两个数组，编写一个函数来计算它们的交集。
 * 
 * 示例 1：
 * 输入：nums1 = [1,2,2,1], nums2 = [2,2]
 * 输出：[2,2]
 * 
 * 示例 2:
 * 输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
 * 输出：[4,9]
 *  
 * 说明：
 * 输出结果中每个元素出现的次数，应与元素在两个数组中出现次数的最小值一致。
 * 我们可以不考虑输出结果的顺序。
 * 
 * 进阶：
 * 如果给定的数组已经排好序呢？你将如何优化你的算法？ 双指针
 * 如果 nums1 的大小比 nums2 小很多，哪种方法更优？ 循环次数为更短的字符串的长度
 * 如果 nums2 的元素存储在磁盘上，内存是有限的，并且你不能一次加载所有的元素到内存中，你该怎么办？
 * 
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */

// 1. 排序
var intersect = function(nums1, nums2) {
  const res = [];
  nums1.sort((a, b) => a - b);
  nums2.sort((a, b) => a - b);
  let p1 = 0, p2 = 0;
  while(nums1[p1] !== undefined && nums2[p2] !== undefined) {
    if(nums1[p1] > nums2[p2]) {
      p2++;
    } else if(nums1[p1] < nums2[p2]) {
      p1++;
    } else {
      res.push(nums1[p1]);
      p1++;
      p2++;
    }
  }
  return res;
};

// 2. hash
var intersectII = function(nums1, nums2) {
  let long = nums1, short = nums2;
  if(nums1.length < nums2.length) {
    long = nums2;
    short = nums1;
  }
  const res = [];
  if(!short.length) return res;
  const hash = {};
  short.forEach(n => {
    if(!hash[n]) hash[n] = 0;
    hash[n]++;
  });
  long.forEach(n => {
    if(hash[n]) {
      res.push(n);
      hash[n]--;
    }
  })
  return res;
};

// 3. map
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
 var intersectIII = function(nums1, nums2) {
  const map = new Map();
  for(const n of nums1) {
      const it = map.get(n);
      map.set(n, it ? it + 1 : 1);
  }
  const res = [];
  for(const n of nums2) {
      const it = map.get(n);
      if(it) {
          map.set(n, it - 1);
          res.push(n);
      }
  }
  return res;
};

const { logAssertDisorder } = require('./tools/LogTools.js');
logAssertDisorder(intersectII, [4,7,9,7,6,7], [5,0,0,6,1,6,2,2,4], [4,6]);

