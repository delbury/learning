/**
 * @description 动态规划例子
 * @author delbury
 * @version 1.0
 */

/**
 * 斐波那契数列
 */
const fibonacci = function (n) {
  if (n <= 2) return n - 1;

  let arr = [0, 1]; // 数列的前两个数
  let current = null; // 当前数
  while (n-- > 2) {
    current = arr[0] + arr[1];
    arr[0] = arr[1];
    arr[1] = current;
  }
  return current;
};

// console.log(...Array.from({ length: 10 }, (v, k) => fibonacci(k + 1)));

/**
 * 机器人走格子
 * 从 (0, 0) 走到 (m, n) 的路径方案
 */
const robot = function (m, n) {
  // const steps = Array.from({ length: m }, () => Array(n).fill(1));
  const steps = Array(n).fill(1);

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      steps[j] = steps[j] + (j > 0 ? steps[j - 1] : 0);
    }
  }
  return steps[n - 1];
};

console.log(robot(7, 3)); // 28
