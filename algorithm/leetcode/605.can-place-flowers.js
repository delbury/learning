/**
 * 假设有一个很长的花坛，一部分地块种植了花，另一部分却没有。
 * 可是，花不能种植在相邻的地块上，它们会争夺水源，两者都会死去。
 * 
 * 给你一个整数数组  flowerbed 表示花坛，由若干 0 和 1 组成，其中 0 表示没种植花，1 表示种植了花。
 * 另有一个数 n ，能否在不打破种植规则的情况下种入 n 朵花？能则返回 true ，不能则返回 false。
 *  
 * 示例 1：
 * 输入：flowerbed = [1,0,0,0,1], n = 1
 * 输出：true
 * 
 * 示例 2：
 * 输入：flowerbed = [1,0,0,0,1], n = 2
 * 输出：false
 *  
 * 提示：
 * 1 <= flowerbed.length <= 2 * 104
 * flowerbed[i] 为 0 或 1
 * flowerbed 中不存在相邻的两朵花
 * 0 <= n <= flowerbed.length
 * 通过次数94,819提交次数282,361
 * 
 * 
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */

// 1. 遍历
var canPlaceFlowers = function(flowerbed, n) {
  let empty = 1;
  for(let i = 0; i < flowerbed.length; i++) {
    if(flowerbed[i] === 0) {
      empty++;
    } else {
      empty = 0;
    }
    if(empty === 3) {
      n--;
      empty = 1;
    }
  }
  if(empty === 2) n--;
  return n <= 0;
};

const { logAssert } = require('./tools/LogTools.js');
logAssert(canPlaceFlowers, [1,0,0,0,1], 1, true);
logAssert(canPlaceFlowers, [1,0,0,0,1], 2, false);
logAssert(canPlaceFlowers, [1,0,0,0,0,0,1], 2, true);
logAssert(canPlaceFlowers, [0,0,1,0,0,0,0,0,1], 3, true);
logAssert(canPlaceFlowers, [1,0,0,0,0,0,1,0,0], 3, true);
