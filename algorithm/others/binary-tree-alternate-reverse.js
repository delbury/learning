/*
 * function TreeNode(x) {
 *   this.val = x;
 *   this.left = null;
 *   this.right = null;
 * }
 */

/**
  * 给定一个二叉树，返回该二叉树的之字形层序遍历，
  * （第一层从左向右，下一层从右向左，一直这样交替）
  * 
  * @param root TreeNode类 
  * @return int整型二维数组
  */
function zigzagLevelOrder( root ) {
  // write code here
  if(!root) return [];
  const queue = [root, null];
  const res = [];
  let row = [];
  while(queue.length) {
    const node = queue.shift();
    if(!node) {
      res.push(row);
      if(!queue.length) break;
      row = [];
      queue.push(null);
    } else {
      if(res.length % 2 === 0) {
        row.push(node.val);
      } else {
        row.unshift(node.val);
      }
      if(node.left) queue.push(node.left);
      if(node.right) queue.push(node.right);
    }
  }
  return res;
}
module.exports = {
  zigzagLevelOrder : zigzagLevelOrder
};

const { logAssert, logBinaryTree, logHeapTree, createTreeByArray } = require('../tools/LogTools.js');
const list = [1,2,3,4,5,6,7,8,9];
const tree = createTreeByArray(list);
logBinaryTree(tree);
console.log(zigzagLevelOrder(tree));