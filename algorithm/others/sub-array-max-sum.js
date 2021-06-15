/**
 * 给定一个数组arr，返回子数组的最大累加和
 * 例如，arr = [1, -2, 3, 5, -2, 6, -1]，所有子数组中，[3, 5, -2, 6]可以累加出最大的和12，所以返回12.
 * 题目保证没有全为负数的数据
 * [要求]
 * 时间复杂度为O(n)O(n)，空间复杂度为O(1)O(1)
 * 
 * max sum of the subarray
 * @param arr int整型一维数组 the array
 * @return int整型
 */
function maxsumofSubarray( arr ) {
  // write code here
  let max = 0;
  let prev = 0;
  for(let i = 0; i < arr.length; i++) {
    prev = prev > 0 ? prev + arr[i] : arr[i];
    max = Math.max(prev, max);
  }
  return max;
}
module.exports = {
  maxsumofSubarray : maxsumofSubarray
};

console.log(maxsumofSubarray([1, -2, 3, 5, -2, 6, -1]));