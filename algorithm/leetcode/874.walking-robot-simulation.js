/**
 * 机器人在一个无限大小的网格上行走，从点 (0, 0) 处开始出发，面向北方。
 * 该机器人可以接收以下三种类型的命令：
 * -2：向左转 90 度
 * -1：向右转 90 度
 * 1 <= x <= 9：向前移动 x 个单位长度
 * 
 * 在网格上有一些格子被视为障碍物。
 * 第 i 个障碍物位于网格点  (obstacles[i][0], obstacles[i][1])
 * 机器人无法走到障碍物上，它将会停留在障碍物的前一个网格方块上，但仍然可以继续该路线的其余部分。
 * 返回从原点到机器人所有经过的路径点（坐标为整数）的最大欧式距离的平方。
 *  
 * 示例 1：
 * 输入: commands = [4,-1,3], obstacles = []
 * 输出: 25
 * 解释: 机器人将会到达 (3, 4)
 * 
 * 示例 2：
 * 输入: commands = [4,-1,4,-2,4], obstacles = [[2,4]]
 * 输出: 65
 * 解释: 机器人在左转走到 (1, 8) 之前将被困在 (1, 4) 处
 *  
 * 提示：
 * 0 <= commands.length <= 10000
 * 0 <= obstacles.length <= 10000
 * -30000 <= obstacle[i][0] <= 30000
 * -30000 <= obstacle[i][1] <= 30000
 * 答案保证小于 2 ^ 31
 * 
 * 
 * @param {number[]} commands
 * @param {number[][]} obstacles
 * @return {number}
 */

// 1. 模拟
var robotSim = function (commands, obstacles) {
  let dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  let dir = 0; // 0, 1, 2, 3
  let current = [0, 0];
  let max = 0;

  const blocks = new Map();
  obstacles.forEach(item => blocks.set(item.join(','), true));

  for (let command of commands) {
    if (command === -1) { // 转向
      dir = (dir + 1) & 3;

    } else if (command === -2) {
      dir = (dir + 3) & 3;

    } else { // 前进
      for (let i = 0; i < command; i++) {
        let nx = current[0] + dirs[dir][0];
        let ny = current[1] + dirs[dir][1];

        if (!blocks.has(`${nx},${ny}`)) {
          current[0] = nx;
          current[1] = ny;
        } else {
          break;
        }
      }
      max = Math.max(max, current[0] * current[0] + current[1] * current[1]);
    }
  }
  return max;
};

// 2. 优化
var robotSimII = function (commands, obstacles) {
  const hash = (x, y) => (x << 15) ^ y; // hash 函数
  let dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  let dir = 0; // 0, 1, 2, 3
  let max = 0;
  let current = new Int32Array(2);

  const blocks = new Set();
  obstacles.forEach(item => blocks.add(hash(item[0], item[1])));

  for (let command of commands) {
    if (command === -1) { // 转向
      dir = (dir + 1) & 3;

    } else if (command === -2) {
      dir = (dir + 3) & 3;

    } else { // 前进
      for (let i = 0; i < command; i++) {
        let nx = current[0] + dirs[dir][0];
        let ny = current[1] + dirs[dir][1];

        if (!blocks.has(hash(nx, ny))) {
          current[0] = nx;
          current[1] = ny;
        } else {
          break;
        }
      }
      max = Math.max(max, current[0] * current[0] + current[1] * current[1]);
    }
  }
  return max;
};

const { logAssert } = require('./tools/LogTools.js');
// logAssert(robotSim, [4, -1, 3], [], 25);
logAssert(robotSimII, [4, -1, 4, -2, 4], [[2, 4]], 65);
logAssert(robotSim, [-2, 8, 3, 7, -1], [[-4, -1], [1, -1], [1, 4], [5, 0], [4, 5], [-2, -1], [2, -5], [5, 1], [-3, -1], [5, -3]], 324);