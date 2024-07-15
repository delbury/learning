/**
 * 给定一个大小为 n 的数组，找到其中的多数元素。多数元素是指在数组中出现次数大于 ⌊ n/2 ⌋ 的元素。
 * 你可以假设数组是非空的，并且给定的数组总是存在多数元素。
 *
 * 示例 1:
 * 输入: [3,2,3]
 * 输出: 3
 *
 * 示例 2:
 * 输入: [2,2,1,1,1,2,2]
 * 输出: 2
 *
 *
 * @param {number[]} nums
 * @return {number}
 */

// 1. 计数法
const majorityElement = function (nums) {
  const map = new Map();
  for (let i = nums.length - 1; i >= 0; i--) {
    if (map.has(nums[i])) {
      map.set(nums[i], map.get(nums[i]) + 1);
    } else {
      map.set(nums[i], 1);
    }

    if (map.get(nums[i]) > Math.floor(nums.length / 2)) {
      return nums[i];
    }
  }
  return null;
};

// 2. 排序，取下标为 Math.floor(length / 2)的众数
const majorityElementSort = function (nums) {
  return nums.sort((a, b) => a - b)[Math.floor(nums.length / 2)];
};

// 3. 随机化
const majorityElementRandom = function (nums) {
  const len = Math.floor(nums.length / 2);
  while (true) {
    let index = Math.floor(Math.random() * nums.length);
    let count = 0;
    for (let i = nums.length - 1; i >= 0; i--) {
      if (nums[index] === nums[i]) {
        count++;

        if (count > len) {
          return nums[index];
        }
      }
    }
  }
};

// 4. 分治

// 5. 投票算法
const majorityElementMoore = function (nums) {
  let count = 0;
  let current = null;
  for (let i = nums.length - 1; i >= 0; i--) {
    if (count === 0) {
      current = nums[i];
    }

    nums[i] === current ? count++ : count--;
  }
  return current;
};

console.log(majorityElementMoore([3, 2, 3]));
console.log(majorityElementMoore([2, 2, 1, 1, 1, 2, 2]));
