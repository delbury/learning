/**
 * 给定一棵二叉树，你需要计算它的直径长度。
 * 一棵二叉树的直径长度是任意两个结点路径长度中的最大值。这条路径可能穿过也可能不穿过根结点。
 * 
 * 示例 :
 * 给定二叉树
 *          1
 *         / \
 *        2   3
 *       / \     
 *      4   5    
 * 返回 3, 它的长度是路径 [4,2,1,3] 或者 [5,2,1,3]。
 *  
 * 注意：两结点之间的路径长度是以它们之间边的数目表示。
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
 * @return {number}
 */
// 1. 左右子树的最大高度和
var diameterOfBinaryTree = function(root) {
  let max = 0;
  const fn = (node) => {
    if(!node) return 0;
    const lh = fn(node.left) + 1;
    const rh = fn(node.right) + 1;
    max = Math.max(lh + rh - 2, max);
    return Math.max(lh, rh);
  };
  fn(root);
  return max
};

const { logAssert, logBinaryTree, logHeapTree, createTreeByArray } = require('../tools/LogTools.js');
logAssert(diameterOfBinaryTree, createTreeByArray([1,2,3,4,5]), 3)