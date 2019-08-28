function demo(n) {
  let f = [0];
  for(let i = 1; i <= n; i++) {
    let cost = Infinity;

    if(i - 1 >= 0) {
      cost = Math.min(cost, f[i - 1] + 1);
    }
    if(i - 5 >= 0) {
      cost = Math.min(cost, f[i - 5] + 1);
    }
    if(i - 11 >= 0) {
      cost = Math.min(cost, f[i - 11] + 1);
    }
    f[i] = cost;
    console.log(i, f[i]);
  }
}



var climbStairs = function(n) {
  const arr = [];
  return fn(0, n, arr);
};

function fn(i, n, arr) {
  if(i > n) return 0;
  if(i == n) return 1;
  if(arr[i] > 0) return arr[i];
  arr[i] = fn(i + 1, n, arr) + fn(i + 2, n, arr);
  return arr[i];
}

console.log('res: ', climbStairs(1));
console.log('res: ', climbStairs(2));
console.log('res: ', climbStairs(3));
console.log('res: ', climbStairs(44));
