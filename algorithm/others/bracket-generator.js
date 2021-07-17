/**
  * 给出n对括号，请编写一个函数来生成所有的由n对括号组成的合法组合。
  * 
  * @param n int整型 
  * @return string字符串一维数组
  */
function generateParenthesis( n ) {
  // write code here
  const res = [], len = n * 2;
  const dfs = (l, r, str) => {
    if(r > l || r > n || l > n || l + r > len) return;
    if(r + l === len) return res.push(str);
    dfs(l + 1, r, str + '(');
    dfs(l, r + 1, str + ')');
  };
  dfs(l = 1, r = 0, '(');
  return res;
}
module.exports = {
  generateParenthesis : generateParenthesis
};

console.log(generateParenthesis(3));