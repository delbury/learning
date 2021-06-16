/**
 * 给定一副牌，每张牌上都写着一个整数。
 * 此时，你需要选定一个数字 X，使我们可以将整副牌按下述规则分成 1 组或更多组：
 * 每组都有 X 张牌。
 * 组内所有的牌上都写着相同的整数。
 * 仅当你可选的 X >= 2 时返回 true。
 *  
 * 示例 1：
 * 输入：[1,2,3,4,4,3,2,1]
 * 输出：true
 * 解释：可行的分组是 [1,1]，[2,2]，[3,3]，[4,4]
 * 
 * 示例 2：
 * 输入：[1,1,1,2,2,2,3,3]
 * 输出：false
 * 解释：没有满足要求的分组。
 * 
 * 示例 3：
 * 输入：[1]
 * 输出：false
 * 解释：没有满足要求的分组。
 * 
 * 示例 4：
 * 输入：[1,1]
 * 输出：true
 * 解释：可行的分组是 [1,1]
 * 
 * 示例 5：
 * 输入：[1,1,2,2,2,2]
 * 输出：true
 * 解释：可行的分组是 [1,1]，[2,2]，[2,2]
*
 * 提示：
 * 1 <= deck.length <= 10000
 * 0 <= deck[i] < 10000
 * 
 * @param {number[]} deck
 * @return {boolean}
 */

// 1. 
var hasGroupsSizeX = function (deck) {
  if (deck.length < 2) return false;

  const counts = new Map();
  for (let num of deck) {
    if (counts.has(num)) {
      counts.set(num, counts.get(num) + 1);
    } else {
      counts.set(num, 1);
    }
  }

  const min = Math.min(...counts.values());
  for (let n = min; n >= 2; n--) {
    let flag = true;
    for (let value of counts.values()) {
      if (value % n !== 0) {
        // 不能整除
        flag = false;
        break;
      }
    }
    if (flag) return true;
  }

  return false;
};

// 2. 求最大公约数，辗转相除法
var hasGroupsSizeXII = function (deck) {
  const counts = Object.values(deck.reduce((obj, num) => (obj[num] = (obj[num] || 0) + 1, obj), {})); // 计数

  // 计算最大公约数
  let g = counts[0];
  counts.forEach(item => g = gcd(item, g));

  return g >= 2;

  function gcd(n1, n2) {
    return n2 === 0 ? n1 : gcd(n2, n1 % n2);
  };
};


const { logAssert } = require('./tools/LogTools.js');
// logAssert(hasGroupsSizeX, [1, 2, 3, 4, 4, 3, 2, 1], true);
// logAssert(hasGroupsSizeX, [1, 1, 1, 2, 2, 2, 3, 3], false);
// logAssert(hasGroupsSizeX, [1], false);
// logAssert(hasGroupsSizeX, [1, 1], true);
// logAssert(hasGroupsSizeX, [1, 1, 2, 2, 2, 2], true);
logAssert(hasGroupsSizeXII, [0, 0, 0, 1, 1, 1, 2, 2, 2], true);
