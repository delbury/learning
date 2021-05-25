/**
 * 正整数A和正整数B 的最小公倍数是指 能被A和B整除的最小的正整数值，设计一个算法，求输入A和B的最小公倍数。
 * 
 * 先求最大公约数（辗转相除）
 */

const { print, createReadline } = require('./tools.js');
const readline = createReadline([
  '5 7',
  '15 10',
]);

let nums;
while(nums = readline()) {
  const [x, y] = nums.trim().split(' ').map(c => +c);
  let a = x, b = y;
  if(a > b) [a, b] = [b, a];
  while(b % a !== 0) {
    [a, b] = [b % a, a];
  }
  print(x * y / a);
} 