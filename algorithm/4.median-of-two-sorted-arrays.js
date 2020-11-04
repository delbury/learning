/**
 * 给定两个大小为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的中位数。
 * 进阶：你能设计一个时间复杂度为 O(log (m+n)) 的算法解决此问题吗？
 *  
 * 示例 1：
 * 输入：nums1 = [1,3], nums2 = [2]
 * 输出：2.00000
 * 解释：合并数组 = [1,2,3] ，中位数 2
 * 
 * 示例 2：
 * 输入：nums1 = [1,2], nums2 = [3,4]
 * 输出：2.50000
 * 解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5
 * 
 * 示例 3：
 * 输入：nums1 = [0,0], nums2 = [0,0]
 * 输出：0.00000
 * 
 * 示例 4：
 * 输入：nums1 = [], nums2 = [1]
 * 输出：1.00000
 * 
 * 示例 5：
 * 输入：nums1 = [2], nums2 = []
 * 输出：2.00000
 *  
 * 提示：
 * nums1.length == m
 * nums2.length == n
 * 0 <= m <= 1000
 * 0 <= n <= 1000
 * 1 <= m + n <= 2000
 * -106 <= nums1[i], nums2[i] <= 106
 * 
 * 
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */

// 1. 双指针归并查找
var findMedianSortedArrays = function (nums1, nums2) {
  let p1 = 0;
  let p2 = 0;
  const isOdd = (nums1.length + nums2.length) % 2 === 1; // 是否奇数个数
  const center = Math.floor((nums1.length + nums2.length) / 2);
  let current = null;

  while (p1 < nums1.length || p2 < nums2.length) {
    if ((p2 >= nums2.length && p1 < nums1.length) || nums1[p1] < nums2[p2]) {
      if (!isOdd && p1 + p2 === center) {
        current += nums1[p1];
      } else {
        current = nums1[p1];
      }
      p1++;

    } else if ((p1 >= nums1.length && p2 < nums2.length) || nums1[p1] >= nums2[p2]) {
      if (!isOdd && p1 + p2 === center) {
        current += nums2[p2];
      } else {
        current = nums2[p2];
      }
      p2++;

    }

    if (isOdd) { // 奇数个
      if (p1 + p2 === center + 1) {
        return current;
      }
    } else { // 偶数个
      if (p1 + p2 === center + 1) {
        return current / 2;
      }
    }
  }

  return null
};

// 2. 二分查找，求第 K 小的数，时间复杂度 O(log(m+n))
const getKth = function (n1, s1, n2, s2, k) {
  const l1 = n1.length - s1;
  const l2 = n2.length - s2;

  if (l1 > l2) return getKth(n2, s2, n1, s1, k); //让 len1 的长度小于 len2，这样就能保证如果有数组空了，一定是 len1 

  if (l1 === 0) return n2[s2 + k - 1];
  if (k === 1) return Math.min(n1[s1], n2[s2]);

  const i = s1 + Math.min(l1, Math.floor(k / 2)) - 1;
  const j = s2 + Math.min(l2, Math.floor(k / 2)) - 1;

  if (n1[i] > n2[j]) return getKth(n1, s1, n2, j + 1, k - (j - s2 + 1));
  return getKth(n1, i + 1, n2, s2, k - (i - s1 + 1));
};

var findMedianSortedArraysII = function (nums1, nums2) {
  const isOdd = (nums1.length + nums2.length) % 2 === 1; // 是否奇数个数
  const center = Math.floor((nums1.length + nums2.length + 1) / 2);

  return isOdd ? getKth(nums1, 0, nums2, 0, center) : (
    getKth(nums1, 0, nums2, 0, center)
    + getKth(nums1, 0, nums2, 0, center + 1)
  ) / 2;
};

// 3. 时间复杂度 O(log(min(m, n)))
var findMedianSortedArraysIII = function(nums1, nums2) {
  const len1 = nums1.length;
  const len2 = nums2.length;
  if(len1 > len2) return findMedianSortedArraysIII(nums2, nums1); // 保证 len1 <= len2

  let iMin = 0;
  let iMax = len1;
  while(iMin <= iMax) {
    const i = Math.floor((iMin + iMax) / 2);
    const j = Math.floor((len1 + len2 + 1) / 2) - i;

    if(j !== 0 && i !== len1 && nums2[j - 1] > nums1[i]) {
      iMin = i + 1;

    } else if(i !== 0 && j !== len2 && nums1[i - 1] > nums2[j]) {
      iMax = i - 1;

    } else {
      let maxLeft = 0;
      if(i === 0) {
        maxLeft = nums2[j - 1];

      } else if(j === 0) {
        maxLeft = nums1[i - 1];

      } else {
        maxLeft = Math.max(nums1[i - 1], nums2[j - 1]);
      }

      if((len1 + len2) % 2 === 1) return maxLeft;

      let minRight = 0;
      if(i === len1) {
        minRight = nums2[j];

      } else if(j === len2) {
        minRight = nums1[i];

      } else {
        minRight = Math.min(nums2[j], nums1[i]);
      }

      return (maxLeft + minRight) / 2;
    }
  }
  return 0;
};

console.log(findMedianSortedArraysIII([1, 3], [2]));
// console.log(findMedianSortedArraysII([0, 0, 0, 0, 0], [-1, 0, 0, 0, 0, 0, 1]));
// console.log(findMedianSortedArrays([1, 2], [3, 4]));
// console.log(findMedianSortedArrays([0, 0], [0, 0]));
// console.log(findMedianSortedArrays([], [1]));
// console.log(findMedianSortedArrays([2], []));
