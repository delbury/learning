/**
 * 已知一个长度为 n 的数组，预先按照升序排列，经由 1 到 n 次 旋转 后，得到输入数组。例如，原数组 nums = [0,1,4,4,5,6,7] 在变化后可能得到：
 * 若旋转 4 次，则可以得到 [4,5,6,7,0,1,4]
 * 若旋转 7 次，则可以得到 [0,1,4,4,5,6,7]
 * 注意，数组 [a[0], a[1], a[2], ..., a[n-1]] 旋转一次 的结果为数组 [a[n-1], a[0], a[1], a[2], ..., a[n-2]] 。
 * 给你一个可能存在 重复 元素值的数组 nums ，它原来是一个升序排列的数组，并按上述情形进行了多次旋转。请你找出并返回数组中的 最小元素 。
 * 你必须尽可能减少整个过程的操作步骤。
 *
 * 示例 1：
 * 输入：nums = [1,3,5]
 * 输出：1
 *
 * 示例 2：
 * 输入：nums = [2,2,2,0,1]
 * 输出：0
 *
 * 提示：
 * n == nums.length
 * 1 <= n <= 5000
 * -5000 <= nums[i] <= 5000
 * nums 原来是一个升序排序的数组，并进行了 1 至 n 次旋转
 *
 * 进阶：这道题与 寻找旋转排序数组中的最小值 很类似，但 nums 可能包含重复元素。
 * 允许重复会影响算法的时间复杂度吗？会如何影响，为什么？
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
const findMin = function (nums) {
  const fn = (l, r) => {
    let t = nums[l];
    while (l < r && nums[l] === nums[r]) {
      l++;
      r--;
    }
    // 所有数相等
    // 防止前后都用相同个相等的数，全部移除后为递增序列
    if (l >= r || nums[l] < nums[r]) return Math.min(t, nums[l]);

    const m = Math.floor((l + r) / 2);
    if (nums[m - 1] > nums[m]) return nums[m];
    if (nums[m] > nums[m + 1]) return nums[m + 1];

    if (nums[l] > nums[m]) return fn(l, m - 1);
    else return fn(m + 1, r);
  };
  return fn(0, nums.length - 1);
};

const { log, logAssert, logArrayToCoordinateSystem, logByColumn } = require('../tools/LogTools.js');
logByColumn([
  () => logArrayToCoordinateSystem([0, 0, 1, 2, 3, 4, 5, 5, 0, 0], { highlightCenter: true }),
  () =>
    logArrayToCoordinateSystem([3, 3, 4, 5, 5, 5, 6, 3, 3], {
      highlightCenter: true,
      ignoreIndexes: [0, 1, 6, 7],
    }),
  () => logArrayToCoordinateSystem([5, 5, 6, 7, 2, 3, 4, 5, 5], { highlightCenter: true }),
  () => logArrayToCoordinateSystem([2, 0, 1, 1, 1], { highlightCenter: true }),
]);

logAssert(findMin, [2, 2, 2, 0, 1], 0);
logAssert(findMin, [1, 2, 1], 1);
logAssert(findMin, [3, 3, 3, 1], 1);
logAssert(findMin, [0, 1, 1, 0], 0);
logAssert(findMin, [3, 1, 3], 1);
logAssert(findMin, [2, 0, 1, 1, 1], 0);
