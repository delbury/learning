/**
 * 给定一个非负整数 num，反复将各个位上的数字相加，直到结果为一位数。
 * 
 * 示例:
 * 输入: 38
 * 输出: 2 
 * 解释: 各位相加的过程为：3 + 8 = 11, 1 + 1 = 2。 由于 2 是一位数，所以返回 2。
 * 
 * 进阶:
 * 你可以不使用循环或者递归，且在 O(1) 时间复杂度内解决这个问题吗？
 * 
 * 
 * @param {number} num
 * @return {number}
 */

// 1. 循环
var addDigits = function(num) {
  while(num > 9) {
    num = num.toString().split('').reduce((a, b) => +a + +b);
  }
  return num;
};

// 2. 数学
// 数字根
var addDigitsII = function(num) {
  return (num - 1) % 9 + 1;
};

const indexes = [];
const arr = [];
for(let i = 0; i < 30; i++) {
  indexes.push(i);
  arr.push(addDigitsII(i));
}
console.log(JSON.stringify(indexes));
console.log(JSON.stringify(arr));
