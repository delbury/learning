/**
 * 给定一个整数数组  nums，求出数组从索引 i 到 j（i ≤ j）范围内元素的总和，包含 i、j 两点。
 * 
 * 实现 NumArray 类：
 * NumArray(int[] nums) 使用数组 nums 初始化对象
 * int sumRange(int i, int j) 返回数组 nums 从索引 i 到 j（i ≤ j）范围内元素的总和，
 * 包含 i、j 两点（也就是 sum(nums[i], nums[i + 1], ... , nums[j])）
 *  
 * 示例：
 * 输入：
 * ["NumArray", "sumRange", "sumRange", "sumRange"]
 * [[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]
 * 输出：
 * [null, 1, -1, -3]
 * 
 * 解释：
 * NumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
 * numArray.sumRange(0, 2); // return 1 ((-2) + 0 + 3)
 * numArray.sumRange(2, 5); // return -1 (3 + (-5) + 2 + (-1)) 
 * numArray.sumRange(0, 5); // return -3 ((-2) + 0 + 3 + (-5) + 2 + (-1))
 *  
 * 提示：
 * 0 <= nums.length <= 10^4
 * -10^5 <= nums[i] <= 10^5
 * 0 <= i <= j < nums.length
 * 最多调用 10^4 次 sumRange 方法
 * 
 * 
 * @param {number[]} nums
 */
var NumArray = function(nums) {
  this.sum = 0;
  this.startArr = [];
  this.endArr = [];
  for(let i = 0; i < nums.length; i++) {
    this.sum += nums[i];

    this.startArr.push((this.startArr[i - 1] || 0) + nums[i]);
    this.endArr.unshift((this.endArr[0] || 0) + nums[nums.length - 1 - i]);
  }

  console.log(this.sum)
  console.log(this.startArr)
  console.log(this.endArr)
};

/** 
 * @param {number} i 
 * @param {number} j
 * @return {number}
 */
NumArray.prototype.sumRange = function(i, j) {
  return this.sum - (this.startArr[i - 1] || 0) - (this.endArr[j + 1] || 0);
};

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(i,j)
 */

// const na = new NumArray([-2, 0, 3, -5, 2, -1]);
// console.log(na.sumRange(0, 2)); // 1
// console.log(na.sumRange(2, 5)); // -1
// console.log(na.sumRange(0, 5)); // -3

(() => {
  var NumArray = function(nums) {
    this.sums = [nums[0]];
    for(let i = 1; i < nums.length; i++) {
      this.sums.push(this.sums[i - 1] + nums[i]);
    }
  
  };
  
  /** 
   * @param {number} i 
   * @param {number} j
   * @return {number}
   */
  NumArray.prototype.sumRange = function(i, j) {
    return this.sums[j] - (this.sums[i - 1] || 0);
  };

  const na = new NumArray([-2, 0, 3, -5, 2, -1]);
  console.log(na.sumRange(0, 2)); // 1
  console.log(na.sumRange(2, 5)); // -1
  console.log(na.sumRange(0, 5)); // -3
})();
