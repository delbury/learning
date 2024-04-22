/**
 * 有重复字符串的排列组合。
 * 编写一种方法，计算某字符串的所有排列组合。
 *
 * 示例1:
 *  输入：S = "qqe"
 *  输出：["eqq","qeq","qqe"]
 *
 * 示例2:
 *  输入：S = "ab"
 *  输出：["ab", "ba"]
 *
 * 提示:
 * 字符都是英文字母。
 * 字符串长度在[1, 9]之间。
 */

const permutation = function (S) {
  const res = new Set();
  const fn = (set) => {
    if (set.size === S.length) {
      res.add([...set].map((i) => S[i]).join(''));
      return;
    }
    for (let i = 0; i < S.length; i++) {
      if (!set.has(i)) {
        fn(new Set([...set, i]));
      }
    }
  };
  fn(new Set());
  return [...res];
};

// 全排列，交换
const permutation2 = function (S) {
  const res = [];
  const arr = S.split('').sort();
  const fn = (index) => {
    if (index === arr.length) {
      res.push(arr.join(''));
      return;
    }
    for (let j = index; j < arr.length; j++) {
      // 重复字符就跳过
      let ind = -1;
      for (let i = index; i < j; i++) {
        if (arr[i] === arr[j]) {
          ind = i;
          break;
        }
      }
      if (ind < j && ind >= index) continue;

      [arr[j], arr[index]] = [arr[index], arr[j]];
      fn(index + 1);
      [arr[j], arr[index]] = [arr[index], arr[j]];
    }
  };
  fn(0);
  return res;
};

const { log, logAssert, logAssertDisorder } = require('../tools/LogTools.js');
// logAssertDisorder(permutation, 'qqe', ['eqq', 'qeq', 'qqe']);
// logAssertDisorder(permutation2, 'qqe', ['eqq', 'qeq', 'qqe']);
// logAssertDisorder(permutation2, 'BBBII', []);
// logAssertDisorder(permutation, 'jawaLR', permutation(BIIL));
// logAssertDisorder(permutation2, 'IILs', permutation('IILs'));
logAssertDisorder(permutation2, 'WWWW', permutation('WWWW'));
// logAssertDisorder(permutation2, 'IIIIBB', [
//   'BBIIII',
//   'BIBIII',
//   'BIIBII',
//   'BIIIBI',
//   'BIIIIB',
//   'IBBIII',
//   'IBIBII',
//   'IBIIBI',
//   'IBIIIB',
//   'IIBBII',
//   'IIBIBI',
//   'IIBIIB',
//   'IIIBBI',
//   'IIIBIB',
//   'IIIIBB',
// ]);
