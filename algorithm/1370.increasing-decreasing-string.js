/**
 * 给你一个字符串 s ，请你根据下面的算法重新构造字符串：
 *  1. 从 s 中选出 最小 的字符，将它 接在 结果字符串的后面。
 *  2. 从 s 剩余字符中选出 最小 的字符，且该字符比上一个添加的字符大，将它 接在 结果字符串后面。
 *  3. 重复步骤 2 ，直到你没法从 s 中选择字符。
 *  4. 从 s 中选出 最大 的字符，将它 接在 结果字符串的后面。
 *  5. 从 s 剩余字符中选出 最大 的字符，且该字符比上一个添加的字符小，将它 接在 结果字符串后面。
 *  6. 重复步骤 5 ，直到你没法从 s 中选择字符。
 *  7. 重复步骤 1 到 6 ，直到 s 中所有字符都已经被选过。
 * 
 * 在任何一步中，如果最小或者最大字符不止一个 ，你可以选择其中任意一个，并将其添加到结果字符串。
 * 请你返回将 s 中字符重新排序后的 结果字符串 。
 *  
 * 示例 1：
 * 输入：s = "aaaabbbbcccc"
 * 输出："abccbaabccba"
 * 解释：第一轮的步骤 1，2，3 后，结果字符串为 result = "abc"
 * 第一轮的步骤 4，5，6 后，结果字符串为 result = "abccba"
 * 第一轮结束，现在 s = "aabbcc" ，我们再次回到步骤 1
 * 第二轮的步骤 1，2，3 后，结果字符串为 result = "abccbaabc"
 * 第二轮的步骤 4，5，6 后，结果字符串为 result = "abccbaabccba"
 * 
 * 示例 2：
 * 输入：s = "rat"
 * 输出："art"
 * 解释：单词 "rat" 在上述算法重排序以后变成 "art"
 * 
 * 示例 3：
 * 输入：s = "leetcode"
 * 输出："cdelotee"
 * 
 * 示例 4：
 * 输入：s = "ggggggg"
 * 输出："ggggggg"
 * 
 * 示例 5：
 * 输入：s = "spo"
 * 输出："ops"
 *  
 * 提示：
 * 1 <= s.length <= 500
 * s 只包含小写英文字母。
 * 
 * 
 * @param {string} s
 * @return {string}
 */

// 1. 排序
var sortString = function (s) {
  const arr = s.split('').sort();
  let res = '';
  while (arr.length) {
    let last = '';
    // 升序
    let p = 0;
    while (p < arr.length) {
      if (!last || arr[p] > last) {
        last = arr[p];
        res += last;
        arr.splice(p, 1);
        p--;
      }
      p++;
    }

    // 降序
    last = '';
    p = arr.length - 1;
    while (p >= 0) {
      if (!last || arr[p] < last) {
        last = arr[p];
        res += last;
        arr.splice(p, 1);
        p++;
      }
      p--;
    }
  }

  return res;
};

// 2. 桶计数
var sortStringII = function (s) {
  const arr = Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    arr[s.charCodeAt(i) - 97]++;
  }
  let res = '';
  while (res.length < s.length) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]) {
        res += String.fromCharCode(i + 97);
        arr[i]--;
      }
    }

    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i]) {
        res += String.fromCharCode(i + 97);
        arr[i]--;
      }
    }
  }

  return res;
};

// 3. 方法2代码压缩
var sortStringII_compress = function (s) {
  const arr = Array(26).fill(0);
  for (let i = 0; i < s.length; i++) arr[s.charCodeAt(i) - 97]++;
  let res = '';
  while (res.length < s.length) {
    for (let i = 0; i < arr.length; i++) if (arr[i]) res += String.fromCharCode(i + 97), arr[i]--;
    for (let i = arr.length - 1; i >= 0; i--) if (arr[i]) res += String.fromCharCode(i + 97), arr[i]--;
  }
  return res;
};

const { logAssert } = require('./tools/LogTools.js');
logAssert(sortStringII_compress, 'aaaabbbbcccc', 'abccbaabccba');
logAssert(sortStringII_compress, 'leetcode', 'cdelotee');
logAssert(sortStringII_compress, 'ggggggg', 'ggggggg');
logAssert(sortStringII_compress, 'rat', 'art');
