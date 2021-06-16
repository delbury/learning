/**
 * 给定一个数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。
 * 返回滑动窗口中的最大值。
 * 
 * 示例:

 * 输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
 * 输出: [3,3,5,5,6,7] 
 * 解释: 
 *   滑动窗口的位置                最大值
 * ---------------               -----
 * [1  3  -1] -3  5  3  6  7       3
 *  1 [3  -1  -3] 5  3  6  7       3
 *  1  3 [-1  -3  5] 3  6  7       5
 *  1  3  -1 [-3  5  3] 6  7       5
 *  1  3  -1  -3 [5  3  6] 7       6
 *  1  3  -1  -3  5 [3  6  7]      7
 * 
 * 进阶：
 * 你能在线性时间复杂度内解决此题吗？
 * 
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

// 暴力遍历 O(n*k)
var maxSlidingWindow = function(nums, k) {
  const res = [];
  for(let i = 0; i + k - 1 < nums.length; i++) {
    const temp = [];
    for(let j = i; j < i + k; j++) {
      temp.push(nums[j]);
    }
    res.push(Math.max(...temp));
  }

  return res;
};

// 双向队列
var maxSlidingWindowQueue = function(nums, k) {
  const dequeue = []; // 双端队列
  const res = []; // 保存每一步的结果

  for(let i = 0; i < nums.length; i++) {
    // 若双向队列满，则弹出队首
    if(dequeue.length && dequeue[0] <= i - k) {
      dequeue.shift();
    }

    // 若队列不为空，且新元素比队尾元素大，则依次弹出队尾较小的元素
    while(dequeue.length && nums[i] >= nums[dequeue[dequeue.length - 1]]) {
      dequeue.pop();
    }

    // 入队新元素
    dequeue.push(i);
    
    // 从第 k - 1 个元素开始统计最大值
    if(i >= k - 1) {
      res.push(nums[dequeue[0]]);
    }
  }

  return res;
};

// 两端扫描
var maxSlidingWindowDP = function(nums, k) {
  const left = [];
  const right = [];
  left[0] = nums[0];
  right[nums.length - 1] = nums[nums.length - 1];

  for(let i = 1; i < nums.length; i++) {
    left[i] = i % k === 0 ? nums[i] : Math.max(nums[i], left[i - 1]);

    const j = nums.length - i - 1;
    right[j] = (j + 1) % k === 0 ? nums[j] : Math.max(nums[j], right[j + 1]);
  }

  const res = [];
  for(let i = 0; i < nums.length - k + 1; i++) {
    res.push(Math.max(right[i], left[i + k - 1]));
  }

  return res;
}

// console.log(maxSlidingWindowQueue([1,3,-1,-3,5,3,6,7], 3)); // [ 3, 3, 5, 5, 6, 7 ]
// console.log(maxSlidingWindowQueue([1,3,1,2,0,5], 3)); // [3,3,2,5]
console.log(maxSlidingWindowDP([1,3,1,2,0,5], 3)); // [3,3,2,5]
