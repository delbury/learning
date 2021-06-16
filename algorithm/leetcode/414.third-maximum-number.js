/**
 * 给你一个非空数组，返回此数组中 第三大的数 。
 * 如果不存在，则返回数组中最大的数。
 * 
 * 示例 1：
 * 输入：[3, 2, 1]
 * 输出：1
 * 解释：第三大的数是 1 。
 * 
 * 示例 2：
 * 输入：[1, 2]
 * 输出：2
 * 解释：第三大的数不存在, 所以返回最大的数 2 。
 * 
 * 示例 3：
 * 输入：[2, 2, 3, 1]
 * 输出：1
 * 解释：注意，要求返回第三大的数，是指在所有不同数字中排第三大的数。
 * 此例中存在两个值为 2 的数，它们都排第二。在所有不同数字中排第三大的数为 1 。
 *  
 * 提示：
 * 1 <= nums.length <= 10^4
 * -2^31 <= nums[i] <= 2^31 - 1
 * 
 * @param {number[]} nums
 * @return {number}
 */

// 1. api 排序
var thirdMaxII = function(nums) {
  nums.sort((a, b) => b - a);
  let max = nums[0];
  let count = 1;
  for(let i = 1; i < nums.length; i++) {
    max = Math.max(max, nums[i]);
    if(nums[i] !== nums[i - 1]) count++;
    if(count === 3) return nums[i];
  }
  return max;
};

// 2. 堆排序，大顶堆
var thirdMax = function(nums) {
  // 堆调整
  const heapifyIII = (arr, length, i) => {
    if (i >= length) return;
    const left = 2 * i + 1 >= length ? -Infinity : arr[2 * i + 1]; // 左子节点
    const right = 2 * i + 2 >= length ? -Infinity : arr[2 * i + 2]; // 右子节点

    if (left > arr[i] && left >= right) {
      // 若左子节点最大
      [arr[i], arr[2 * i + 1]] = [arr[2 * i + 1], arr[i]];
      heapify(arr, length, 2 * i + 1);

    } else if (right > arr[i] && right > left) {
      // 若右子节点最大
      [arr[i], arr[2 * i + 2]] = [arr[2 * i + 2], arr[i]];
      heapify(arr, length, 2 * i + 2);
    }
  };
  
  // 堆化
  for (let i = Math.floor(nums.length / 2) - 1; i >= 0; i--) {
    heapify(nums, nums.length, i);
  }
  
  let max = nums[0];
  let count = 0;
  // 堆排序
  for(let i = nums.length - 1; i > 0; i--) {
    if(nums[i + 1] !== nums[0]) count++;
    if(count === 3) return nums[0];
    [nums[0], nums[i]] = [nums[i], nums[0]];
    heapify(nums, i, 0);
  }
  if(count + 1 === 3 && nums[0] !== nums[1]) return nums[0];
  return max;
};

// 3. 一次遍历保存
var thirdMax = function(nums) {
  let maxs = []; //  升序
  for(const num of nums) {
    if(!maxs.length || num > maxs[maxs.length - 1]) {
      maxs.push(num);
    } else if(num < maxs[0]) {
      maxs.unshift(num);
    }
    if(maxs.length > 3) maxs.shift();

    for(let i = 0; i < maxs.length - 1; i++) {
      if(num > maxs[i] && num < maxs[i + 1]) {
        maxs.splice(i + 1, 0, num);
        break;
      }
    }
    if(maxs.length > 3) maxs.shift();
  }
  return maxs.length === 3 ? maxs[0] : maxs[maxs.length - 1];
};


const { logAssert } = require('./tools/LogTools.js');
// logAssert(thirdMax, [2,2,3,1], 1);
// logAssert(thirdMax, [1,2], 2);
// logAssert(thirdMax, [3,2,1], 1);
// logAssert(thirdMax, [2,2,2,1], 2);
// logAssert(thirdMax, [1,1,2], 2);
// logAssert(thirdMax, [1,2,2,5,3,5], 2);
logAssert(thirdMax, [5,2,4,1,3,6,0], 4);


