/**
 * 一只青蛙一次可以跳上1级台阶，也可以跳上2级。
 * 求该青蛙跳上一个n级的台阶总共有多少种跳法（先后次序不同算不同的结果）。
 */
function jumpFloor(number) {
  // write code here
  if(number <= 2) return number;
  let n1 = 1, n2 = 2;
  for(let i = 3; i <= number; i++) {
    [n1, n2] = [n2, n1 + n2];
  }
  return n2;
}
module.exports = {
  jumpFloor : jumpFloor
};