/**
 * 归并排序 (Merge Sort)
 * 时间复杂度（平均）：O(nlogn)
 * 时间复杂度（最坏）：O(nlogn)
 * 时间复杂度（最好）：O(nlogn)
 * 空间复杂度：O(n)
 * 稳定性：稳定
 *
 * 归并排序是建立在归并操作上的一种有效的排序算法。
 * 该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。
 * 将已有序的子序列合并，得到完全有序的序列；即先使每个子序列有序，再使子序列段间有序。
 * 若将两个有序表合并成一个有序表，称为2-路归并。 
 * 
 * 算法描述：
 * 1. 把长度为n的输入序列分成两个长度为n/2的子序列；
 * 2. 对这两个子序列分别采用归并排序；
 * 3. 将两个排序好的子序列合并成一个最终的排序序列。
 */

// 合并两个有序数组
const merge = function (left, right) {
  let lp = 0;
  let rp = 0;
  const res = [];

  while (lp < left.length || rp < right.length) {
    if (lp >= left.length) {
      res.push(...right.slice(rp));
      break;
    } else if (rp >= right.length) {
      res.push(...left.slice(lp));
      break;
    }

    if (left[lp] < right[rp]) {
      res.push(left[lp++]);
    } else {
      res.push(right[rp++]);
    }
  }

  return res;
};

// 递归
const mergeSort = function (arr) {
  if (arr.length <= 1) return arr;

  const center = Math.floor(arr.length / 2);
  const left = arr.slice(0, center);
  const right = arr.slice(center);

  return merge(mergeSort(left), mergeSort(right));
};

// 迭代
const mergeSortIteration = function (arr) {
  const length = arr.length;
  let res = null; // 辅助数组

  for (let step = 1; step < length; step *= 2) {
    res = [];

    for (let i = 0; i < length; i += 2 * step) {
      res.push(...merge(arr.slice(i, i + step), arr.slice(i + step, i + step * 2)));
    }

    arr = res; // 切换辅助数组
  }

  return res;
};

// console.log(merge([4, 5, 7, 8], [1, 2, 3, 6]));
console.log(mergeSort([3, 6, 7, -2, 4, -123, 0, 54, 32, 6]));
console.log(mergeSortIteration([3, 6, 7, -2, 4, -123, 0, 54, 32, 6]));
