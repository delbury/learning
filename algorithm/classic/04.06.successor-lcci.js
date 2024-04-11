/**
 * 设计一个算法，找出二叉搜索树中指定节点的“下一个”节点（也即中序后继）。
 * 如果指定节点没有对应的“下一个”节点，则返回null。
 *
 * 示例 1:
 * 输入: root = [2,1,3], p = 1
 *
 *   2
 *  / \
 * 1   3
 * 输出: 2
 *
 * 示例 2:
 * 输入: root = [5,3,6,2,4,null,null,1], p = 6
 *
 *       5
 *      / \
 *     3   6
 *    / \
 *   2   4
 *  /
 * 1
 * 输出: null
 */

// 按顺序，第 p 个节点，从 0 开始计数
const inorderSuccessor = function (root, p) {
  let findP = false;
  let res = null;
  const fn = (node) => {
    if (!node) return;

    fn(node.left);
    if (res) return;

    if (findP) {
      res = node;
      return;
    }
    if (p === node) findP = true;

    fn(node.right);
  };

  fn(root);
  return res;
};

const { log, logAssert, logBinaryTree, logHeapTree, createTreeByArray } = require('../tools/LogTools.js');
const tree = createTreeByArray([2, 1, 3]);
logBinaryTree(tree);
log(inorderSuccessor(tree, tree.left));
