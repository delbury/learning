/**
 * 给定一个整数 n，返回 n! 结果尾数中零的数量。
 * 
 * 示例 1:
 * 输入: 3
 * 输出: 0
 * 解释: 3! = 6, 尾数中没有零。
 * 
 * 示例 2:
 * 输入: 5
 * 输出: 1
 * 解释: 5! = 120, 尾数中有 1 个零.
 * 
 * @param {number} n
 * @return {number}
 */

// 1.
// 每隔 5 个数有一个 5；每隔 25 个数，有 2 个 5；每隔 125 个数，有三个 5；...
// count = n / 5 + n / 25 + n / 125 + ... + n / 5 ^ m
var trailingZeroes = function(n) {
  let count = 0;
  while(n >= 5) {
    n = Math.floor(n / 5);
    count += n;
  }
  return count;
};

// 2. 遍历
// 乘数中 5 个数即为尾部 0 的个数
var trailingZeroes = function(n) {
  let res = 0;
  for(let i = 5; i <= n; i += 5) {
    let t = i;
    while(t) {
      if(t % 5 === 0) {
        res++;
        t /= 5;
      } else {
        break;
      }
    }
  }
  return res;
};