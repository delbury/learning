/**
 * 给定一个二叉树，返回该二叉树层序遍历的结果，（从左到右，一层一层地遍历）
 * 
 * function TreeNode(x) {
 *   this.val = x;
 *   this.left = null;
 *   this.right = null;
 * }
 */

/**
  * 
  * @param root TreeNode类 
  * @return int整型二维数组
  */
function levelOrder( root ) {
  // write code here
  if(!root) return [];
  const queue = [root, null];
  const res = [];
  let row = [];
  while(queue.length > 1 || queue[0]) {
    const node = queue.shift();
    if(!node) {
      queue.push(null);
      res.push(row);
      row = [];
    } else {
      row.push(node.val);
      if(node.left) queue.push(node.left);
      if(node.right) queue.push(node.right);
    }
  }
  if(row.length) res.push(row);
  return res;
}
module.exports = {
  levelOrder : levelOrder
};

const { logBinaryTree, logHeapTree, createTreeByArray } = require('../tools/LogTools.js');
console.log(levelOrder(createTreeByArray([3,9,20,null,null,15,7])))