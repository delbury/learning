/**
 * 如果A是个x行y列的矩阵，B是个y行z列的矩阵，把A和B相乘，其结果将是另一个x行z列的矩阵C。
 * 
 * 输入包含多组数据，每组数据包含：
 * 第一行包含一个正整数x，代表第一个矩阵的行数
 * 第二行包含一个正整数y，代表第一个矩阵的列数和第二个矩阵的行数
 * 第三行包含一个正整数z，代表第二个矩阵的列数
 * 之后x行，每行y个整数，代表第一个矩阵的值
 * 之后y行，每行z个整数，代表第二个矩阵的值
 */

const { print, createReadline } = require('./tools.js');
const readline = createReadline([
  '2',
  '3',
  '2',
  '1 2 3',
  '3 2 1',
  '1 2',
  '2 1',
  '3 3',
]);

let x, y, z;
while (x = +readline()) {
  y = +readline();
  z = +readline();
  const mat1 = [];
  const mat2 = [];
  for (let i = 0; i < x; i++) {
    mat1.push(readline().trim().split(' ').map(c => +c));
  }
  for (let i = 0; i < y; i++) {
    mat2.push(readline().trim().split(' ').map(c => +c));
  }
  for (let i = 0; i < x; i++) {
    const t = [];
    for (let j = 0; j < z; j++) {
      let res = 0;
      for (let k = 0; k < y; k++) {
        res += mat1[i][k] * mat2[k][j];
      }
      t.push(res);
    }
    print(t.join(' '));
  }
}