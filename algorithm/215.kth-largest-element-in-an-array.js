/**
 * 215. 数组中的第K个最大元素
 * 在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
 * 
 * 示例 1:
 * 输入: [3,2,1,5,6,4] 和 k = 2
 * 输出: 5
 * 
 * 示例 2:
 * 输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
 * 输出: 4
 * 
 * 说明:
 * 你可以假设 k 总是有效的，且 1 ≤ k ≤ 数组的长度。
 * 
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

// 1. API 排序
var findKthLargest = function (nums, k) {
  return nums.sort((a, b) => b - a)[k - 1];
};

// 2. 最大堆
// 堆调整
const heapify = function (arr, length, i) {
  if (i >= length) return;

  const left = 2 * i + 1 >= length ? -Infinity : arr[2 * i + 1];
  const right = 2 * i + 2 >= length ? -Infinity : arr[2 * i + 2];

  if (left > arr[i] && left >= right) {
    [arr[i], arr[2 * i + 1]] = [arr[2 * i + 1], arr[i]];
    return heapify(arr, length, 2 * i + 1);

  } else if (right > arr[i] && right > left) {
    [arr[i], arr[2 * i + 2]] = [arr[2 * i + 2], arr[i]];
    return heapify(arr, length, 2 * i + 2);
  }
};

// 建堆
const findKthLargestHeap = function (arr, k) {
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    heapify(arr, arr.length, i);
  }

  for (let i = arr.length - 1, len = arr.length - k; i >= len; i--) {
    [arr[i], arr[0]] = [arr[0], arr[i]];
    heapify(arr, i, 0);
  }


  return arr[arr.length - k];
};


// 3. 快速选择
const quickSelection = function (arr, k, left = 0, right = arr.length - 1) {
  if (left >= right) return null;

  const bl = left;
  const rl = right;
  const base = arr[left];
  while (left < right) {
    while (arr[right] < base && right > left) {
      right--;
    }
    if (left < right) {
      arr[left++] = arr[right];
    }

    while (arr[left] >= base && right > left) {
      left++;
    }
    if (left < right) {
      arr[right--] = arr[left];
    }
  }

  arr[left] = base;
  if (left === k - 1) {
    return base;
  } else {
    const resl = quickSelection(arr, k, bl, left - 1);
    if (resl !== null) return resl;

    const resr = quickSelection(arr, k, right + 1, rl);
    if (resr !== null) return resr;
  }

  return null;
};

const findKthLargestQuickSelection = function (arr, k) {
  return quickSelection(arr, k) ?? arr[k - 1];
};

// const { logHeapTree } = require('./tools/LogTools.js');
// console.log(findKthLargestHeap([3, 2, 3, 1, 2, 4, 5, 5, 6], 4));
// const randomObjs = Array.from({ length: 30 }, (v, k) => ({ id: k + 1, val: Math.floor(Math.random() * 5) }));
// console.log(randomObjs);
// console.log(randomObjs.sort((a, b) => a.val - b.val));
// console.log(findKthLargestQuickSelection([3, 2, 1, 5, 6, 4], 2));
console.log(findKthLargestQuickSelection([3, 2, 3, 1, 2, 4, 5, 5, 6], 4));
