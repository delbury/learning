/**
 * 配对交换。
 * 编写程序，交换某个整数的奇数位和偶数位，尽量使用较少的指令（也就是说，位0与位1交换，位2与位3交换，以此类推）。
 *
 * 示例1:
 *  输入：num = 2（或者0b10）
 *  输出 1 (或者 0b01)
 *
 * 示例2:
 *  输入：num = 3
 *  输出：3
 *
 * 提示:
 * num的范围在[0, 2^30 - 1]之间，不会发生整数溢出。
 */

// 00 > 00, 11 > 11, 01 > 10, 10 > 01
//
const exchangeBits = function (num) {
  let res = num;
  let temp = num;
  let index = 0;
  while (temp) {
    // ...lr..
    let r = temp & 1;
    temp >>= 1;

    let l = temp & 1;
    temp >>= 1;

    res &= ~(3 << index);

    if (l) {
      res |= 1 << index;
    }

    if (r) {
      res |= 1 << (index + 1);
    }

    index += 2;
  }
  return res;
};

const { log, logAssert, logAssertDisorder } = require('../tools/LogTools.js');
logAssert(exchangeBits, 2, 1);
// logAssert(exchangeBits, 3, 3);
// logAssert(exchangeBits, 1, 2);
