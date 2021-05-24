/**
 * 矩阵乘法的运算量与矩阵乘法的顺序强相关。
 * 
 * 例如：
 * A是一个50×10的矩阵，B是10×20的矩阵，C是20×5的矩阵
 * 计算A*B*C有两种顺序：（（AB）C）或者（A（BC）），前者需要计算15000次乘法，后者只需要3500次。
 * 编写程序计算不同的计算顺序需要进行的乘法次数。
 */
const { print, createReadline } = require('./tools.js');
const readline = createReadline([
  // '8',
  // '61 4',
  // '4 43',
  // '43 52',
  // '52 24',
  // '24 29',
  // '29 37',
  // '37 23',
  // '23 16',
  // '(A(B(C(D(E(F((GH))))))))',
  '3',
  '50 10',
  '10 20',
  '20 5',
  '(A(BC))', // 3500
]);

// (A((B(C(DE)))(FG))))

let count;
while (count = +readline()) {
  const mats = [];
  for (let i = 0; i < count; i++) {
    mats.push(readline().trim().split(' ').map(c => +c));
  }
  let orderText = readline();

  // 处理字符串
  const stack = [];
  let res = 0;
  for(let i = 0; i < orderText.length; i++) {
    if(orderText[i] === ')') {
      const mat2 = stack.pop();
      const mat1 = stack.pop();
      if(!mat1) break;
      res += mat1[0] * mat1[1] * mat2[1];
      stack.push([mat1[0], mat2[1]]);

    } else if(orderText[i] !== '(') {
      stack.push(mats[orderText.charCodeAt(i) - 65]);
    }
  }

  print(res);
}