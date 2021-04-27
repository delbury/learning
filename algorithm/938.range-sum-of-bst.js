/**
 * 给定二叉搜索树的根结点 root，返回值位于范围 [low, high] 之间的所有结点的值的和。
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
 * @param {number} low
 * @param {number} high
 * @return {number}
 */

// 1. 中序遍历
var rangeSumBSTII = function(root, low, high) {
  let sum = 0;
  const ldr = (node) => {
    if(!node) return null;

    if(node.val >= low) {
      ldr(node.left);
    }
    if(node.val >= low && node.val <= high) {
      sum += node.val;
    }
    if(node.val <= high) {
      ldr(node.right);
    }
  };
  ldr(root);
  return sum;
};

// 2. 剪枝
var rangeSumBST = function(root, low, high) {
  if(!root) return 0;
  if(root.val < low) return rangeSumBST(root.right, low, high);
  if(root.val > high) return rangeSumBST(root.left, low, high);
  return root.val + rangeSumBST(root.left, low, high) + rangeSumBST(root.right, low, high);
}


const { logAssert, createTreeByArray } = require('./tools/LogTools.js');
logAssert(rangeSumBST, createTreeByArray([10,5,15,3,7,null,18]), 7, 15, 32);