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


var climbStairs2 = function(n) {
  if(n === 1) return 1;
  const dp = [];
  dp[1] = 1;
  dp[2] = 2;
  for(let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
};
