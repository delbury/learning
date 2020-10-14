/**
 * 选择排序 (Selection Sort)
 * 时间复杂度（平均）：O(n^2)
 * 时间复杂度（最坏）：O(n^2)
 * 时间复杂度（最好）：O(n^2)
 * 空间复杂度：O(1)
 * 稳定性：不稳定
 * 
 * 1. 初始状态：无序区为R[1..n]，有序区为空；
 * 2. 第i趟排序(i=1,2,3…n-1)开始时，当前有序区和无序区分别为R[1..i-1]和R(i..n）。该趟排序从当前无序区中-选出关键字最小的记录 R[k]，将它与无序区的第1个记录R交换，使R[1..i]和R[i+1..n)分别变为记录个数增加1个的新有序区和记录个数减少1个的新无序区；
 * 3. n-1趟结束，数组有序化了。
 */

const selectionSort = function(arr) {
  for(let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for(let j = i + 1; j < arr.length; j++) {
      if(arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }

  return arr;
};

console.log(selectionSort([3, 6, 7, -2, 4, -123, 0, 54, 32, 6]));
