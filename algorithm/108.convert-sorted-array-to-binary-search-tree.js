/**
 * 将一个按照升序排列的有序数组，转换为一棵高度平衡二叉搜索树。
 * 本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1。
 * 
 * 示例:
 * 给定有序数组: [-10,-3,0,5,9],
 * 一个可能的答案是：[0,-3,9,-10,null,5]，它可以表示下面这个高度平衡二叉搜索树：
 *       0
 *     / \
 *   -3   9
 *   /   /
 * -10  5
 * 
 * 
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

/**
 * @param {number[]} nums
 * @return {TreeNode}
 */

// 1. 二分
const create = function (nums, start, end) {
  if (start > end) return null;
  const mid = Math.floor((end - start) / 2) + start;
  const node = new TreeNode(nums[mid]);
  node.left = create(nums, start, mid - 1);
  node.right = create(nums, mid + 1, end);
  return node;
}
var sortedArrayToBST = function (nums) {
  if (!nums.length) return null;
  return create(nums, 0, nums.length - 1);
};

const { logBinaryTree, logHeapTree, createTreeByArray } = require('./tools/LogTools.js');
logBinaryTree(sortedArrayToBST([-10, -3, 0, 5, 9]), 'val', 'left', 'right')