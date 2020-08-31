/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  if(nums.length === 1) {
    return nums[0];
  } else if(nums.length === 2) {
    return Math.max.apply(null, nums);
  }
  let max = 0;
  while(nums.length) {}
  return max;
};
