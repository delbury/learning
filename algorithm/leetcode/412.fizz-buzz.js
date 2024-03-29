/**
 * 写一个程序，输出从 1 到 n 数字的字符串表示。
 * 1. 如果 n 是3的倍数，输出“Fizz”；
 * 2. 如果 n 是5的倍数，输出“Buzz”；
 * 3.如果 n 同时是3和5的倍数，输出 “FizzBuzz”。
 * 
 * 示例：
 * n = 15,
 * 返回:
 * [
 *     "1",
 *     "2",
 *     "Fizz",
 *     "4",
 *     "Buzz",
 *     "Fizz",
 *     "7",
 *     "8",
 *     "Fizz",
 *     "Buzz",
 *     "11",
 *     "Fizz",
 *     "13",
 *     "14",
 *     "FizzBuzz"
 * ]
 * 
 * @param {number} n
 * @return {string[]}
 */

// 1.
var fizzBuzz = function(n) {
  const arr = [];
  while(n) {
    let flag3 = false;
    let flag5 = false;
    if(n % 3 === 0) flag3 = true;
    if(n % 5 === 0) flag5 = true;
    arr.unshift((flag3 ? 'Fizz' : '') + (flag5 ? 'Buzz' : '') || n.toString());
    n--;
  }
  return arr;
};

console.log(fizzBuzz(15));