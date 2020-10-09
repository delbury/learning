/**
 * 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
 * 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。
 * 
 * 示例:
 * 给定 nums = [2, 7, 11, 15], target = 9
 * 因为 nums[0] + nums[1] = 2 + 7 = 9
 * 所以返回 [0, 1]
 * 
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

// 遍历
// var twoSum = function (nums, target) {
//   for (let j = nums.length - 1; j >= 0; j--) {
//     const temp = target - nums[j];
//     for (let i = j - 1; i >= 0; i--) {
//       if (temp === nums[i]) {
//         return [i, j];
//       }
//     }
//   }
//   return null;
// };

// hash
var twoSum = function (nums, target) {
  const map = {};
  for (let i = 0; i < nums.length; i++) {
    if (map[target - nums[i]] !== undefined && i !== map[target - nums[i]]) {
      return [map[target - nums[i]], i];
    }

    map[nums[i]] = i;
  }
  return null;
};

console.log(twoSum([3, 3, 2, 7, 11, 15], 6));