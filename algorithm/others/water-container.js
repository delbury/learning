/**
 * 给定一个整形数组arr，已知其中所有的值都是非负的，将这个数组看作一个容器，请返回容器能装多少水。
 * 
 * 短板原理：双指针
 *   左右指针：l / r
 *   左右最高高度：lmax / rmax
 *   从最高高度最小的一侧开始
 * 
 * max water
 * @param arr int整型一维数组 the array
 * @return long长整型
 */
function maxWater( arr ) {
  // write code here
  let res = 0;
  let l = 1, r = arr.length - 2;
  let lmax = arr[0], rmax = arr[arr.length - 1];
  while(l <= r) {
    if(lmax < rmax) {
      if(arr[l] < lmax) {
        res += lmax - arr[l];
      } else {
        lmax = arr[l];
      }
      l++;
    } else {
      if(arr[r] < rmax) {
        res += rmax - arr[r];
      } else {
        rmax = arr[r];
      }
      r--;
    }
  }
  return res;
}
module.exports = {
  maxWater : maxWater
};

const { logAssert } = require('../tools/LogTools.js');
logAssert(maxWater, [4,5,1,3,2], 2);