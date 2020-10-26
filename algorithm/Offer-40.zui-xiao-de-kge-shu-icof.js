/**
 * 输入整数数组 arr ，找出其中最小的 k 个数。
 * 例如，输入4、5、1、6、2、7、3、8这8个数字，则最小的4个数字是1、2、3、4。
 * 
 * 同 TopK 问题
 * 
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */

const heapify = function (arr, length, i) {
  if (i >= length) return;

  const left = 2 * i + 1 >= length ? Infinity : arr[2 * i + 1];
  const right = 2 * i + 2 >= length ? Infinity : arr[2 * i + 2];

  if (left < arr[i] && left <= right) {
    [arr[i], arr[2 * i + 1]] = [arr[2 * i + 1], arr[i]];
    return heapify(arr, length, 2 * i + 1);

  } else if (right < arr[i] && right < left) {
    [arr[i], arr[2 * i + 2]] = [arr[2 * i + 2], arr[i]];
    return heapify(arr, length, 2 * i + 2);
  }
};

var getLeastNumbers = function (arr, k) {
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    heapify(arr, arr.length, i);
  }

  for (let i = arr.length - 1, len = arr.length - k; i >= len; i--) {
    [arr[i], arr[0]] = [arr[0], arr[i]];
    heapify(arr, i, 0);
  }

  return arr.slice(arr.length - k);
};

// const { logHeapTree } = require('./tools/LogTools.js');
console.log(getLeastNumbers([3, 2, 1], 2))