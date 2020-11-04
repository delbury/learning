/**
 * 翻转一棵二叉树。
 * 
 * 示例：
 * 输入：
 *     4
 *   /   \
 *   2     7
 * / \   / \
 * 1   3 6   9
 * 输出：
 *     4
 *   /   \
 *   7     2
 * / \   / \
 * 9   6 3   1
 * 
 * 备注:
 * 这个问题是受到 Max Howell 的 原问题 启发的 ：
 * 
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */

// 1. 递归
var invertTree = function (root) {
  if (!root) return root;

  [root.left, root.right] = [root.right, root.left];
  invertTree(root.left);
  invertTree(root.right);

  return root;
};