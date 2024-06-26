/**
 * 给你一个字符串 s 和一个字符串列表 wordDict 作为字典。请你判断是否可以利用字典中出现的单词拼接出 s 。
 * 注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。
 *
 * 示例 1：
 * 输入: s = "leetcode", wordDict = ["leet", "code"]
 * 输出: true
 * 解释: 返回 true 因为 "leetcode" 可以由 "leet" 和 "code" 拼接成。
 *
 * 示例 2：
 * 输入: s = "applepenapple", wordDict = ["apple", "pen"]
 * 输出: true
 * 解释: 返回 true 因为 "applepenapple" 可以由 "apple" "pen" "apple" 拼接成。
 *      注意，你可以重复使用字典中的单词。
 *
 * 示例 3：
 * 输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
 * 输出: false
 *
 * 提示：
 * 1 <= s.length <= 300
 * 1 <= wordDict.length <= 1000
 * 1 <= wordDict[i].length <= 20
 * s 和 wordDict[i] 仅有小写英文字母组成
 * wordDict 中的所有字符串 互不相同
 */

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
const _wordBreak = function (s, wordDict) {
  // 遍历
  const wdSet = new Set();
  for (const w of wordDict) {
    wdSet.add(w);
    for (const t of wdSet) {
      if (w === t || w.length === t.length) continue;
      const long = w.length > t.length ? w : t;
      const short = w.length < t.length ? w : t;
      if (long.length % short.length !== 0) continue;
      if (short.repeat(long.length / short.length) === long) {
        wdSet.delete(long);
      }
    }
  }

  console.log(wdSet);

  const fn = (start) => {
    if (start === s.length) return true;
    for (const w of wdSet) {
      let temp = start;
      let flag = true;
      for (let i = 0; i < w.length; i++) {
        const index = temp + i;
        if (index >= s.length || w[i] !== s[index]) {
          flag = false;
          break;
        }
      }
      if (flag) {
        temp += w.length;
        const res = fn(temp);
        if (res) return res;
      }
    }
    return false;
  };
  return fn(0);
};

const wordBreak = (s, wd) => {
  // dp
  // dp[i] index为0~i的子串是否为word结尾，并且 dp[i - word.length]为true或者i - word.length < 0
  const dp = [];
  for (let i = 0; i < s.length; i++) {
    for (const w of wd) {
      if (dp[i]) break;
      dp[i] = s.substring(0, i + 1).endsWith(w) && (i - w.length < 0 ? true : dp[i - w.length]);
    }
  }
  return dp[s.length - 1];
};

const { log, logAssert, logAssertDisorder, r } = require('../tools/LogTools.js');
logAssert(wordBreak, 'applepenapple', ['apple', 'pen'], true);
logAssert(wordBreak, 'catsandog', ['cats', 'dog', 'sand', 'and', 'cat'], false);
logAssert(wordBreak, 'aaaaaaaaaaaaaaaaaaaaaaaaab', ['a', 'aa', 'aaa', 'aaaa'], false);
logAssert(
  wordBreak,
  'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab',
  ['a', 'aa', 'aaa', 'aaaa', 'aaaaa', 'aaaaaa', 'aaaaaaa', 'aaaaaaaa', 'aaaaaaaaa', 'aaaaaaaaaa'],
  false
);
logAssert(
  wordBreak,
  '"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabaabaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"',
  ['aa', 'aaa', 'aaaa', 'aaaaa', 'aaaaaa', 'aaaaaaa', 'aaaaaaaa', 'aaaaaaaaa', 'aaaaaaaaaa', 'ba'],
  false
);
