/**
 * 给定一个二叉树，返回它的 后序 遍历。
 * 
 * 示例:
 * 输入: [1,null,2,3]  
 *   1
 *     \
 *     2
 *     /
 *   3 
 * 输出: [3,2,1]
 * 进阶: 递归算法很简单，你可以通过迭代算法完成吗？
 * 
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */

// 1. 递归
var postorderTraversalI = function(root) {
  const res = [];
  const lrd = node => {
    if(!node) return;
    lrd(node.left);
    lrd(node.right);
    res.push(node.val);
  };
  lrd(root);
  return res;
};

// 2.迭代
var postorderTraversal = function(root) {
  if(!root) return [];
  const queue = [root];
  const res = [];
  while(queue.length) {
    const node = queue.pop();
    if(node.left) queue.push(node.left);
    if(node.right) queue.push(node.right);
    res.unshift(node.val);
  }
  return res;
};