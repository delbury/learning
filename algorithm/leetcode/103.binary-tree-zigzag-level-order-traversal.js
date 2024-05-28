/**
 * 给你二叉树的根节点 root ，返回其节点值的 锯齿形层序遍历 。（即先从左往右，再从右往左进行下一层遍历，以此类推，
 * 层与层之间交替进行）。
 *
 * 示例 1：
 * 输入：root = [3,9,20,null,null,15,7]
 * 输出：[[3],[20,9],[15,7]]
 *
 * 示例 2：
 * 输入：root = [1]
 * 输出：[[1]]
 *
 * 示例 3：
 * 输入：root = []
 * 输出：[]
 *
 * 提示：
 * 树中节点数目在范围 [0, 2000] 内
 * -100 <= Node.val <= 100
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
const zigzagLevelOrder = function (root) {
  const res = [];
  const fn = (node, deep) => {
    const ltr = deep % 2 === 0;
    if (!node) return;
    if (res[deep]) {
      if (ltr) res[deep].push(node.val);
      else res[deep].unshift(node.val);
    } else {
      res[deep] = [node.val];
    }
    fn(node.left, deep + 1);
    fn(node.right, deep + 1);
  };
  fn(root, 0);
  return res;
};

const { log, logAssert, logBinaryTree, logHeapTree, createTreeByArray } = require('../tools/LogTools.js');
const tree = createTreeByArray([3, 9, 20, null, null, 15, 7]);
logAssert(zigzagLevelOrder, tree, [[3], [20, 9], [15, 7]]);
