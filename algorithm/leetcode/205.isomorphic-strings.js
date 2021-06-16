/**
 * 给定两个字符串 s 和 t，判断它们是否是同构的。
 * 如果 s 中的字符可以被替换得到 t ，那么这两个字符串是同构的。
 * 所有出现的字符都必须用另一个字符替换，同时保留字符的顺序。两个字符不能映射到同一个字符上，但字符可以映射自己本身。
 * 示例 1:
 * 输出: true
 * 示例 2:
 * 输入: s = "foo", t = "bar"
 * 输出: false
 * 示例 3:
 * 输入: s = "paper", t = "title"
 * 输出: true
 *
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */

// 双哈希表
// var isIsomorphic = function (s, t) {
//   if (s.length !== t.length) return false;

//   const tempst = {};
//   const tempts = {};

//   for (let i = 0; i < s.length; i++) {
//     if (!tempst[s[i]]) {
//       tempst[s[i]] = t[i]
//     } else if (tempst[s[i]] !== t[i]) {
//       return false
//     }

//     if (!tempts[t[i]]) {
//       tempts[t[i]] = s[i]
//     } else if (tempts[t[i]] !== s[i]) {
//       return false
//     }
//   }

//   return true;
// };

// 三方法
var isIsomorphic = function (s, t) {
  if (s.length !== t.length) return false;
  const temps = {};
  const tempt = {};

  for (let i = 0; i < s.length; i++) {
    if (temps[s[i]] !== tempt[t[i]]) {
      return false
    } else {
      if(temps[s[i]] === undefined) {
        temps[s[i]] = i + 1;
        tempt[t[i]] = i + 1;
      }
    }
  }

  return true;
} 


console.log(isIsomorphic('ab', 'aa'));
console.log(isIsomorphic('aba', 'baa'));
// console.log(isIsomorphic('egg', 'add'));
// console.log(isIsomorphic('paper', 'title'));
