/**
 * 请写一个整数计算器，支持加减乘三种运算和括号。
 * 
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 * 返回表达式的值
 * @param s string字符串 待计算的表达式
 * @return int整型
 */
const calc = (a, b, opt) => {
  switch(opt) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
  }
};
function solve( s ) {
  // write code here
  s = `(${s})`; // 包裹括号
  const nums = [];
  const opts = [];
  const reg = /\d/;
  const reg2 = /[\-+*]/;
  for(let i = 0; i < s.length; i++) {
    if(s[i] === '(') {
      // 左括号
      opts.push(s[i]);
    } else if(reg.test(s[i])) {
      let n = s[i];
      // 处理多位数字
      while(i + 1 < s.length && reg.test(s[i + 1])) {
        i++;
        n += s[i];
      }
      nums.push(+n); // 数字入栈
    } else if(reg2.test(s[i])) {
      // 操作符
      // 当前操作符的优先级大于栈顶的操作符的优先级时，当前操作入栈
      if(!opts.length || (s[i] === '*' && opts[opts.length - 1] !== '*')) {
        opts.push(s[i]);
      } else {
        // 否则取出并计算
        while(reg2.test(opts[opts.length - 1]) && !(s[i] === '*' && (opts[opts.length - 1] === '+' || opts[opts.length - 1] === '-'))) {
          const r = nums.pop();
          const l = nums.pop();
          nums.push(calc(l, r, opts.pop()));
        }
        opts.push(s[i]);
      }
    } else if(s[i] === ')') {
      // 右括号
      while(true) {
        const opt = opts.pop();
        if(opt === '(') break;
        const r = nums.pop();
        const l = nums.pop();
        nums.push(calc(l, r, opt));
      }
    }
  }
  return nums[0];
}
module.exports = {
  solve : solve
};

console.log(solve("120+104*10*1*2-2")); // 2198
// console.log(solve("(12*10-(100-(10+20*10-6))*20)-2")); // 2198
// console.log(solve("10+10*1*2*3-5"));
// console.log(solve("10+10*1*2*3"));
