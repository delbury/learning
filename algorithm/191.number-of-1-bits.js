/**
 * 编写一个函数，输入是一个无符号整数（以二进制串的形式），返回其二进制表达式中数字位数为 '1' 的个数（也被称为汉明重量）。
 * 提示：
 * 请注意，在某些语言（如 Java）中，没有无符号整数类型。
 * 在这种情况下，输入和输出都将被指定为有符号整数类型，并且不应影响您的实现，因为无论整数是有符号的还是无符号的，其内部的二进制表示形式都是相同的。
 * 在 Java 中，编译器使用二进制补码记法来表示有符号整数。因此，在上面的 示例 3 中，输入表示有符号整数 -3。
 * 
 * 提示：
 * 输入必须是长度为 32 的 二进制串 。
 * 
 * @param {number} n - a positive integer
 * @return {number}
 */

// 1. 按位计数
var hammingWeightI = function(n) {
  let count = 0;
  while(n) {
    count += n & 1;
    n >>>= 1;
  }
  return count;
};

// 2. 统计最后一个 1
var hammingWeightII = function(n) {
  let count = 0;
  while(n) {
    n &= n - 1;
    count++;
  }
  return count;
};

// 3. 计算字符串 1 的个数
var hammingWeightIII = function(n) {
  return Array.from(n.toString(2)).reduce((sum, bit) => sum + +bit, 0);
};

// 4. 分组计算，log2(bits) 组，即 log2(32) = 5 组
var hammingWeight = function(n) {
  n = (n & 0x5555_5555) + (n >>> 1 & 0x5555_5555);
  n = (n & 0x3333_3333) + (n >>> 2 & 0x3333_3333);
  n = (n & 0x0f0f_0f0f) + (n >>> 4 & 0x0f0f_0f0f);
  n = (n & 0x00ff_00ff) + (n >>> 8 & 0x00ff_00ff);
  n = (n & 0x0000_ffff) + (n >>> 16 & 0x0000_ffff);
  return n;
};