/**
 * 搜索旋转数组。
 * 给定一个排序后的数组，包含n个整数，但这个数组已被旋转过很多次了，次数不详。
 * 请编写代码找出数组中的某个元素，假设数组元素原先是按升序排列的。
 * 若有多个相同元素，返回索引值最小的一个。
 *
 * 示例1:
 *  输入: arr = [15, 16, 19, 20, 25, 1, 3, 4, 5, 7, 10, 14], target = 5
 *  输出: 8（元素5在该数组中的索引）
 *
 * 示例2:
 *  输入：arr = [15, 16, 19, 20, 25, 1, 3, 4, 5, 7, 10, 14], target = 11
 *  输出：-1 （没有找到）
 *
 * 提示:
 * arr 长度范围在[1, 1000000]之间
 */

/**
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */
// 旋转n次，类似于扑克牌切牌，不会打乱相对顺序
// 二分法
const search = function (arr, target) {
  let l = 0;
  let r = arr.length - 1;
  if (arr[0] === target) return 0;
  while (l <= r) {
    let c = Math.floor((l + r) / 2);

    if (arr[c] === target) {
      while (c > 0 && arr[c] === arr[c - 1]) c--;
      return c;
    }
    if (arr[c] < arr[r]) {
      if (target > arr[c] && target <= arr[r]) l = c + 1;
      else r = c - 1;
    } else if (arr[c] > arr[r]) {
      if (target >= arr[l] && target < arr[c]) r = c - 1;
      else l = c + 1;
    } else {
      r--;
    }
  }
  return -1;
};

const { log, logAssert, logAssertDisorder } = require('../tools/LogTools.js');
// logAssert(search, [15, 16, 19, 20, 25, 1, 3, 4, 5, 7, 10, 14], 5, 8);
// logAssert(search, [15, 16, 19, 20, 25, 1, 3, 4, 5, 7, 10, 14], 11, -1);
// logAssert(search, [5, 5, 5, 5, 5, 6, 7, 8, 9, 3, 4, 5, 5], 5, 0);
// logAssert(search, [6, 7, 8, 9, 3, 4, 5, 5, 5, 5], 5, 6);
// logAssert(search, [5, 5, 5, 5, 6, 7, 8, 9, 3, 4], 5, 0);
// logAssert(search, [4, 4, 5, 5, 5, 5, 6, 7, 8, 9, 1, 2, 3, 4, 4, 4], 5, 2);
logAssert(search, [1, -2], -2, 1);
