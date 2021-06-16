/**
 * 给定字符串 s 和 t ，判断 s 是否为 t 的子序列。
 * 字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。
 * （例如，"ace"是"abcde"的一个子序列，而"aec"不是）。
 * 
 * 进阶：
 * 如果有大量输入的 S，称作 S1, S2, ... , Sk 其中 k >= 10亿，你需要依次检查它们是否为 T 的子序列。
 * 在这种情况下，你会怎样改变代码？
 *  
 * 示例 1：
 * 输入：s = "abc", t = "ahbgdc"
 * 输出：true
 * 
 * 示例 2：
 * 输入：s = "axc", t = "ahbgdc"
 * 输出：false
 *  
 * 提示：
 * 0 <= s.length <= 100
 * 0 <= t.length <= 10^4
 * 两个字符串都只由小写字符组成。
 * 
 * 
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */

// 1. 双指针
var isSubsequence = function(s, t) {
  if(!s.length) return true;
  if(s.length > t.length) return false;
  let ps = 0, pt = 0;
  while(ps < s.length && pt < t.length) {
    if(s[ps] === t[pt]) {
      ps++;
      pt++;
    } else {
      pt++;
    }

    if(s.length - ps > t.length - pt) return false;
  }
  return true;
};

// 2. DP
// 令 f[i][j] 表示字符串 t 中从位置 i 开始往后字符 j 第一次出现的位置。
var isSubsequenceII = function(s, t) {
  if(!s.length) return true;
  if(s.length > t.length) return false;
  // 构造 dp 数组
  const dp = Array.from({ length: t.length + 1 }, (v, k) => k === t.length ? Array(26).fill(-1) : []);
  for(let i = t.length - 1; i >= 0; i--) {
    for(let j = 0; j < 26; j++) {
      if(t[i] === String.fromCharCode(j + 97)) {
        dp[i][j] = i;
      } else {
        dp[i][j] = dp[i + 1][j];
      }
    }
  }
  let p = 0;
  for(let i = 0; i < s.length; i++) {
    p = dp[p][s[i].charCodeAt(0) - 97];
    if(p < 0) return false;
    p++;
  }
  return true;
};

const { logAssert } = require('./tools/LogTools.js');
logAssert(isSubsequenceII, 'abc', 'ahbgdc', true);
logAssert(isSubsequenceII, 'axc', 'ahbgdc', false);
logAssert(isSubsequenceII, 'c', 'b', false);
logAssert(isSubsequenceII, 'aaaaaa', 'bbaaaa', false);
logAssert(isSubsequenceII, 'bb', 'ahbgdc', false);

