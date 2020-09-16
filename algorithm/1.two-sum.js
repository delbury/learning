/**
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