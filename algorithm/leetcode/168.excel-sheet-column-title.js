/**
 * 给定一个正整数，返回它在 Excel 表中相对应的列名称。
 * 例如，
 *     1 -> A
 *     2 -> B
 *     3 -> C
 *     ...
 *     26 -> Z
 *     27 -> AA
 *     28 -> AB
 *     ...
 *
 * 示例 1:
 * 输入: 1
 * 输出: "A"
 *
 * 示例 2:
 * 输入: 28
 * 输出: "AB"
 *
 * 示例 3:
 * 输入: 701
 * 输出: "ZY"
 *
 *
 * @param {number} n
 * @return {string}
 */

// ACSII ---- A: 65, ..., Z: 90
// 1 ~ 26
const convertToTitle = function (n) {
  let string = '';

  while (n) {
    const cur = n % 26;
    if (cur === 0) {
      string = 'Z' + string;
      n = n / 26 - 1;
    } else {
      string = String.fromCharCode(cur + 64) + string;
      n = (n - cur) / 26;
    }
  }

  return string;
};

// 2.
const convertToTitleII = function (n) {
  let string = '';
  while (n > 0) {
    n--; // 将 1 ~ 26 的范围变为 0 ~ 25
    string = String.fromCharCode((n % 26) + 65) + string;
    n = Math.floor(n / 26);
  }
  return string;
};

// console.log(convertToTitle(1));
// console.log(convertToTitle(28));
console.log(convertToTitleII(701));
console.log(convertToTitleII(26));
console.log(convertToTitleII(26 * 26));
