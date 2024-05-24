/**
 * 有效 IP 地址 正好由四个整数（每个整数位于 0 到 255 之间组成，且不能含有前导 0），整数之间用 '.' 分隔。
 * 例如："0.1.2.201" 和 "192.168.1.1" 是 有效 IP 地址，但是 "0.011.255.245"、"192.168.1.312" 和 "192.168@1.1" 是 无效 IP 地址。
 * 给定一个只包含数字的字符串 s ，用以表示一个 IP 地址，返回所有可能的有效 IP 地址，这些地址可以通过在 s 中插入 '.' 来形成。
 * 你 不能 重新排序或删除 s 中的任何数字。你可以按 任何 顺序返回答案。
 *
 * 示例 1：
 * 输入：s = "25525511135"
 * 输出：["255.255.11.135","255.255.111.35"]
 *
 * 示例 2：
 * 输入：s = "0000"
 * 输出：["0.0.0.0"]
 *
 * 示例 3：
 * 输入：s = "101023"
 * 输出：["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]
 *
 * 提示：
 * 1 <= s.length <= 20
 * s 仅由数字组成
 */

/**
 * @param {string} s
 * @return {string[]}
 */
const restoreIpAddresses = function (s) {
  const res = [];
  if (s.length > 12) return res;
  const fn = (arr, index) => {
    if (index >= s.length) {
      if (arr.length === 4) res.push(arr.join('.'));
      return;
    }

    let temp = s[index];
    // 个位数
    fn([...arr, temp], index + 1);
    if (+temp > 0 && index + 1 < s.length) {
      // 两位数
      // 10~99
      temp += s[index + 1];
      fn([...arr, temp], index + 2);
    }

    if (+temp > 9 && index + 2 < s.length) {
      // 三位数
      // 1xx, 200~255
      temp += s[index + 2];
      if (+temp > 255) return;
      fn([...arr, temp], index + 3);
    }
  };
  fn([], 0);
  return res;
};
const { log, logAssert, logAssertDisorder } = require('../tools/LogTools.js');
logAssert(restoreIpAddresses, '25525511135', ['255.255.11.135', '255.255.111.35']);
logAssertDisorder(restoreIpAddresses, '101023', ['1.0.10.23', '1.0.102.3', '10.1.0.23', '10.10.2.3', '101.0.2.3']);
