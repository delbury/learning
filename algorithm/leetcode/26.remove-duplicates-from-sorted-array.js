/**
 * 说明:
 * 为什么返回数值是整数，但输出的答案是数组呢?
 * 请注意，输入数组是以「引用」方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。
 *
 * 示例 1：
 * 输入：nums = [1,1,2]
 * 输出：2, nums = [1,2]
 * 解释：函数应该返回新的长度 2 ，并且原数组 nums 的前两个元素被修改为 1, 2 。不需要考虑数组中超出新长度后面的元素。
 *
 * 示例 2：
 * 输入：nums = [0,0,1,1,1,2,2,3,3,4]
 * 输出：5, nums = [0,1,2,3,4]
 * 解释：函数应该返回新的长度 5 ， 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4 。不需要考虑数组中超出新长度后面的元素。
 *
 * @param {number[]} nums
 * @return {number}
 */

// 1. 双指针
const removeDuplicates = function (nums) {
  let p1 = 0,
    p2 = 0;
  while (p2 < nums.length) {
    if (nums[p2] === nums[p2 + 1]) {
      p2++;
    } else {
      nums[p1] = nums[p2];
      p1++;
      p2++;
    }
  }
  nums.length = p1;
  return p1;
};

// 2024.5.6
const removeDuplicates2 = function (nums) {
  let index = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i === 0 || nums[i] !== nums[i - 1]) {
      nums[index++] = nums[i];
    }
  }
  return index;
};
