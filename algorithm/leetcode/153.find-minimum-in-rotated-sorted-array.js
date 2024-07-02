/**
 * 已知一个长度为 n 的数组，预先按照升序排列，经由 1 到 n 次 旋转 后，得到输入数组。
 * 例如，原数组 nums = [0,1,2,4,5,6,7] 在变化后可能得到：
 * 若旋转 4 次，则可以得到 [4,5,6,7,0,1,2]
 * 若旋转 7 次，则可以得到 [0,1,2,4,5,6,7]
 * 注意，数组 [a[0], a[1], a[2], ..., a[n-1]] 旋转一次 的结果为数组 [a[n-1], a[0], a[1], a[2],
 * ..., a[n-2]] 。
 * 给你一个元素值 互不相同 的数组 nums ，它原来是一个升序排列的数组，并按上述情形进行了多次旋转。
 * 请你找出并返回数组中的 最小元素 。
 * 你必须设计一个时间复杂度为 O(log n) 的算法解决此问题。
 *
 * 示例 1：
 * 输入：nums = [3,4,5,1,2]
 * 输出：1
 * 解释：原数组为 [1,2,3,4,5] ，旋转 3 次得到输入数组。
 *
 * 示例 2：
 * 输入：nums = [4,5,6,7,0,1,2]
 * 输出：0
 * 解释：原数组为 [0,1,2,4,5,6,7] ，旋转 4 次得到输入数组。
 *
 * 示例 3：
 * 输入：nums = [11,13,15,17]
 * 输出：11
 * 解释：原数组为 [11,13,15,17] ，旋转 4 次得到输入数组。
 *
 * 提示：
 * n == nums.length
 * 1 <= n <= 5000
 * -5000 <= nums[i] <= 5000
 * nums 中的所有整数 互不相同
 * nums 原来是一个升序排序的数组，并进行了 1 至 n 次旋转
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
const findMin = function (nums) {
  /**
   * 二分
   * 数组长度为 n，旋转后，分情况
   * 1: 旋转 n 次，和原数组相同
   * 2: 旋转次数 <= n / 2，二分后，左侧单调递增，右侧可能存在阶跃
   * 3: 旋转次数 > n / 2，二分后，右侧单调递增，左侧存在阶跃
   */

  const fn = (l, r) => {
    if (nums[l] < nums[r] || l === r) return nums[l];

    const m = Math.floor((l + r) / 2);
    if (nums[m - 1] > nums[m]) return nums[m];
    if (nums[m] > nums[m + 1]) return nums[m + 1];

    if (nums[l] < nums[m]) return fn(m + 1, r);
    else return fn(l, m - 1);
  };
  return fn(0, nums.length - 1);
};

const { log, logAssert, logArrayToCoordinateSystem, logByColumn } = require('../tools/LogTools.js');
logByColumn([
  () => logArrayToCoordinateSystem([0, 1, 2, 3, 4, 5, 6], { highlightCenter: true }),
  () => logArrayToCoordinateSystem([2, 3, 4, 5, 6, 0, 1], { highlightCenter: true }),
  () => logArrayToCoordinateSystem([5, 6, 0, 1, 2, 3, 4], { highlightCenter: true }),
  () => logArrayToCoordinateSystem([2, 1], { highlightCenter: true }),
  () =>
    logArrayToCoordinateSystem([2, 3, 4, 5, 6, 7, 8, 9, 1], {
      highlightCenter: true,
      customHighlights: {
        0: 'red',
        8: 'blue',
      },
    }),
]);

// logAssert(findMin, [3, 4, 5, 1, 2], 1);
// logAssert(findMin, [4, 5, 6, 7, 0, 1, 2], 0);
// logAssert(findMin, [2, 1], 1);
// logAssert(findMin, [2, 3, 4, 5, 6, 7, 8, 9, 1], 1);
