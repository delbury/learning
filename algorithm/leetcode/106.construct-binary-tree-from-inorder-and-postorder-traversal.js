/**
 * 给定两个整数数组 inorder 和 postorder ，其中 inorder 是二叉树的中序遍历， postorder 是同一棵树的后序遍历，请你构造并返回这颗 二叉树 。
 *
 * 示例1:
 * 输入：inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
 * 输出：[3,9,20,null,null,15,7]
 *    3
 *   / \
 *  9  20
 *    /  \
 *  15   7
 *
 * 示例2:
 * 输入：inorder = [-1], postorder = [-1]
 * 输出：[-1]
 *
 * 提示:
 * 1 <= inorder.length <= 3000
 * postorder.length == inorder.length
 * -3000 <= inorder[i], postorder[i] <= 3000
 * inorder 和 postorder 都由 不同 的值组成
 * postorder 中每一个值都在 inorder 中
 * inorder 保证是树的中序遍历
 * postorder 保证是树的后序遍历
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
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 *
 * 输入：inorder = [9,3,15,20,7]
 *      postorder = [9,15,7,20,3]
 * 输出：[3,9,20,null,null,15,7]
 *    3
 *   / \
 *  9  20
 *    /  \
 *  15   7
 */

const buildTree = function (inorder, postorder) {
  const map = {};
  inorder.forEach((n, i) => (map[n] = i));
  const fn = (pl, pr, il, ir) => {
    // 0, 4, 0, 4
    if (pl > pr) return null;

    const val = postorder[pr]; // 3
    const inIndex = map[val]; // 1
    const newlpr = pl + inIndex - il - 1; // 1

    const node = {
      val,
      left: fn(pl, newlpr, il, inIndex - 1),
      right: fn(newlpr + 1, newlpr + ir - inIndex, inIndex + 1, ir),
    };
    return node;
  };

  return fn(0, postorder.length - 1, 0, inorder.length - 1);
};

const { log, logAssert, logBinaryTree, logHeapTree, createTreeByArray } = require('../tools/LogTools.js');
logBinaryTree(buildTree([9, 3, 15, 20, 7], [9, 15, 7, 20, 3]));
