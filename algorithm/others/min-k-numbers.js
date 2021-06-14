/**
 * 给定一个数组，找出其中最小的K个数。
 * 例如数组元素是4,5,1,6,2,7,3,8这8个数字，则最小的4个数字是1,2,3,4。
 * 如果K>数组的长度，那么返回一个空的数组
 */

// 1. 排序
function GetLeastNumbers_Solution(input, k) {
  // write code here
  if(k > input.length) return [];
  input.sort((a, b) => a - b);
  return input.slice(0, k);
}

// 2. 大顶堆实现


module.exports = {
  GetLeastNumbers_Solution : GetLeastNumbers_Solution
};

console.log(GetLeastNumbers_Solution([4,5,1,6,2,7,3,8],10))