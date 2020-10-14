/**
 * 冒泡排序 (Bubble Sort)
 * 时间复杂度（平均）：O(n^2)
 * 时间复杂度（最坏）：O(n^2)
 * 时间复杂度（最好）：O(n)
 * 空间复杂度：O(1)
 * 稳定性：稳定
 * 
 * 描述：
 * 1. 比较相邻的元素。如果第一个比第二个大，就交换它们两个；
 * 2. 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数；
 * 3. 针对所有的元素重复以上的步骤，除了最后一个；
 * 4. 重复步骤1~3，直到排序完成。
 */

const bubbleSort = function(arr) {
  for(let i = 0; i < arr.length - 1; i++) {
    for(let j = i + 1; j < arr.length; j++) {
      if(arr[i] > arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }

  return arr;
};


console.log(bubbleSort([3, 6, 7, -2, 4, -123, 0, 54, 32, 6]));