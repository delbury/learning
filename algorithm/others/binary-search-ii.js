/**
 * 请实现有重复数字的升序数组的二分查找
 * 给定一个 元素有序的（升序）整型数组 nums 和一个目标值 target  ，
 * 写一个函数搜索 nums 中的第一个出现的target，如果目标值存在返回下标，否则返回 -1
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 * 如果目标值存在返回下标，否则返回 -1
 * @param nums int整型一维数组 
 * @param target int整型 
 * @return int整型
 */

function search(nums, target, left = 0, right = nums.length) {
  // write code here
  if(left > right || !nums.length) return -1;
  const middle = Math.floor((left + right) / 2);
  if(nums[middle] > target) {
    return search(nums, target, left, middle - 1);
  } else if(nums[middle] < target) {
    return search(nums, target, middle + 1, right);
  } else {
    for(let i = middle - 1; i >= 0; i--) {
      if(nums[i] !== target) return i + 1;
    }
    return 0;
  }
}
module.exports = {
  search : search
};

console.log(search([], 0))