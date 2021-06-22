/**
 * 实现一个特殊功能的栈，在实现栈的基本功能的基础上，再实现返回栈中最小元素的操作。
 * 
 * return a array which include all ans for op3
 * @param op int整型二维数组 operator
 * @return int整型一维数组
 */
function getMinStack( op ) {
  // write code here
  const stack = [];
  let min = null;
  const res = [];
  for(const [o, v] of op) {
    switch(o) {
      // push
      case 1:
        if(!stack.length) {
          stack.push(v);
          min = v;
        } else {
          stack.push(v - min);
          if(v < min) {
            min = v;
          }
        }
        break;
      // pop
      case 2:
        if(stack[stack.length - 1] >= 0) {
          min + stack.pop()
        } else {
          min -= stack.pop();
        }
        break;
      // getMin
      case 3:
        res.push(min);
        break;
      default:
        break;
    }
  }
  return res;
}
module.exports = {
  getMinStack : getMinStack
};

console.log(getMinStack([[1,3],[1,2],[1,1],[3],[2],[3]])); // [1, 2]
// getMinStack([[1,1], [1,2], [1,3], [1,4], [2], [2]]);