/**
 * 给定一个单词，你需要判断单词的大写使用是否正确。
 * 我们定义，在以下情况时，单词的大写用法是正确的：
 * 全部字母都是大写，比如"USA"。
 * 单词中所有字母都不是大写，比如"leetcode"。
 * 如果单词不只含有一个字母，只有首字母大写， 比如 "Google"。
 * 否则，我们定义这个单词没有正确使用大写字母。
 * 
 * 示例 1:
 * 输入: "USA"
 * 输出: True
 * 
 * 示例 2:
 * 输入: "FlaG"
 * 输出: False
 * 注意: 输入是由大写和小写拉丁字母组成的非空单词。
 * 
 * @param {string} word
 * @return {boolean}
 */
var detectCapitalUse = function(word) {
  if(word.length <= 1) return true;
  const reg = /[A-Z]/;
  let fui = -1;
  for(let i = 0; i < word.length; i++) {
    if(reg.test(word[i])) {
      if(i === 0 || (fui !== -1 && i - fui <= 1)) {
        fui = i;
      } else {
        return false;
      }
    } else if(fui > 0) {
      return false;
    }
  }
  return true;
};

const { logAssert } = require('./tools/LogTools.js');
logAssert(detectCapitalUse, 'a', true);
logAssert(detectCapitalUse, 'A', true);
logAssert(detectCapitalUse, 'ABC', true);
logAssert(detectCapitalUse, 'Abc', true);
logAssert(detectCapitalUse, 'ABc', false);
logAssert(detectCapitalUse, 'abc', true);
logAssert(detectCapitalUse, 'mL', false);
