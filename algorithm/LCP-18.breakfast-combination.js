/**
 * 小扣在秋日市集选择了一家早餐摊位，一维整型数组 staple 中记录了每种主食的价格，一维整型数组 drinks 中记录了每种饮料的价格。
 * 小扣的计划选择一份主食和一款饮料，且花费不超过 x 元。请返回小扣共有多少种购买方案。
 * 注意：答案需要以 1e9 + 7 (1000000007) 为底取模，如：计算初始结果为：1000000008，请返回 1
 * 
 * 示例 1：
 * 输入：staple = [10,20,5], drinks = [5,5,2], x = 15
 * 输出：6
 * 解释：小扣有 6 种购买方案，所选主食与所选饮料在数组中对应的下标分别是：
 * 第 1 种方案：staple[0] + drinks[0] = 10 + 5 = 15；
 * 第 2 种方案：staple[0] + drinks[1] = 10 + 5 = 15；
 * 第 3 种方案：staple[0] + drinks[2] = 10 + 2 = 12；
 * 第 4 种方案：staple[2] + drinks[0] = 5 + 5 = 10；
 * 第 5 种方案：staple[2] + drinks[1] = 5 + 5 = 10；
 * 第 6 种方案：staple[2] + drinks[2] = 5 + 2 = 7。
 * 
 * 示例 2：
 * 输入：staple = [2,1,1], drinks = [8,9,5,1], x = 9
 * 输出：8
 * 解释：小扣有 8 种购买方案，所选主食与所选饮料在数组中对应的下标分别是：
 * 第 1 种方案：staple[0] + drinks[2] = 2 + 5 = 7；
 * 第 2 种方案：staple[0] + drinks[3] = 2 + 1 = 3；
 * 第 3 种方案：staple[1] + drinks[0] = 1 + 8 = 9；
 * 第 4 种方案：staple[1] + drinks[2] = 1 + 5 = 6；
 * 第 5 种方案：staple[1] + drinks[3] = 1 + 1 = 2；
 * 第 6 种方案：staple[2] + drinks[0] = 1 + 8 = 9；
 * 第 7 种方案：staple[2] + drinks[2] = 1 + 5 = 6；
 * 第 8 种方案：staple[2] + drinks[3] = 1 + 1 = 2；
 * 
 * 提示：
 * 1 <= staple.length <= 10^5
 * 1 <= drinks.length <= 10^5
 * 1 <= staple[i],drinks[i] <= 10^5
 * 1 <= x <= 2*10^5
 * 
 * @param {number[]} staple
 * @param {number[]} drinks
 * @param {number} x
 * @return {number}
 */

// 1. 遍历, 超时
var breakfastNumber = function (staple, drinks, x) {
  let sum = 0;

  for (let i = 0; i < staple.length; i++) {
    for (let j = 0; j < drinks.length; j++) {
      if (drinks[j] + staple[i] <= x) sum++;
    }
  }

  return sum;
};

// 2. hash
var breakfastNumberII = function (staple, drinks, x) {
  let sum = 0;
  const arr = Array(x).fill(0);

  for (let i = 0; i < staple.length; i++) {
    if (staple[i] < x) {
      arr[staple[i]]++;
    }
  }

  for (let i = 1; i < arr.length; i++) {
    arr[i] += arr[i - 1];
  }

  for (let i = 0; i < drinks.length; i++) {
    if (drinks[i] < x) {
      sum += arr[x - drinks[i]];
    }
  }

  return sum % 1000000007;
};

// 3. 双指针
var breakfastNumberIII = function (staple, drinks, x) {
  let sum = 0;
  let i = 0;
  let j = -1;
  staple.sort((a, b) => a - b);
  drinks.sort((a, b) => a - b);

  // 初始化指针
  for (let k = 0; k < drinks.length; k++) {
    if (drinks[k] + staple[i] <= x) {
      j = k;
    } else {
      break;
    }
  }

  while (j >= 0 && i < staple.length) {
    sum += j + 1;
    i++;
    while (j >= 0 && drinks[j] + staple[i] > x) j--;
  }
  return sum % 1000000007;
};


const { logAssert } = require('./tools/LogTools.js');
logAssert(breakfastNumberIII, [10, 20, 5], [5, 5, 2], 15, 6);
