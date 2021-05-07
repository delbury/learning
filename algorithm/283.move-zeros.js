/**
 * 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
 * 
 * 示例:
 * 输入: [0,1,0,3,12]
 * 输出: [1,3,12,0,0]
 * 说明:
 * 必须在原数组上操作，不能拷贝额外的数组。
 * 尽量减少操作次数。
 * 
 * 
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */

// 1. 双指针
var moveZeroesI = function(nums) {
  let len = nums.length;
  for(let i = 0; i < len; i++) {
    if(nums[i] === 0) {
      nums.splice(nums.length - 1, 0, ...nums.splice(i, 1));
      len--;
      i--;
    }
  }
  return nums;
};

// 2. 冒泡
var moveZeroesII = function(nums) {
  let count = 0;
  for(let i = nums.length - 1; i >= 0; i--) {
    if(nums[i] === 0) {
      for(let j = i; j < nums.length - count - 1; j++) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
      }
      count++;
    }
  }
  return nums;
};

// 3. 非零前移
var moveZeroes = function(nums) {
  let p = 0;
  for(let i = 0; i < nums.length; i++) {
    if(nums[i] !== 0) {
      nums[p] = nums[i];
      p++;
    }
  }
  while(p < nums.length) {
    nums[p] = 0;
    p++;
  }
  return nums;
};

const { logAssert } = require('./tools/LogTools.js');
logAssert(moveZeroes, [0,1,0,3,12], [1,3,12,0,0]);
logAssert(moveZeroes, [0,0,1], [1,0,0]);

