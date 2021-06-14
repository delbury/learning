/**
 * 分别按照二叉树先序，中序和后序打印所有的节点。
 * 
 * function TreeNode(x) {
 *   this.val = x;
 *   this.left = null;
 *   this.right = null;
 * }
 */

/**
 * 
 * @param root TreeNode类 the root of binary tree
 * @return int整型二维数组
 */

// 溢出
function threeOrdersOverflow( root ) {
  // write code here
  const res = [[], [], []];
  const fn = (node) => {
      if(!node) return;
      res[0].push(root.val);
      fn(root.left);
      res[1].push(root.val);
      fn(root.right);
      res[2].push(root.val);
  };
  fn(root);
  return res;
}

// 迭代
function threeOrders( root ) {
  // write code here
  const res = [[], [], []];
  if(!root) return res;
  const stack = [root];
  // 前序
  while(stack.length) {
    const node = stack.pop();
    res[0].push(node.val);
    if(node.right) stack.push(node.right);
    if(node.left) stack.push(node.left);
  }
  // 后序
  stack.push(root);
  while(stack.length) {
    const node = stack.pop();
    res[2].unshift(node.val);
    if(node.left) stack.push(node.left);
    if(node.right) stack.push(node.right);
  }
  // 中序
  let p = root;
  while(p || stack.length) {
    while(p) {
      stack.push(p);
      p = p.left;
    }
    p = stack.pop();
    res[1].push(p.val);
    p = p.right;
  }
  return res;
}
module.exports = {
  threeOrders : threeOrders
};

const { logBinaryTree, logHeapTree, createTreeByArray } = require('../tools/LogTools.js');
console.log(threeOrders(createTreeByArray([1, 2, 3, 4, 5])))