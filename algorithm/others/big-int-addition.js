/**
 * 以字符串的形式读入两个数字，编写一个函数计算它们的和，以字符串形式返回。
 * （字符串长度不大于100000，保证字符串仅由'0'~'9'这10种字符组成）
 * 
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 * 计算两个数之和
 * @param s string字符串 表示第一个整数
 * @param t string字符串 表示第二个整数
 * @return string字符串
 */
function solve( s ,  t ) {
  // write code here
  let ps = s.length - 1, pt = t.length - 1;
  let carry = 0;
  let res = '';
  while(ps >= 0 || pt >= 0) {
    let temp = carry + (ps < 0 ? 0 : +s[ps--]) + (pt < 0 ? 0 : +t[pt--]);
    carry = 0;
    if(temp >= 10) {
      temp -= 10;
      carry = 1;
    }
    res = temp + res;
  }
  if(carry) res = 1 + res;
  return res;
}
module.exports = {
  solve : solve
};