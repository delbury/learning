/**
 * 给定一个二叉搜索树和一个目标结果，如果 BST 中存在两个元素且它们的和等于给定的目标结果，则返回 true。
 * 案例 1:
 * 输入: 
 *     5
 *   / \
 *   3   6
 * / \   \
 * 2   4   7
 * Target = 9
 * 输出: True
 *  
 * 案例 2:
 * 输入: 
 *     5
 *   / \
 *   3   6
 * / \   \
 * 2   4   7
 * Target = 28
 * 输出: False
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
 * 1. hash
 * 2. 双指针
 * 
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {boolean}
 */

// 1. 递归，hash
const dlr = function (node, set, k) {
  if (!node) return false;
  if (set.has(k - node.val)) return true;
  set.add(node.val);
  return dlr(node.left, set, k) || dlr(node.right, set, k);
};
var findTarget = function (root, k) {
  const set = new Set();
  return dlr(root, set, k);
};

// 2. 数组，双指针
const ldr = function (node, arr) {
  if (!node) return;
  ldr(node.left, arr);
  arr.push(node.val);
  ldr(node.right, arr);
};
var findTargetII = function (root, k) {
  const arr = [];
  ldr(root, arr);

  let lp = 0;
  let rp = arr.length - 1;
  while (lp < rp) {
    let sum = arr[lp] + arr[rp];
    if (sum === k) return true;
    if (sum > k) {
      rp--;
    } else {
      lp++;
    }
  }
  return false;
};

const { logHeapTree, logBinaryTree, createTreeByArray, logAssert } = require('./tools/LogTools.js');
logAssert(findTargetII, createTreeByArray([5, 3, 6, 2, 4, null, 7]), 9, true);
