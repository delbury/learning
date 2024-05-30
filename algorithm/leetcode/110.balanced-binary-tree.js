/**
 * 给定一个二叉树，判断它是否是高度平衡的二叉树。
 * 本题中，一棵高度平衡二叉树定义为：
 * 一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1 。
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
 * @return {boolean}
 */

// 1. 递归，后序遍历
// tips: 返回值 -1 表示结果已经为 false，其他值表示节点高度
const height = function (node) {
  if (!node) return 0;

  const left = height(node.left);
  if (left === -1) return -1;

  const right = height(node.right);

  if (right === -1 || Math.abs(left - right) > 1) {
    return -1;
  } else {
    return Math.max(left, right) + 1;
  }
};
const isBalanced = function (root) {
  return height(root) >= 0;
};

const { logBinaryTree, logHeapTree, createTreeByArray, logAssert } = require('../tools/LogTools.js');
logAssert(isBalanced, createTreeByArray([3, 9, 20, null, null, 15, 7]), true);
logAssert(isBalanced, createTreeByArray([1, 2, 2, 3, 3, null, null, 4, 4]), false);
logAssert(isBalanced, createTreeByArray([]), true);
