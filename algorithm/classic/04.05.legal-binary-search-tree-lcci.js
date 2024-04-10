/**
 * 实现一个函数，检查一棵二叉树是否为二叉搜索树。
 *
 * 示例 1:
 * 输入:
 *     2
 *    / \
 *   1   3
 * 输出: true
 *
 * 示例 2:
 * 输入:
 *     5
 *    / \
 *   1   4
 *      / \
 *     3   6
 * 输出: false
 * 解释: 输入为: [5,1,4,null,null,3,6]。
 *      根节点的值为 5 ，但是其右子节点值为 4 。
 */

const isValidBST = function (root) {
  if (!root) return true;

  const fn = (node, min, max) => {
    if (!node) return true;

    if (node.val <= min || node.val >= max) return false;

    const l = fn(node.left, min, node.val);
    if (!l) return false;

    const r = fn(node.right, node.val, max);
    if (!r) return false;

    return true;
  };
  return fn(root, -Infinity, +Infinity);
};

const { log, logAssert, logBinaryTree, logHeapTree, createTreeByArray } = require('../tools/LogTools.js');
// const tree = createTreeByArray([2, 1, 3]);
// log(isValidBST(tree));
// const tree2 = createTreeByArray([5, 1, 4, null, null, 3, 6]);
// log(isValidBST(tree2));
const tree3 = createTreeByArray([10, 5, 15, null, null, 6, 20]);
logBinaryTree(tree3);
log(isValidBST(tree3));
