/**
 * 设计并实现一个算法，找出二叉树中某两个节点的第一个共同祖先。
 * 不得将其他的节点存储在另外的数据结构中。
 * 注意：这不一定是二叉搜索树。
 *
 * 例如，给定如下二叉树: root = [3,5,1,6,2,0,8,null,null,7,4]
 *     3
 *    / \
 *   5   1
 *  / \ / \
 * 6  2 0  8
 *   / \
 *  7   4
 *
 * 示例 1:
 * 输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
 * 输出: 3
 * 解释: 节点 5 和节点 1 的最近公共祖先是节点 3。
 *
 * 示例 2:
 * 输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
 * 输出: 5
 * 解释: 节点 5 和节点 4 的最近公共祖先是节点 5。因为根据定义最近公共祖先节点可以为节点本身。
 *
 * 说明:
 * 所有节点的值都是唯一的。
 * p、q 为不同节点且均存在于给定的二叉树中。
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
// 思路：后序遍历，先判断左、右子节点是否有返回 p 或者 q，两者都返回了，当前节点即为最近的公共子节点
// 只返回了一者，则需要判断当前节点是否为 p 或者 q，是，则当前节点为公共节点
// 否则，若左、右、当前节点有一者匹配到了，则返回其节点
// 否则，继续遍历
const lowestCommonAncestor = function (root, p, q) {
  let res = null;
  const fn = (node) => {
    if (!node) return;
    const l = fn(node.left);
    const r = fn(node.right);
    if ((l && r) || (node === p && (l === q || r === q)) || (node === q && (l === p || r === p))) {
      res = node;
      return;
    }
    if (node === p || node === q) return node;
    return l || r;
  };
  fn(root);
  return res;
};

const { log, logAssert, logBinaryTree, logHeapTree, createTreeByArray } = require('../tools/LogTools.js');
const tree = createTreeByArray([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]);
logBinaryTree(tree);
log(lowestCommonAncestor(tree, tree.left, tree.left.right.right));
