/**
 * 给你一个整数数组 nums ，除某个元素仅出现 一次 外，其余每个元素都恰出现 三次 。
 * 请你找出并返回那个只出现了一次的元素。
 * 
 * 示例 1：
 * 输入：nums = [2,2,3,2]
 * 输出：3
 * 
 * 示例 2：
 * 输入：nums = [0,1,0,1,0,1,99]
 * 输出：99
 * 
 * 提示：
 * 1 <= nums.length <= 3 * 104
 * -231 <= nums[i] <= 231 - 1
 * nums 中，除某个元素仅出现 一次 外，其余每个元素都恰出现 三次
 * 
 * 进阶：你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？
 * 
 * @param {number[]} nums
 * @return {number}
 */

// 1. hash
var singleNumber = function(nums) {
  const set = new Set();
  const resSet = new Set();
  for(const num of nums) {
    if(!set.has(num)) {
      set.add(num);
      resSet.add(num);
    } else {
      resSet.delete(num);
    }
  }
  return resSet.values().next().value;
};

// 2. 排序
var singleNumberII = function(nums) {
  nums.sort((a, b) => a - b);
  for(let i = 0; i < nums.length; i++) {
    if(nums[i] !== nums[i - 1] && nums[i] !== nums[i + 1]) return nums[i];
  }
};

// 3. 位运算
var singleNumberIII = function(nums) {
  let res = 0;
  for(let i = 0; i < 32; i++) {
    let total = 0;
    for(const num of nums) {
      total += (num >> i) & 1;
    }
    if(total % 3 !== 0) {
      res |= 1 << i;
    }
  }
  return res;
};

// 4. 数字电路
var singleNumberIV = function(nums) {
  let a = 0, b = 0;
  for(const num of nums) {
    const t = (~a & b & num) | (a & ~b & ~num);
    b = (~a & ~b & num) | (~a & b & ~num); // b = ~a & (b ^ num)
    a = t;
  }
  return b;
}

// 5. 数字电路优化
// 先计算 b，再用新的 b 替换原来的 b，列出 a 的表达式
var singleNumberV = function(nums) {
  let a = 0, b = 0;
  for(const num of nums) {
    b = ~a & (b ^ num);
    a = ~b & (a ^ num);
  }
  return b;
}

const { logAssert } = require('./tools/LogTools.js');
logAssert(singleNumberIV, [30000,500,100,30000,100,30000,100], 500);
logAssert(singleNumberIV, [-2,-2,1,1,4,1,4,4,-4,-2], -4);
