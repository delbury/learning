/**
 * 给定一个无序的数组，找出数组在排序之后，相邻元素之间最大的差值。
 * 如果数组元素个数小于 2，则返回 0。
 * 
 * 示例 1:
 * 输入: [3,6,9,1]
 * 输出: 3
 * 解释: 排序后的数组是 [1,3,6,9], 其中相邻元素 (3,6) 和 (6,9) 之间都存在最大差值 3。
 * 
 * 示例 2:
 * 输入: [10]
 * 输出: 0
 * 解释: 数组元素个数小于 2，因此返回 0。
 * 
 * 说明:
 * 你可以假设数组中所有元素都是非负整数，且数值在 32 位有符号整数范围内。
 * 请尝试在线性时间复杂度和空间复杂度的条件下解决此问题。
 * 
 * 
 * @param {number[]} nums
 * @return {number}
 */

// 1. 暴力
var maximumGap = function(nums) {
  if(nums.length < 2) return 0;

  nums.sort((a, b) => a - b);
  let max = 0;
  for(let i = 1; i < nums.length; i++) {
    if(nums[i] - nums[i - 1] > max) max = nums[i] - nums[i - 1];
  }
  return max;
};

// 2. 线性时间、空间复杂度
var maximumGapII = function(arr) {
  const maxLength = Math.max.apply(null, arr).toString().length;
  let buckets = null;

  for(let i = 0; i < maxLength; i++) {
    buckets = [];

    for(let j = 0; j < arr.length; j++) {
      
      let k = i;
      let val = arr[j];
      while(k--) {
        val = Math.trunc(val / 10);
      }
      const index = val % 10;

      if(!buckets[index]) {
        buckets[index] = [arr[j]];
      } else {
        buckets[index].push(arr[j]);
      }
    }

    arr = buckets.flat();
  }

  let max = 0;
  for(let i = 1; i < arr.length; i++) {
    if(arr[i] - arr[i - 1] > max) max = arr[i] - arr[i - 1];
  }
  return max;
};

const { logAssert } = require('./tools/LogTools.js');
logAssert(maximumGapII, [3,6,9,1], 3);
logAssert(maximumGapII, [10], 0);
