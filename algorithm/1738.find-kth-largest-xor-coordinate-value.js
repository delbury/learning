/**
 * 给你一个二维矩阵 matrix 和一个整数 k ，矩阵大小为 m x n 由非负整数组成。
 * 矩阵中坐标 (a, b) 的 值 可由对所有满足 0 <= i <= a < m 且 0 <= j <= b < n 的元素 matrix[i][j]（下标从 0 开始计数）执行异或运算得到。
 * 请你找出 matrix 的所有坐标中第 k 大的值（k 的值从 1 开始计数）。
 *  
 * 示例 1：
 * 输入：matrix = [[5,2],[1,6]], k = 1
 * 输出：7
 * 解释：坐标 (0,1) 的值是 5 XOR 2 = 7 ，为最大的值。
 * 
 * 示例 2：
 * 输入：matrix = [[5,2],[1,6]], k = 2
 * 输出：5
 * 解释：坐标 (0,0) 的值是 5 = 5 ，为第 2 大的值。
 * 
 * 示例 3：
 * 输入：matrix = [[5,2],[1,6]], k = 3
 * 输出：4
 * 解释：坐标 (1,0) 的值是 5 XOR 1 = 4 ，为第 3 大的值。
 * 
 * 示例 4：
 * 输入：matrix = [[5,2],[1,6]], k = 4
 * 输出：0
 * 解释：坐标 (1,1) 的值是 5 XOR 2 XOR 1 XOR 6 = 0 ，为第 4 大的值。
 *  
 * 提示：
 * m == matrix.length
 * n == matrix[i].length
 * 1 <= m, n <= 1000
 * 0 <= matrix[i][j] <= 106
 * 1 <= k <= m * n
 * 
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */

// 大顶堆
const heapify = (arr, length, i) => {
  if (i >= length || i < 0) return;

  const left = 2 * i + 1 >= length ? -Infinity : arr[2 * i + 1]; // 左子节点
  const right = 2 * i + 2 >= length ? -Infinity : arr[2 * i + 2]; // 右子节点

  if (left > arr[i] && left >= right) {
    // 若左子节点最大
    [arr[i], arr[2 * i + 1]] = [arr[2 * i + 1], arr[i]];
    heapify(arr, length, 2 * i + 1);

  } else if (right > arr[i] && right > left) {
    // 若右子节点最大
    [arr[i], arr[2 * i + 2]] = [arr[2 * i + 2], arr[i]];
    heapify(arr, length, 2 * i + 2);
  }
}
// 1. 暴力（超时）
var kthLargestValueI = function(matrix, k) {
  const m = matrix[0].length;
  const n = matrix.length;
  const heap = [];
  for(let i = 0; i < n; i++) {
    for(let j = 0; j < m; j++) {
      let t = 0;
      for(let x = 0; x <= i; x++) {
        for(let y = 0; y <= j; y++) {
          t ^= matrix[x][y];
        }
      }
      heap.push(t);
    }
  }
  for(let i = Math.floor(heap.length / 2) - 1; i >= 0; i--) {
    heapify(heap, heap.length, i);
  }
  for(let i = 1; i <= k; i++) {
    [heap[0], heap[heap.length - i]] = [heap[heap.length - i], heap[0]];
    heapify(heap, heap.length - i, 0);
  }
  return heap[heap.length - k];
};

// 2. 二维前缀异或
var kthLargestValueII = function(matrix, k) {
  const m = matrix.length, n = matrix[0].length;
  const pre = Array.from({ length: m + 1 }, () => [0]);
  const heap = [];
  for(let i = 1; i <= m; i++) {
    for(let j = 1; j <= n; j++) {
      pre[i][j] = pre[i - 1][j] ^ pre[i][j - 1] ^ pre[i - 1][j - 1] ^ matrix[i - 1][j - 1];
      heap.push(pre[i][j]);
    }
  }
  for(let i = Math.floor(heap.length / 2) - 1; i >= 0; i--) {
    heapify(heap, heap.length, i);
  }
  for(let i = 1; i <= k; i++) {
    [heap[0], heap[heap.length - i]] = [heap[heap.length - i], heap[0]];
    heapify(heap, heap.length - i, 0);
  }
  return heap[heap.length - k];
};

// 3. 二维前缀 + 快速选择
var kthLargestValue = function(matrix, k) {
  const m = matrix.length, n = matrix[0].length;
  const pre = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
  const results = [];
  for (let i = 1; i <= m; ++i) {
    for (let j = 1; j <= n; ++j) {
      pre[i][j] = pre[i - 1][j] ^ pre[i][j - 1] ^ pre[i - 1][j - 1] ^ matrix[i - 1][j - 1];
      results.push(pre[i][j]);
    }
  }
  nthElement(results, 0, k - 1, results.length - 1);
  return results[k - 1];
}

const nthElement = (results, left, kth, right) => {
  if (left === right) {
    return;
  }
  const pivot = parseInt(Math.random() * (right - left) + left);
  swap(results, pivot, right);
  // 三路划分（three-way partition）
  let sepl = left - 1, sepr = left - 1;
  for (let i = left; i <= right; i++) {
    if (results[i] > results[right]) {
      swap(results, ++sepr, i);
      swap(results, ++sepl, sepr);
    } else if (results[i] === results[right]) {
      swap(results, ++sepr, i);
    }
  }
  if (sepl < left + kth && left + kth <= sepr) {
    return;
  } else if (left + kth <= sepl) {
    nthElement(results, left, kth, sepl);
  } else {
    nthElement(results, sepr + 1, kth - (sepr - left + 1), right);
  }
}
const swap = (results, index1, index2) => {
  const temp = results[index1];
  results[index1] = results[index2];
  results[index2] = temp;
}

const { logAssert } = require('./tools/LogTools.js');
// logAssert(kthLargestValue, [[5,2],[1,6]], 1, 7);
// logAssert(kthLargestValue, [[5,2],[1,6]], 2, 5);
logAssert(kthLargestValue, [[8,10,5,8,5,7,6,0,1,4,10,6,4,3,6,8,7,9,4,2]], 2, 14);

