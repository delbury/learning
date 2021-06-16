/**
 * 给定两个数组，编写一个函数来计算它们的交集。
 * 
 * 示例 1：
 * 输入：nums1 = [1,2,2,1], nums2 = [2,2]
 * 输出：[2]
 * 
 * 示例 2：
 * 输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
 * 输出：[9,4]
 *  
 * 说明：
 * 输出结果中的每个元素一定是唯一的。
 * 我们可以不考虑输出结果的顺序。
 * 
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */

// 1. hash
var intersection = function (nums1, nums2) {
  const map = new Map();
  for (let i = nums1.length - 1; i >= 0; i--) {
    map.set(nums1[i], true);
  }
  const res = [];
  for (let i = nums2.length - 1; i >= 0; i--) {
    if (map.has(nums2[i])) {
      map.delete(nums2[i]);
      res.push(nums2[i]);
    }
  }

  return res;
};

// 2. 遍历
var intersectionII = function (nums1, nums2) {
  return Array.from(new Set(nums1)).filter(n => nums2.includes(n));
};

// 3. 排序 + 双指针
var intersectionIII = function (nums1, nums2) {
  nums1.sort((a, b) => a - b);
  nums2.sort((a, b) => a - b);
  const res = [];
  let prev = null;
  let p1 = 0;
  let p2 = 0;

  while (p1 < nums1.length && p2 < nums2.length) {
    if (nums1[p1] < nums2[p2]) {
      p1++;
    } else if (nums1[p1] > nums2[p2]) {
      p2++;
    } else {
      if (nums1[p1] !== prev) {
        res.push(nums1[p1]);
        prev = nums1[p1];
      }
      p1++;
      p2++;
    }
  }

  return res;
};

console.log(intersectionIII([1, 2, 2, 1], [2, 2]));
console.log(intersectionIII([4, 9, 5], [9, 4, 9, 8, 4]));
