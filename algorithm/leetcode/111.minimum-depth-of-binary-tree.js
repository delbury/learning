/**
 * 给定一个二叉树，找出其最小深度。
 * 最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
 * 说明：叶子节点是指没有子节点的节点。
 *
 * 示例 1：
 * 输入：root = [3,9,20,null,null,15,7]
 * 输出：2
 *
 * 示例 2：
 * 输入：root = [2,null,3,null,4,null,5,null,6]
 * 输出：5
 *
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
 * @return {number}
 */

// 1. DFS
const minDepth = function (root) {
  if (!root) return 0;

  if (!root.left && !root.right) return 1;

  if (!root.left) return minDepth(root.right) + 1;

  if (!root.right) return minDepth(root.left) + 1;

  return Math.min(minDepth(root.left), minDepth(root.right)) + 1;
};

// 2024.5.30 BFS
const minDepth2 = function (root) {
  if (!root) return 0;

  let queue1 = [root];
  let queue2 = [];
  let minDeep = 1;

  while (queue1.length) {
    const node = queue1.shift();

    if (!node.left && !node.right) break;

    if (node.left) queue2.push(node.left);
    if (node.right) queue2.push(node.right);

    if (!queue1.length) {
      minDeep++;
      [queue1, queue2] = [queue2, queue1];
    }
  }
  return minDeep;
};

const { logBinaryTree, logHeapTree, createTreeByArray, logAssert } = require('../tools/LogTools.js');
logAssert(minDepth, createTreeByArray([3, 9, 20, null, null, 15, 7]), 2);

const tree = {
  val: 2,
  left: null,
  right: {
    val: 3,
    left: null,
    right: {
      val: 4,
      left: null,
      right: {
        val: 5,
        left: null,
        right: {
          val: 6,
          left: null,
          right: null,
        },
      },
    },
  },
};
// logBinaryTree(tree, 'val', 'left', 'right');
logAssert(minDepth, tree, 5);
