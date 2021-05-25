/**
 * 输入一个表达式（用字符串表示），求这个表达式的值。
 * 保证字符串中的有效字符包括[‘0’-‘9’],‘+’,‘-’, ‘*’,‘/’ ,‘(’， ‘)’,‘[’, ‘]’,‘{’ ,‘}’。且表达式一定合法。
 * 
 * 思路：栈
 * 1. 用两个栈分别压数字和运算符；
 * 
 * 2. 如果当前运算符优先级('*', '/')高于栈顶运算符('+', '-')优先级，则将运算符入栈；
 * 反之，从数字栈中弹出两个数，从运算符栈中弹出栈顶运算符，
 * 进行运算，数字栈压入运算结果，符号栈压入当前运算符。重复该操作直到不满足条件。
 * 
 * 3. 出现左括号，则直接压入；出现右括号，则从数字栈中弹出两个数，
 * 从运算符栈中弹出栈顶运算符，进行运算，数字栈压入运算结果，重复该操作直到栈顶弹出左括号为止。
 * 
 */

const { print, createReadline } = require('./tools.js');
const readline = createReadline([
  // '3+2*{1+2*[-4/(8-6)+7]}'
  // '18-6+2*8/4-3', // 13
  // '18-(6+2)*8/4-3', // -1
  '9*(-4-5)'
]);

// 运算符：+, -, *, / => 0, 0, 1, 1

let str;
const on = {
  '+': 0,
  '-': 0,
  '*': 1,
  '/': 1,
};
const calc = (a, b, type) => {
  switch(type) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return a / b;
  }
};
while(str = readline()) {
  // 1. 正则
  // str = str.replace(/[\[{]/g, '(');
  // str = str.replace(/[\]}]/g, ')');
  // print(eval(str));
  str = `(${str})`;
  const skn = [];
  const sko = []
  const reg = /\d+/g;
  let sym = 1;
  for(let i = 0; i < str.length; i++) {
    if(str[i] === '(' || str[i] === '{' || str[i] === '[') {
      // 左括号
      sko.push('(');

    } else if(str[i] === ')' || str[i] === '}' || str[i] === ']') {
      // 右括号
      while(true) {
        const op = sko.pop();
        if(op === '(') break;
        const r = skn.pop(); // 先出栈的是右操作数
        const l = skn.pop(); // 第二个出栈的是左操作数
        const t = calc(l, r, op);
        skn.push(t);
      }

    } else if(/\d/.test(str[i])) {
      // 数字
      const matched = reg.exec(str);
      skn.push(+matched[0] * sym);
      sym = 1;
      i += matched[0].length - 1;

    } else if(/[+\-*/]/.test(str[i])) {
      // 判断是否是正负号
      if(i - 1 >= 0 && /[(+\-*/]/.test(str[i - 1])) {
        if(str[i] === '-') sym = -1;
        continue;
      }

      // 操作符
      if(!sko.length || on[str[i]] > on[sko[sko.length - 1]]) {
        // 若操作符栈为空，或者当前操作符（*/）的优先级大于栈顶操作符的优先级（+-），将操作符入栈
        sko.push(str[i]);
      } else {
        // 否则，计算栈顶的操作符与栈内顶部两个数字的计算结果并入栈
        while(on[str[i]] <= on[sko[sko.length - 1]]) {
          const r = skn.pop(); // 先出栈的是右操作数
          const l = skn.pop(); // 第二个出栈的是左操作数
          const t = calc(l, r, sko.pop());
          skn.push(t);
        }
        sko.push(str[i]);
      }
    }
  }
  print(skn[0]);
}

// '18-(6+2)*8/4-3', // -1  

