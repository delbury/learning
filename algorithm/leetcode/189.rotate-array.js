/**
 * 给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。
 *
 * 进阶：
 * 尽可能想出更多的解决方案，至少有三种不同的方法可以解决这个问题。
 * 你可以使用空间复杂度为 O(1) 的 原地 算法解决这个问题吗？
 *
 * 示例 1:
 * 输入: nums = [1,2,3,4,5,6,7], k = 3
 * 输出: [5,6,7,1,2,3,4]
 * 解释:
 * 向右旋转 1 步: [7,1,2,3,4,5,6]
 * 向右旋转 2 步: [6,7,1,2,3,4,5]
 * 向右旋转 3 步: [5,6,7,1,2,3,4]
 *
 * 示例 2:
 * 输入：nums = [-1,-100,3,99], k = 2
 * 输出：[3,99,-1,-100]
 * 解释:
 * 向右旋转 1 步: [99,-1,-100,3]
 * 向右旋转 2 步: [3,99,-1,-100]
 *
 * 提示：
 * 1 <= nums.length <= 2 * 10^4
 * -2^31 <= nums[i] <= 2^31 - 1
 * 0 <= k <= 10^5
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */

// 1. api
var rotateI = function (nums, k) {
  k = k % nums.length;
  nums.unshift(...nums.splice(nums.length - k, k));

  return nums;
};

// 2. 先整体翻转，再部分翻转
const reverse = (arr, l, r) => {
  while (l < r) {
    [arr[l], arr[r]] = [arr[r], arr[l]];
    l++;
    r--;
  }
};
var rotateII = function (nums, k) {
  k = k % nums.length;
  nums.reverse();
  reverse(nums, 0, k - 1);
  reverse(nums, k, nums.length - 1);
  return nums;
};

// 3. 拼接
var rotate = function (nums, k) {
  k = k % nums.length;
  nums.splice(0, 0, ...nums.splice(nums.length - k));
  return nums;
};

// 4. 接口替换
const rotate4 = function (nums, k) {
  k = k % nums.length;
  if (!k || nums.length === 1) return nums;

  let count = nums.length;
  let currentIndex = 0;
  let startIndex = currentIndex;
  let temp = nums[0];

  while (count--) {
    const targetIndex = (currentIndex + k) % nums.length;
    if (targetIndex === startIndex) {
      nums[targetIndex] = temp;
      startIndex++;
      currentIndex = startIndex;
      temp = nums[startIndex];
      continue;
    }
    const t = nums[targetIndex];
    nums[targetIndex] = temp;
    currentIndex = targetIndex;
    temp = t;
  }
  return nums;
};

const { logAssertOrder } = require('./tools/LogTools.js');
logAssertOrder(rotate, [1, 2, 3, 4, 5, 6, 7], 3, [5, 6, 7, 1, 2, 3, 4]);
