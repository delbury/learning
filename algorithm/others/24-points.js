/**
 * 输入 4 个数字，通过加减乘除和括号，计算是否可以组成 24 点
 */

// 1. 暴力
// 4! * (4 * 4 * 4) * 6
// 0, 1, 2, 3 => +, -, *, /
const calc = (num1, num2, type) => {
  switch(type) {
    case 0: return num1 + num2;
    case 1: return num1 - num2;
    case 2: return num1 * num2;
    case 3: return num1 / num2;
    default: return 0;
  }
};
const canGet24Points = (nums) => {
  // 数字排列
  for(let i1 = 0; i1 < nums.length; i1++) {
    for(let i2 = 0; i2 < nums.length; i2++) {
      if(i2 === i1) continue;
      for(let i3 = 0; i3 < nums.length; i3++) {
        if(i3 === i1 || i3 === i2) continue;
        for(let i4 = 0; i4 < nums.length; i4++) {
          if(i4 === i1 || i4 === i2 || i4 === i3) continue;

          // 加减乘除排列
          for(let j1 = 0; j1 < 4; j1++) {
            for(let j2 = 0; j2 < 4; j2++) {
              for(let j3 = 0; j3 < 4; j3++) {
                const a = nums[i1], b = nums[i2], c = nums[i3], d = nums[i4];
                // 括号排列，6 种
                if(calc(calc(calc(a, b, j1), c, j2), d, j3) === 24 ||
                  calc(calc(a, b, j1), calc(c, d, j3), j2) === 24 ||
                  calc(calc(a, calc(b, c, j2), j1), d, j3) === 24 ||
                  calc(a, calc(calc(b, c, j2), d, j3), j1) === 24 ||
                  calc(a, calc(b, calc(c, d, j3), j2), j1) === 24) return true;
              }
            }
          }
        }
      }
    }
  }
  return false;
};

const { logAssert } = require('../tools/LogTools.js');
// logAssert(canGet24Points, [7, 2, 1, 10], true);
logAssert(canGet24Points, [24, 24, 1, 1], true);