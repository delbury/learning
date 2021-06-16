/**
 * 给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。
 * 在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0) 。
 * 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
 * 
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
  let max = 0;
  let l = 0;
  let r = height.length - 1;
  while(l < r) {
    max = Math.max(Math.min(height[l], height[r]) * (r - l), max);
    if(height[l] < height[r]) {
      l++;
    } else {
      r--;
    }
  }
  return max;
};

const { logAssert } = require('../tools/LogTools.js');
logAssert(maxArea, [4,3,2,1,4], 16);