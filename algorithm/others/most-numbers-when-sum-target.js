/**
 * 给定一个无序数组arr, 其中元素可正、可负、可0。
 * 给定一个整数k，求arr所有子数组中累加和为k的最长子数组长度
 * 
 * max length of the subarray sum = k
 * @param arr int整型一维数组 the array
 * @param k int整型 target
 * @return int整型
 */
function maxlenEqualK( arr ,  k ) {
  // write code here
  const map = new Map([[0, -1]]);
  let len = 0, sum = 0;
  for(let i = 0; i < arr.length; i++) {
    sum += arr[i];
    if(map.has(sum - k)) {
      len = Math.max(i - map.get(sum - k), len);
    }
    if(!map.has(sum)) {
      map.set(sum, i);
    }
  }
  return len;
}
module.exports = {
  maxlenEqualK : maxlenEqualK
};

console.log(maxlenEqualK([1,2,3,4,5],6));