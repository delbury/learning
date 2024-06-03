/**
 * 给定一个非负索引 k，其中 k ≤ 33，返回杨辉三角的第 k 行。
 *
 * 在杨辉三角中，每个数是它左上方和右上方的数的和。
 *
 * 示例:
 * 输入: 3
 * 输出: [1,3,3,1]
 *
 * 进阶：
 * 你可以优化你的算法到 O(k) 空间复杂度吗？
 *
 * @param {number} rowIndex
 * @return {number[]}
 */

// 1. 递归
const getRow = function (rowIndex) {
  if (rowIndex === 0) return [1];
  if (rowIndex === 1) return [1, 1];

  const res = [1];
  const prev = getRow(rowIndex - 1);
  for (let i = 1; i < rowIndex; i++) {
    res.push(prev[i - 1] + prev[i]);
  }
  res.push(1);
  return res;
};

// 2. 原地
const getRowII = function (rowIndex) {
  if (rowIndex === 0) return [1];
  if (rowIndex === 1) return [1, 1];

  const res = [1, 1];
  let count = 2;
  while (count <= rowIndex) {
    for (let i = 0; i < count - 1; i++) {
      res[i] = res[i] + res[i + 1];
    }
    res.unshift(1);

    count++;
  }
  return res;
};

// 2024.6.3
const getRow3 = function (rowIndex) {
  let res = [];
  for (let r = 0; r <= rowIndex; r++) {
    let prev = res[0];
    for (let c = 1; c < r; c++) {
      const t = res[c];
      res[c] += prev;
      prev = t;
    }
    res.push(1);
  }
  return res;
};

console.log(getRowII(3));
