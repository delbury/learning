/**
 * 基数排序 (Radix Sort) 
 * 时间复杂度（平均）：O(n*k)
 * 时间复杂度（最坏）：O(n*k)
 * 时间复杂度（最好）：O(n*k)
 * 空间复杂度：O(n+k)
 * 稳定性：稳定
 * 
 * 基数排序是按照低位先排序，然后收集；再按照高位排序，然后再收集；依次类推，直到最高位。
 * 有时候有些属性是有优先级顺序的，先按低优先级排序，再按高优先级排序。
 * 最后的次序就是高优先级高的在前，高优先级相同的低优先级高的在前。
 * 
 * 算法描述：
 * 1. 取得数组中的最大数，并取得位数；
 * 2. arr为原始数组，从最低位开始取每个位组成radix数组；
 * 3. 对radix进行计数排序（利用计数排序适用于小范围数的特点）。
 */

const radixSort = function(arr) {
  const maxLength = Math.max.apply(null, arr).toString().length;
  let buckets = null;

  for(let i = 0; i < maxLength; i++) {
    buckets = [];

    for(let j = 0; j < arr.length; j++) {
      
      let k = i;
      let val = arr[j];
      while(k--) {
        val = Math.trunc(val / 10);
      }
      const index = val % 10;

      if(!buckets[index]) {
        buckets[index] = [arr[j]];
      } else {
        buckets[index].push(arr[j]);
      }
    }

    arr = buckets.flat();
  }

  return arr;
};

const generateRandoms = function(n, min = 0, max = 100) {
  return Array.from({ length: n }, () => Math.floor(Math.random() * (max - min) + min));
};

const randoms = generateRandoms(20, 0, 150);
console.log(radixSort(randoms));
