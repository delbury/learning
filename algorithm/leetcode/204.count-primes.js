/**
 * 统计所有小于非负整数 n 的质数的数量。
 * 输入: 10
 * 输出: 4
 * 解释: 小于 10 的质数一共有 4 个, 它们是 2, 3, 5, 7 。
 * @param {number} n
 * @return {number}
 */
var countPrimes = function (n) {
  // const arr = Array(Math.floor(Math.sqrt(n))).fill(1);
  if (n < 2) return 0;
  const arr = new Uint8Array(n - 1).fill(1);
  arr[0] = 0;

  for (let i = 2; i * i <= arr.length; i++) {
    if (arr[i - 1] === 0) {
      continue;
    }

    for (let j = 2 * i; j <= arr.length; j += i) {
      arr[j - 1] = 0;
    }
  }

  return arr.reduce((sum, a) => sum + a, 0);
};

console.log(countPrimes(25));
console.log(countPrimes(10)); // 4
console.log(countPrimes(4));
console.log(countPrimes(3));
console.log(countPrimes(2));
console.log(countPrimes(1));
console.log(countPrimes(0));
