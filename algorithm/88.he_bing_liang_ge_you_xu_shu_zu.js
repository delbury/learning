/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
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
const arr1 = [2, 4, 7, 8, 0, 0, 0];
const arr2 = [1, 3, 5];
merge(arr1, arr1.length - arr2.length, arr2, arr2.length);
console.log(arr1)
