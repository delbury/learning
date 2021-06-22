/**
 * 给定一个整数数组nums，按升序排序，数组中的元素各不相同。
 * nums数组在传递给search函数之前，
 * 会在预先未知的某个下标 t（0 <= t <= nums.length-1）上进行旋转，
 * 让数组变为[nums[t], nums[t+1], ..., nums[nums.length-1], nums[0], nums[1], ..., nums[t-1]]。
 * 
 * 比如，数组[0,2,4,6,8,10]在下标2处旋转之后变为[6,8,10,0,2,4]
 * 现在给定一个旋转后的数组nums和一个整数target，
 * 请你查找这个数组是不是存在这个target，如果存在，那么返回它的下标，如果不存在，返回-1
 * 
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 * 
 * @param nums int整型一维数组 
 * @param target int整型 
 * @return int整型
 */
function search( nums ,  target ) {
  // write code here
  let l = 0, r = nums.length - 1;
  while(l <= r) {
    let m = Math.floor((l + r) / 2);
    if(nums[m] === target) return m;
    if(nums[l] === target) return l;
    if(nums[r] === target) return r;
    if(nums[m] > nums[l]) {
      // 左半部分有序
      if(nums[m] > target && target > nums[l]) {
        r = m - 1;
      } else {
        l = m + 1;
      }
    } else {
      // 右半部分有序
      if(nums[m] < target && target < nums[r]) {
        l = m + 1;
      } else {
        r = m - 1;
      }
    }
  }
  return -1;
}
module.exports = {
  search : search
};

console.log(search([258,260,265,266,268,269,271,275,276,278,280,282,287,288,289,293,2,4,5,9,16,23,24,25,26,27,28,36,37,46,47,52,55,56,60,63,67,71,74,75,76,79,80,81,82,92,97,99,103,104,106,109,111,112,117,121,125,131,133,136,141,142,143,144,154,160,161,168,169,179,187,190,201,202,204,206,208,209,211,213,218,220,222,224,225,226,229,230,231,234,240,241,242,243,244,245,247,249,252,253,254,257],81))