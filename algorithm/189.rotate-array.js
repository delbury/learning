/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
    k = k % nums.length;

    // 1.
    // while(k--) {
    //     nums.unshift(nums.pop());
    // }

    // 2.
    nums.unshift(...nums.splice(nums.length - k, k));

    return nums;
};