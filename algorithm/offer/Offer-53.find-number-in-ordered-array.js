/**
 * 统计一个数字在排序数组中出现的次数。
 * 
 * 示例 1:
 * 输入: nums = [5,7,7,8,8,10], target = 8
 * 输出: 2
 * 
 * 示例 2:
 * 输入: nums = [5,7,7,8,8,10], target = 6
 * 输出: 0
 *  
 * 限制：
 * 0 <= 数组长度 <= 50000
 * 
 * 
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
  const bs = (high) => {
    let l = 0, r = nums.length - 1, index = -1;
    while(l <= r) {
      const m = Math.floor((l + r) / 2);

      if(!high && nums[m] === target && (m === 0 || nums[m] > nums[m - 1])) return m;
      if(high && nums[m] === target && (m === nums.length - 1 || nums[m + 1] > nums[m])) return m;

      if(nums[m] < target || (high && nums[m] === target)) {
          l = m + 1;
      } else {
          r = m - 1;
      }
    }
    return index;
  };
  const l = bs(false), r = bs(true);
  if(l < 0 || r < 0 || l >= nums.length || r >= nums.length || l > r) return 0;
  return r - l + 1;
};

console.log(search([5,7,7,8,8,10], 8));