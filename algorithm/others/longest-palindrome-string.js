/**
 * 对于一个字符串，请设计一个高效算法，计算其中最长回文子串的长度。
 * 给定字符串A以及它的长度n，请返回最长回文子串的长度。
 * 
 * @param A string字符串 
 * @param n int整型 
 * @return int整型
 */

// 1. 中心扩散
function getLongestPalindromeI(A, n = A.length) {
  // write code here
  let max = 1;
  for(let i = 1; i < n - 1; i += 0.5) {
    let l = Math.ceil(i - 1), r = Math.floor(i + 1);
    let c = i === Math.floor(i) ? 1 : 0; // 奇数串，起始长度为 1
    while(l >= 0 && r < n) {
      if(A[l] === A[r]) {
        l--;
        r++;
        c += 2;
      } else {
        break;
      }
    }
    max = Math.max(max, c);
  }
  return max;
}

// 2. DP
// dp[l][r] 表示子串 l ~ r 是否是回文字符串
function getLongestPalindrome(A, n = A.length) {
  const dp = Array.from({ length: n }, (v, k1) => Array.from({ length: n }, (v, k2) => k1 === k2));
  let max = 1;
  for(let r = 1; r < n; r++) {
    for(let l = 0; l < r; l++) {
      if(r - l === 1) {
        dp[l][r] = A[l] === A[r];
      } else {
        dp[l][r] = A[l] === A[r] && dp[l + 1][r - 1];
      }
      if(dp[l][r]) {
        max = Math.max(max, r - l + 1);
      }
    }
  }
  return max;
}

console.log(getLongestPalindrome("abc1234321ab", 12));
console.log(getLongestPalindrome("baabccc", 7));