/**
 * 给定一个整数数组，判断是否存在重复元素。
 * 如果任意一值在数组中出现至少两次，函数返回 true 。如果数组中每个元素都不相同，则返回 false 。
 * 
 * 示例 1:
 * 输入: [1,2,3,1]
 * 输出: true
 * 
 * 示例 2:
 * 输入: [1,2,3,4]
 * 输出: false
 * 
 * 示例 3:
 * 输入: [1,1,1,3,3,4,3,2,4,2]
 * 输出: true
 * 
 * @param {number[]} nums
 * @return {boolean}
 */

// 1. API
var containsDuplicate = function (nums) {
  return nums.length !== new Set(nums).size;
};

// 2. hash
var containsDuplicateII = function (nums) {
  const map = new Map();
  for (let i = nums.length - 1; i >= 0; i--) {
    if (map.has(nums[i])) {
      return true;
    } else {
      map.set(nums[i], true);
    }
  }

  return false;
};

// 3. 排序法
var containsDuplicateIII = function (nums) {
  nums.sort((a, b) => a - b);

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) return true;
  }
  return false;
};