/**
 * 斐波那契数，通常用 F(n) 表示，形成的序列称为 斐波那契数列 。
 * 该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和。也就是：
 * F(0) = 0，F(1) = 1
 * F(n) = F(n - 1) + F(n - 2)，其中 n > 1
 * 给你 n ，请计算 F(n) 。
 * 
 * @param {number} n
 * @return {number}
 */

// 1. 递归
var fibI = function(n) {
  if(n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
};

// 2. 迭代
var fibII = function(n) {
  if(n <= 1) return n;
  let a = 1, b = 0;
  while(--n) {
    [a, b] = [a + b, a];
  }
  return a;
};

// 3. 通项公式
var fibIII = function(n) {
  const sqrt5 = Math.sqrt(5);
  const fibN = Math.pow((1 + sqrt5) / 2, n) - Math.pow((1 - sqrt5) / 2, n);
  return Math.round(fibN / sqrt5);
};

// 4. 矩阵快速幂
var fib = function(n) {
  if (n < 2) {
    return n;
  }
  const q = [[1, 1], [1, 0]];
  const res = pow(q, n - 1);
  return res[0][0];
};

const pow = (a, n) => {
  let ret = [[1, 0], [0, 1]];
  while (n > 0) {
    if ((n & 1) === 1) {
      ret = multiply(ret, a);
    }
    n >>= 1;
    a = multiply(a, a);
  }
  return ret;
}

const multiply = (a, b) => {
  const c = new Array(2).fill(0).map(() => new Array(2).fill(0));
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      c[i][j] = a[i][0] * b[0][j] + a[i][1] * b[1][j];
    }
  }
  return c;
}

const { logAssert } = require('./tools/LogTools.js');
logAssert(fib, 2, 1);
logAssert(fib, 0, 0);
logAssert(fib, 1, 1);