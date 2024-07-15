/**
 * 给定一个已按照升序排列 的有序数组，找到两个数使得它们相加之和等于目标数。
 * 函数应该返回这两个下标值 index1 和 index2，其中 index1 必须小于 index2。
 *
 * 说明:
 * 返回的下标值（index1 和 index2）不是从零开始的。
 * 你可以假设每个输入只对应唯一的答案，而且你不可以重复使用相同的元素。
 *
 * 示例:
 * 输入: numbers = [2, 7, 11, 15], target = 9
 * 输出: [1,2]
 * 解释: 2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。
 *
 * 双指针原理：0 <= i < j <= length - 1
 *     sum = 11
 *      ↓   ↓
 *  1 2 4 5 7 8 11
 *  ↑            ↑   12 > sum
 *  ↑         ↑      9  < sum
 *    ↑       ↑      10 < sum
 *      ↑     ↑      12 > sum
 *      ↑   ↑        11 = sum
 *
 * 当 l 和 r 指针，分别指向目标位置的左侧和右侧时，n[l] + n[r] 可能大于 target，可也能小于 target
 * 当大于 target 时，向左移动 r 指针；当小于 target 时，向右移动 l 指针
 *
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */

// 1. 双指针
const twoSum = function (numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const temp = numbers[left] + numbers[right];
    if (temp < target) {
      left++;
    } else if (temp > target) {
      right--;
    } else {
      return [left + 1, right + 1];
    }
  }

  return [];
};

console.log(twoSum([2, 7, 11, 15], 9));
