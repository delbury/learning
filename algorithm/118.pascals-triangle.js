/**
 * 给定一个非负整数 numRows，生成杨辉三角的前 numRows 行。
 * 
 * 在杨辉三角中，每个数是它左上方和右上方的数的和。
 * 
 * 示例:
 * 输入: 5
 * 输出:
 * [
 *     [1],
 *     [1,1],
 *   [1,2,1],
 *   [1,3,3,1],
 * [1,4,6,4,1]
 * ]
 * 
 * 
 * @param {number} numRows
 * @return {number[][]}
 */

// 1. 遍历
var generateII = function (numRows) {
  const res = [];

  for (let i = 1; i <= numRows; i++) {
    if (i === 1) {
      res.push([i]);
    } else if (i === 2) {
      res.push([1, 1]);
    } else {
      const row = [];
      for (let j = 0; j < i; j++) {
        if (j === 0 || j === i - 1) {
          row.push(1);
        } else {
          row.push(res[i - 2][j - 1] + res[i - 2][j]);
        }
      }
      res.push(row);
    }
  }

  return res;
};

// 利用前一行
var generate = function(numRows) {
  const res = [];
  for(let i = 0; i < numRows; i++) {
    if(i === 0) {
      res.push([1]);
    } else {
      const t = [];
      const last = res[res.length - 1];
      for(let j = 0; j <= last.length; j++) {
        t.push((last[j - 1] || 0) + (last[j] || 0));
      }
      res.push(t);
    }
  }
  return res;
};

console.log(generate(6));