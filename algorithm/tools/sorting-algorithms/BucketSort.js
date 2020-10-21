/**
 * 桶排序 (Bucket Sort) 
 * 时间复杂度（平均）：O(n+k)
 * 时间复杂度（最坏）：O(n^2)
 * 时间复杂度（最好）：O(n)
 * 空间复杂度：O(n+k)
 * 稳定性：稳定
 * 
 * 桶排序是计数排序的升级版。它利用了函数的映射关系，高效与否的关键就在于这个映射函数的确定。
 * 桶排序 (Bucket sort)的工作的原理：假设输入数据服从均匀分布，将数据分到有限数量的桶里，
 * 每个桶再分别排序（有可能再使用别的排序算法或是以递归方式继续使用桶排序进行排）。
 * 
 * 算法描述：
 * 1. 设置一个定量的数组当作空桶；
 * 2. 遍历输入数据，并且把数据一个一个放到对应的桶里去；
 * 3. 对每个不是空的桶进行排序；
 * 4. 从不是空的桶里把排好序的数据拼接起来。
 */

const { countingSort } = require('./CountingSort.js');

const bucketSort = function(arr) {
  const buckets = [];

  for(let i = 0; i < arr.length; i++) {
    const index = Math.floor(arr[i] / 10);

    if(!buckets[index]) {
      buckets[index] = [arr[i]];
    } else {
      buckets[index].push(arr[i]);
    }
  }

  for(let i = 0; i < buckets.length; i++) {
    if(buckets[i]) {
      countingSort(buckets[i]);
    }
  }

  return buckets.flat();
};

const generateRandoms = function(n, min = 0, max = 100) {
  return Array.from({ length: n }, () => Math.floor(Math.random() * (max - min) + min));
};

const randoms = generateRandoms(20);
console.log(bucketSort(randoms));
