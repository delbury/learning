/**
 * @param {number[]} nums
 * @return {number}
 */

const maxSubArray = function(nums) {
  let sum, res;
  for(let i = 0, len = nums.length; i < len; i++) {
    for(let j = i; j < len; j++) {
      if(i === j) {
        sum = nums[j];
        if(sum > res || res === undefined) {
          res = sum;
        }
      } else {
        sum += nums[j];
        if(sum > res) {
          res = sum;
        }
      }
    }
  }
  return res;
};

const maxSubArray2 = function(nums) {
  if(!nums.length) {
    return;
  }

  let sum = nums[0];
  let res = nums[0];
  // for(let num of nums) {
  //   sum = Math.max(num, num + sum);
  //   res = Math.max(sum, res);
  // }
  for(let i = 1, len = nums.length; i < len; i++) {
    sum = Math.max(nums[i], sum + nums[i]);
    res = Math.max(sum, res);
  }
  return res;
}

// console.log(maxSubArray2([-2,1,-3,4,-1,2,1,-5,4]));

const fibonacci = function(n) {
  if(n === 0) {
    return 0;
  }
  if(n === 1) {
    return 1;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
};

console.log(fibonacci(40));
