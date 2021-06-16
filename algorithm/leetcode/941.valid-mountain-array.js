/**
 * 给定一个整数数组 A，如果它是有效的山脉数组就返回 true，否则返回 false。
 * 让我们回顾一下，如果 A 满足下述条件，那么它是一个山脉数组：
 * A.length >= 3
 * 在 0 < i < A.length - 1 条件下，存在 i 使得：
 * A[0] < A[1] < ... A[i-1] < A[i]
 * A[i] > A[i+1] > ... > A[A.length - 1]
 * 
 * 示例 1：
 * 输入：[2,1]
 * 输出：false
 * 
 * 示例 2：
 * 输入：[3,5,5]
 * 输出：false
 * 
 * 示例 3：
 * 输入：[0,3,2,1]
 * 输出：true
 *  
 * 提示：
 * 0 <= A.length <= 10000
 * 0 <= A[i] <= 10000 
 * 
 * 
 * @param {number[]} A
 * @return {boolean}
 */

// 1. 一次遍历，查询递增递减
var validMountainArray = function (A) {
  if (A.length < 3) return false;

  let status = 0; // 0：开始，1：上升，2：下降

  for (let i = 1; i < A.length; i++) {
    if (A[i] === A[i - 1]) return false;

    if (status === 0) {
      if (A[i] > A[i - 1]) {
        status = 1;
      } else {
        return false;
      }
    }

    if (A[i] > A[i - 1] && status === 2) return false;

    if (A[i] < A[i - 1] && status === 1) status = 2;
  }
  return status === 2;
};


console.log(validMountainArray([2, 1]));
console.log(validMountainArray([3, 5, 5]));
console.log(validMountainArray([0, 3, 2, 1]));
console.log(validMountainArray([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]));
