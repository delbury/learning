/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  // let prev = nums[0];
  // let max = Math.max(nums[0], nums[1]);
  const arr = [
    nums[0],
    Math.max(nums[0], nums[1]),
  ];

  for (let i = 2; i < nums.length; i++) {
    // [prev, max] = [max, Math.max(max, prev + nums[i])];
    arr[i] = Math.max(arr[i - 1], arr[i - 2] + nums[i]);
  }

  // return max;
  return arr[nums.length - 1];
};

console.log(rob([1, 2, 3, 1]));
console.log(rob([2, 7, 9, 3, 1]));
