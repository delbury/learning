/**
 * 给定两个字符串str1和str2，输出两个字符串的最长公共子序列。
 * 如果最长公共子序列为空，则返回"-1"。目前给出的数据，仅仅会存在一个最长的公共子序列
 * 
 * longest common subsequence
 * @param s1 string字符串 the string
 * @param s2 string字符串 the string
 * @return string字符串
 */
// 1. dp 保存字符串
function LCSI( s1 ,  s2 ) {
  // write code here
  if(!s1 || !s2) return -1;
  const dp = Array.from({ length: s1.length + 1 }, () => Array(s2.length + 1).fill(''));
  for(let i = 1; i <= s1.length; i++) {
    for(let j = 1; j <= s2.length; j++) {
      if(s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + s1[i - 1];
      } else {
        dp[i][j] = dp[i - 1][j].length > dp[i][j - 1].length ? dp[i - 1][j] : dp[i][j - 1]
      }
    }
  }
  return dp[s1.length][s2.length] || -1;
}

// 2. dp 保存长度
function LCS( s1 ,  s2 ) {
  // write code here
  if(!s1 || !s2) return -1;
  const dp = Array.from({ length: s1.length + 1 }, () => Array(s2.length + 1).fill(0));
  for(let i = 1; i <= s1.length; i++) {
    for(let j = 1; j <= s2.length; j++) {
      if(s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  if(!dp[s1.length][s2.length]) return -1;
  let res = '';
  // 还原最大子序列字符串，找到 s1[i] === s2[j] 的字符
  let i = s1.length, j = s2.length, cur = dp[s1.length][s2.length];
  while(cur) {
    while(true) {
      if(dp[i - 1][j] === cur) i--;
      if(dp[i][j - 1] === cur) j--;
      if(dp[i - 1][j] !== cur && dp[i][j - 1] !== cur) break
    }
    res = s1[i - 1] + res;
    cur--;
  }
  return res;
}

module.exports = {
  LCS : LCS
};

const { logAssert } = require('../tools/LogTools.js');
// logAssert(LCS, "1A2C3D4B56", "B1D23A456A", '123456');
logAssert(LCS, "1a1a31","1a231", '1a31');