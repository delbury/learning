/**
 * 全排列
 */
// 不重复
function fullPermutation(str) {
  const set = new Set();
  const dfs = (str, fixed = 0) => {
    if(fixed >= str.length - 1) return set.add(str);
    for(let i = fixed; i < str.length; i++) {
      const arr = str.split('');
      [arr[fixed], arr[i]] = [arr[i], arr[fixed]];
      const newStr = arr.join('');
      if(!set.has(newStr)) {
        dfs(newStr, fixed + 1);
      }
    }
  };
  dfs(str);
  return Array.from(set);
}

console.log(fullPermutation('asas'));