/**
 * 小扣注意到秋日市集上有一个创作黑白方格画的摊位。摊主给每个顾客提供一个固定在墙上的白色画板，画板不能转动。
 * 画板上有 n * n 的网格。绘画规则为，小扣可以选择任意多行以及任意多列的格子涂成黑色，所选行数、列数均可为 0。
 * 小扣希望最终的成品上需要有 k 个黑色格子，请返回小扣共有多少种涂色方案。
 * 注意：两个方案中任意一个相同位置的格子颜色不同，就视为不同的方案。
 * 
 * 示例 1：
 * 输入：n = 2, k = 2
 * 输出：4
 * 解释：一共有四种不同的方案：
 * 第一种方案：涂第一列；
 * 第二种方案：涂第二列；
 * 第三种方案：涂第一行；
 * 第四种方案：涂第二行。
*
 * 示例 2：
 * 输入：n = 2, k = 1
 * 输出：0
 * 解释：不可行，因为第一次涂色至少会涂两个黑格。
*
 * 示例 3：
 * 输入：n = 2, k = 4
 * 输出：1
 * 解释：共有 2*2=4 个格子，仅有一种涂色方案。
 * 
 * 限制：
 * 1 <= n <= 6
 * 0 <= k <= n * n

 * @param {number} n
 * @param {number} k
 * @return {number}
 */

// 1. 遍历，排列组合 Cn^m
const cnm = function (n, m) {
  let res = 1;
  for (let i = n; i > n - m; i--) {
    res *= i;
  }
  for (let i = 1; i <= m; i++) {
    res /= i;
  }
  return res;
};

var paintingPlan = function (n, k) {
  if (n ** 2 === k) return 1;
  let res = 0;

  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= n; j++) {
      if (i * n + j * n - i * j === k) res += cnm(n, i) * cnm(n, j);
    }
  }

  return res;
};

// console.log(paintingPlan(2, 2));
// console.log(paintingPlan(2, 1));
console.log(paintingPlan(2, 4));
// console.log(paintingPlan(3, 8));
