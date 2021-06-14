/**
 * 给定一个数组arr，返回arr的最长无重复元素子数组的长度，无重复指的是所有数字都不相同。
 * 子数组是连续的，比如[1,3,5,7,9]的子数组有[1,3]，[3,5,7]等等，但是[1,3,7]不是子数组
 * 
 * @param arr int整型一维数组 the array
 * @return int整型
 */

// 双指针，滑动数组，hash
function maxLength( arr ) {
  // write code here
  const set = new Set();
  let res = 0;
  for(let r = 0; r < arr.length; r++) {
    if(!set.has(arr[r])) {
      set.add(arr[r]);
      res = Math.max(res, set.size);
    } else {
      const itor = set.values();
      while(true) {
        const v = itor.next().value;
        set.delete(v);
        if(v === arr[r]) {
          set.add(v);
          break;
        }
      }
    }
  }
  return res;
}
module.exports = {
  maxLength : maxLength
};

console.log(maxLength([2,3,4,5]));
console.log(maxLength([1,2,3,1,2,3,2,2]));
console.log(maxLength([2,2,3,4,8,99,3]));