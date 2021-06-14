const stack1 = []; // push 使用
const stack2 = []; // pop 使用
function push(node) {
  // write code here
  stack1.push(node);
}
function pop() {
  // write code here
  if(!stack2.length && stack1.length) {
    while(stack1.length) {
      stack2.push(stack1.pop());
    }
  }
  return stack2.pop();
}
module.exports = {
  push : push,
  pop : pop
};