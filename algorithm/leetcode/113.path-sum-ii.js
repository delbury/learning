/**
 * 给你二叉树的根节点 root 和一个整数目标和 targetSum ，找出所有 从根节点到叶子节点 路径总和等于给定目标和的路径。
 * 叶子节点 是指没有子节点的节点。
 *
 * 示例 1：
 * 输入：root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
 * 输出：[[5,4,11,2],[5,8,4,5]]
 *
 *                        5
 *           ---------------------------
 *             4                      8
 *     ----                    ----------------
 *      11                      13           4
 * ----------                            ----------
 *   7     2                               5     1
 *
 * 示例 2：
 * 输入：root = [1,2,3], targetSum = 5
 * 输出：[]
 *
 * 示例 3：
 * 输入：root = [1,2], targetSum = 0
 * 输出：[]
 *
 * 提示：
 * 树中节点总数在范围 [0, 5000] 内
 * -1000 <= Node.val <= 1000
 * -1000 <= targetSum <= 1000
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
 * @param {number} targetSum
 * @return {number[][]}
 */
const pathSum = function (root, targetSum) {
  let res = [];
  const fn = (node, prev, arr) => {
    if (!node) return;

    const temp = prev + node.val;
    if (!node.left && !node.right && temp === targetSum) {
      res.push([...arr, node.val]);
      return;
    }
    fn(node.left, temp, [...arr, node.val]);
    fn(node.right, temp, [...arr, node.val]);
  };
  fn(root, 0, []);
  return res;
};

const {
  log,
  logAssert,
  logBinaryTree,
  logHeapTree,
  createTreeByArray,
  createTreeByArrayLayer,
} = require('../tools/LogTools.js');
const tree = createTreeByArray([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1]);
logBinaryTree(tree);

const tree2 = createTreeByArrayLayer([5, 4, 8, 11, null, null, 4, 7, 2, 5, 1]);
logBinaryTree(tree2);
