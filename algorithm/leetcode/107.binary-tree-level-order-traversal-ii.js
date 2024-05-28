/**
 * 给你二叉树的根节点 root ，返回其节点值 自底向上的层序遍历 。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）
 *
 * 示例1:
 * 输入：root = [3,9,20,null,null,15,7]
 * 输出：[[15,7],[9,20],[3]]
 *
 * 示例2:
 * 输入：root = [1]
 * 输出：[[1]]
 *
 * 示例3:
 * 输入：root = []
 * 输出：[]
 *
 * 提示：
 * 树中节点数目在范围 [0, 2000] 内
 * -1000 <= Node.val <= 1000
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
const levelOrderBottom = function (root) {
  // 层序遍历结果反转
  const res = [];
  const dfs = (node, deep) => {
    if (!node) return;
    if (!res[deep]) res[deep] = [node.val];
    else res[deep].push(node.val);

    dfs(node.left, deep + 1);
    dfs(node.right, deep + 1);
  };
  dfs(root, 0);
  res.reverse();
  return res;
};
