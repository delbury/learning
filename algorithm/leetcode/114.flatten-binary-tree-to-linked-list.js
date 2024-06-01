/**
 * 给你二叉树的根结点 root ，请你将它展开为一个单链表：
 * 展开后的单链表应该同样使用 TreeNode ，其中 right 子指针指向链表中下一个结点，而左子指针始终为 null 。
 * 展开后的单链表应该与二叉树 先序遍历 顺序相同。
 *
 * 示例 1：
 * 输入：root = [1,2,5,3,4,null,6]
 * 输出：[1,null,2,null,3,null,4,null,5,null,6]
 *
 * 示例 2：
 * 输入：root = []
 * 输出：[]
 *
 * 示例 3：
 * 输入：root = [0]
 * 输出：[0]
 *
 * 提示：
 * 树中结点数在范围 [0, 2000] 内
 * -100 <= Node.val <= 100
 *
 * 进阶：你可以使用原地算法（O(1) 额外空间）展开这棵树吗？
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
 * @return {void} Do not return anything, modify root in-place instead.
 */
const flatten = function (root) {
  // DFS，当前节点的左节点放到右节点，右节点放到右节点的最后一个右节点的右节点
  const fn = (node) => {
    if (!node) return null;

    // 左右子树的尾右节点
    const tl = fn(node.left) ?? node.left;
    const tr = fn(node.right) ?? node.right;
    let tail = null;

    if (node.left) {
      if (node.right) {
        // 有右节点
        // 把左子树插入右节点和当前节点之间
        const r = node.right;
        node.right = node.left;
        node.left = null;
        tl.right = r;
        tail = tr;
      } else {
        // 无右节点
        // 直接把左子树移到右节点上
        node.right = node.left;
        node.left = null;
        tail = tl;
      }
    } else {
      tail = tr ?? node.right;
    }

    return tail;
  };
  fn(root);
  return root;
};

const { log, logAssert, logBinaryTree, createTreeByArray, createTreeByArrayLayer } = require('../tools/LogTools.js');
const tree = createTreeByArrayLayer([4, 1, 5, null, 2, null, null, null, 3]);
logBinaryTree(tree);
flatten(tree);
logBinaryTree(tree);
