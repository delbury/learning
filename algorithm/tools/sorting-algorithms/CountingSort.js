/**
 * 计数排序 (Counting Sort) 
 * 时间复杂度（平均）：O(n+k)
 * 时间复杂度（最坏）：O(n+k)
 * 时间复杂度（最好）：O(n+k)
 * 空间复杂度：O(n+k)
 * 稳定性：稳定
 * 
 * 计数排序不是基于比较的排序算法，其核心在于将输入的数据值转化为键存储在额外开辟的数组空间中。 
 * 作为一种线性时间复杂度的排序，计数排序要求输入的数据必须是有确定范围的整数。
 * 
 * 算法描述：
 * 1. 找出待排序的数组中最大和最小的元素；
 * 2. 统计数组中每个值为i的元素出现的次数，存入数组C的第i项；
 * 3. 对所有的计数累加（从C中的第一个元素开始，每一项和前一项相加）；
 * 4. 反向填充目标数组：将每个元素i放在新数组的第C(i)项，每放一个元素就将C(i)减去1。
 */

const countingSort = function(arr) {
  const temp = [];
  for(let i = 0; i < arr.length; i++) {
    temp[arr[i]] = (temp[arr[i]] ?? 0) + 1;
  }
  arr.length = 0;
  for(let i = 0; i < temp.length; i++) {
    for(let j = 0; j < temp[i] ?? 0; j++) {
      arr.push(i);
    }
  }

  return arr;
};

module.exports = {
  countingSort,
};

// const { shuffle } = require('../ShuffleAlgorithm.js');
// console.log(countingSort([3, 6, 7, 4, 0, 54, 32, 6]));
// console.log(countingSort(shuffle(20)));
