/**
 * 给你一个整数数组 arr 。请你将数组中的元素按照其二进制表示中数字 1 的数目升序排序。
 * 如果存在多个数字二进制中 1 的数目相同，则必须将它们按照数值大小升序排列。
 * 请你返回排序后的数组。
 *  
 * 示例 1：
 * 输入：arr = [0,1,2,3,4,5,6,7,8]
 * 输出：[0,1,2,4,8,3,5,6,7]
 * 解释：[0] 是唯一一个有 0 个 1 的数。
 * [1,2,4,8] 都有 1 个 1 。
 * [3,5,6] 有 2 个 1 。
 * [7] 有 3 个 1 。
 * 按照 1 的个数排序得到的结果数组为 [0,1,2,4,8,3,5,6,7]
 * 
 * 示例 2：
 * 输入：arr = [1024,512,256,128,64,32,16,8,4,2,1]
 * 输出：[1,2,4,8,16,32,64,128,256,512,1024]
 * 解释：数组中所有整数二进制下都只有 1 个 1 ，所以你需要按照数值大小将它们排序。
 * 
 * 示例 3：
 * 输入：arr = [10000,10000]
 * 输出：[10000,10000]
 * 
 * 示例 4：
 * 输入：arr = [2,3,5,7,11,13,17,19]
 * 输出：[2,3,5,17,7,11,13,19]
 * 
 * 示例 5：
 * 输入：arr = [10,100,1000,10000]
 * 输出：[10,100,10000,1000]
 *  
 * 提示：
 * 1 <= arr.length <= 500
 * 0 <= arr[i] <= 10^4
 * 
 * 
 * @param {number[]} arr
 * @return {number[]}
 */

// 1. 桶排序
var sortByBits = function (arr) {
  const buckets = Array.from({ length: 14 }, () => []);

  // 计算每个数字的二进制数 1 的个数
  for (let i = 0; i < arr.length; i++) {
    let count = 0;
    let temp = arr[i];
    while (temp) {
      count++;
      temp = temp & (temp - 1);
    }
    buckets[count].push(arr[i]);
  }

  const res = [];
  for (let i = 0; i < buckets.length; i++) {
    if (buckets[i].length) {
      res.push(...buckets[i].sort((a, b) => a - b));
    }
  }
  return res;
};

// 2. 排序函数
var sortByBitsII = function (arr) {
  return arr.sort((a, b) => {
    let ta = a;
    let tb = b;
    while (ta && tb) {
      ta &= ta - 1;
      tb &= tb - 1;
    }
    return ta - tb === 0 ? (a - b) : (ta - tb);
  });
};

console.log(sortByBitsII([0, 1, 2, 3, 4, 5, 6, 7, 8]));
console.log(sortByBitsII([1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1]));
