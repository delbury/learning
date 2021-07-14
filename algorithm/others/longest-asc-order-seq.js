/**
 * 牛牛现在有一个n个数组成的数列,牛牛现在想取一个连续的子序列,
 * 并且这个子序列还必须得满足:最多只改变一个数,就可以使得这个连续的子序列是一个严格上升的子序列,
 * 牛牛想知道这个连续子序列最长的长度是多少。
 * 
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 * 
 * @param nums int一维数组 
 * @return int
 */
function maxSubArrayLength(nums) {
  // write code here
  let len = nums.length, res = 0;
  let left = []; // 以 arr[i] 结尾的连续序列长度
  let right = []; // 以 arr[i] 开头的连续序列长度  
  left[0] = 1;
  right[len - 1] = 1;
  for (let i = 1; i < len; i++) {
    left[i] = nums[i] > nums[i - 1] ? left[i - 1] + 1 : 1;
  }
  for (let i = len - 2; i >= 0; i--) {
    right[i] = nums[i] < nums[i + 1] ? right[i + 1] + 1 : 1;
  }
  for (let i = 1; i < len - 1; i++) {
    if (nums[i - 1] < nums[i + 1]) { //找连接点      
      let sum = left[i - 1] + right[i + 1] + 1;
      res = Math.max(res, sum);
    }
  }
  return res;
}
module.exports = {
  maxSubArrayLength : maxSubArrayLength
};
// const list = [19,20,396,692,855,945,231,246,972];
// const list = [7,2,3,1,5,6]; // 5
// const list = [7,2,3]; // 5
// const list = [10,3,10,5,7];
const list = [1, 2, 6, 4, 5];
console.log(maxSubArrayLength(list));