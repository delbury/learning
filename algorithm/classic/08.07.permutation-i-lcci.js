/**
 * 无重复字符串的排列组合。
 * 编写一种方法，计算某字符串的所有排列组合，字符串每个字符均不相同。
 *
 * 示例1:
 *  输入：S = "qwe"
 *  输出：["qwe", "qew", "wqe", "weq", "ewq", "eqw"]
 *
 * 示例2:
 *  输入：S = "ab"
 *  输出：["ab", "ba"]
 *
 * 提示:
 * 字符都是英文字母。
 * 字符串长度在[1, 9]之间。
 */

const permutation = (S) => {
  const res = [];
  const fn = (set) => {
    if (set.size === S.length) {
      res.push([...set].join(''));
      return;
    }
    for (let i = 0; i < S.length; i++) {
      if (!set.has(S[i])) {
        fn(new Set([...set, S[i]]));
      }
    }
  };
  fn(new Set([]));
  return res;
};

// 全排列，交换
const permutation2 = (S) => {
  const res = [];
  const arr = S.split('');
  const fn = (index) => {
    if (index === arr.length) {
      res.push(arr.join(''));
      return;
    }
    for (let j = index; j < arr.length; j++) {
      [arr[j], arr[index]] = [arr[index], arr[j]];
      fn(index + 1);
      [arr[j], arr[index]] = [arr[index], arr[j]];
    }
  };
  fn(0);
  return res;
};

const { log, logAssert, logAssertDisorder } = require('../tools/LogTools.js');
logAssertDisorder(permutation2, 'qwe', ['qwe', 'qew', 'wqe', 'weq', 'ewq', 'eqw']);
logAssertDisorder(permutation2, 'ab', ['ab', 'ba']);
