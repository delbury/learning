/**
 * 有一只兔子，从出生后第3个月起每个月都生一只兔子，
 * 小兔子长到第三个月后每个月又生一只兔子，
 * 假如兔子都不死，问每个月的兔子总数为多少？
 */

const { print, createReadline } = require('./tools.js');
const readline = createReadline([
  '9'
]);

let n;
while(n = +readline()) {
  let m1 = 0, m2 = 0, m3 = 1;
  while(--n) {
    m1 = m1 + m2;
    m2 = m3;
    m3 = m1;
  }
  print(m1 + m2 + m3);
}