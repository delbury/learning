/**
 * 给出一个有n个元素的数组S，S中是否有元素a,b,c满足a+b+c=0？
 * 找出数组S中所有满足条件的三元组。
 * 
 * 注意：
 * 三元组（a、b、c）中的元素必须按非降序排列。（即a≤b≤c）
 * 解集中不能包含重复的三元组。
 * @param num int整型一维数组 
 * @return int整型二维数组
 */
function threeSum( num ) {
  // write code here
  num.sort((a, b) => a - b);
  const res = [];
  for(let i = 0; i < num.length; i++) {
    if(i > 0 && num[i] === num[i - 1]) continue;
    let l = i + 1, r = num.length - 1;
    while(l < r) {
      if((num[l] + num[r] > -num[i])) {
        r--;
      } else if((num[l] + num[r] < -num[i])) {
        l++;
      } else {
        if(
          !res.length || 
          (res[res.length - 1][1] !== num[l] || res[res.length - 1][2] !== num[r])
        ) {
          res.push([num[i], num[l], num[r]]);
        }
        l++;
        r--;
      }
    }
  }
  return res;
}
module.exports = {
  threeSum : threeSum
};

// console.log(threeSum([-10, 0, 10, 20, -10, -40]));
// console.log(threeSum([-2,0,0,2,2]));
// console.log(threeSum([0,0,0]));
console.log(threeSum([-4,-2,1,-5,-4,-4,4,-2,0,4,0,-2,3,1,-5,0]));
