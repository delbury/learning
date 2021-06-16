/**
 * 给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。
 * 说明:
 * 初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。
 * 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。
 * 
 * 示例:
 * 输入:
 * nums1 = [1,2,3,0,0,0], m = 3
 * nums2 = [2,5,6],       n = 3
 * 
 * 输出: [1,2,2,3,5,6]
 * 
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var mergeI = function(nums1, m, nums2, n) {
  let p1 = m - 1, p2 = n - 1, end = m + n - 1;
  while(p1 >= 0) {
    if(nums2[p2] >= nums1[p1]) {
      nums1[end] = nums2[p2];
      end--;
      p2--;
    } else {
      nums1[end] = nums1[p1];
      end--;
      p1--;
    }
  }
  while(end >= 0) {
    nums1[end--] = nums2[p2--];
  }
};

var merge = function(nums1, m, nums2, n) {
  let p = m + n - 1;
  m--;
  n--;
  while(m >= 0 && n >= 0) {
    nums1[p--] = nums1[m] > nums2[n] ? nums1[m--] : nums2[n--];
  }
  let k = m > n ? m : n;
  let arr = m > n ? nums1 : nums2;
  while(p >= 0) {
    nums1[p--] = arr[k--];
  }
  return nums1;
};

const arr1 = [2, 4, 7, 8, 0, 0, 0];
const arr2 = [1, 3, 5];
merge(arr1, arr1.length - arr2.length, arr2, arr2.length);
console.log(arr1)
