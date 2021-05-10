/**
 * 实现 strStr() 函数。
 * 给你两个字符串 haystack 和 needle ，请你在 haystack 字符串中找出 needle 字符串出现的第一个位置（下标从 0 开始）。如果不存在，则返回  -1 。
 * 
 * 说明：
 * 当 needle 是空字符串时，我们应当返回什么值呢？这是一个在面试中很好的问题。
 * 对于本题而言，当 needle 是空字符串时我们应当返回 0 。这与 C 语言的 strstr() 以及 Java 的 indexOf() 定义相符。
 * 
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */

// 1. 暴力遍历 O((n-m)*m)
var strStr = function(haystack, needle) {
  if(!needle) return 0;
  if(needle.length > haystack.length) return -1;
  for(let i = 0; i < haystack.length; i++) {
    let found = true;
    for(let j = 0; j < needle.length; j++) {
      if(haystack[i + j] !== needle[j]) {
        found = false;
        break;
      }
    }
    if(found) {
      return i;
    }
  }
  return -1;
};


// 2. KMP 算法
// next[i] 表示 P[0] ~ P[i] 这一个子串，使得 前k个字符恰等于后k个字符 的最大的k，前后缀不能和子串相等
// 所有要与甲匹配的字符串（称之为模式串），必须先自身匹配：对每个子字符串 [0...i]，算出其「相匹配的真前缀与真后缀中，最长的字符串的长度」。
var strStrII = function(haystack, needle) {
  const n = haystack.length, m = needle.length;
  if (m === 0) {
    return 0;
  }
  const pi = new Array(m).fill(0);
  for (let i = 1, j = 0; i < m; i++) {
    while (j > 0 && needle[i] !== needle[j]) {
      j = pi[j - 1];
    }
    if (needle[i] == needle[j]) {
      j++;
    }
    pi[i] = j;
  }
  for (let i = 0, j = 0; i < n; i++) {
    while (j > 0 && haystack[i] != needle[j]) {
      j = pi[j - 1];
    }
    if (haystack[i] == needle[j]) {
      j++;
    }
    if (j === m) {
      return i - m + 1;
    }
  }
  return -1;
};

// 3.
var strStrIII = function(haystack, needle) {
  if(!needle.length) return 0;
  if(haystack.length === needle.length) return haystack === needle ? 0 : -1;
  if(needle.length > haystack.length) return -1;

  // 计算 next 数组
  const next = new Uint16Array(needle.length); // 第一位为 0
  // i 为当前子字符串尾指针，j 为回溯指针
  for(let i = 1, j = 0; i < needle.length; i++) {
    while(j > 0 && needle[i] !== needle[j]) {
      // j 回溯
      j = next[j - 1];
    }
    if(needle[i] === needle[j]) {
      j++;
    }
    next[i] = j;
  }

  // 匹配原串
  for(let i = 0, j = 0; i < haystack.length; i++) {
    if(needle.length - haystack.length > j - i) break; // 优化未匹配时的计算
    // 不匹配则回溯
    while(j > 0 && haystack[i] !== needle[j]) {
      j = next[j - 1];
    }
    if(haystack[i] === needle[j]) {
      j++;
    }
    if(j === needle.length) {
      return i - needle.length + 1;
    }
  }

  return -1;
}

console.log(strStrIII('hello', 'llasdasdasd')); 