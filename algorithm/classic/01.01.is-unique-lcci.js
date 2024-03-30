/**
 * 实现一个算法，确定一个字符串 s 的所有字符是否全都不同。
 *
 * 示例 1：
 * 输入: s = "leetcode"
 * 输出: false
 *
 * 示例 2：
 * 输入: s = "abc"
 * 输出: true
 * 限制：
 *
 * 0 <= len(s) <= 100
 * s[i]仅包含小写字母
 * 如果你不使用额外的数据结构，会很加分。
 */

const tools = require('../tools/LogTools');

// 利用 int32 来存是否重复
const isUnique = (str) => {
  if (str.length <= 1) return true;
  if (str.length > 26) return false;
  let flags = 0;
  for (let i = 0; i < str.length; i++) {
    const charCodeIndex = str.charCodeAt(i) - 97;
    const flag = 1 << charCodeIndex;
    if (flags & flag) return false;
    flags |= flag;
  }
  return true;
};

tools.logAssert(isUnique, 'leetcode', false);
tools.logAssert(isUnique, 'abc', true);
