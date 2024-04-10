/**
 * 实现一个函数，检查二叉树是否平衡。
 * 在这个问题中，平衡树的定义如下：任意一个节点，其两棵子树的高度差不超过 1。
 *
 * 示例 1:
 * 给定二叉树 [3,9,20,null,null,15,7]
 *     3
 *    / \
 *   9  20
 *     /  \
 *    15   7
 * 返回 true 。
 *
 * 示例 2:
 * 给定二叉树 [1,2,2,3,3,null,null,4,4]
 *       1
 *      / \
 *     2   2
 *    / \
 *   3   3
 *  / \
 * 4   4
 * 返回 false 。
 */

const isBalanced = function (root) {
  if (!root) return true;

  const fn = (node, deep) => {
    if (!node.left && !node.right) return deep;

    const lh = node.left ? fn(node.left, deep + 1) : deep;
    if (lh === false) return false;

    const rh = node.right ? fn(node.right, deep + 1) : deep;
    if (rh === false) return false;

    if (Math.abs(lh - rh) > 1) return false;

    return Math.max(lh, rh);
  };

  return fn(root, 0) !== false;
};

const { log, logAssert, logBinaryTree, logHeapTree, createTreeByArray } = require('../tools/LogTools.js');
const tree = createTreeByArray([3, 9, 20, null, null, 15, 7]);
logBinaryTree(tree);
log(isBalanced(tree));
const tree2 = createTreeByArray([1, 21, 22, 31, 32, null, null, 41, 42]);
logBinaryTree(tree2);
log(isBalanced(tree2));
