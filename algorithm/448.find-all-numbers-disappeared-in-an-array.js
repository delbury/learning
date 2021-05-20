/**
 * 给定一个范围在  1 ≤ a[i] ≤ n ( n = 数组大小 ) 的 整型数组，数组中的元素一些出现了两次，另一些只出现一次。
 * 找到所有在 [1, n] 范围之间没有出现在数组中的数字。
 * 
 * 您能在不使用额外空间且时间复杂度为O(n)的情况下完成这个任务吗? 你可以假定返回的数组不算在额外空间内。
 * 
 * 示例:
 * 输入:
 * [4,3,2,7,8,2,3,1]
 * 输出:
 * [5,6]
 * 
 * @param {number[]} nums
 * @return {number[]}
 */

// 1. hash
var findDisappearedNumbersI = function(nums) {
  const set = new Set();
  const res = [];
  for(const n of nums) {
    set.add(n);
  }
  for(let i = 1; i <= nums.length; i++) {
    if(!set.has(i)) res.push(i);
  }
  return res;
};

// 2. 使用原数组
var findDisappearedNumbersII = function(nums) {
  for(let i = 0; i < nums.length; i++) {
    nums[(nums[i] - 1) % nums.length] += nums.length;
  }
  const res = [];
  for(let i = 0; i < nums.length; i++) {
    if(nums[i] <= nums.length) res.push(i + 1);
  }
  return res;
};

// 3. 使用原数组，不同的标记方式
var findDisappearedNumbers = function(nums) {
  for(let i = 0; i < nums.length; i++) {
    const n = Math.abs(nums[i]) - 1;
    nums[n] > 0 && (nums[n] *= -1);
  }
  const res = [];
  for(let i = 0; i < nums.length; i++) {
    if(nums[i] > 0) res.push(i + 1);
  }
  return res;
};

const { logAssert } = require('./tools/LogTools.js');
logAssert(findDisappearedNumbers, [4,3,2,7,8,2,3,1], [5,6]);
