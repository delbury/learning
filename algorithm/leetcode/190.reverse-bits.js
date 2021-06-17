/**
 * 颠倒给定的 32 位无符号整数的二进制位。
 * 
 * 提示：
 * 请注意，在某些语言（如 Java）中，没有无符号整数类型。
 * 在这种情况下，输入和输出都将被指定为有符号整数类型，并且不应影响您的实现，因为无论整数是有符号的还是无符号的，其内部的二进制表示形式都是相同的。
 * 在 Java 中，编译器使用二进制补码记法来表示有符号整数。
 * 因此，在上面的 示例 2 中，输入表示有符号整数 -3，输出表示有符号整数 -1073741825。
 *  
 * 进阶:
 * 如果多次调用这个函数，你将如何优化你的算法？
 * 
 * 示例 1：
 * 输入: 00000010100101000001111010011100
 * 输出: 00111001011110000010100101000000
 * 解释: 输入的二进制串 00000010100101000001111010011100 表示无符号整数 43261596，
 *     因此返回 964176192，其二进制表示形式为 00111001011110000010100101000000。
 * 
 * 示例 2：
 * 输入：11111111111111111111111111111101
 * 输出：10111111111111111111111111111111
 * 解释：输入的二进制串 11111111111111111111111111111101 表示无符号整数 4294967293，
 *      因此返回 3221225471 其二进制表示形式为 10111111111111111111111111111111 。
 * 
 * 示例 1：
 * 输入：n = 00000010100101000001111010011100
 * 输出：964176192 (00111001011110000010100101000000)
 * 解释：输入的二进制串 00000010100101000001111010011100 表示无符号整数 43261596，
 *     因此返回 964176192，其二进制表示形式为 00111001011110000010100101000000。
 * 
 * 示例 2：
 * 输入：n = 11111111111111111111111111111101
 * 输出：3221225471 (10111111111111111111111111111111)
 * 解释：输入的二进制串 11111111111111111111111111111101 表示无符号整数 4294967293，
 *     因此返回 3221225471 其二进制表示形式为 10111111111111111111111111111111 。
 *  
 * 提示：
 * 输入是一个长度为 32 的二进制字符串
 * 
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */

// 1.
var reverseBitsI = function(n) {
  let res = 0;
  for(let i = 0; i < 32; i++) {
    res *= 2;
    res += n & 1;
    n >>>= 1;
  }
  return res;
};

// 2. 分组
var reverseBits = function(n) {
  n = ((n >>> 1) & 0x5555_5555) | ((n & 0x5555_5555) << 1);
  n = ((n >>> 2) & 0x3333_3333) | ((n & 0x3333_3333) << 2);
  n = ((n >>> 4) & 0x0f0f_0f0f) | ((n & 0x0f0f_0f0f) << 4);
  n = ((n >>> 8) & 0x00ff_00ff) | ((n & 0x00ff_00ff) << 8);
  n = ((n >>> 16) & 0x0000_ffff) | ((n & 0x0000_ffff) << 16);
  n >>>= 0; // 会将值先转换成 32 位无符号整数
  return n;
};

const { logAssert } = require('./tools/LogTools.js');
logAssert(reverseBits, 43261596, 964176192);
logAssert(reverseBits, 4294967293, 3221225471);