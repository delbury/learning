/**
 * 给出一个完全二叉树，求出该树的节点个数。
 * 说明：
 * 完全二叉树的定义如下：在完全二叉树中，除了最底层节点可能没填满外，
 * 其余每层节点数都达到最大值，并且最下面一层的节点都集中在该层最左边的若干位置。
 * 若最底层为第 h 层，则该层包含 1~ 2h 个节点。
 * 示例:
 * 输入: 
 *     1
 *   / \
 *   2   3
 * / \  /
 * 4  5 6
 * 输出: 6
 * 
 * 
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */

// 1. 遍历
var countNodes = function (root) {
  if (!root) return 0;

  let count = 0;
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    count++;
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }
  return count;
};

// 2. 递归
const find = function (node) {
  if (!node) return 0;
  return find(node.left) + find(node.right) + 1;
};
var countNodesII = function (root) {
  return find(root);
};

// 3. 找到最后一个叶子节点
const isLastLayerLeaf = (root, height, paths) => {
  let path = 1 << (height - 1); // 当前的路径位
  let node = root;
  while (path > 0 && node) {
    if (path & paths) {
      node = node.right;
    } else {
      node = node.left;
    }
    path >>= 1;
  }
  return !!node;
}

var countNodesIII = function (root) {
  if (!root) return 0;
  let height = 0;
  let node = root;
  while (node.left) {
    node = node.left;
    height++;
  }
  let lp = 1 << height; // 最后一层的左端
  let rp = (1 << (height + 1)) - 1; // 最后一层的右端

  while (lp < rp) {
    const mp = Math.floor((rp - lp + 1) / 2) + lp;
    if (isLastLayerLeaf(root, height, mp)) {
      // 当前节点是最后一层上的节点
      lp = mp;
    } else {
      rp = mp - 1;
    }
  }

  return lp;
};

const { logAssert, createLinkedListByArray, createTreeByArray } = require('./tools/LogTools.js');
logAssert(countNodesIII, createTreeByArray([1, 2, 3, 4, 5, 6]), 6);