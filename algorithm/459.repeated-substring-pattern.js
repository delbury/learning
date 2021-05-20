/**
 * 给定一个非空的字符串，判断它是否可以由它的一个子串重复多次构成。
 * 给定的字符串只含有小写英文字母，并且长度不超过10000。
 * 
 * 示例 1:
 * 输入: "abab"
 * 输出: True
 * 解释: 可由子字符串 "ab" 重复两次构成。
 * 
 * 示例 2:
 * 输入: "aba"
 * 输出: False
 * 
 * 示例 3:
 * 输入: "abcabcabcabc"
 * 输出: True
 * 解释: 可由子字符串 "abc" 重复四次构成。 (或者子字符串 "abcabc" 重复两次构成。)
 * 
 * 
 * @param {string} s
 * @return {boolean}
 */

// 1. 头尾指针寻找最短相同子串
var repeatedSubstringPatternI = function(s) {
  let ps = 0, pe = s.length - 1;
  let ss = '', se = '';
  while(ps < pe) {
    while(ss.length < Math.floor(s.length / 2)) {
      ss = ss + s[ps];
      se = s[pe] + se;
      ps++;
      pe--;
      // 首尾相等
      if(ss === se) {
        if(ps > pe) return true;
        if((ps === pe && ss.length !== 1) || (pe - ps + 1) % ss.length !== 0) break;
        let isBreak = false;
        for(let i = ps; i <= pe; i += ss.length) {
          if(ss !== s.substr(i, ss.length)) {
            isBreak = true;
            break;
          }
        }
        if(isBreak) break;
        return true;
      }
    }
  }
  return false;
};

// 2. s2 = s + s
// s2.indexOf(s, 1) > -1
var repeatedSubstringPatternII = function(s) {
  return (s + s).indexOf(s, 1) !== s.length;
};


// 3. KMP
const kmp = (m, p, start = 0) => {
  if(!m || m.length < p.length) return -1;
  const next = [0];
  for(let i = 1, j = 0; i < p.length; i++) {
    while(j > 0 && p[j] !== p[i]) j = next[j - 1];
    if(p[j] === p[i]) j++;
    next[i] = j;
  }
  for(let i = start, j = 0; i < m.length; i++) {
    while(j > 0 && m[i] !== p[j]) j = next[j - 1];
    if(m[i] === p[j]) j++;
    if(j === p.length) return i - p.length + 1;
  }
  return -1;
};
var repeatedSubstringPatternIII = function(s) {
  return kmp(s + s, s, 1) !== s.length;
};


// 4. KMP 优化
var repeatedSubstringPattern = function(s) {
  const next = [0];
  for(let i = 1, j = 0; i < s.length; i++) {
    while(j > 0 && s[j] !== s[i]) j = next[j - 1];
    if(s[j] === s[i]) j++;
    next[i] = j;
  }
  return next[s.length - 1] !== 0 && s.length % (s.length - next[s.length - 1]) === 0;
};

const { logAssert } = require('./tools/LogTools.js');
logAssert(repeatedSubstringPattern, 'abab', true);
logAssert(repeatedSubstringPattern, 'ababc', false);
logAssert(repeatedSubstringPattern, 'abcab', false);
logAssert(repeatedSubstringPattern, 'ababab', true);
logAssert(repeatedSubstringPattern, 'abacbab', false);
logAssert(repeatedSubstringPattern, 'aabaaba', false);
logAssert(repeatedSubstringPattern, 'abaababaab', true);
logAssert(repeatedSubstringPattern, 'zzz', true);
logAssert(repeatedSubstringPattern, 'aba', false);

// let arr = Array.from({ length: 10001 }, (v, k) => k);
// arr[1] = 0;
// for(let i = 2; i < arr.length; i++) {
//   if(arr[i] === 0) continue;
//   for(let j = i * 2; j < arr.length; j += i) {
//     arr[j] = 0;
//   }
// }
// arr = arr.filter(n => n !== 0);
