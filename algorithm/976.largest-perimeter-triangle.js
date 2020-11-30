/**
 * 给定由一些正数（代表长度）组成的数组 A，返回由其中三个长度组成的、面积不为零的三角形的最大周长。
 * 如果不能形成任何面积不为零的三角形，返回 0。
 *  
 * 示例 1：
 * 输入：[2,1,2]
 * 输出：5
 * 
 * 示例 2：
 * 输入：[1,2,1]
 * 输出：0
 * 
 * 示例 3：
 * 输入：[3,2,3,4]
 * 输出：10
 * 
 * 示例 4：
 * 输入：[3,6,2,3]
 * 输出：8
 *  
 * 提示：
 * 3 <= A.length <= 10000
 * 1 <= A[i] <= 10^6
 * 
 * 
 * @param {number[]} A
 * @return {number}
 */

// 1. 排序 + 滑动窗口
var largestPerimeter = function(A) {
  A.sort((a, b) => a - b);
  let res = 0;
  for(let i = 2; i < A.length; i++) {
    const l = A[i - 1] + A[i - 2];
    if(l > A[i]) {
      res = Math.max(l + A[i]);
    }
  }
  return res;
};

// 2. 反向遍历
var largestPerimeterII = function(A) {
  A.sort((a, b) => a - b);
  for(let i = A.length - 1; i >= 2; i--) {
    if(A[i - 1] + A[i - 2] > A[i]) return A[i] + A[i - 1] + A[i - 2];
  }
  return 0;
};

// 3. 边排序边比较
var largestPerimeterIII = function (A) {
  // 冒泡排序
  let k = A.length - 1;
  for (let i = 0; i < A.length - 1; i++) {
    let lastFlag = 0;
    for (let j = 0; j < k; j++) {
      if (A[j] > A[j + 1]) { // 相邻的比较大小，大的放右边
        lastFlag = j;
        let temp = A[j];
        A[j] = A[j + 1];
        A[j + 1] = temp;
      }
    }
    k = lastFlag;
    if (i > 1) {
      if (A[A.length - i - 1] + A[A.length - i] > A[A.length - i + 1]) {
        return (A[A.length - i - 1] + A[A.length - i] + A[A.length - i + 1]);
      }
    }
  }
  if (A[0] + A[1] > A[2]) {
    return A[0] + A[1] + A[2]
  }
  return 0;
};