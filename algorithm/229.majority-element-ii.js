/**
 * 给定一个大小为 n 的整数数组，找出其中所有出现超过 ⌊ n/3 ⌋ 次的元素。
 * 进阶：尝试设计时间复杂度为 O(n)、空间复杂度为 O(1)的算法解决此问题。
 * 
 * 示例 1：
 * 输入：[3,2,3]
 * 输出：[3]
 * 
 * 示例 2：
 * 输入：nums = [1]
 * 输出：[1]
 * 
 * 示例 3：
 * 输入：[1,1,1,3,3,2,2,2]
 * 输出：[1,2]
 * 
 * 提示：
 * 1 <= nums.length <= 5 * 104
 * -109 <= nums[i] <= 109
 * 
 * @param {number[]} nums
 * @return {number[]}
 */

// 1. 计数
var majorityElement = function (nums) {
  const map = new Map();
  for (let i = nums.length - 1; i >= 0; i--) {
    if (map.has(nums[i])) {
      map.set(nums[i], map.get(nums[i]) + 1);
    } else {
      map.set(nums[i], 1);
    }
  }

  const res = [];
  const len = Math.floor(nums.length / 3);
  for (let [k, v] of map.entries()) {
    if (v > len) {
      res.push(k);
    }
  }
  return res;
};

// 2. 改进的摩尔投票法
var majorityElementMoore = function (nums) {
  let count1 = 0;
  let current1 = null;
  let count2 = 0;
  let current2 = null;

  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] === current1) {
      count1++;

    } else if (nums[i] === current2) {
      current2 = nums[i];
      count2++;

    } else if (count1 === 0) {
      current1 = nums[i];
      count1++;

    } else if (count2 === 0) {
      current2 = nums[i];
      count2++;

    } else {
      count1--;
      count2--;
    }
  }

  const res = [];
  count1 = 0;
  count2 = 0;
  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] === current1) {
      count1++;
    }
    if (nums[i] === current2) {
      count2++;
    }
  }
  if (count1 > Math.floor(nums.length / 3)) res.push(current1);
  if (count2 > Math.floor(nums.length / 3)) res.push(current2);
  return res;
};

console.log(majorityElementMoore([3, 2, 3]));
