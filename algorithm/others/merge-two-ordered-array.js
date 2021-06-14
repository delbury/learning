/**
 * 给出一个整数数组 A 和有序的整数数组 B，请将数组 B 合并到数组 A 中，变成一个有序的升序数组
 * @param A int整型一维数组 
 * @param B int整型一维数组 
 * @return void
 */
function merge( A, m, B, n ) {
  // write code here
  let p = m + n - 1;
  let pa = m - 1, pb = n - 1;
  while(pa >= 0 && pb >= 0) {
    if(A[pa] < B[pb]) {
      A[p--] = B[pb--];
    } else {
      A[p--] = A[pa--];
    }
  }
  if(pa >= 0) {
    B = A;
    pb = pa;
  }
  while(pb >= 0) {
    A[p--] = B[pb--];
  }
  return A;
}
module.exports = {
  merge : merge
};

// console.log(merge([1,2,3,0,0,0], 3, [2,5,6], 3));
console.log(merge([], 0, [1], 1));