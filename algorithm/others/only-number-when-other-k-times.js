/**
 * 给定一个整型数组 arrarr 和一个整数 k(k>1)k(k>1)。
 * 已知 arrarr 中只有 1 个数出现一次，其他的数都出现 kk 次。
 * 请返回只出现了 1 次的数。
 * 
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 * 
 * @param arr int一维数组 
 * @param k int 
 * @return int
 */
function foundOnceNumber( arr ,  k ) {
  // write code here
  // 按位计算
  let res = 0;
  for(let i = 0; i < 32; i++) {
    let t = 0;
    // 每个数字的同位上的数字累加
    for(const n of arr) {
      t += (n & (1 << i)) ? 1 : 0;
    }
    res += ((t % k) << i);
  }
  return res;
}
module.exports = {
  foundOnceNumber : foundOnceNumber
};

const { logAssert } = require('../tools/LogTools.js');
logAssert(foundOnceNumber, [5,5,5,3,3,3,2,6,6,6], 3, 2);