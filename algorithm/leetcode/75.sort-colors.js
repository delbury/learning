/**
 * 给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums ，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。
 * 我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。
 * 必须在不使用库内置的 sort 函数的情况下解决这个问题。
 *
 * 示例 1：
 * 输入：nums = [2,0,2,1,1,0]
 * 输出：[0,0,1,1,2,2]
 *
 * 示例 2：
 * 输入：nums = [2,0,1]
 * 输出：[0,1,2]
 *
 * 提示：
 * n == nums.length
 * 1 <= n <= 300
 * nums[i] 为 0、1 或 2
 *
 * 进阶：
 * 你能想出一个仅使用常数空间的一趟扫描算法吗？
 */

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const sortColors = function (nums) {
  // 刷漆大法
  let p0 = 0;
  let p1 = 0;
  for (let i = 0; i < nums.length; i++) {
    const t = nums[i];
    nums[i] = 2;
    if (t < 2) {
      nums[p1++] = 1;
    }
    if (t < 1) {
      nums[p0++] = 0;
    }
  }
  return nums;
};

const sortColors2 = function (nums) {
  // 交换大法
  let l = 0;
  let r = nums.length - 1;
  let p = 0;
  while (p <= r) {
    if (nums[p] === 2) {
      [nums[p], nums[r]] = [nums[r], nums[p]];
      r--;
    } else if (nums[p] === 0) {
      [nums[p], nums[l]] = [nums[l], nums[p]];
      l++;
      p++;
    } else {
      p++;
    }
  }
  return nums;
};

const { log, logAssert, logAssertDisorder } = require('../tools/LogTools.js');
logAssert(sortColors2, [2, 0, 2, 1, 1, 0], [0, 0, 1, 1, 2, 2]);
