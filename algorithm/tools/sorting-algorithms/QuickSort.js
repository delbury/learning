/**
 * 快速排序 (Quick Sort)
 * 时间复杂度（平均）：O(nlogn)
 * 时间复杂度（最坏）：O(n^2)
 * 时间复杂度（最好）：O(nlogn)
 * 空间复杂度：O(nlogn)
 * 稳定性：不稳定
 *
 * 快速排序的基本思想：通过一趟排序将待排记录分隔成独立的两部分，
 * 其中一部分记录的关键字均比另一部分的关键字小，则可分别对这两部分记录继续进行排序，以达到整个序列有序。
 *
 * 算法描述：
 * 1. 从数列中挑出一个元素，称为 “基准”（pivot）；
 * 2. 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。
 *    在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；
 * 3. 递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。
 */

// 原地递归
const quickSort = function (arr, left = 0, right = arr.length - 1) {
  if (left >= right) return;

  const bl = left;
  const br = right;
  const base = arr[left];
  while (left < right) {
    while (arr[right] > base && right > left) {
      right--;
    }
    if (left < right) {
      arr[left++] = arr[right];
    }

    while (arr[left] <= base && right > left) {
      left++;
    }
    if (left < right) {
      arr[right--] = arr[left];
    }
  }

  arr[left] = base;
  quickSort(arr, bl, left - 1);
  quickSort(arr, right + 1, br);

  return arr;
};

// 递归，辅助数组
const quickSortHelp = function (arr) {
  if (arr.length <= 1) return arr;

  const base = [arr[0]];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < base[0]) {
      left.push(arr[i]);
    } else if (arr[i] > base[0]) {
      right.push(arr[i]);
    } else {
      base.push(arr[i]);
    }
  }

  return [...quickSort(left), ...base, ...quickSort(right)];
};

// 迭代，辅助数组
const quickSortIteration = function (arr) {
  const res = [arr];

  let i = 0;
  while (i < res.length) {
    if (typeof res[i] === 'object') {
      if (res[i].length > 1) {
        const base = res[i][0];
        const left = [];
        const right = [];

        for (let j = 1; j < res[i].length; j++) {
          if (res[i][j] < base) {
            left.push(res[i][j]);
          } else {
            right.push(res[i][j]);
          }
        }

        res.splice(i, 1, left, base, right);
      } else {
        res.splice(i, 1, ...res[i]);
      }
      i = 0;
    } else {
      i++;
    }
  }

  return res;
};

// console.log(quickSort([3, 6, 7, -2, 4, -123, 0, 54, 32, 6]));
console.log(quickSort([3, 3, 3, 6, 7, -2, 4, -123, 0, 54, 32, 6]));
// console.log(count);
