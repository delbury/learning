/**
 * 最大乘积
 * 给定一个无序数组，包含正数、负数和0，要求从中找出3个数的乘积，使得乘积最大，
 * 要求时间复杂度：O(n)，空间复杂度：O(1)。
 * 
 * @param A int整型一维数组 
 * @return long长整型
 */
function solve( A ) {
  // write code here
  // A.sort((a , b) => a - b);
  // return Math.max(
  //   A[0] * A[1] * A[A.length - 1],
  //   A[A.length - 1] * A[A.length - 2] * A[A.length - 3],
  // );

  let max1, max2, max3, min1, min2;
  max1 = max2 = max3 = -Infinity;
  min1 = min2 = Infinity;

  for(const n of A) {
    if(n < min1) {
      min2 = min1;
      min1 = n;
    } else if(n < min2) {
      min2 = n;
    }
    if(n > max3) {
      max1 = max2;
      max2 = max3;
      max3 = n;
    } else if(n > max2) {
      max1 = max2;
      max2 = n;
    } else if(n > max1) {
      max1 = n;
    }
  }

  return Math.max(
    max1 * max2 * max3,
    min1 * min2 * max3,
  );
}
module.exports = {
  solve : solve
};

console.log(solve([-1,-2,-3,-4,-5,-6,-7]));
