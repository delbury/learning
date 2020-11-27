/**
 * 给定一个二叉树，找出其最小深度。
 * 最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
 * 说明：叶子节点是指没有子节点的节点。
 * 
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

// 1.
var minDepth = function(root) {
  if(!root) return 0;
  
  if(!root.left && !root.right) return 1;

  if(!root.left) return minDepth(root.right) + 1;

  if(!root.right) return minDepth(root.left) + 1;

  return Math.min(minDepth(root.left), minDepth(root.right)) + 1;
};

const { logBinaryTree, logHeapTree, createTreeByArray, logAssert } = require('./tools/LogTools.js');
logAssert(minDepth, createTreeByArray([3,9,20,null,null,15,7]), 2);

const tree = {
  val: 2,
  left: null,
  right: {
    val: 3,
    left: null,
    right: {
      val: 4,
      left: null,
      right: {
        val: 5,
        left: null,
        right: {
          val: 6,
          left: null,
          right: null,
        }
      }
    }
  }
};
// logBinaryTree(tree, 'val', 'left', 'right');
logAssert(minDepth, tree, 5);
