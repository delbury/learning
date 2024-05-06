/**
 * 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。
 *
 * @param {number} x
 * @return {number}
 */

// 1. API
var reverseByAPI = function (x) {
  const symbol = x < 0 ? -1 : 1;
  const res = symbol * (x * symbol).toString().split('').reverse().join('');
  return res >= 2147483648 || res < -2147483648 ? 0 : res;
};

// 2. 遍历
var reverse = function (x) {
  const symbol = x < 0 ? -1 : 1;
  const str = (x * symbol).toString();
  let sum = 0;
  let p = str.length - 1;
  while (p >= 0) {
    sum = sum * 10 + +str[p--];
  }

  sum = sum * symbol;
  if (sum >= 0x80000000 || sum < -0x80000000) return 0;

  return sum;
};

// 3. 计算，防止溢出
var reverseCompute = function (x) {
  let pop = null;
  let sum = 0;
  do {
    pop = x % 10;
    x = Math.trunc(x / 10);

    // 溢出判断
    if (sum >= (0x8000_0000 - pop) / 10) return 0;
    if (sum < (-0x8000_0000 - pop) / 10) return 0;

    sum = sum * 10 + pop;
  } while (x);

  return sum;
};

console.log(reverseCompute(1563847412));
console.log(reverseCompute(-1563847412));
console.log(reverseCompute(534345));
console.log(reverseCompute(-1233));
console.log(reverseCompute(0));
