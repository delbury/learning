/**
 * 对于字符串 s，每一位上的字符 s[i] 向后偏移斐波那契对应位上的数字位 f[i]
 * 字符串区分大小写，遇到 Z/z，返回 A/a
 * 斐波那契数：1, 1, 2, 3, 5, ...
 */

const gen = function *() {
  yield 1;
  yield 1;
  let prev = 1, res = 1;
  while(true) {
    [res, prev] = [res + prev, res];
    yield res;
  }
}
const fn = (string) => {
  const g = gen();
  let res = '';
  for(const s of string) {
    const small = /[a-z]/.test(s);
    const code = s.charCodeAt(0) - (small ? 97 : 65);
    const i = (g.next().value + code) % 26;
    res += String.fromCharCode(i + (small ? 97 : 65));
  }
  return res;
};

console.log(fn('uvwxyz'));
console.log(fn('ABcde'));
console.log(fn('abcdefghijkSAKJNKCJSAHDakfnkcxasdasdccccccasdasdasd'));
