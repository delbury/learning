/**
 * 插入排序 (Insertion Sort)
 * 时间复杂度（平均）：O(n^2)
 * 时间复杂度（最坏）：O(n^2)
 * 时间复杂度（最好）：O(n)
 * 空间复杂度：O(1)
 * 稳定性：稳定
 * 
 * 1. 从第一个元素开始，该元素可以认为已经被排序；
 * 2. 取出下一个元素，在已经排序的元素序列中从后向前扫描；
 * 3. 如果该元素（已排序）大于新元素，将该元素移到下一位置；
 * 4. 重复步骤3，直到找到已排序的元素小于或者等于新元素的位置；
 * 5. 将新元素插入到该位置后；
 * 6. 重复步骤2~5。
 */

const insertionSort = function(arr) {
  for(let i = 1; i < arr.length; i++) {
    for(let j = i - 1; j >= 0; j--) {
      if(arr[i] > arr[j]) {
        arr.splice(j + 1, 0, ...arr.splice(i, 1));
        break;
      } else if(j === 0) {
        arr.unshift(...arr.splice(i, 1));
      }
    }
  }

  return arr;
}

console.log(insertionSort([3, 6, 7, -2, 4, -123, 0, 54, 32, 6]));
