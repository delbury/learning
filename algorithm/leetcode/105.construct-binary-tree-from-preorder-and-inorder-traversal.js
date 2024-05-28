/**
 * 根据一棵树的前序遍历与中序遍历构造二叉树。
 * 注意:
 * 你可以假设树中没有重复的元素。
 *
 * 例如，给出
 * 前序遍历 preorder = [3,9,20,15,7]
 * 中序遍历 inorder = [9,3,15,20,7]
 * 返回如下的二叉树：
 *    3
 *   / \
 *  9  20
 *    /  \
 *  15   7
 *
 *
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 *
 * 思路：
 *  前序遍历找到树的根节点
 *  中序遍历根据找到的根节点，可以将树分为左右子树
 *  递归以上左右子树
 *
 */

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */

// 1. 递归
const buildTreeI = function (preorder, inorder) {
  if (!preorder.length) return null;
  const root = new TreeNode(preorder[0]);
  const index = inorder.indexOf(preorder[0]); // 根节点在中序遍历中的位置
  const leftInorder = inorder.slice(0, index); // 左子树中序
  const rightInorder = inorder.slice(index + 1); // 右子树中序
  root.left = buildTreeI(preorder.slice(1, leftInorder.length + 1), leftInorder);
  root.right = buildTreeI(preorder.slice(leftInorder.length + 1), rightInorder);
  return root;
};

// 2. 递归，内存优化
const buildTreeII = function (preorder, inorder) {
  if (!preorder.length) return null;
  const fn = (pl, pr, il, ir) => {
    if (pl > pr) return null;
    const root = new TreeNode(preorder[pl]);
    const index = inorder.indexOf(preorder[pl]);

    root.left = fn(pl + 1, index - il + pl, il, index - 1);
    root.right = fn(index - il + pl + 1, pr, index + 1, ir);
    return root;
  };
  return fn(0, preorder.length - 1, 0, inorder.length - 1);
};

// 3. 递归，内存优化，使用 map
const buildTree = function (preorder, inorder) {
  if (!preorder.length) return null;
  const map = new Map();
  inorder.forEach((it, index) => map.set(it, index));
  const fn = (pl, pr, il, ir) => {
    if (pl > pr) return null;
    const root = new TreeNode(preorder[pl]);
    const index = map.get(preorder[pl]);

    root.left = fn(pl + 1, index - il + pl, il, index - 1);
    root.right = fn(index - il + pl + 1, pr, index + 1, ir);
    return root;
  };
  return fn(0, preorder.length - 1, 0, inorder.length - 1);
};

const { logBinaryTree, logHeapTree, createTreeByArray } = require('./tools/LogTools.js');
logBinaryTree(buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]));
