/**
 * 二进制手表顶部有 4 个 LED 代表 小时（0-11），底部的 6 个 LED 代表 分钟（0-59）。
 * 每个 LED 代表一个 0 或 1，最低位在右侧。
 * 
 * 例如，上面的二进制手表读取 “3:25”。
 * 给定一个非负整数 n 代表当前 LED 亮着的数量，返回所有可能的时间。
 *  
 * 示例：
 * 输入: n = 1
 * 返回: ["1:00", "2:00", "4:00", "8:00", "0:01", "0:02", "0:04", "0:08", "0:16", "0:32"]
 *  
 * 提示：
 * 输出的顺序没有要求。
 * 小时不会以零开头，比如 “01:00” 是不允许的，应为 “1:00”。
 * 分钟必须由两位数组成，可能会以零开头，比如 “10:2” 是无效的，应为 “10:02”。
 * 超过表示范围（小时 0-11，分钟 0-59）的数据将会被舍弃，也就是说不会出现 "13:00", "0:61" 等时间。
 * 
 * @param {number} turnedOn
 * @return {string[]}
 */

// 1. 计算 0~12:0~59 所有时间范围内所有组合的二进制 1 的个数是否与输入相同
const count = (n) => {
  let res = 0;
  while (n != 0) {
    n = n & (n - 1);
    res++;
  }
  return res;
}
var readBinaryWatch = function(turnedOn) {
  const res = [];
  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 60; j++) {
      if (count(i) + count(j) == turnedOn) {
        res.push(i + ':' + j.toString().padStart(2, '0'));
      }
    }
  }
  return res;
};

// 2. 回溯
const hours = [1, 2, 4, 8, 0, 0, 0, 0, 0, 0];
const minutes = [0, 0, 0, 0, 1, 2, 4, 8, 16, 32];
const dfs = (res, turnedOn, index, hour, minute) => {
  if (hour > 11 || minute > 59) {
    return; 
  } else if (turnedOn == 0) {
    // 构建时间，这里要注意后面 minute 可能需要补零
    let curr = hour + ':' + minute.toString().padStart(2, '0');
    res.push(curr);
    return;
  }
  // 最多选择是10
  for (let i = index; i < 10; ++i) {
    // 这里无需判断，而是直接去数组里取，无效时候就是0
    dfs(res, turnedOn - 1, i + 1, hour + hours[i], minute + minutes[i]);
  }
};
var readBinaryWatchII = function(turnedOn) {
  const res = [];
  dfs(res, turnedOn, 0, 0, 0);
  return res;
};

const { logAssert, logAssertDisorder } = require('./tools/LogTools.js');
logAssertDisorder(readBinaryWatchII, 1, ["1:00", "2:00", "4:00", "8:00", "0:01", "0:02", "0:04", "0:08", "0:16", "0:32"]);
