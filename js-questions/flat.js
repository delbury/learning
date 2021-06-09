/**
 * 数组扁平化
 */

const flat = (arr, depth = 1) => {
  if(!Array.isArray(arr) || depth <= 0) return arr;
  const res = [];
  for(let i = 0; i < arr.length; i++) {
    if(Array.isArray(arr[i])) {
      res.push(...flat(arr[i], depth - 1));
    } else {
      res.push(arr[i])
    }
  }
  return res;
};

console.log(flat([1, 2, [30, 31, 32, [320, 321, 323, [3230, 3231]]], 4, 5], 1));