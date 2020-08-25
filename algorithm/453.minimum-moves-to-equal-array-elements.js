/**
 * @param {number[]} nums
 * @return {number}
 */
var minMoves = function(nums) {
    const min = Math.min.apply(null, nums);
    let sum = 0;
    for(let i = nums.length - 1; i >= 0; i--) {
        sum += nums[i] - min;
    }
    return sum;
};
