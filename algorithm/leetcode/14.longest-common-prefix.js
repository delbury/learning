/**
 * 编写一个函数来查找字符串数组中的最长公共前缀。
 * 如果不存在公共前缀，返回空字符串 ""。
 *  
 * 示例 1：
 * 输入：strs = ["flower","flow","flight"]
 * 输出："fl"
 * 
 * 示例 2：
 * 输入：strs = ["dog","racecar","car"]
 * 输出：""
 * 解释：输入不存在公共前缀。
 *  
 * 提示：
 * 0 <= strs.length <= 200
 * 0 <= strs[i].length <= 200
 * strs[i] 仅由小写英文字母组成
 * 
 * @param {string[]} strs
 * @return {string}
 */

// 1. 遍历
var longestCommonPrefixI = function(strs) {
  if(strs.length < 2) return strs[0] || '';
  let prefix = strs[0];
  for(let i = 1; i < strs.length; i++) {
    if(!prefix) break;
    let m = 0;
    let n = 0;
    while(m < prefix.length && n < strs[i].length) {
      if(prefix[m] === strs[i][n]) {
        m++;
        n++;
      } else {
        break;
      }
    }
    prefix = prefix.substr(0, m);
  }
  return prefix;
};

// 2. 排序后比较头尾的公共前后缀
var longestCommonPrefixII = function(strs) {
  const len = strs.length;
  if(len === 0) return '';
  strs.sort();
  let str = '';
  for(let i = 0, l = strs[0].length; i < l; i++) {
    if(strs[0][i] !== strs[len - 1][i]) {
      break;
    }
    str += strs[0][i];
  }
  return str;
};

// 3. 优化 2.
var longestCommonPrefix = function(strs) {
  if(!strs.length) return '';
  strs.sort();
  let p = 0;
  while(p < strs[0].length) {
    if(strs[0][p] !== strs[strs.length - 1][p]) break;
    p++;
  }
  return strs[0].substr(0, p);
};